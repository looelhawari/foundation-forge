# Run this script to populate the categories table in the database

Write-Host "Populating categories table..." -ForegroundColor Green

# Check if mysql client is available, otherwise use Node.js
$mysqlPath = Get-Command mysql -ErrorAction SilentlyContinue

if ($mysqlPath) {
    # Use MySQL client
    Write-Host "Using MySQL client..." -ForegroundColor Yellow
    mysql -u root cpc_qatar < "D:\civil website\insert_categories.sql"
} else {
    # Use Node.js to execute the SQL
    Write-Host "MySQL client not found. Using Node.js..." -ForegroundColor Yellow
    
    $sqlScript = Get-Content "D:\civil website\insert_categories.sql" -Raw
    
    node -e "
    const mysql = require('mysql2/promise');
    
    async function populateCategories() {
        try {
            const connection = await mysql.createConnection({
                host: 'localhost',
                user: 'root',
                password: '',
                database: 'cpc_qatar',
                multipleStatements: true
            });
            
            await connection.query(\`$sqlScript\`);
            console.log('✅ Categories populated successfully!');
            
            // Show the results
            const [rows] = await connection.query('SELECT * FROM categories ORDER BY display_order');
            console.table(rows);
            
            await connection.end();
        } catch (error) {
            console.error('❌ Error:', error.message);
            process.exit(1);
        }
    }
    
    populateCategories();
    "
}

Write-Host "Done!" -ForegroundColor Green
