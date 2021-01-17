import { Service } from '@tsed/common';
import { Posts } from '../entities/Posts';

import { PostsRepository } from '../repositories/PostsRepository';

@Service()
export class PostsService {

	constructor(
		private postsRepository: PostsRepository,
	) {}

	public async create(post: Posts): Promise<Posts> {
		return await this.postsRepository.save(post);
	} 
		
	public async findAll(): Promise <Posts[]> {
		return await this.postsRepository.find();
	}

	public async findByName(name: string): Promise<Posts[] | undefined> {
		return await this.postsRepository.findByName(name);
	}
}