import { Service } from '@tsed/common';
import { Subreddits } from '../entities/Subreddits';
import { SubredditsCreation } from '../models/auth.types';
import { SubredditsRepository } from '../repositories/SubredditsRepository';

@Service()
export class SubredditsService {

	constructor(
		private subredditsRepository: SubredditsRepository,
	) {}

	public async create(subreddits: SubredditsCreation): Promise<SubredditsCreation> {
		return await this.subredditsRepository.save(subreddits);
	} 
	
	public async findAll(): Promise <Subreddits[]> {
		return await this.subredditsRepository.find();
	}
}