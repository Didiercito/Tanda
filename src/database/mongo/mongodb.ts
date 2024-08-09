import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const URIMongo = process.env.URI_MONGO;

mongoose.connect(URIMongo as string)
    .then(() =>{
        console.log('Connected MongoDB');
    })
    .catch((error) =>{
        console.log(error);
    })

export const dbMongo = mongoose.connection;
dbMongo.on('error', console.error.bind(console.error, 'Connection Error'));