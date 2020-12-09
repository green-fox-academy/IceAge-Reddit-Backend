/* eslint-disable @typescript-eslint/unbound-method */
import { assert } from "chai";
import { AuthService } from '../../src/services/AuthService';

describe("AuthService", () => {
	const service: AuthService = new AuthService();
	let email: string;
	beforeEach(() => {
		email = 'karhal@gmail.com';
	})
	describe("getToken()", () => {
		it("should not fail", () => {	
			assert.doesNotThrow(() => {service.getToken(email)});
		});

		it("should return token", () => {
			const token = service.getToken(email);

			assert.hasAllKeys(token, ['token']);
			assert.isTrue(typeof token.token == 'string');
		});
	});
	describe("verifyAndProlongToken()", () => {
		it("should not fail", () => {	
			const token = service.getToken(email);
			assert.doesNotThrow(() => {service.verifyAndProlongToken(token.token)});
		});
		it("should return new token", () => {	
			const token = service.getToken(email);
			let verifiedAndProlongedToken;

			setTimeout(() => {
				verifiedAndProlongedToken = service.verifyAndProlongToken(token.token);
				assert.notEqual(verifiedAndProlongedToken, token.token);
			}, 1000);
		});
	});
});