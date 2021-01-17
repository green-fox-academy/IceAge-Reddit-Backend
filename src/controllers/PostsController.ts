import { BodyParams, Controller, Get, PathParams, Post, UseBefore } from '@tsed/common';
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

		@Post('/subreddits/posts/create')
		@UseBefore(AuthMiddleware)
		public async createPost(
			@BodyParams()
			post: Posts
		): Promise<Posts> {
			return this.postsService.create(post);
		}	
}
