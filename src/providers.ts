import { Provider, ReflectiveInjector } from "injection-js";
import { UserController } from "src/controllers/UserController";
import { UserService } from "src/services/UserService";
import { UserValidationService } from "./services/UserValidationService";
import { UserRepository } from "src/repositories/UserRepository";

export const providers: Provider[] = [
	UserController,
	UserService,
	UserValidationService,
	UserRepository,
];

export const injector = ReflectiveInjector.resolveAndCreate(providers);