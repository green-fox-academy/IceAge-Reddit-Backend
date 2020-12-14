import { Controller, Get, UseBefore } from '@tsed/common';
import { Posts } from '../entities/Posts';
import { AuthMiddleware } from '../middlewares/AuthMiddleware';

import { PostsService } from '../services/PostsService';


@Controller('/')
export class UserController {
	constructor(private postsService: PostsService) {}

	@Get('/feed')
	@UseBefore(AuthMiddleware)
	getPostsFeed(): Promise<Posts[]> {
		return this.postsService.findAll();
	}
}
