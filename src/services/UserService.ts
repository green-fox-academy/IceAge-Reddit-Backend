import { Service } from '@tsed/common';
import { Unauthorized } from '@tsed/exceptions';

import { UserCreation } from '../models/UserCreation';
import { UserLogin } from '../models/UserLogin';
import { UserRepository } from '../repositories/UserRepository';
import { UserValidationService } from './UserValidationService';

@Service()
export class UserService {

	constructor(
		private userRepository: UserRepository,
		private userValidationService: UserValidationService) {}

  public async create(userCreation: UserCreation): Promise<void> {
		const validatedUserCreation: UserCreation = 
		await this.userValidationService.validateUserCreation(userCreation); 

		if (await this.isAvailableUsername(validatedUserCreation.username)
		&& await this.isAvailableEmail(validatedUserCreation.email)) {
			this.userRepository.save(validatedUserCreation);
		} 
	}

	public async logIn(userLogin: UserLogin): Promise<void> {
		await this.userValidationService.validateUserLogin(userLogin);
	}
	
	private async isAvailableUsername(username: string): Promise<boolean> {
		if (await this.userRepository.findByUsername(username) == undefined) {
			return true;
		} else {
			throw new Unauthorized("Username already taken!");
		}
	}

	private async isAvailableEmail(email: string): Promise<boolean> {
		if (await this.userRepository.findByEmail(email) == undefined) {
			return true;
		} else {
			throw new Unauthorized("Email already bound to different account!");
		}
	}
}