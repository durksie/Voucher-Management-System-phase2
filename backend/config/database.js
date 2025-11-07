const mysql = require("mysql2/promise")

const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "#Nyiko1@",
  database: process.env.DB_NAME || "voucher_db",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
})

async function initializeDatabase() {
  const connection = await pool.getConnection()

  try {
    // Create vouchers table if it doesn't exist
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS vouchers (
        id INT AUTO_INCREMENT PRIMARY KEY,
        code VARCHAR(255) UNIQUE NOT NULL,
        discount_amount DECIMAL(10, 2) NOT NULL,
        category VARCHAR(50) DEFAULT 'general',
        max_uses INT DEFAULT 1,
        used_count INT DEFAULT 0,
        is_redeemed BOOLEAN DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        redeemed_at TIMESTAMP NULL
      )
    `)
    console.log("Connected to MySQL database - Vouchers table ready")
  } catch (error) {
    console.error("Error initializing database:", error)
    throw error
  } finally {
    connection.release()
  }
}

// Initialize database on startup
initializeDatabase().catch(console.error)

module.exports = pool
