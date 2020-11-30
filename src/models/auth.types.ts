export class UserLogin {
	email: string;
	password: string;
}

export class UserCreation extends UserLogin {
	username: string;
}