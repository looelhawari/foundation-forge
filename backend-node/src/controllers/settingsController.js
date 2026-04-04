const { pool } = require("../config/database");
const { asyncHandler, successResponse, ApiError, sanitizeInput } = require("../utils/helpers");

// ═══════════════════════════════════════════════════════
// In-memory cache — avoids repeated DB reads for public pages
// ═══════════════════════════════════════════════════════
let settingsCache = null;
let cacheTimestamp = 0;
const CACHE_TTL_MS = 5 * 1000; // 5 seconds - short enough for instant updates

/**
 * Read the singleton row from site_settings, with caching.
 */
const getSiteSettingsRow = async (forceRefresh = false) => {
    const now = Date.now();
    if (!forceRefresh && settingsCache && now - cacheTimestamp < CACHE_TTL_MS) {
        return settingsCache;
    }

    const [rows] = await pool.execute("SELECT * FROM site_settings WHERE id = 1");
    if (rows.length === 0) {
        throw new ApiError(500, "Site settings not initialised. Run database init first.");
    }

    settingsCache = rows[0];
    cacheTimestamp = now;
    return settingsCache;
};

/**
 * Invalidate cache after an update.
 */
const invalidateCache = () => {
    settingsCache = null;
    cacheTimestamp = 0;
};

/**
 * Parse JSON array from DB or return default
 */
const parseJsonArray = (value, defaultVal = []) => {
    if (!value) return defaultVal;
    try {
        const parsed = JSON.parse(value);
        return Array.isArray(parsed) ? parsed : defaultVal;
    } catch {
        return defaultVal;
    }
};

/**
 * Format raw DB row → clean JSON with proper types.
 * MySQL TINYINT → JS boolean for show_* fields.
 */
const formatSettingsRow = (row) => ({
    site_name: row.site_name,
    public_location: row.public_location,
    head_office_address: row.head_office_address,
    contact_email: row.contact_email,
    contact_emails: parseJsonArray(row.contact_emails, []),
    contact_phone: row.contact_phone,
    contact_phone_2: row.contact_phone_2 || "",
    contact_telephone: row.contact_telephone || "",
    contact_phones: parseJsonArray(row.contact_phones, []),
    contact_fax: row.contact_fax || "",
    po_box: row.po_box || "",
    google_maps_url: row.google_maps_url || "",
    facebook_url: row.facebook_url || "",
    show_facebook: Number(row.show_facebook) === 1,
    instagram_url: row.instagram_url || "",
    show_instagram: Number(row.show_instagram) === 1,
    linkedin_url: row.linkedin_url || "",
    show_linkedin: Number(row.show_linkedin) === 1,
    twitter_url: row.twitter_url || "",
    show_twitter: Number(row.show_twitter) === 1,
    show_email_sales: Number(row.show_email_sales) === 1,
    show_email_support: Number(row.show_email_support) === 1,
    show_email_inquiry: Number(row.show_email_inquiry) === 1,
    email_sales: row.email_sales || "sales@cpc-qa.com",
    email_support: row.email_support || "support@cpc-qa.com",
    email_inquiry: row.email_inquiry || "inquiry@cpc-qa.com",
    updated_at: row.updated_at,
});

// ═══════════════════════════════════════════════════════
// PUBLIC  –  GET /api/settings
// ═══════════════════════════════════════════════════════
const getPublicSettings = asyncHandler(async (_req, res) => {
    const row = await getSiteSettingsRow();

    // Cache: browser 10s, CDN 30s. Fresh requests (?_=timestamp) bypass cache
    res.set("Cache-Control", "public, max-age=10, s-maxage=30, stale-while-revalidate=60");
    res.json(successResponse(formatSettingsRow(row), "Site settings retrieved successfully"));
});

// ═══════════════════════════════════════════════════════
// ADMIN  –  PUT /api/admin/settings
// ═══════════════════════════════════════════════════════

/** Allowed columns that can be updated */
const ALLOWED_FIELDS = [
    "site_name",
    "public_location",
    "head_office_address",
    "contact_email",
    "contact_phone",
    "contact_phone_2",
    "contact_telephone",
    "contact_fax",
    "po_box",
    "google_maps_url",
    "facebook_url",
    "show_facebook",
    "instagram_url",
    "show_instagram",
    "linkedin_url",
    "show_linkedin",
    "twitter_url",
    "show_twitter",
    "show_email_sales",
    "show_email_support",
    "show_email_inquiry",
    "email_sales",
    "email_support",
    "email_inquiry",
];

/** Boolean toggle fields — coerce to 0/1 for MySQL TINYINT */
const BOOLEAN_FIELDS = [
    "show_facebook",
    "show_instagram",
    "show_linkedin",
    "show_twitter",
    "show_email_sales",
    "show_email_support",
    "show_email_inquiry",
];

/** Simple URL validator */
const isValidUrl = (str) => {
    if (!str || str.trim() === "") return true; // empty is OK (optional)
    try {
        const url = new URL(str);
        return ["http:", "https:"].includes(url.protocol);
    } catch {
        return false;
    }
};

/** Simple email validator */
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const updateSiteSettings = asyncHandler(async (req, res) => {
    const body = req.body;

    // ── Validation ──────────────────────────────────
    const errors = [];

    // Required text fields
    if (body.contact_email !== undefined) {
        if (!body.contact_email || !body.contact_email.trim()) {
            errors.push("Contact email is required");
        } else if (!isValidEmail(body.contact_email.trim())) {
            errors.push("Contact email is not valid");
        }
    }

    if (body.contact_phone !== undefined) {
        if (!body.contact_phone || !body.contact_phone.trim()) {
            errors.push("Contact phone is required");
        }
    }

    if (body.head_office_address !== undefined) {
        if (!body.head_office_address || !body.head_office_address.trim()) {
            errors.push("Head office address is required");
        }
    }

    if (body.site_name !== undefined) {
        if (!body.site_name || !body.site_name.trim()) {
            errors.push("Site name is required");
        }
    }

    if (body.public_location !== undefined) {
        if (!body.public_location || !body.public_location.trim()) {
            errors.push("Public location is required");
        }
    }

    // URL fields
    const urlFields = ["facebook_url", "instagram_url", "linkedin_url", "twitter_url", "google_maps_url"];
    for (const field of urlFields) {
        if (body[field] !== undefined && !isValidUrl(body[field])) {
            errors.push(`${field.replace(/_/g, " ")} is not a valid URL`);
        }
    }

    if (errors.length > 0) {
        throw new ApiError(400, errors.join("; "));
    }

    // ── Build SET clause ────────────────────────────
    const setClauses = [];
    const values = [];

    for (const field of ALLOWED_FIELDS) {
        if (body[field] !== undefined) {
            setClauses.push(`${field} = ?`);
            if (BOOLEAN_FIELDS.includes(field)) {
                // Coerce to 0 or 1 for MySQL TINYINT
                values.push(body[field] ? 1 : 0);
            } else {
                // Sanitize string inputs to prevent XSS
                const val = typeof body[field] === "string" ? sanitizeInput(body[field].trim()) : body[field];
                values.push(val);
            }
        }
    }

    if (setClauses.length === 0) {
        throw new ApiError(400, "No valid fields provided for update");
    }

    values.push(1); // WHERE id = 1
    await pool.execute(
        `UPDATE site_settings SET ${setClauses.join(", ")} WHERE id = ?`,
        values,
    );

    // Invalidate cache so next read gets fresh data
    invalidateCache();

    // Return updated row (formatted with proper boolean types)
    const updated = await getSiteSettingsRow(true);

    res.json(successResponse(formatSettingsRow(updated), "Site settings updated successfully"));
});

module.exports = {
    getPublicSettings,
    updateSiteSettings,
};
