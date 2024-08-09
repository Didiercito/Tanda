import { User } from "./User";


export interface UserRepository {
    getAll(): Promise<User[]>;
    getById(id: any):Promise<User | null>;
}