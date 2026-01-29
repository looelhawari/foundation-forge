const mysql = require("mysql2/promise");
require("dotenv").config();

async function migrate() {
  const conn = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  console.log("🔄 Running migrations...\n");

  // Create clients table
  await conn.query(`
    CREATE TABLE IF NOT EXISTS clients (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      logo VARCHAR(500),
      category ENUM('government', 'corporate', 'industrial', 'real_estate', 'retail', 'other') DEFAULT 'other',
      description TEXT,
      projects_count INT DEFAULT 0,
      total_value VARCHAR(100),
      website VARCHAR(255),
      is_featured BOOLEAN DEFAULT false,
      display_order INT DEFAULT 0,
      is_active BOOLEAN DEFAULT true,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `);
  console.log("✅ clients table created");

  // Create testimonials table
  await conn.query(`
    CREATE TABLE IF NOT EXISTS testimonials (
      id INT AUTO_INCREMENT PRIMARY KEY,
      client_name VARCHAR(255) NOT NULL,
      company_name VARCHAR(255),
      company_logo VARCHAR(500),
      position VARCHAR(255),
      content TEXT NOT NULL,
      rating INT DEFAULT 5,
      status ENUM('pending', 'approved', 'declined') DEFAULT 'pending',
      is_featured BOOLEAN DEFAULT false,
      email VARCHAR(255),
      phone VARCHAR(50),
      submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      reviewed_at TIMESTAMP NULL,
      reviewed_by INT NULL,
      expires_at TIMESTAMP NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (reviewed_by) REFERENCES admins(id) ON DELETE SET NULL
    )
  `);
  console.log("✅ testimonials table created");

  // Insert sample clients based on existing data from the Clients page
  const existingClients = [
    {
      name: "Ministry of Education",
      category: "government",
      projects_count: 5,
      total_value: "4.7M QR",
      is_featured: true,
    },
    {
      name: "Ministry of Waqif",
      category: "government",
      projects_count: 4,
      total_value: "574K QR",
      is_featured: true,
    },
    {
      name: "Qatar Museums",
      category: "government",
      projects_count: 4,
      total_value: "1.2M QR",
      is_featured: true,
    },
    {
      name: "Ministry of Ashghal",
      category: "government",
      projects_count: 3,
      total_value: "800K QR",
      is_featured: true,
    },
    {
      name: "Ministry of Health",
      category: "government",
      projects_count: 1,
      total_value: "154K QR",
      is_featured: false,
    },
    {
      name: "FIFA World Cup Qatar 2022",
      category: "corporate",
      projects_count: 1,
      total_value: "736K QR",
      is_featured: true,
    },
    {
      name: "DHL Qatar",
      category: "corporate",
      projects_count: 1,
      total_value: "600K QR",
      is_featured: true,
    },
    {
      name: "Al Meera",
      category: "retail",
      projects_count: 1,
      total_value: "780K QR",
      is_featured: true,
    },
    {
      name: "IMALCO",
      category: "industrial",
      projects_count: 1,
      total_value: "160K QR",
      is_featured: false,
    },
    {
      name: "Save Storage WLL",
      category: "industrial",
      projects_count: 1,
      total_value: "200K QR",
      is_featured: false,
    },
    {
      name: "QNIE",
      category: "industrial",
      projects_count: 1,
      total_value: "350K QR",
      is_featured: false,
    },
    {
      name: "Ariane Real Estate",
      category: "real_estate",
      projects_count: 2,
      total_value: "1.5M QR",
      is_featured: true,
    },
    {
      name: "FBA Real Estate",
      category: "real_estate",
      projects_count: 1,
      total_value: "600K QR",
      is_featured: false,
    },
  ];

  // Check if clients already exist
  const [existingRows] = await conn.query(
    "SELECT COUNT(*) as count FROM clients",
  );
  if (existingRows[0].count === 0) {
    for (let i = 0; i < existingClients.length; i++) {
      const client = existingClients[i];
      await conn.query(
        `INSERT INTO clients (name, category, projects_count, total_value, is_featured, display_order, is_active) VALUES (?, ?, ?, ?, ?, ?, true)`,
        [
          client.name,
          client.category,
          client.projects_count,
          client.total_value,
          client.is_featured,
          i + 1,
        ],
      );
    }
    console.log("✅ Sample clients inserted");
  } else {
    console.log("ℹ️ Clients already exist, skipping sample data");
  }

  // Insert a sample approved testimonial
  const [existingTestimonials] = await conn.query(
    "SELECT COUNT(*) as count FROM testimonials",
  );
  if (existingTestimonials[0].count === 0) {
    await conn.query(`
      INSERT INTO testimonials (client_name, company_name, position, content, rating, status, is_featured, email)
      VALUES 
        ('Ahmed Al-Thani', 'Ministry of Education', 'Project Manager', 'CPC Qatar delivered exceptional quality on our school construction projects. Their attention to detail and commitment to deadlines made them a valuable partner.', 5, 'approved', true, 'ahmed@example.com'),
        ('Sara Hassan', 'Al Meera Consumer Goods', 'Facilities Director', 'Outstanding road work and parking lot construction. The team was professional and completed the project ahead of schedule.', 5, 'approved', true, 'sara@example.com'),
        ('Mohammed Al-Khalifa', 'Qatar Museums', 'Chief Engineer', 'Excellent craftsmanship and attention to heritage requirements. CPC understood our unique needs perfectly.', 5, 'approved', false, 'mohammed@example.com')
    `);
    console.log("✅ Sample testimonials inserted");
  } else {
    console.log("ℹ️ Testimonials already exist, skipping sample data");
  }

  await conn.end();
  console.log("\n✅ Database migration complete!");
}

migrate().catch(console.error);
