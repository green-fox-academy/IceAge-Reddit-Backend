/* eslint-disable @typescript-eslint/unbound-method */
import { Unauthorized } from '@tsed/exceptions';
import { assert, expect } from "chai";
import { UserCreation } from '../../src/models/auth.types';
import { UserValidationService } from '../../src/services/UserValidationService';

describe("UserValidationService", () => {
  describe("validateUserCreation()", () => {
		it("should not fail", () => {
			const service = new UserValidationService();
			
			const userCreation: UserCreation = {
				username: "Karhal",
				email: "karhal@email.com",
				password: "Str0ngPa55word"
			}

			assert.doesNotThrow(() => {service.validateUserCreation(userCreation)});
    });
		it("should fail with Week Password", () => {
			const service = new UserValidationService();
			
			const userCreation: UserCreation = {
				username: "Karhal",
				email: "karhal@email.com",
				password: "1"
			}

			expect(() => {service.validateUserCreation(userCreation)})
			.to.throw(Unauthorized, "Week password!");

			userCreation.password = "jfdadfjdk";
			expect(() => {service.validateUserCreation(userCreation)})
			.to.throw(Unauthorized, "Week password!"); 
    });
  });
});