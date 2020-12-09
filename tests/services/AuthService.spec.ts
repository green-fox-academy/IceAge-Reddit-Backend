/* eslint-disable @typescript-eslint/unbound-method */
import { assert } from "chai";
import { JWToken } from '../../src/models/auth.types';
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
		});
	});
});