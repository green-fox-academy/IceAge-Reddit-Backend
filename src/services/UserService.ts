import { Service } from '@tsed/common';
import { UserCreation } from '../models/UserCreation';
import { UserRepository } from '../repositories/UserRepository';

@Service()
export class UserService {

	constructor(private userRepository: UserRepository) {}

  public create(user: UserCreation): void {
		if(this.isAvailabelUsername(user.username)) {
			this.userRepository.save(user);
		} else {
			throw new Error("Username already taken!");
		}
	}
	
	private isAvailabelUsername(username: string): boolean {
		return this.userRepository.findByUsername(username) === undefined;
	}
}