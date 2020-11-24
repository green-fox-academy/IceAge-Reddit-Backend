import { Response } from 'express';
import { IncomingHttpHeaders } from 'http';

import { UserDTO } from 'src/dtos/UserDTO';
import { UserValidationService } from './UserValidationService';
import { Injectable } from 'injection-js';
import { UserRepository } from 'src/repositories/UserRepository';
import { User } from 'src/models/user';

@Injectable()
export class UserService {

	constructor(
		private userValidationService: UserValidationService, 
		private userRepository: UserRepository
	) {}
	
	public tryToSign(
		userToValidate: any, 
		headers: IncomingHttpHeaders, 
		res: Response
	): Response {
		const validatedUser = this.userValidationService
		.validateUser(userToValidate, headers);

		if ( validatedUser instanceof UserDTO) {
			this.saveUser(validatedUser);
			return res.status(200).json({ "token": "TODO yet to be implemented" });
		}

		return res.status(401).json(validatedUser);
	}

	private saveUser(userDTO: UserDTO): void {
		const userToSave: User = new User();
		userToSave.username = userDTO.getUsername();
		userToSave.email = userDTO.getEmail();
		userToSave.password = userDTO.getPassword();
		this.userRepository.saveUser(userToSave);
	}

	private isAlreadyUser(user: UserDTO): boolean {
		// TODO check with database
		return false;
	}
}