import { Controller, Get, PathParams, UseBefore } from '@tsed/common';
import { Posts } from '../entities/Posts';
import { AuthMiddleware } from '../middlewares/AuthMiddleware';

import { PostsService } from '../services/PostsService';


@Controller('/')
export class PostsController {
	constructor(private postsService: PostsService) {}

	@Get('/feed')
	@UseBefore(AuthMiddleware)
	getPostsFeed(): Promise<Posts[]> {
		return this.postsService.findAll();
	}

	@Get("/feed/r/:name")
	@UseBefore(AuthMiddleware)
	findOne(
		@PathParams("name") name: string): Promise<Posts[] | undefined> {
			return this.postsService.findByName(name);
		}
}
