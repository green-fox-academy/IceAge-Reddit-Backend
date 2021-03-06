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

export interface Username {
	username: string;
}

export interface SubredditsCreation {
	name: string;
	title: string;
	description: string;
	author: string;
}