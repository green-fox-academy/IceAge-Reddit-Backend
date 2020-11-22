import { Router, Request, Response } from 'express';
import { UserController } from 'src/controllers/UserController';
import { injector } from '../providers';

const router = Router();
const userController: UserController = injector.get(UserController);

router.post('/sign-in', (req: Request, res: Response) => {
		return userController.signUser(req, res);
	}
);

export default router;