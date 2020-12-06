import { Service } from '@tsed/common';
import * as jwt from 'jsonwebtoken';

import { JWToken } from '../models/auth.types';

@Service()
export class AuthService {
	public getToken(username: string): JWToken {
		const token: JWToken = {
			token: jwt.sign(username, process.env.TOKEN_SECRET as string)
		}
		return token;
	}
}