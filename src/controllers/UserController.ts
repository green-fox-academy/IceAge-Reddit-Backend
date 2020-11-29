import { BodyParams, Controller, Post } from '@tsed/common';

import { UserCreation } from '../models/UserCreation';
import { UserLogin } from '../models/UserLogin';
import { UserService } from '../services/UserService';

@Controller("/auth")
export class UserController {

	constructor(private userService: UserService){}

  @Post("/sign-in")
	createUser(@BodyParams() user: UserCreation) {
    return this.userService.create(user);
	}
	
	@Post("/log-in")
  logInUser(@BodyParams() user: UserLogin) {
    return this.userService.logIn(user);
  }
}
