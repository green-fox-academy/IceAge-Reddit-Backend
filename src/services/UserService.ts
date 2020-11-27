import { Service } from '@tsed/common';
import { Unauthorized } from '@tsed/exceptions';

import { User } from '../entities/User';
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
		this.userValidationService.validateUserCreation(userCreation);
		
		if (await this.isAvailableUsername(userCreation.username)
		&& await this.isAvailableEmail(userCreation.email)) {
			await this.encryptUsersPassword(userCreation);
			this.userRepository.save(userCreation);
		} 
	}

	public async logIn(userLogin: UserLogin): Promise<void> {
		this.userValidationService.validateUserLogin(userLogin);

		const user: User | undefined = await this.userRepository.findByEmail(userLogin.email);
		if (user) {
			this.userValidationService.checkEncryptedPassword(user.password, userLogin.password);
		} else {
			throw new Unauthorized("This email is not registrated!");
		}
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

	private async encryptUsersPassword(userCreation: UserCreation): Promise<void> {
		userCreation.password = 
			await this.userValidationService.encryptPassword(userCreation.password);
	}
}