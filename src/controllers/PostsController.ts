import { Controller, Get, UseBefore } from '@tsed/common';
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
}
