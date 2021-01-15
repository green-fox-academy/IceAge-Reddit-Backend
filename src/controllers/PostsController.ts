import { Controller, Get, PathParams, UseBefore } from '@tsed/common';
import { Posts } from '../entities/Posts';
import { Subreddits } from '../entities/Subreddits';
import { AuthMiddleware } from '../middlewares/AuthMiddleware';

import { PostsService } from '../services/PostsService';
import { SubredditsService } from '../services/SubredditsService';


@Controller('/')
export class UserController {
	constructor(private postsService: PostsService, private subredditsService: SubredditsService) {}

	@Get('/feed')
	@UseBefore(AuthMiddleware)
	getPostsFeed(): Promise<Posts[]> {
		return this.postsService.findAll();
	}

	@Get('/subreddits')
	@UseBefore(AuthMiddleware)
	getSubreddits(): Promise<Subreddits[]> {
		return this.subredditsService.findAll();
	}
	@Get("/feed/r/:name")
	@UseBefore(AuthMiddleware)
	findOne(
		@PathParams("name") name: string): Promise<Posts[] | undefined> {
			return this.postsService.findByName(name);
		}
}
