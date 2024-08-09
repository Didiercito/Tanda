import { Router } from "express";
import { getAllController,getByIdController } from "../dependencies";

export const userRouter = Router();


userRouter.get('/all', getAllController.run.bind(getAllController));

userRouter.get('/:id', getByIdController.run.bind(getByIdController));

