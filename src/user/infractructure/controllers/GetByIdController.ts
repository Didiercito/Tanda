import { Request, Response } from 'express';
import { GetByIdUserUseCase } from '../../application/GetByIdUseCase';

export class GetUserByIdController {
    constructor(private getUserByIdUseCase: GetByIdUserUseCase) {}

    async run(req: Request, res: Response): Promise<void> {
        const id = req.params.id;
        try {
            const user = await this.getUserByIdUseCase.execute(id);
            if (user) {
                res.json(user);
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error fetching user'});
        }
    }
}
