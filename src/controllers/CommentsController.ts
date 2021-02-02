import { BodyParams, Controller, Post, UseBefore } from "@tsed/common";
import { Comment } from "../entities/Comment";
import { AuthMiddleware } from "../middlewares/AuthMiddleware";
import { NewComment } from "../models/comment.types";
import { CommentsService } from "../services/CommentsService";

@Controller('/comments')
@UseBefore(AuthMiddleware)
export class CommentsController {
	constructor(
        private commentsService: CommentsService,
    ) {}
	
	@Post('/create')
	public async createComment(
		@BodyParams() 
		newComment: NewComment
	): Promise<Comment> {
		return await this.commentsService.create(newComment);
    }
}
