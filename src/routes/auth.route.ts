import { Router, Request, Response } from 'express';

import { injector } from '../providers';
import { UserController } from 'src/controllers/UserController';

const router = Router();
const userController: UserController = injector.get(UserController);

router.post('/sign-in', async (req: Request, res: Response) => {
		return await userController.signUser(req, res);
	}
);

export default router;