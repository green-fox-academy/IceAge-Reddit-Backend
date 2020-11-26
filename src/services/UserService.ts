import { Service } from '@tsed/common';
import { Unauthorized } from '@tsed/exceptions';
import { UserCreation } from '../models/UserCreation';
import { UserRepository } from '../repositories/UserRepository';

@Service()
export class UserService {

	constructor(private userRepository: UserRepository) {}

  public async create(user: UserCreation): Promise<void> {
		if (await this.isAvailabelUsername(user.username)) {
			this.userRepository.save(user);
		} 
	}
	
	private async isAvailabelUsername(username: string): Promise<boolean> {
		if (await this.userRepository.findByUsername(username) == undefined) {
			return true;
		} else {
			throw new Unauthorized("Username already taken!");
		}
	}
}