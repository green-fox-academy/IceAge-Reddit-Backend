import { BodyParams, Controller, Post } from '@tsed/common';

import { UserCreation, UserLogin } from '../models/auth.types';
import { UserService } from '../services/UserService';

@Controller('/auth')
export class UserController {
	constructor(private userService: UserService) {}

	@Post('/sign-in')
	createUser(@BodyParams() user: UserCreation): Promise<void> {
		return this.userService.create(user);
	}

	@Post('/log-in')
	logInUser(@BodyParams() user: UserLogin): Promise<void> {
		return this.userService.logIn(user);
	}
}
