import { GetAllUsersUseCase } from "../application/GetAllUseCase";
import { GetUserByIdUseCase } from "../application/GetByIdUseCase";
import { UpdateUserUseCase } from "../application/UpdateUseCase";
import { DeleteUserUseCase } from "../application/DeleteUseCase";
import { RegisterUserUseCase } from "../application/RegisterUseCase";
import { LoginUserUseCase } from "../application/LoginUseCase";
import { GetAllUserController } from "./controllers/GetAllController";
import { GetUserByIdController } from "./controllers/GetByIdController";
import { UpdateUserController } from "./controllers/UpdateController";
import { DeleteUserController } from "./controllers/DeleteController";
import { RegisterUserController } from "./controllers/RegisterController";
import { LoginUserController } from "./controllers/LoginController";
import { MySQLUserRepository } from "./adapters/mysql/MySQLUserRepository";
import { MongoUserRepository } from "./adapters/mongo/MongoDBUserRepository";
import dotenv from 'dotenv';

dotenv.config();

let userRepository;

switch (process.env.DB_TYPE) {
    case 'mysql':
        userRepository = new MySQLUserRepository();
        break;
    case 'mongo':
        userRepository = new MongoUserRepository();
        break;
    default:
        throw new Error('Invalid DB_TYPE specified. Use "mysql" or "mongo".');
}

const getAllUsersUseCase = new GetAllUsersUseCase(userRepository);
const getUserByIdUseCase = new GetUserByIdUseCase(userRepository);
const updateUserUseCase = new UpdateUserUseCase(userRepository);
const deleteUserUseCase = new DeleteUserUseCase(userRepository);
const registerUserUseCase = new RegisterUserUseCase(userRepository);
const loginUserUseCase = new LoginUserUseCase(userRepository);

export const getAllUserController = new GetAllUserController(getAllUsersUseCase);
export const getUserByIdController = new GetUserByIdController(getUserByIdUseCase);
export const updateUserController = new UpdateUserController(updateUserUseCase);
export const deleteUserController = new DeleteUserController(deleteUserUseCase);
export const registerUserController = new RegisterUserController(registerUserUseCase);
export const loginUserController = new LoginUserController(loginUserUseCase);


