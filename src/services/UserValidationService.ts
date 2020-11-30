import { Service } from '@tsed/di';
import { Unauthorized } from '@tsed/exceptions';

import { UserCreation, UserLogin } from '../models/auth.types';

@Service()
export class UserValidationService {

	public validateUserLogin(userLogin: UserLogin): void {
		const email: string= userLogin.email;
		const password: string = userLogin.password;
		
		this.checkParameters([email, password]);
		this.checkEmail(email);
		this.checkPassword(password);
	}

	public validateUserCreation(userCreation: UserCreation): void {

		const username: string = userCreation.username;
		const email: string= userCreation.email;
		const password: string = userCreation.password;
		
		this.checkParameters([username, email, password]);
		this.checkUserName(username);
		this.checkEmail(email);
		this.checkPassword(password);
	}

	private checkParameters(parameters: string[]): void {
		const hasEmpty = parameters.some(x => !x);
		if (hasEmpty) throw new Unauthorized("Missing credentials");
	}

	private checkUserName(username: string): void {
		if (!this.hasWhitespaces(username)) {
			throw new Unauthorized("Whitespaces in username!");
		}
	}

	private checkEmail(email: string): void {
		if (!this.isValidEmailFormat(email)) {
			throw new Unauthorized("Invalid email format!");
		}
	}

	private checkPassword(password: string): void {
		if (!this.isStrongPassword(password)) {
			throw new Unauthorized("Week password!");
		}
	}

	private hasWhitespaces(string: string): boolean {
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
}