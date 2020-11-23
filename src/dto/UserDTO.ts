export class UserDTO {

	constructor(
		private username: string,
		private email: string,
		private password: string,
	) {}

	public getUsername(): string {
		return this.username;
	}

	public getEmail(): string {
		return this.email;
	}

	public getPassword(): string {
		return this.password;
	}

	public setPassword(password: string): void {
		this.password = password;
	}
}