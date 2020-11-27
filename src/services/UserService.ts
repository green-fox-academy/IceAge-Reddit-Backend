import { Service } from '@tsed/common';
import { Unauthorized } from '@tsed/exceptions';
import { User } from '../entities/User';
import { UserRepository } from '../repositories/UserRepository';
import { UserValidationService } from './UserValidationService';

@Service()
export class UserService {

	constructor(
		private userRepository: UserRepository,
		private userValidationService: UserValidationService) {}

  public async create(user: User): Promise<void> {
		const validatedUser: User = await this.userValidationService.validateUser(user); 
		if (await this.isAvailableUsername(validatedUser.username)
		&& await this.isAvailableEmail(validatedUser.email)) {
			this.userRepository.save(validatedUser);
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
}