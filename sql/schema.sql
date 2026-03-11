CREATE TABLE IF NOT EXISTS attractions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  description TEXT,
  location VARCHAR(120),
  image_url VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS favorites (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  attraction_id INT NOT NULL,
  type ENUM('saved', 'favorite') NOT NULL DEFAULT 'favorite',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY unique_favorite (user_id, attraction_id, type),
  FOREIGN KEY (attraction_id) REFERENCES attractions(id) ON DELETE CASCADE
);