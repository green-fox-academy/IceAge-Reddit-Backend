import { BodyParams, Controller, Post } from "@tsed/common";
import { UserCreation } from '../models/UserCreation';
import { UserService } from '../services/UserService';

@Controller("/auth")
export class HelloWorldController {

	constructor(private userService: UserService){}

  @Post("/sign-in")
  create(@BodyParams() user: UserCreation) {
    return this.userService.create(user);
  }
}
