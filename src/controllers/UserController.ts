import { Controller, Get, PathParams, UseBefore } from "@tsed/common";
import { AuthMiddleware } from "../middlewares/AuthMiddleware";
import { SimpleUser, UserDTO } from "../models/user.types";
import { UserService } from "../services/UserService";

@Controller('/users')
@UseBefore(AuthMiddleware)
export class UserController {
	constructor(
        private userService: UserService,
    ) {}
	
	@Get('/')
	public async getAllUsers(): Promise<SimpleUser[]> {
		return await this.userService.getAllUsers();
	}
	
	@Get('/:id')
	findOne(
        @PathParams("id") id: number
    ): Promise<UserDTO> {
		return this.userService.getOneUser(id);
    }

}
