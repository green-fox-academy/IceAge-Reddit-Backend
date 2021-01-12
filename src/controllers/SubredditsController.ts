import { Controller, Get } from "@tsed/common";
import { Subreddits } from "../entities/Subreddits";
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