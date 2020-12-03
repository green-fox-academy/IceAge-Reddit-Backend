import { Controller, Get } from '@tsed/common';
import { Posts } from '../entities/Posts';

import { PostsService } from '../services/PostsService';


@Controller('/feed')
export class UserController {
	constructor(private postsService: PostsService) {}

	@Get('/')
	getPostsFeed(): Promise<Posts[]> {
		return this.postsService.findAll();
	}

	/*
	@Post('/subreddits/posts/create')
	createPost(@BodyParams() posts: Posts): Promise<void> {
		return this.postsService.create(posts);
	}*/
}
