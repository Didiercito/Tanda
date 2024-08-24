import { Router } from "express";
import { getAllUserController, getUserByIdController, updateUserController, deleteUserController, registerUserController, loginUserController } from "../dependencies";

export const userRouter = Router();


userRouter.get('/all', getAllUserController.run.bind(getAllUserController));

userRouter.get('/:id', getUserByIdController.run.bind(getUserByIdController));

userRouter.put('/update/:id', updateUserController.run.bind(updateUserController));

userRouter.delete('/delete/:id', deleteUserController.run.bind(deleteUserController));

userRouter.post('/register', registerUserController.run.bind(registerUserController));

userRouter.post('/login', loginUserController.run.bind(loginUserController));

