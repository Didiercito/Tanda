import { Request, Response } from 'express';
import { GetAllUserUseCase } from '../../application/GetAllUseCase';

export class GetAllUserController {
    constructor(private getAllUserUseCase: GetAllUserUseCase) {}

    async run(req: Request, res: Response): Promise<void> {
        try {
            const users = await this.getAllUserUseCase.execute();
            res.json(users);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error fetching users'});
        }
    }
}
