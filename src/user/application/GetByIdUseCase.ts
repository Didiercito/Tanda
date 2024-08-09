import { User } from "../domain/User";
import { UserRepository } from "../domain/UserRepository";


export class GetByIdUserUseCase {
    constructor(private userRepository : UserRepository){}


    async execute(id: any) : Promise<User | null> {
        const userId = await this.userRepository.getById(id);
        
        return userId;
    }
}   