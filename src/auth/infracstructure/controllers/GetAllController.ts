import { Request, Response } from "express";
import { GetAllUsersUseCase } from "../../application/GetAllUseCase";

export class GetAllUserController {
    private getAllUsersUseCase: GetAllUsersUseCase;

    constructor(getAllUsersUseCase: GetAllUsersUseCase) {
        this.getAllUsersUseCase = getAllUsersUseCase;
    }

    async run(req: Request, res: Response): Promise<void> {
        try {
            const users = await this.getAllUsersUseCase.execute();
            
            const response = users.map(user => ({
                id: user.id,
                name: user.names,
                lastname: user.lastnames,
                email: user.email,
                password: user.password,
                numberTelefonic: user.numberTelefonic,
                address: user.address,
                date_of_briath: user.date_of_briath
            }));

            res.status(200).json({
                message: "Users retrieved successfully",
                success: true,
                data: response
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
