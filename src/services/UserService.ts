import { Response } from 'express';
import { IncomingHttpHeaders } from 'http';

import { UserDTO } from 'src/dto/UserDTO';
import { UserValidationService } from './UserValidationService';
import { Injectable } from 'injection-js';
import { UserRepository } from 'src/repositories/UserRepository';

@Injectable()
export class UserService {

	constructor(private userValidationService: UserValidationService, 
		private userRepository: UserRepository) {}
	
	public async tryToSign(
		userToValidate: any, 
		headers: IncomingHttpHeaders, 
		res: Response
	): Promise<Response> {
		const validatedUser = await this.userValidationService
		.validateUser(userToValidate, headers);

		if ( validatedUser instanceof UserDTO) {
			this.saveUser(validatedUser);
			return res.status(200).json({ "token": "TODO yet to be implemented" });
		}

		return res.status(401).json(validatedUser);
	}

	private saveUser(userDao: UserDTO): void {
		// TODO save to database
	}

	private isAlreadyUser(user: UserDTO): boolean {
		// TODO check with database
		return false;
	}
}