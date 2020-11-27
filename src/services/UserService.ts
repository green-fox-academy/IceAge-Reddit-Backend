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

  public async create(user: UserCreation): Promise<void> {
		const validatedUser: UserCreation = 
		await this.userValidationService.validateUserCreation(user); 

		if (await this.isAvailableUsername(validatedUser.username)
		&& await this.isAvailableEmail(validatedUser.email)) {
			this.userRepository.save(validatedUser);
		} 
	}

	public async logIn(userLogin: UserLogin): Promise<void> {
		const validatedUserLogin = 
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