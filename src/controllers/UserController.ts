import { Request, Response } from 'express';
import { Injectable } from 'injection-js';

import { UserService } from 'src/services/UserService';

@Injectable()
export class UserController {

	constructor(private userService: UserService) {}

	// POST /api/v1/auth/sign-in"
	public async signUser(req: Request, res: Response): Promise<Response> {
		return await this.userService.tryToSign(req.body, req.headers, res);
	}
}