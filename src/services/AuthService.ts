import { Service } from '@tsed/common';
import * as jwt from 'jsonwebtoken';

import { JWToken } from '../models/auth.types';

interface Email {
	email: string;
}

@Service()
export class AuthService {

	private static TOKEN_EXPIRATION = '24h';

	public getToken(email: string): JWToken {
		const token: JWToken = {
			token: jwt.sign(
				{ email: email },
				process.env.TOKEN_SECRET as string,
				{ expiresIn: AuthService.TOKEN_EXPIRATION }
			)
		}
		return token;
	}

	public verifyAndProlongToken(token: string): string {
		const payload: Email = jwt.verify(token, process.env.TOKEN_SECRET as string) as Email;
		return this.getToken(payload.email).token;
	}
}