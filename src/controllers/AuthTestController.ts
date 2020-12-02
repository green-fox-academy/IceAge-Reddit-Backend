import { Controller, Post, UseBefore } from '@tsed/common';
import { AuthMiddleware } from '../middlewares/AuthMiddleware';

@Controller('/token')
@UseBefore(AuthMiddleware)
export class AuthTestController {

	@Post('/test')
	public sendRegards(): string {
		return 'Ohhh, it seems that you had a valid token. Interesting!';
	}
}