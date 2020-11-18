import { Request, Response, Router } from 'express';
import StatusCodes from 'http-status-codes';

const router = Router();
const { OK } = StatusCodes;

/******************************************************************************
 *                      User sign in - "Post /api/v1/auth/sign-in"            *
 ******************************************************************************/

router.post('/sign-in', async (req: Request, res: Response) => {
    // TODO implement user registration
		return res.status(OK).json({"test": "hello"});
});

export default router;