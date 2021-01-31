import { Service } from '@tsed/common';
import { Comment } from '../entities/Comment';

@Service()
export class CommentsService {

	constructor(
		private commentsRepository: CommentsRepository,
	) {}

	public async create(comment: Comment): Promise<Comment> {
		return await this.postsRepository.save(post);
	}
}