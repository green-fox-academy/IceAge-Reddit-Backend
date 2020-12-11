/* eslint-disable @typescript-eslint/unbound-method */
import { Unauthorized } from '@tsed/exceptions';
import { assert, expect } from "chai";
import { AuthMiddleware } from '../../src/middlewares/AuthMiddleware';
import { AuthService } from '../../src/services/AuthService';
import * as jwt from 'jsonwebtoken';

describe("AuthMiddleware", () => {
	const service: AuthMiddleware = new AuthMiddleware(new AuthService());
	const authService: AuthService = new AuthService();

	let request: any;
	let response: any;
	beforeEach(() => {
		request = {
			headers: {
				'Authorization': ''
			},
			header: function(header: string):string {
				return this.headers[header] as string;
			}
		};
		response = {
			headers: {
				'Authorization': ''
			},
			header: function(header: string, string: string): void {
				this.headers[header] = string;
			}
		};
	});
	describe("use()", () => {
		it("should not fail", () => {
			const token = 'Bearer ' + authService.getToken('email').token;
			request.headers['Authorization'] = token;
			
			assert.doesNotThrow(() => service.use(request , response));
		});

		it("should fail with Access Denied!", () => {
			expect(() => { service.use(request , response)})
				.to.throw(Unauthorized, 'Access Denied!');
		});

		it("should fail with Token expired!", function(done) {
			const token = 'Bearer ' + jwt.sign(
				{ email: "email" },
				process.env.TOKEN_SECRET as string,
				{ expiresIn: '1ms' }
			)
			request.headers['Authorization'] = token;
			
			setTimeout(function() {
				expect(() => { service.use(request , response)})
				.to.throw(Unauthorized, 'Token expired!');
				done();
			}, 1)
		});

		it("should fail with Invalid token!", () => {
			const token = 'Bearer someCrazyStaffInsteadOfToken';
			request.headers['Authorization'] = token;
			
			expect(() => { service.use(request , response)})
				.to.throw(Unauthorized, 'Invalid token!');
		});
	});
});