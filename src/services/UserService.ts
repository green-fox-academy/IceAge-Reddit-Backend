export class UserService {

	public isAlreadyUser(): boolean {
		return false;
	}

	public isValidEmailFormat(email: string): boolean {
		return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
	}
}