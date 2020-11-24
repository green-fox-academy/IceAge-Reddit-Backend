import { Router, Request, Response } from 'express';
import { userController } from 'src';

const router = Router();

router.post('/sign-in', (req: Request, res: Response) => {
		return userController.signUser(req, res);
	}
);

export default router;