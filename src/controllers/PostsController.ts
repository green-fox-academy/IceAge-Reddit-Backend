import { BodyParams, Controller, Get, PathParams, Post, UseBefore } from '@tsed/common';
import { Post } from '../entities/Post';
import { AuthMiddleware } from '../middlewares/AuthMiddleware';
import { PostsService } from '../services/PostsService';

@Controller('/')
export class PostController {
	constructor(private postsService: PostsService) {}

	@Get('/feed')
	@UseBefore(AuthMiddleware)
	getPostsFeed(): Promise<Post[]> {
		return this.postsService.findAll();
	}

	@Get("/feed/r/:name")
	@UseBefore(AuthMiddleware)
	findOne(
		@PathParams("name") name: string): Promise<Post[] | undefined> {
			return this.postsService.findByName(name);
		}
		
	@Post('/subreddits/posts/create')
	@UseBefore(AuthMiddleware)
	public async createPost(
		@BodyParams()
		post: Post
	): Promise<Post> {
		return this.postsService.create(post);
	}	
}
