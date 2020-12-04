import { Controller, Get } from '@tsed/common';
import { Posts } from '../entities/Posts';

import { PostsService } from '../services/PostsService';


@Controller('/')
export class UserController {
	constructor(private postsService: PostsService) {}

	@Get('/feed')
	getPostsFeed(): Promise<Posts[]> {
		return this.postsService.findAll();
	}
}
