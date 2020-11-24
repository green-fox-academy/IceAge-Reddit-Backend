import 'reflect-metadata'
import './preStart'; // Must be the first import
import app from '@server';
import logger from '@shared/Logger';
import {createConnection, EntityManager, getConnection} from "typeorm";
import { Provider, ReflectiveInjector } from 'injection-js';
import { UserController } from './controllers/UserController';
import { UserService } from './services/UserService';
import { UserValidationService } from './services/UserValidationService';
import { UserRepository } from './repositories/UserRepository';
import { User } from './models/user';



// Start the server
const port = Number(process.env.PORT || 3000);
app.listen(port, () => {
    logger.info('Express server started on port: ' + port);
});

//connect to database
createConnection({
	type: "mysql",
	host: "localhost",
	port: 3306,
	username: process.env.DATASOURCE_USERNAME,
	password: process.env.DATASOURCE_PASSWORD,
	database: "reddit",
	entities: [
			User
	],
	synchronize: true,
	logging: false
	
}).then(connection => {
	// here you can start to work with your entities
}).catch(error => console.log(error));

export const providers: Provider[] = [
	UserController,
	UserService,
	UserValidationService,
	UserRepository,
	{ provide: EntityManager, useValue: getConnection().createEntityManager() }
];

const injector = ReflectiveInjector.resolveAndCreate(providers);
export const userController: UserController = injector.get(UserController);