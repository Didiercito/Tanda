import { Request, Response } from "express";
import { UpdateUserUseCase } from "../../application/UpdateUseCase";

export class UpdateUserController {
    private updateUserUseCase: UpdateUserUseCase;

    constructor(updateUserUseCase: UpdateUserUseCase) {
        this.updateUserUseCase = updateUserUseCase;
    }

    async run(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const userData = req.body;
            const updatedUser = await this.updateUserUseCase.execute(id, userData);

            if (updatedUser) {
                res.status(200).json({
                    message: "User updated successfully",
                    success: true,
                    data: updatedUser,
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
