import mysql from "mysql2/promise";

let pool;

const connectDB = async () => {
  try {
    pool = mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });

    // Test the connection
    const connection = await pool.getConnection();
    console.log("Database Connected!");
    connection.release();
    
    return pool;
  } catch (err) {
    console.error("Database connection error:", err.message);
    throw err;
  }
};

const getPool = () => {
  if (!pool) {
    throw new Error("Database not connected. Call connectDB() first.");
  }
  return pool;
};

export { connectDB, getPool };