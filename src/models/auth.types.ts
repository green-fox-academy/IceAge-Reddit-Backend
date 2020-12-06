export interface UserLogin {
	email: string;
	password: string;
}

export interface UserCreation extends UserLogin {
	username: string;
}

export interface JWToken {
	token: string;
}