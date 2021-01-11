import { Service } from '@tsed/common';
import { Subreddits } from '../entities/Subreddits';

import { SubredditsRepository } from '../repositories/SubredditsRepository';

@Service()
export class SubredditsService {

	constructor(
		private subredditsRepository: SubredditsRepository,
	) {}

	public async create(subreddits: Subreddits): Promise<void> {
		await this.subredditsRepository.save(subreddits);
	} 
	
	public async findAll(): Promise <Subreddits[]> {
		return await this.subredditsRepository.find();
	}

	public async findByName(name: string): Promise<Subreddits | undefined> {
		return await this.subredditsRepository.findByName(name);
	}
}