import { User } from "../domain/User";
import { UserRepository } from "../domain/UserRepository";

export class UpdateUserUseCase {
    constructor(private userRepository: UserRepository) {}

    async execute(id: string, user: Partial<User>): Promise<User | null> {
        return await this.userRepository.update(id, user);
    }
}
