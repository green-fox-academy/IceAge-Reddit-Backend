import { Service } from '@tsed/common';
import { NotFound } from '@tsed/exceptions';
import { Comment } from '../entities/Comment';
import { Posts } from '../entities/Posts';
import { User } from '../entities/User';
import { NewComment } from '../models/comment.types';
import { CommentsRepository } from '../repositories/CommentsRepository';
import { PostsRepository } from '../repositories/PostsRepository';
import { UserRepository } from '../repositories/UserRepository';

@Service()
export class CommentsService {

	constructor(
        private commentsRepository: CommentsRepository,
        private postsRepository: PostsRepository,
        private userRepository: UserRepository,
	) {}

	public async create(newComment: NewComment): Promise<Comment> {
        const postToComment: Posts | undefined = 
        await this.postsRepository.findById(newComment.postId);
        if (postToComment == undefined) 
        throw new NotFound("Post you are trying to comment doesn't exist!");

        if (newComment.description.length == 0 || typeof newComment.description != 'string') 
        throw new NotFound("Comment description is empty or not a string!");
        
        const author = await this.setUser(newComment.author);
        if(author != undefined){
                newComment.user = author;
        }

        const comment: Comment = await this.commentsRepository.save(newComment);
        postToComment.comments.push(comment);
        postToComment.commentCount = postToComment.comments.length;
        await this.postsRepository.save(postToComment);

        return comment;
        }

        private async setUser(userName: string): Promise <User | undefined>{
                return await this.userRepository.findByUsername(userName);

        }
}