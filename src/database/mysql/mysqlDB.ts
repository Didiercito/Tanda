import mysql2 from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const config = {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: Number (process.env.MYSQL_PORT),
    connectionLimit: 10
};

const pool = mysql2.createPool(config);

export async function dbMySQL() {
    try {
        const connection = await pool.getConnection();
        return connection;
    } catch (error) {
        console.error('MySQL Connection Error:', error);
        throw error;  
    }
}
