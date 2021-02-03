import { Controller, Get, UseBefore } from "@tsed/common";
import { Comment } from "../entities/Comment";
import { AuthMiddleware } from "../middlewares/AuthMiddleware";
import { UserService } from "../services/UserService";

@Controller('/users')
@UseBefore(AuthMiddleware)
export class UserController {
	constructor(
        private userService: UserService,
    ) {}
	
	@Get('/')
	public async getAllUsers(): Promise<Comment> {
		return await this.userService.create(newComment);
    }
}
