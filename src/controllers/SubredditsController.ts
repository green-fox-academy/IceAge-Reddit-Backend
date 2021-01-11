import { Controller, Get, PathParams } from "@tsed/common";
import { Posts } from "../entities/Posts";
import { Subreddits } from "../entities/Subreddits";
import { PostsService } from "../services/PostsService";
import { SubredditsService } from "../services/SubredditsService";

@Controller('/')
export class UserController {
	constructor(private subredditsService: SubredditsService, private postService: PostsService) {}

	@Get('/subreddits')
	// @UseBefore(AuthMiddleware)
	getSubredditsFeed(): Promise<Subreddits[]> {
		return this.subredditsService.findAll();
    }

  @Get("/r/:name")
  findOne(
    @PathParams("name") name: string): Promise<Posts[] | undefined> {
      return this.postService.findByName(name);
    }
}