-- Insert the 5 categories that match the project data
-- First, create the categories table if it doesn't exist
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
);

-- Clear existing categories
TRUNCATE TABLE categories;

-- Insert the 5 categories from the database
INSERT INTO categories (slug, name, description, icon, display_order, is_active) VALUES
('school', 'School', 'Educational Facilities & Schools', '🎓', 1, TRUE),
('mosque', 'Mosque', 'Religious Buildings & Mosques', '🕌', 2, TRUE),
('commercial-building', 'Commercial Building', 'Commercial & Residential Buildings', '🏢', 3, TRUE),
('stores-and-factory', 'Stores and Factory', 'Warehouses, Factories & Storage Facilities', '🏭', 4, TRUE),
('public-project', 'Public Project', 'Roads, Parking & Public Infrastructure', '🏗️', 5, TRUE);

-- Verify the insert
SELECT * FROM categories ORDER BY display_order;
