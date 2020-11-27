import { Service } from '@tsed/di';
import { Unauthorized } from '@tsed/exceptions';
import * as bcrypt from 'bcrypt';

import { User } from '../entities/User';

@Service()
export class UserValidationService {

	public async validateUser(
		userToValidate: User, 
	): Promise<User> {

		const username: string = userToValidate.username;
		const email: string= userToValidate.email;
		const password: string = userToValidate.password;
		
		if (Object.keys(userToValidate).length === 0) {
			throw new Unauthorized("Empty request body!");
		}
	
		if (!username || !email || !password) {
			throw new Unauthorized("Missing credentials!");
		}

		if (!this.containWhitespaces(username)) {
			throw new Unauthorized("Whitespaces in username!");
		}

		if (!this.isValidEmailFormat(email)) {
			throw new Unauthorized("Invalid email format!");
		}

		if (!this.isStrongPassword(password)) {
			throw new Unauthorized("Week password!");
		}

		userToValidate.password = await this.encryptPassword(password);
		return userToValidate;
	}

	private containWhitespaces(string: string): boolean {
		return !/\s/.test(string);
	}

	private isValidEmailFormat(email: string): boolean {
		return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
	}

	/* To check a password between 6 to 20 characters which contain 
	at least one numeric digit, one uppercase and one lowercase letter */
	private isStrongPassword(password: string) {
		return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/.test(password); 
	}

	private async encryptPassword(password: string): Promise<string> {
		console.log(bcrypt);
		const hashPassword: string = await bcrypt.hash(password, 10) ;
		return hashPassword;
	}	
}