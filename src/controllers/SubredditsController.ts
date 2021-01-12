import { Controller, Get, UseBefore } from "@tsed/common";
import { Subreddits } from "../entities/Subreddits";
import { AuthMiddleware } from "../middlewares/AuthMiddleware";
import { PostsService } from "../services/PostsService";
import { SubredditsService } from "../services/SubredditsService";

@Controller('/')
export class UserController {
	constructor(private subredditsService: SubredditsService, private postService: PostsService) {}

	@Get('/subreddits')
	@UseBefore(AuthMiddleware)
	getSubredditsFeed(): Promise<Subreddits[]> {
		return this.subredditsService.findAll();
    }
}