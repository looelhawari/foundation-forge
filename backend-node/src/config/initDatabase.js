/**
 * Database Initialization Script
 * Run this once to set up the database schema
 * Usage: npm run db:init
 */

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
        category VARCHAR(100) NOT NULL,
        location VARCHAR(255),
        client VARCHAR(255),
        main_contractor VARCHAR(255),
        consultant VARCHAR(255),
        area VARCHAR(100),
        value VARCHAR(100),
        year VARCHAR(20),
        status ENUM('active', 'completed', 'in_progress', 'archived') DEFAULT 'completed',
        featured BOOLEAN DEFAULT FALSE,
        images JSON,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        created_by INT,
        INDEX idx_category (category),
        INDEX idx_status (status),
        INDEX idx_slug (slug),
        INDEX idx_featured (featured),
        FOREIGN KEY (created_by) REFERENCES admins(id) ON DELETE SET NULL
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log("✅ Projects table created/verified");

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

    // Create settings table
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

    // Insert default categories
    const defaultCategories = [
      { name: "Educational", slug: "educational", order: 1 },
      { name: "Religious", slug: "religious", order: 2 },
      { name: "Industrial", slug: "industrial", order: 3 },
      { name: "Residential", slug: "residential", order: 4 },
      { name: "Commercial & Retail", slug: "commercial-retail", order: 5 },
      { name: "Logistics & Warehouse", slug: "logistics-warehouse", order: 6 },
      { name: "Historical & Cultural", slug: "historical-cultural", order: 7 },
      {
        name: "Public Infrastructure",
        slug: "public-infrastructure",
        order: 8,
      },
    ];

    for (const cat of defaultCategories) {
      try {
        await connection.execute(
          "INSERT IGNORE INTO categories (name, slug, display_order) VALUES (?, ?, ?)",
          [cat.name, cat.slug, cat.order],
        );
      } catch (err) {
        // Ignore duplicate key errors
      }
    }
    console.log("✅ Default categories created/verified");

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
      { key: "years_experience", value: "8", type: "number" },
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
