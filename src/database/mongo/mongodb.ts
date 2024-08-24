import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const URIMongo = process.env.URI_MONGO;

export async function dbMongoConnect() {
    try {
        await mongoose.connect(URIMongo as string, {
        });
    } catch (error) {
        console.error('MongoDB Connection Error:', error);
        throw error;
    }
}

export const dbMongo = mongoose.connection;
