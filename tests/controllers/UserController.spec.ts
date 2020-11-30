/* eslint-disable @typescript-eslint/unbound-method */
import {PlatformTest} from "@tsed/common";
import * as SuperTest from "supertest";
import { Server } from '../../src/Server';

describe("Rest API /api/v1/auth", () => {
  // bootstrap your Server to load all endpoints before run your test
  let request: SuperTest.SuperTest<SuperTest.Test>;

  before(PlatformTest.bootstrap(Server));
  before(() => {
    request = SuperTest(PlatformTest.callback());
  });

  after(PlatformTest.reset);

  describe("POST /sign-in", () => {
    it("should do something", async () => {
			const json = {
				username: "Karhalll",
				email: "karhalll@email.com",
				password: "1gsdfgF"
			};
			await request.post("/api/v1/auth/sign-in")
				.send(json)
				.expect(200)
    });
  });
});