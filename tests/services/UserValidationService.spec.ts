/* eslint-disable @typescript-eslint/unbound-method */
import { Unauthorized } from '@tsed/exceptions';
import { assert, expect } from "chai";
import { beforeEach } from 'mocha';
import { UserCreation } from '../../src/models/auth.types';
import { UserValidationService } from '../../src/services/UserValidationService';

describe("UserValidationService", () => {
	const service = new UserValidationService();
	let userCreation: UserCreation;
	beforeEach(() => {
		userCreation = {
			username: "Karhal",
			email: "karhal@email.com",
			password: "Str0ngPa55word"
		};	
	});
	describe("validateUserCreation()", () => {
		it("should not fail", () => {	
			assert.doesNotThrow(() => {service.validateUserCreation(userCreation)});
		});

		describe("username property", () => {	
			it("should fail cause empty username", () => {
				userCreation.username = "";

				expect(() => {service.validateUserCreation(userCreation)})
				.to.throw(Unauthorized, "Missing credentials!");
			});

			it("should fail cause has whitespace", () => {
				userCreation.username = "Baba Jaga";

				expect(() => {service.validateUserCreation(userCreation)})
				.to.throw(Unauthorized, "Whitespaces in username!");
			});
		});

		describe("email property", () => {	
			it("should fail cause empty email", () => {
				userCreation.email = "";

				expect(() => {service.validateUserCreation(userCreation)})
				.to.throw(Unauthorized, "Missing credentials!");
			});

			it("should fail cause no valid email format", () => {
				userCreation.email = "email.com";

				expect(() => {service.validateUserCreation(userCreation)})
				.to.throw(Unauthorized, "Invalid email format!");
			});
		});

		describe("password property", () => {	
			it("should fail cause empty password", () => {
				userCreation.password = "";

				expect(() => {service.validateUserCreation(userCreation)})
				.to.throw(Unauthorized, "Missing credentials!");
			});

			it("should fail cause too short (less then 6 symbols)", () => {
				userCreation.password = "fds";

				expect(() => {service.validateUserCreation(userCreation)})
				.to.throw(Unauthorized, "Week password!");
			});

			it("should fail cause too long (more then 20 symbols)", () => {
				userCreation.password = "sdfasdfdasfasdfdasffsgfhsgththrthggfhnn";

				expect(() => {service.validateUserCreation(userCreation)})
				.to.throw(Unauthorized, "Week password!");
			});

			it("should fail cause no digits", () => {
				userCreation.password = "jfdadfFFjdk";

				expect(() => {service.validateUserCreation(userCreation)})
				.to.throw(Unauthorized, "Week password!");
			});

			it("should fail cause no lower-case symbols", () => {
				userCreation.password = "464FDEDVA";

				expect(() => {service.validateUserCreation(userCreation)})
				.to.throw(Unauthorized, "Week password!");
			});

			it("should fail cause no capital symbols", () => {
				userCreation.password = "464dfsde";
				
				expect(() => {service.validateUserCreation(userCreation)})
				.to.throw(Unauthorized, "Week password!");
			});
		});
	});
});