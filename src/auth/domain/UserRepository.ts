import { User } from "./User";

export interface UserRepository {
    getAll(): Promise<User[]>;
    getById(id: string): Promise<User | null>;
    update(id: string, user: Partial<User>): Promise<User | null>;
    delete(id: string): Promise<boolean>;
    register(user: User): Promise<User | null>;
    login(email: string, password: string): Promise<User | null>;
}
