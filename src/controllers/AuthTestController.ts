import { Controller, Post, UseBefore } from '@tsed/common';
import { VerifyTokenMiddleware } from '../middlewares/VerifyTokenMiddleware';

@Controller('/token')
@UseBefore(VerifyTokenMiddleware)
export class AuthTestController {

	@Post('/test')
	public sendRegards(): string {
		return 'Ohhh, it seems that you had a valid token. Interesting!';
	}
}