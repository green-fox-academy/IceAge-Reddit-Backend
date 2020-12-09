/* eslint-disable @typescript-eslint/unbound-method */
import { assert } from "chai";
import { AuthService } from '../../src/services/AuthService';

describe("AuthService", () => {
	const service = new AuthService();
	describe("getToken()", () => {
		it("should not fail", () => {
			const email = 'karhal@gmail.com';	
			assert.doesNotThrow(() => {service.getToken(email)});
		});
	});
});