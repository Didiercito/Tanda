import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { userRouter } from './user/infractructure/routes/userRoutes';
dotenv.config();


const app = express();
const PORT = process.env.PORT;


app.use(express.json());
app.use(cors({origin: '*'}));

app.use('/api/v1/users',userRouter);


app.listen(PORT, () =>{
    console.log(`Server running on port http://localhost:${PORT}`);
}) 