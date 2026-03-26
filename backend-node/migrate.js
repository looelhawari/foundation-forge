/**
 * Database Migration Runner
 * Runs all SQL migration files in the migrations directory
 */
const fs = require("fs");
const path = require("path");
const { pool } = require("./src/config/database");

const runMigrations = async () => {
  try {
    console.log("🔄 Starting database migrations...\n");

    const migrationsDir = path.join(__dirname, "./migrations");

    // Check if migrations directory exists
    if (!fs.existsSync(migrationsDir)) {
      fs.mkdirSync(migrationsDir, { recursive: true });
      console.log("📁 Created migrations directory");
    }

    // Read all SQL files
    const files = fs.readdirSync(migrationsDir)
      .filter(file => file.endsWith('.sql'))
      .sort();

    if (files.length === 0) {
      console.log("ℹ️ No migrations to run");
      process.exit(0);
    }

    // Run each migration
    for (const file of files) {
      const filePath = path.join(migrationsDir, file);
      const sql = fs.readFileSync(filePath, 'utf8');

      console.log(`⏳ Running migration: ${file}`);

      try {
        await pool.execute(sql);
        console.log(`✅ Completed: ${file}\n`);
      } catch (error) {
        console.error(`❌ Error in ${file}:`);
        console.error(error.message);
        console.log();
      }
    }

    console.log("✅ All migrations completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Migration failed:", error.message);
    process.exit(1);
  }
};

runMigrations();
