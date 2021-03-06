import { Service } from '@tsed/common';
import { Conflict, UnprocessableEntity } from '@tsed/exceptions';
import { Subreddits } from '../entities/Subreddits';
import { SubredditsCreation } from '../models/auth.types';
import { SubredditsRepository } from '../repositories/SubredditsRepository';

@Service()
export class SubredditsService {

	constructor(
		private subredditsRepository: SubredditsRepository,
	) {}

	public async create(subreddits: SubredditsCreation): Promise<SubredditsCreation> {
		if(await this.isAvailableSubredditName(subreddits.name)) {
			if(!subreddits.description){
				throw new UnprocessableEntity('We want to see your awesome description!');
			} 
			if(!subreddits.title) {
				throw new UnprocessableEntity('Tell others also the title of your subreddit!');
			}	
			
			if (!subreddits.name){
				throw new UnprocessableEntity('Include also the subreddit tag!');
			}
		}
		return await this.subredditsRepository.save(subreddits);
	} 
	
	public async findAll(): Promise <Subreddits[]> {
		return await this.subredditsRepository.find();
	}

	private async isAvailableSubredditName(name: string): Promise<boolean> {
		if (await this.subredditsRepository.findBySubredditName(name) == undefined) {
			return true;
		} else {
			throw new Conflict("Subreddit name already taken!");
		}
	}
}