import bcrypt from 'bcrypt';
import { IncomingHttpHeaders } from 'http';

import { UserDTO } from 'src/dtos/UserDTO';
import { HttpErrorResposeDTO } from 'src/dtos/HttpErrorResponseDTO';


export class UserValidationService {

	public validateUser(
		userToValidate: any, 
		headers: IncomingHttpHeaders,
	): any {

		const username: string = userToValidate.username;
		const email: string= userToValidate.email;
		const password: string = userToValidate.password;
		
		if (Object.keys(userToValidate).length === 0) {
			return this.createErrorResponse("Empty request body!", headers);
		}
	
		if (!username || !email || !password) {
			return this.createErrorResponse("Missing credentials!", headers);
		}

		if (!this.containWhitespaces(username)) {
			return this.createErrorResponse("Whitespaces in username!", headers);
		}

		if (!this.isValidEmailFormat(email)) {
			return this.createErrorResponse("Invalid email format!", headers);
		}

		if (!this.isStrongPassword(password)) {
			return this.createErrorResponse("Week password!", headers);
		}

		return new UserDTO(username, email, this.encryptPassword(password));
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

	private encryptPassword(password: string): string {
		const hashPassword: string = bcrypt.hashSync(password, 10);
		return hashPassword;
	}

	private createErrorResponse(
		message: string, 
		headers: IncomingHttpHeaders
	): HttpErrorResposeDTO {
		const HTTP_ADDRES = "https://ice-age-reddit-backend.herokuapp.com/api/v1/auth/"
		const errorRespose: HttpErrorResposeDTO = new HttpErrorResposeDTO(
			message,
			{},
			`Http failure response for ${HTTP_ADDRES}sign-in: 401 Unauthorized`,
			"HttpErrorResponse",
			false,
			401,
			"Unauthorized",
			`${HTTP_ADDRES}sign-in`
		);
		
		errorRespose.setHeaders(headers);
		return errorRespose;
	}
}