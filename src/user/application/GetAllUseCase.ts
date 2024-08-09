import { User } from "../domain/User";
import { UserRepository } from "../domain/UserRepository";


export class GetAllUserUseCase {
    constructor(private userRepository: UserRepository){}

    async execute() : Promise<User []| null> {
        const allUser = await this.userRepository.getAll();

        return allUser;
    }

}