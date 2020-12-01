import { Service } from '@tsed/common';
import { Posts } from '../entities/Posts';

import { PostsRepository } from '../repositories/PostsRepository';

@Service()
export class PostsService {

	constructor(
		private postsRepository: PostsRepository,
	) {}

  public async create(posts: Posts): Promise<void> {
			await this.postsRepository.save(posts);
    } 
    
  public async findAll(): Promise <Posts[] | undefined> {
      return await this.findAll();
    }
}