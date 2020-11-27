import { BodyParams, Controller, Post } from '@tsed/common';
import { User } from '../entities/User';
import { UserService } from '../services/UserService';

@Controller("/auth")
export class HelloWorldController {

	constructor(private userService: UserService){}

  @Post("/sign-in")
  create(@BodyParams() user: User) {
    return this.userService.create(user);
  }
}
