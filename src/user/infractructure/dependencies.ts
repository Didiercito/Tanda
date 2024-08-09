import { GetAllUserUseCase } from "../application/GetAllUseCase";
import { GetByIdUserUseCase } from "../application/GetByIdUseCase";
import { GetAllUserController } from "./controllers/GetAllController";
import { GetUserByIdController } from "./controllers/GetByIdController";
import { UserRepository } from "../domain/UserRepository";
import { MySQLUserRepository } from "./adapters/mysql/MySQLDBUserRepository";


const userRepository : UserRepository = new MySQLUserRepository();


export const getAllUserUseCase = new GetAllUserUseCase(userRepository);
export const getUserByIdUseCase = new GetByIdUserUseCase(userRepository);

export const getAllController = new GetAllUserController(getAllUserUseCase);
export const getByIdController = new GetUserByIdController(getUserByIdUseCase);