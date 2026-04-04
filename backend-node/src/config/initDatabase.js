const mysql = require("mysql2/promise");
const bcrypt = require("bcryptjs");
const config = require("./index");

const initDatabase = async () => {
  let connection;

  try {
    // Connect without database first
    connection = await mysql.createConnection({
      host: config.database.host,
      port: config.database.port,
      user: config.database.user,
      password: config.database.password,
    });

    console.log("🔌 Connected to MySQL server");

    // Create database if not exists
    await connection.execute(
      `CREATE DATABASE IF NOT EXISTS \`${config.database.name}\``,
    );
    console.log(`✅ Database '${config.database.name}' created/verified`);

    // Use the database
    await connection.changeUser({ database: config.database.name });

    // Create admins table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS admins (
        id INT PRIMARY KEY AUTO_INCREMENT,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        name VARCHAR(255) NOT NULL DEFAULT 'Admin',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        last_login TIMESTAMP NULL,
        is_active BOOLEAN DEFAULT TRUE,
        INDEX idx_email (email)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log("✅ Admins table created/verified");

    // Create projects table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS projects (
        id INT PRIMARY KEY AUTO_INCREMENT,
        slug VARCHAR(255) NOT NULL UNIQUE,
        title VARCHAR(500) NOT NULL,
        description TEXT,
        category VARCHAR(100),
        location VARCHAR(255),
        client VARCHAR(255),
        main_contractor VARCHAR(255),
        consultant VARCHAR(255),
        area VARCHAR(100),
        value VARCHAR(100),
        year VARCHAR(20),
        status ENUM('active', 'completed', 'in_progress', 'archived') DEFAULT 'completed',
        featured BOOLEAN DEFAULT FALSE,
        is_legacy BOOLEAN DEFAULT FALSE,
        display_order INT DEFAULT 0,
        images JSON,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        created_by INT,
        INDEX idx_category (category),
        INDEX idx_status (status),
        INDEX idx_slug (slug),
        INDEX idx_featured (featured),
        INDEX idx_is_legacy (is_legacy),
        FOREIGN KEY (created_by) REFERENCES admins(id) ON DELETE SET NULL
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log("✅ Projects table created/verified");

    // Add is_legacy column if it doesn't exist (for existing databases)
    try {
      await connection.execute(`
        ALTER TABLE projects ADD COLUMN is_legacy BOOLEAN DEFAULT FALSE AFTER featured
      `);
      console.log("✅ Added is_legacy column to projects table");
    } catch (err) {
      // Column already exists, ignore
    }

    // Add display_order column if it doesn't exist (for existing databases)
    try {
      await connection.execute(`
        ALTER TABLE projects ADD COLUMN display_order INT DEFAULT 0 AFTER is_legacy
      `);
      console.log("✅ Added display_order column to projects table");
    } catch (err) {
      // Column already exists, ignore
    }

    // Make category nullable (for existing databases)
    try {
      await connection.execute(`
        ALTER TABLE projects MODIFY COLUMN category VARCHAR(100) NULL
      `);
      console.log("✅ Made category column nullable");
    } catch (err) {
      // Already nullable or error, ignore
    }

    // Create contact_submissions table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS contact_submissions (
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50),
        company VARCHAR(255),
        subject VARCHAR(500),
        message TEXT NOT NULL,
        status ENUM('new', 'read', 'responded', 'archived') DEFAULT 'new',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_status (status),
        INDEX idx_created (created_at)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log("✅ Contact submissions table created/verified");

    // Create categories table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS categories (
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(100) NOT NULL UNIQUE,
        slug VARCHAR(100) NOT NULL UNIQUE,
        description TEXT,
        display_order INT DEFAULT 0,
        is_active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_slug (slug),
        INDEX idx_order (display_order)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log("✅ Categories table created/verified");

    // Create activity_logs table for audit trail
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS activity_logs (
        id INT PRIMARY KEY AUTO_INCREMENT,
        admin_id INT,
        action VARCHAR(100) NOT NULL,
        entity_type VARCHAR(50),
        entity_id INT,
        details JSON,
        ip_address VARCHAR(45),
        user_agent TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_admin (admin_id),
        INDEX idx_action (action),
        INDEX idx_created (created_at),
        FOREIGN KEY (admin_id) REFERENCES admins(id) ON DELETE SET NULL
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log("✅ Activity logs table created/verified");

    // Create settings table (legacy key-value, kept for backward compat)
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS settings (
        id INT PRIMARY KEY AUTO_INCREMENT,
        setting_key VARCHAR(100) NOT NULL UNIQUE,
        setting_value TEXT,
        setting_type ENUM('string', 'number', 'boolean', 'json') DEFAULT 'string',
        description TEXT,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_key (setting_key)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log("✅ Settings table created/verified");

    // ─── Site Settings (singleton table) ─────────────────────────
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS site_settings (
        id INT PRIMARY KEY DEFAULT 1,
        site_name VARCHAR(255) NOT NULL DEFAULT 'Cosmo Projects & Construction',
        public_location VARCHAR(500) NOT NULL DEFAULT 'Doha, Qatar',
        head_office_address TEXT NOT NULL,
        contact_email VARCHAR(255) NOT NULL DEFAULT 'Info@ctgroups.net',
        contact_phone VARCHAR(50) NOT NULL DEFAULT '+974 4432-2743',
        contact_phone_2 VARCHAR(50) DEFAULT NULL,
        contact_telephone VARCHAR(50) DEFAULT NULL,
        contact_fax VARCHAR(50) DEFAULT NULL,
        po_box VARCHAR(50) DEFAULT NULL,
        google_maps_url TEXT DEFAULT NULL,
        facebook_url VARCHAR(500) DEFAULT '',
        show_facebook TINYINT(1) NOT NULL DEFAULT 0,
        instagram_url VARCHAR(500) DEFAULT '',
        show_instagram TINYINT(1) NOT NULL DEFAULT 0,
        linkedin_url VARCHAR(500) DEFAULT '',
        show_linkedin TINYINT(1) NOT NULL DEFAULT 1,
        twitter_url VARCHAR(500) DEFAULT '',
        show_twitter TINYINT(1) NOT NULL DEFAULT 0,
        show_email_sales TINYINT(1) NOT NULL DEFAULT 0,
        show_email_support TINYINT(1) NOT NULL DEFAULT 0,
        show_email_inquiry TINYINT(1) NOT NULL DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        CONSTRAINT chk_singleton CHECK (id = 1)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log("✅ Site settings table created/verified");

    // ── Add contact_phone_2 and contact_telephone columns if missing (migration) ──
    const phoneColumns = [
      { col: "contact_phone_2", after: "contact_phone", type: "VARCHAR(50) DEFAULT NULL" },
      { col: "contact_telephone", after: "contact_phone_2", type: "VARCHAR(50) DEFAULT NULL" },
    ];
    for (const { col, after, type } of phoneColumns) {
      try {
        const [cols] = await connection.execute(
          `SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'site_settings' AND COLUMN_NAME = ?`,
          [col]
        );
        if (cols.length === 0) {
          await connection.execute(
            `ALTER TABLE site_settings ADD COLUMN ${col} ${type} AFTER ${after}`
          );
          console.log(`✅ Added column ${col} to site_settings`);
        }
      } catch (err) {
        console.log(`ℹ️  Column ${col} migration skipped:`, err.message);
      }
    }

    // ── Add contact_emails and contact_phones JSON array columns (migration) ──
    const jsonArrayColumns = [
      { col: "contact_emails", after: "contact_email", type: "JSON DEFAULT NULL" },
      { col: "contact_phones", after: "contact_telephone", type: "JSON DEFAULT NULL" },
    ];
    for (const { col, after, type } of jsonArrayColumns) {
      try {
        const [cols] = await connection.execute(
          `SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'site_settings' AND COLUMN_NAME = ?`,
          [col]
        );
        if (cols.length === 0) {
          await connection.execute(
            `ALTER TABLE site_settings ADD COLUMN ${col} ${type} AFTER ${after}`
          );
          console.log(`✅ Added column ${col} to site_settings`);
        }
      } catch (err) {
        console.log(`ℹ️  Column ${col} migration skipped:`, err.message);
      }
    }

    // ── Add show_* toggle columns if they don't exist yet (migration for existing DBs) ──
    // RUN BEFORE INSERT so columns exist for seed data
    const toggleColumns = [
      { col: "show_facebook", after: "facebook_url" },
      { col: "show_instagram", after: "instagram_url" },
      { col: "show_linkedin", after: "linkedin_url" },
      { col: "show_twitter", after: "twitter_url" },
      { col: "show_email_sales", after: "show_twitter" },
      { col: "show_email_support", after: "show_email_sales" },
      { col: "show_email_inquiry", after: "show_email_support" },
      { col: "email_sales", after: "show_email_inquiry", type: "VARCHAR(255) DEFAULT 'sales@cpc-qa.com'" },
      { col: "email_support", after: "email_sales", type: "VARCHAR(255) DEFAULT 'support@cpc-qa.com'" },
      { col: "email_inquiry", after: "email_support", type: "VARCHAR(255) DEFAULT 'inquiry@cpc-qa.com'" },
    ];
    for (const { col, after, type } of toggleColumns) {
      try {
        const [cols] = await connection.execute(
          `SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'site_settings' AND COLUMN_NAME = ?`,
          [col]
        );
        if (cols.length === 0) {
          const colType = type || "TINYINT(1) NOT NULL DEFAULT 0";
          const defaultVal = col === "show_linkedin" ? 1 : 0;
          await connection.execute(
            `ALTER TABLE site_settings ADD COLUMN ${col} ${colType} AFTER ${after}`
          );
          console.log(`✅ Added column ${col} to site_settings`);
        }
      } catch (err) {
        console.log(`ℹ️  Column ${col} migration skipped:`, err.message);
      }
    }

    // Seed the singleton row with current production data (INSERT IGNORE = skip if exists)
    await connection.execute(`
      INSERT IGNORE INTO site_settings (
        id, site_name, public_location, head_office_address,
        contact_email, contact_phone, contact_phone_2, contact_telephone, contact_fax, po_box, google_maps_url,
        facebook_url, show_facebook, instagram_url, show_instagram,
        linkedin_url, show_linkedin, twitter_url, show_twitter,
        show_email_sales, show_email_support, show_email_inquiry,
        email_sales, email_support, email_inquiry
      ) VALUES (
        1,
        'Cosmo Projects & Construction',
        'Doha, Qatar',
        'Mirqab Mall, Area No. 39, Street No. 840, Building No. 53, Block D, Office No. 307-308',
        'Info@ctgroups.net',
        '+974 4432-2743',
        NULL,
        NULL,
        '+974 4029-1295',
        '15776',
        'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3607.6047!2d51.5014973!3d25.2734836!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e45dbcfbfe07107%3A0xaf990e0741438251!2sCosmo%20Projects%20%26%20Construction%20and%20Trading!5e0!3m2!1sen!2s!4v1735053847123!5m2!1sen!2s',
        '', 0,
        '', 0,
        'https://www.linkedin.com/company/cpc-qatar', 1,
        '', 0,
        0, 0, 0,
        'sales@cpc-qa.com', 'support@cpc-qa.com', 'inquiry@cpc-qa.com'
      )
    `);
    console.log("✅ Site settings default row seeded");

    // ── Migrate any values from old settings table into site_settings ──
    try {
      const [oldSettings] = await connection.execute(
        "SELECT setting_key, setting_value FROM settings WHERE setting_key IN ('company_name','company_phone','company_email','company_address','contact_email','contact_phone','contact_address','social_facebook','social_twitter','social_linkedin','social_instagram','site_name')"
      );
      if (oldSettings.length > 0) {
        const map = {};
        oldSettings.forEach((r) => { map[r.setting_key] = r.setting_value; });
        // Only update non-empty values from the old table
        const updates = [];
        const vals = [];
        if (map.site_name || map.company_name) { updates.push("site_name = ?"); vals.push(map.site_name || map.company_name); }
        if (map.contact_email || map.company_email) { updates.push("contact_email = ?"); vals.push(map.contact_email || map.company_email); }
        if (map.contact_phone || map.company_phone) { updates.push("contact_phone = ?"); vals.push(map.contact_phone || map.company_phone); }
        if (map.contact_address || map.company_address) { updates.push("head_office_address = ?"); vals.push(map.contact_address || map.company_address); }
        if (map.social_facebook) { updates.push("facebook_url = ?"); vals.push(map.social_facebook); }
        if (map.social_twitter) { updates.push("twitter_url = ?"); vals.push(map.social_twitter); }
        if (map.social_linkedin) { updates.push("linkedin_url = ?"); vals.push(map.social_linkedin); }
        if (map.social_instagram) { updates.push("instagram_url = ?"); vals.push(map.social_instagram); }
        if (updates.length > 0) {
          await connection.execute(`UPDATE site_settings SET ${updates.join(", ")} WHERE id = 1`, vals);
          console.log("✅ Migrated legacy settings → site_settings");
        }
      }
    } catch (err) {
      console.log("ℹ️  Legacy settings migration skipped:", err.message);
    }

    // Check if admin exists
    const [existingAdmin] = await connection.execute(
      "SELECT id FROM admins WHERE email = ?",
      [config.admin.email],
    );

    if (existingAdmin.length === 0) {
      // Create default admin
      const hashedPassword = await bcrypt.hash(config.admin.password, 12);
      await connection.execute(
        "INSERT INTO admins (email, password, name) VALUES (?, ?, ?)",
        [config.admin.email, hashedPassword, "Super Admin"],
      );
      console.log(`✅ Default admin created: ${config.admin.email}`);
    } else {
      console.log("ℹ️ Admin already exists, skipping creation");
    }



    // Insert default settings
    const defaultSettings = [
      {
        key: "company_name",
        value: "Cosmo Projects & Construction",
        type: "string",
      },
      { key: "company_phone", value: "+974 4432-2743", type: "string" },
      { key: "company_email", value: "Info@ctgroups.net", type: "string" },
      {
        key: "company_address",
        value:
          "Mirqab Mall, Area No. 39, Street No.840, Building No.53, Block D - Office No. 307-308, Doha, Qatar",
        type: "string",
      },
      { key: "projects_completed", value: "57", type: "number" },
      { key: "years_experience", value: "10", type: "number" },
      { key: "satisfied_clients", value: "45", type: "number" },
    ];

    for (const setting of defaultSettings) {
      try {
        await connection.execute(
          "INSERT IGNORE INTO settings (setting_key, setting_value, setting_type) VALUES (?, ?, ?)",
          [setting.key, setting.value, setting.type],
        );
      } catch (err) {
        // Ignore duplicate key errors
      }
    }
    console.log("✅ Default settings created/verified");

    console.log("\n🎉 Database initialization completed successfully!\n");
    console.log("📧 Admin Email:", config.admin.email);
    console.log("🔐 Admin Password:", config.admin.password);
    console.log(
      "\n⚠️  IMPORTANT: Change the admin password after first login!\n",
    );
  } catch (error) {
    console.error("❌ Database initialization failed:", error.message);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
};

// Run if called directly
if (require.main === module) {
  initDatabase().then(() => process.exit(0));
}

module.exports = initDatabase;
