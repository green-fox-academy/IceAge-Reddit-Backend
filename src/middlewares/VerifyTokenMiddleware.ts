import { IMiddleware, Middleware, Req } from '@tsed/common';
import { Unauthorized } from '@tsed/exceptions';
import { AuthService } from '../services/AuthService';

@Middleware()
export class VerifyTokenMiddleware implements IMiddleware{

	constructor(
		private authService: AuthService
	) {}

	use(@Req() request: Req): void {
		const token = request.header('Authorization');
		if (!token) throw new Unauthorized('Access Denied!');

		try {
			this.authService.verifyToken(token.split(' ')[1]);
		} catch (err) {
			throw new Unauthorized('Invalid token');
		}
	}
}