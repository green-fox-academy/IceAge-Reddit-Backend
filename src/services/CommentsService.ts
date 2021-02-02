import { Service } from '@tsed/common';
import { NotFound } from '@tsed/exceptions';
import { Comment } from '../entities/Comment';
import { Posts } from '../entities/Posts';
import { NewComment } from '../models/comment.types';
import { CommentsRepository } from '../repositories/CommentsRepository';
import { PostsRepository } from '../repositories/PostsRepository';

@Service()
export class CommentsService {

	constructor(
        private commentsRepository: CommentsRepository,
        private postsRepository: PostsRepository,
	) {}

	public async create(newComment: NewComment): Promise<Comment> {
        const postToComment: Posts | undefined = 
        await this.postsRepository.findOne(newComment.postId);

        if (postToComment == undefined) 
        throw new NotFound("Post you are trying to comment doesn't exist!");

        if (newComment.description.length == 0 || typeof newComment.description != 'string') 
        throw new NotFound("Comment description is empty or not a string!");

        const comment: Comment = await this.commentsRepository.save(newComment);
        postToComment.comments.push(comment);
        postToComment.commentCount = postToComment.comments.length;
        await this.postsRepository.save(postToComment);

        return comment;
	}
}