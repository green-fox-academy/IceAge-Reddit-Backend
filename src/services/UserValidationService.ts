import { Service } from '@tsed/di';
import { Unauthorized } from '@tsed/exceptions';
import * as bcrypt from 'bcrypt';

import { UserCreation } from '../models/UserCreation';
import { UserLogin } from '../models/UserLogin';

@Service()
export class UserValidationService {

	public validateUserLogin(userLogin: UserLogin): UserLogin {
		const email: string= userLogin.email;
		const password: string = userLogin.password;
		
		this.checkRequestBody(userLogin);
		this.checkEmail(email);
		this.checkIfStrongPassword(password);

		return userLogin;
	}

	public async validateUserCreation(userCreation: UserCreation ): Promise<UserCreation> {

		const username: string = userCreation.username;
		const password: string = userCreation.password;
		
		this.checkUserName(username);
		this.validateUserLogin(userCreation);

		userCreation.password = await this.encryptPassword(password);
		return userCreation;
	}

	private checkRequestBody(requestBody: any): void {
		const objectKeys: string[] = Object.keys(requestBody);

		if (objectKeys.length === 0) {
			throw new Unauthorized("Empty request body!");
		}

		objectKeys.forEach(s => {
			if (!s) {
				throw new Unauthorized("Missing credentials!");
			}
		});
	}

	private checkUserName(username: string): void {
		if (!this.containWhitespaces(username)) {
			throw new Unauthorized("Whitespaces in username!");
		}
	}

	private checkEmail(email: string): void {
		if (!this.isValidEmailFormat(email)) {
			throw new Unauthorized("Invalid email format!");
		}
	}

	private checkPassword(password: string): void {
		this.checkIfStrongPassword(password);
	}

	private checkIfStrongPassword(password: string): void {
		if (!this.isStrongPassword(password)) {
			throw new Unauthorized("Week password!");
		}
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
		const hashPassword: string = await bcrypt.hash(password, 10) ;
		return hashPassword;
	}	
}