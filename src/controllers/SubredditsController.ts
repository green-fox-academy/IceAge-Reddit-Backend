import { BodyParams, Controller, Post } from '@tsed/common';
import { SubredditsCreation } from '../models/auth.types';

import { SubredditsService } from '../services/SubredditsService';


@Controller('/')
export class SubredditsController {
	constructor(private subredditsService: SubredditsService) {}

	@Post('/subreddits/create')
	public async createSubreddit(@BodyParams() 
	subreddits: SubredditsCreation): Promise<SubredditsCreation> {
		return await this.subredditsService.create(subreddits);
	}
}
