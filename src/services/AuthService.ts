import { Service } from '@tsed/common';
import * as jwt from 'jsonwebtoken';

import { JWToken, Username } from '../models/auth.types';

@Service()
export class AuthService {

	private static TOKEN_EXPIRATION = '24h';

	public getToken(username: string): JWToken {
		const token: JWToken = {
			token: jwt.sign(
				{ username: username },
				process.env.TOKEN_SECRET as string,
				{ expiresIn: AuthService.TOKEN_EXPIRATION }
			)
		}
		return token;
	}

	public verifyAndProlongToken(token: string): string {
		const payload: Username = jwt.verify(token, process.env.TOKEN_SECRET as string) as Username;
		return this.getToken(payload.username).token;
	}

	public getPayload(token: string): string {
		const payload: Username = jwt.decode(token) as Username;
		return payload.username;
	}
}