import { Service } from '@tsed/common';
import { NotFound, Unauthorized } from '@tsed/exceptions';
import { Posts } from '../entities/Posts';

import { PostsRepository } from '../repositories/PostsRepository';

@Service()
export class PostsService {

	constructor(
		private postsRepository: PostsRepository,
	) {}

	public async create(post: Posts): Promise<Posts> {
			if(!post.description && post.post_type==='text'){
				throw new Unauthorized('We want to see your awesome description!');
			} 
			if(!post.posted_url && post.post_type==='url'){
				throw new Unauthorized("Don't forget the url!");
			} 
			if(!post.title) {
				throw new Unauthorized('Tell others also the title of your post!');
			}	
			if (!post.subreddit){
				throw new Unauthorized('Choose a subbredit which belongs to the post!');
		} else return await this.postsRepository.save(post);
	}
		
	public async findAll(): Promise <Posts[]> {
		return await this.postsRepository.find();
    }
    
    public async findById(id: number): Promise<Posts> {
        const post = await this.postsRepository.findOne(id);
        
        if (post) return post;

        throw new NotFound(`Post with id: ${id} has not been found!`);
    }

	public async findByName(name: string): Promise<Posts[] | undefined> {
		return await this.postsRepository.findByName(name);
	}
}