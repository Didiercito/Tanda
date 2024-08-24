import { Request, Response } from "express";
import { RegisterUserUseCase } from "../../application/RegisterUseCase";
import { User } from "../../domain/User";

export class RegisterUserController {
    private registerUserUseCase: RegisterUserUseCase;

    constructor(registerUserUseCase: RegisterUserUseCase) {
        this.registerUserUseCase = registerUserUseCase;
    }

    async run(req: Request, res: Response): Promise<void> {
        try {
            const { names, lastnames, email, password, numberTelefonic, address, date_of_briath } = req.body;

            const userData = new User(
                '', 
                names,
                lastnames,
                email,
                password,
                numberTelefonic,
                address,
                date_of_briath
            );

            const user = await this.registerUserUseCase.execute(userData);

            res.status(201).json({
                message: "User registered successfully",
                success: true,
                data: user,
            });
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
            res.status(500).json({
                message: errorMessage,
                success: false,
            });
        }
    }
}
