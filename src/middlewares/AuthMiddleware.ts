import { IMiddleware, Middleware, Req, Res } from '@tsed/common';
import { Unauthorized } from '@tsed/exceptions';
import { AuthService } from '../services/AuthService';

@Middleware()
export class AuthMiddleware implements IMiddleware{

	constructor(
		private authService: AuthService
	) {}

	use(@Req() request: Req, @Res() response: Res): void {
		const token = request.header('Authorization');
		if (!token) throw new Unauthorized('Access Denied!');

		try {
			const prolongedToken = this.authService.verifyAndProlongToken(token.split(' ')[1]);
			response.header('Prolonged-Token', prolongedToken);
			response.header('Access-Control-Expose-Headers', 'Prolonged-Token');
		} catch (err) {
			if (err.message == 'jwt expired') {
				throw new Unauthorized('Token expired!');
			}
			throw new Unauthorized('Invalid token!');
		}
	}
}