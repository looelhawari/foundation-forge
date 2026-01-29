const mysql = require('mysql2/promise');

async function populateCategories() {
    console.log('🔄 Connecting to database...');

    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'cpc_qatar',
        multipleStatements: true
    });

    console.log('✅ Connected!');
    console.log('🔄 Creating categories table...');

    // Create table
    await connection.query(`
        CREATE TABLE IF NOT EXISTS categories (
          id INT PRIMARY KEY AUTO_INCREMENT,
          slug VARCHAR(100) UNIQUE NOT NULL,
          name VARCHAR(100) NOT NULL,
          description TEXT,
          icon VARCHAR(50),
          display_order INT DEFAULT 0,
          is_active BOOLEAN DEFAULT TRUE,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
    `);

    console.log('✅ Table ready!');
    console.log('🔄 Checking and adding missing columns...');

    // Check existing columns
    const [columns] = await connection.query('DESCRIBE categories');
    const columnNames = columns.map(c => c.Field);

    console.log('Existing columns:', columnNames.join(', '));

    // Add icon column if missing
    if (!columnNames.includes('icon')) {
        console.log('Adding icon column...');
        await connection.query('ALTER TABLE categories ADD COLUMN icon VARCHAR(50) AFTER description');
    }

    console.log('✅ Schema updated!');
    console.log('🔄 Clearing existing categories...');

    await connection.query('DELETE FROM categories');

    console.log('✅ Cleared!');
    console.log('🔄 Inserting 5 categories...');

    // Insert categories
    await connection.query(`
        INSERT INTO categories (slug, name, description, icon, display_order, is_active) VALUES
        ('school', 'School', 'Educational Facilities & Schools', '🎓', 1, TRUE),
        ('mosque', 'Mosque', 'Religious Buildings & Mosques', '🕌', 2, TRUE),
        ('commercial-building', 'Commercial Building', 'Commercial & Residential Buildings', '🏢', 3, TRUE),
        ('stores-and-factory', 'Stores and Factory', 'Warehouses, Factories & Storage Facilities', '🏭', 4, TRUE),
        ('public-project', 'Public Project', 'Roads, Parking & Public Infrastructure', '🏗️', 5, TRUE)
    `);

    console.log('✅ Categories inserted!');
    console.log('\n📊 Verifying categories with project counts...\n');

    // Verify with project counts
    const [rows] = await connection.query(`
        SELECT c.*, COUNT(p.id) as project_count
        FROM categories c
        LEFT JOIN projects p ON p.category = c.name AND p.status != 'archived'
        WHERE c.is_active = TRUE
        GROUP BY c.id
        ORDER BY c.display_order ASC
    `);

    console.table(rows);

    await connection.end();
    console.log('\n✅ Done! Categories populated successfully!');
}

populateCategories().catch(error => {
    console.error('❌ Error:', error.message);
    process.exit(1);
});
