import { UserRepository } from "../domain/UserRepository";

export class DeleteUserUseCase {
    constructor(private userRepository: UserRepository) {}

    async execute(id: string): Promise<boolean> {
        return await this.userRepository.delete(id);
    }
}