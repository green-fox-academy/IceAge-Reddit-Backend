import { BodyParams, Controller, Get, Post, UseBefore } from "@tsed/common";
import { Subreddits } from "../entities/Subreddits";
import { AuthMiddleware } from "../middlewares/AuthMiddleware";
import { SubredditsCreation } from "../models/auth.types";
import { SubredditsService } from "../services/SubredditsService";

@Controller('/')
export class SubredditsController {
	constructor(private subredditsService: SubredditsService) {}

	@Get('/subreddits')
	@UseBefore(AuthMiddleware)
	getSubredditsFeed(): Promise<Subreddits[]> {
		return this.subredditsService.findAll();
	}
	
	@Post('/subreddits/create')
	@UseBefore(AuthMiddleware)
	public async createSubreddit(
		@BodyParams() 
		subreddits: SubredditsCreation
	): Promise<SubredditsCreation> {
		return await this.subredditsService.create(subreddits);
	}
}
