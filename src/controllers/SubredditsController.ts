import { BodyParams, Controller, Post, UseBefore } from '@tsed/common';
import { AuthMiddleware } from '../middlewares/AuthMiddleware';
import { SubredditsCreation } from '../models/auth.types';

import { SubredditsService } from '../services/SubredditsService';


@Controller('/')
export class SubredditsController {
	constructor(private subredditsService: SubredditsService) {}

	@Post('/subreddits/create')
	@UseBefore(AuthMiddleware)
	public async createSubreddit(
		@BodyParams() 
		subreddits: SubredditsCreation
	): Promise<SubredditsCreation> {
		return await this.subredditsService.create(subreddits);
	}
}
