const pool = require("../config/db");

async function createTable() {
  const query = `
    CREATE TABLE IF NOT EXISTS github_profiles (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(255) UNIQUE,
      name VARCHAR(255),
      followers INT DEFAULT 0,
      following INT DEFAULT 0,
      public_repos INT DEFAULT 0,
      public_gists INT DEFAULT 0,
      company VARCHAR(255),
      location VARCHAR(255),
      bio TEXT,
      profile_url VARCHAR(500),
      avatar_url VARCHAR(500),
      created_at VARCHAR(100),
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  try {
    const conn = await pool.getConnection();
    await conn.query(query);
    conn.release();

    console.log("Table created / already exists");
  } catch (err) {
    console.log("Table creation failed:", err.message);
  }
}


async function getAllProfiles() {
  const conn = await pool.getConnection();

  const [rows] = await conn.query(
    "SELECT * FROM github_profiles ORDER BY updated_at DESC"
  );

  conn.release();
  return rows;
}

async function getProfileByUsername(username) {
  const conn = await pool.getConnection();

  const [rows] = await conn.query(
    "SELECT * FROM github_profiles WHERE username = ?",
    [username]
  );

  conn.release();
  return rows[0];
}

module.exports = {
  createTable,
  getAllProfiles,
  getProfileByUsername,
};

