import { Service } from '@tsed/common';
import { Unauthorized } from '@tsed/exceptions';

import { User } from '../entities/User';
import { changeUsername, JWToken, UserCreation, UserLogin } from '../models/auth.types';
import { UserRepository } from '../repositories/UserRepository';
import { AuthService } from './AuthService';
import { EncryptService } from './EncryptService';
import { UserValidationService } from './UserValidationService';

@Service()
export class UserService {

	constructor(
		private userRepository: UserRepository,
		private userValidationService: UserValidationService,
		private encryptService: EncryptService,
		private authService: AuthService
	) {}

	public async create(userCreation: UserCreation): Promise<JWToken> {
		this.userValidationService.validateUserCreation(userCreation);
		
		if (await this.isAvailableUsername(userCreation.username)
		&& await this.isAvailableEmail(userCreation.email)) {
			await this.encryptUsersPassword(userCreation);
			this.userRepository.save(userCreation);
		} 
		return this.authService.getToken(userCreation.username);
	}

	public async logIn(userLogin: UserLogin): Promise<JWToken> {
		this.userValidationService.validateUserLogin(userLogin);

		const user: User | undefined = await this.userRepository.findByEmail(userLogin.email);
		if (user) {
			await this.encryptService.compareEncryptedPassword(user.password, userLogin.password);
		} else {
			throw new Unauthorized("This email is not registered!");
		}

		return this.authService.getToken(user.username);
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
		await this.encryptService.getEncryptedPassword(userCreation.password);
	}

	public async changeUserName(user: changeUsername): Promise<JWToken> {
		const currentUser = await this.userRepository.findOne(user.id);
		
		if (currentUser && await this.isAvailableUsername(user.username)) {
			currentUser.username = user.username;
			this.userRepository.save(currentUser);
			return this.authService.getToken(currentUser.username);
		}

		if (!await this.isAvailableUsername(user.username)) {
			throw new Unauthorized("This user name already exists!");
		}

		throw new Unauthorized("This user does not exists");
	}
}