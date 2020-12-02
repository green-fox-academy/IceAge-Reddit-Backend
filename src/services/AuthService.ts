import { Service } from '@tsed/common';
import * as jwt from 'jsonwebtoken';

import { JWToken } from '../models/auth.types';

@Service()
export class AuthService {
	public getToken(email: string): JWToken {
		const token: JWToken = {
			token: jwt.sign(email, process.env.TOKEN_SECRET as string)
		}
		return token;
	}

	public verifyToken(token: string): void {
		jwt.verify(token, process.env.TOKEN_SECRET as string)
	}
}