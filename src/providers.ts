import { Provider, ReflectiveInjector } from "injection-js";
import { UserController } from "src/controllers/UserController";
import { UserService } from "src/services/UserService";

export const providers: Provider[] = [
	UserService,
	UserController
];

export const injector = ReflectiveInjector.resolveAndCreate(providers);