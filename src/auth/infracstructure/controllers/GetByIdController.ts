import { Request, Response } from "express";
import { GetUserByIdUseCase } from "../../application/GetByIdUseCase";

export class GetUserByIdController {
    private getUserByIdUseCase: GetUserByIdUseCase;

    constructor(getUserByIdUseCase: GetUserByIdUseCase) {
        this.getUserByIdUseCase = getUserByIdUseCase;
    }

    async run(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const user = await this.getUserByIdUseCase.execute(id);

            if (user) {
                res.status(200).json({
                    message: "User retrieved successfully",
                    success: true,
                    data: user,
                });
            } else {
                res.status(404).json({
                    message: "User not found",
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
