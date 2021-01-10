import { Controller, Get } from "@tsed/common";
import { Subreddits } from "../entities/Subreddits";
import { SubredditsService } from "../services/SubredditsService";

@Controller('/')
export class UserController {
	constructor(private subredditsService: SubredditsService) {}

	@Get('/subreddits')
	// @UseBefore(AuthMiddleware)
	getSubredditsFeed(): Promise<Subreddits[]> {
		return this.subredditsService.findAll();
	}
}