import { BodyParams, Controller, Post } from '@tsed/common';
import { Subreddits } from '../entities/Subreddits';

import { SubredditsService } from '../services/SubredditsService';


@Controller('/')
export class SubredditsController {
	constructor(private subredditsService: SubredditsService) {}

	@Post('/subreddits/create')
	public async createSubreddit(@BodyParams() subreddits: Subreddits): Promise<Subreddits> {
		return await this.subredditsService.create(subreddits);
	}
}
