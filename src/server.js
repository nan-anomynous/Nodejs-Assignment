require("dotenv").config();
const app = require("./app");
const pool = require("./config/Db");
const { createTable } = require("./models/profileModel");

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    const conn = await pool.getConnection();
    console.log("Database Connected");
    conn.release();

    await createTable();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (err) {
    console.log("Server Error:", err.message);
  }
}

startServer();