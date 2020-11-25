import { Service } from '@tsed/common';
import { UserCreation } from '../models/UserCreation';
import { UserRepository } from '../repositories/UserRepository';

@Service()
export class UserService {

	constructor(private userRepository: UserRepository) {}

  async create(user: UserCreation): Promise<void> {
    await this.userRepository.save(user);
  }
}