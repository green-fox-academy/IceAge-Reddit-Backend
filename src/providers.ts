import { Provider, ReflectiveInjector } from "injection-js";
import { UserController } from "src/controllers/UserController";
import { UserService } from "src/services/UserService";
import { UserValidationService } from "./services/UserValidationService";
import { UserRepository } from "src/repositories/UserRepository";
import { EntityManager, getConnection } from "typeorm";

export const providers: Provider[] = [
	UserController,
	UserService,
	UserValidationService,
	UserRepository,
	{ provide: EntityManager, useValue: getConnection().createEntityManager() }
];

export const injector = ReflectiveInjector.resolveAndCreate(providers);