import { EntityManager } from "typeorm";
import { Injectable } from "injection-js";
import { User } from "src/models/user";

@Injectable()
export class UserRepository {

	constructor(private manager: EntityManager) { 
	}
       
	findByUserName(username: string) {
		return this.manager.getRepository(User).createQueryBuilder("user")
			.where("user.username = :username", { username })
			.getOne();
	}

	findById (id: number) {
		return this.manager.getRepository(User).createQueryBuilder("user")
			.where("user.id = :id", { id })
			.getOne();
	}

	saveUser(user: User): void {
		this.manager.save(user);
	}
}