export class UserService {

	public isAlreadyUser(): boolean {
		return false;
	}

	public isValidUsernameFormat(username: string): boolean {
		return !/\s/.test(username);
	}

	public isValidEmailFormat(email: string): boolean {
		return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
	}

	/* To check a password between 6 to 20 characters which contain 
	at least one numeric digit, one uppercase and one lowercase letter */
	public isStrongPassword(password: string) {
		return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/.test(password); 
	}
}