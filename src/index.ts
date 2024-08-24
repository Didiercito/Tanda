import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { initializeDB } from './database/config';
import { userRouter } from './auth/infracstructure/routes/UserRoutes';

dotenv.config();

initializeDB();
const app = express();
const PORT = process.env.PORT;


app.use(express.json());
app.use(cors({origin: '*'}));

app.use('/api/v1/auth',userRouter);

app.listen(PORT, () =>{
    console.log(`Server running on port http://localhost:${PORT}`);
}) 