"use client";

import {
    createContext,
    useContext,
    useEffect,
    useState,
    useCallback,
    type ReactNode,
} from "react";
import { siteSettingsApi, type SiteSettings } from "@/lib/api";

// ═══════════════════════════════════════════════════════
// Default / fallback values — used while the API response loads
// and as a safety net if the fetch fails entirely.
// These match the DB seed so the site never shows empty strings.
// ═══════════════════════════════════════════════════════
const DEFAULT_SETTINGS: SiteSettings = {
    site_name: "Cosmo Projects & Construction",
    public_location: "Doha, Qatar",
    head_office_address:
        "Mirqab Mall, Area No. 39, Street No. 840, Building No. 53, Block D, Office No. 307-308",
    contact_email: "Info@ctgroups.net",
    contact_emails: [],
    contact_phone: "+974 4432-2743",
    contact_phone_2: "",
    contact_telephone: "",
    contact_phones: [],
    contact_fax: "+974 4029-1295",
    po_box: "15776",
    google_maps_url:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3607.6047!2d51.5014973!3d25.2734836!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e45dbcfbfe07107%3A0xaf990e0741438251!2sCosmo%20Projects%20%26%20Construction%20and%20Trading!5e0!3m2!1sen!2s!4v1735053847123!5m2!1sen!2s",
    facebook_url: "",
    show_facebook: false,
    instagram_url: "",
    show_instagram: false,
    linkedin_url: "https://www.linkedin.com/company/cpc-qatar",
    show_linkedin: true,
    twitter_url: "",
    show_twitter: false,
    show_email_sales: false,
    show_email_support: false,
    show_email_inquiry: false,
    email_sales: "sales@cpc-qa.com",
    email_support: "support@cpc-qa.com",
    email_inquiry: "inquiry@cpc-qa.com",
    updated_at: "",
};

// ═══════════════════════════════════════════════════════
// Context
// ═══════════════════════════════════════════════════════
interface SiteSettingsContextValue {
    settings: SiteSettings;
    isLoading: boolean;
    /** Call to re-fetch from the API (e.g. after admin saves settings) */
    refresh: () => Promise<void>;
}

const SiteSettingsContext = createContext<SiteSettingsContextValue>({
    settings: DEFAULT_SETTINGS,
    isLoading: true,
    refresh: async () => { },
});

// ═══════════════════════════════════════════════════════
// Provider — mount once near the top of the component tree
// ═══════════════════════════════════════════════════════
export function SiteSettingsProvider({ children }: { children: ReactNode }) {
    const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SETTINGS);
    const [isLoading, setIsLoading] = useState(true);

    const fetchSettings = useCallback(async () => {
        try {
            const res = await siteSettingsApi.get();
            if (res.success && res.data) {
                setSettings({ ...DEFAULT_SETTINGS, ...res.data });
            }
        } catch {
            // Keep defaults on failure — the site will still render correctly
            console.warn("[SiteSettings] Failed to fetch, using defaults");
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchSettings();
    }, [fetchSettings]);

    return (
        <SiteSettingsContext.Provider
            value={{ settings, isLoading, refresh: fetchSettings }}
        >
            {children}
        </SiteSettingsContext.Provider>
    );
}

// ═══════════════════════════════════════════════════════
// Hook — use in any client component
// ═══════════════════════════════════════════════════════
export function useSiteSettings() {
    return useContext(SiteSettingsContext);
}

export { DEFAULT_SETTINGS };
