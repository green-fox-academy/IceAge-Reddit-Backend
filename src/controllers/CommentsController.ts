import { BodyParams, Controller, Post, UseBefore } from "@tsed/common";
import { Comment } from "../entities/Comment";
import { AuthMiddleware } from "../middlewares/AuthMiddleware";

@Controller('/comments')
@UseBefore(AuthMiddleware)
export class CommentsController {
	constructor(
        private commentsService: CommentsService,
    ) {}
	
	@Post('/create')
	public async createComment(
		@BodyParams() 
		comment: Comment
	): Promise<Comment> {
		return await this.commentsService.create(comment);
    }
}
