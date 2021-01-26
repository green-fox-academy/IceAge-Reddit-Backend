import { BodyParams, Controller, Get, PathParams, Post, UseBefore } from "@tsed/common";
import { Posts } from "../entities/Posts";
import { Subreddits } from "../entities/Subreddits";
import { AuthMiddleware } from "../middlewares/AuthMiddleware";
import { SubredditsCreation } from "../models/auth.types";
import { PostsService } from "../services/PostsService";
import { SubredditsService } from "../services/SubredditsService";

@Controller('/subreddits')
@UseBefore(AuthMiddleware)
export class SubredditsController {
	constructor(
        private subredditsService: SubredditsService,
        private postsService: PostsService
    ) {}

	@Get('/')
	getSubredditsFeed(): Promise<Subreddits[]> {
		return this.subredditsService.findAll();
	}
	
	@Post('/create')
	public async createSubreddit(
		@BodyParams() 
		subreddits: SubredditsCreation
	): Promise<SubredditsCreation> {
		return await this.subredditsService.create(subreddits);
    }
    
    @Get('/posts/:id')
    public async getSpecificPost(
        @PathParams('id') id: number
    ): Promise<Posts> {
        return await this.postsService.findById(id);
    }
}
