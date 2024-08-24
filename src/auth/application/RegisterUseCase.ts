import { User } from "../domain/User";
import { UserRepository } from "../domain/UserRepository";
import bcrypt from "bcrypt";

export class RegisterUserUseCase {
    constructor(private userRepository: UserRepository) {}

    async execute(user: User): Promise<User | null> {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        const userWithHashedPassword = { ...user, password: hashedPassword };

        const registeredUser = await this.userRepository.register(userWithHashedPassword);

        return registeredUser;
    }
}
