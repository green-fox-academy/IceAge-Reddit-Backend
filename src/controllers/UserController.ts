import { Request, Response } from 'express';
import { Injectable } from 'injection-js';
import { HttpErrorRespose } from 'src/dao/HttpErrorResponse';
import { UserService } from 'src/services/UserService';

@Injectable()
export class UserController {

	private HTTP_ADDRES = "https://ice-age-reddit-backend.herokuapp.com/api/v1/auth/"
	private errorRespose: HttpErrorRespose = new HttpErrorRespose(
		"",
		{},
		// eslint-disable-next-line max-len
		`Http failure response for ${this.HTTP_ADDRES}sign-in: 401 Unauthorized`,
		"HttpErrorResponse",
		false,
		401,
		"Unauthorized",
		`${this.HTTP_ADDRES}sign-in`
	);

	constructor(private userService: UserService) {}

	// POST /api/v1/auth/sign-in"
	public signUser(req: Request, res: Response): Response {
		
		if (Object.keys(req.body).length === 0) {
			this.errorRespose.setUp("Empty request body!", req.headers)
			return res.status(401).json(this.errorRespose);
		}

		const { username, email, password } = req.body;

		if (!username || !email || !password) {
			this.errorRespose.setUp("Missing credentials!", req.headers);
			return res.status(401).json(this.errorRespose);
		}

		if (!this.userService.isValidEmailFormat(email)) {
			this.errorRespose.setUp("Invalid email", req.headers)
			return res.status(401).json(this.errorRespose);
		}

		return res.status(200).json({ "token": "TODO yet to be implemented" });
	}
}