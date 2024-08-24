import dotenv from 'dotenv';
import { dbMongoConnect } from './mongo/mongodb';
import { dbMySQL } from './mysql/mysqlDB';

dotenv.config();

const db_type = process.env.DB_TYPE;

export async function initializeDB() {
    if (db_type === 'mysql') {
        await dbMySQL();
        console.log('Connected to MySQL');
    } else if (db_type === 'mongodb') {
        await dbMongoConnect();
        console.log('Connected to MongoDB');

    } else {
        throw new Error('Unsupported database type. Please check your environment variable DB_TYPE.');
    }
}
