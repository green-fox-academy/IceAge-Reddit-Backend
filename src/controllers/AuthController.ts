import { BodyParams, Controller, Post } from '@tsed/common';
import { ContentType, Returns } from '@tsed/schema';

import { JWToken, UserCreation, UserLogin } from '../models/auth.types';
import { UserService } from '../services/UserService';

@Controller('/auth')
@ContentType("application/json")
@Returns(200, Object)
export class UserController {
	constructor(private userService: UserService) {}

	@Post('/sign-in')
	public async createUser(@BodyParams() user: UserCreation): Promise<JWToken> {
		return await this.userService.create(user);
	}

	@Post('/log-in')
	public async logInUser(@BodyParams() user: UserLogin): Promise<JWToken> {
		return await this.userService.logIn(user);
	}
}