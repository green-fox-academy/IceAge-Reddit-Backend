import { BodyParams, Controller, Post } from '@tsed/common';
import { UserCreation } from '../models/UserCreation';
import { UserLogin } from '../models/UserLogin';
import { UserService } from '../services/UserService';

@Controller("/auth")
export class HelloWorldController {

	constructor(private userService: UserService){}

  @Post("/sign-in")
	create(@BodyParams() user: UserCreation) {
    return this.userService.create(user);
	}
	
	@Post("/log-in")
  logIn(@BodyParams() user: UserLogin) {
    return this.userService.log(user);
  }
}
