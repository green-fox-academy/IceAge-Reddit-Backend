import { Service } from '@tsed/common';
import { Subreddits } from '../entities/Subreddits';

import { SubredditsRepository } from '../repositories/SubredditsRepository';

@Service()
export class SubredditsService {

	constructor(
		private subredditsRepository: SubredditsRepository,
	) {}

	public async create(subreddits: Subreddits): Promise<Subreddits> {
		return await this.subredditsRepository.save(subreddits);
	} 
	
	public async findAll(): Promise <Subreddits[]> {
		return await this.subredditsRepository.find();
	}
}