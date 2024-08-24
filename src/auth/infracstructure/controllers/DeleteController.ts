import { Request, Response } from "express";
import { DeleteUserUseCase } from "../../application/DeleteUseCase";

export class DeleteUserController {
    private deleteUserUseCase: DeleteUserUseCase;

    constructor(deleteUserUseCase: DeleteUserUseCase) {
        this.deleteUserUseCase = deleteUserUseCase;
    }

    async run(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const success = await this.deleteUserUseCase.execute(id);

            if (success) {
                res.status(200).json({
                    message: "User deleted successfully",
                    success: true,
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
