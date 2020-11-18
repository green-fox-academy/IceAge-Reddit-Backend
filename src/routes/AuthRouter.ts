import { Request, Response, Router } from 'express';
import StatusCodes from 'http-status-codes';

const router = Router();
const { OK } = StatusCodes;

/******************************************************************************
 *                      User sign in - "Post /api/v1/auth/sign-in"            *
 ******************************************************************************/

// TODO Implement logic and create template(class) for errors
router.post('/sign-in', async (req: Request, res: Response) => {
		if (Object.keys(req.body).length !== 0) {
			const { username, email, password } = req.body;

			if (!username || !email || !password) {
				return res.status(400).json({ "error": "missing parameter" });
			}

			return res.status(OK).json({ "token": "yet to be implemented" });
		}
		
		return res.status(400).json({ "error": "empty request" });
});

export default router;