import { Request, Response } from "express";
import { LoginUserUseCase } from "../../application/LoginUseCase";

export class LoginUserController {
    private loginUserUseCase: LoginUserUseCase;

    constructor(loginUserUseCase: LoginUserUseCase) {
        this.loginUserUseCase = loginUserUseCase;
    }

    async run(req: Request, res: Response): Promise<void> {
        try {
            const { email, password } = req.body;
            const user = await this.loginUserUseCase.execute(email, password);

            if (user) {
                res.status(200).json({
                    message: "Login successful",
                    success: true,
                    data: user,
                });
            } else {
                res.status(401).json({
                    message: "Invalid email or password",
                    success: false,
                });
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
            res.status(500).json({
                message: errorMessage,
                success: false,
            });
        }
    }
}
