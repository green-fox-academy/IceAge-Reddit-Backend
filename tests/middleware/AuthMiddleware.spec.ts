/* eslint-disable @typescript-eslint/unbound-method */
import { assert } from "chai";
import { AuthMiddleware } from '../../src/middlewares/AuthMiddleware';
import { AuthService } from '../../src/services/AuthService';

describe("AuthMiddleware", () => {
	const service: AuthMiddleware = new AuthMiddleware(new AuthService());
	const authService: AuthService = new AuthService();

	describe("use()", () => {
		it("should not fail", () => {
			const token = "Bearer " + authService.getToken('email').token;
			const request: any = {
				headers: {
					'Authorization': token
				},
				header: function(header: string):string {
					return this.headers[header] as string;
				}
			}
			const response: any = {
				headers: {
					'Authorization': token
				},
				header: function(header: string, string: string) {
					this.headers[header] = string ;
				}
			}
			assert.doesNotThrow(() => service.use(request , response));
		});
	});
});