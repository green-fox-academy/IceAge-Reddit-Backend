import { EntityManager } from "typeorm";
import { Injectable } from "injection-js";
import { User } from "src/models/user";

@Injectable()
export class UserRepository {

	constructor(private manager: EntityManager) { 
	}
       
	async findByUserName(username: string): Promise <User | undefined> {
		return this.manager.getRepository(User).createQueryBuilder("user")
			.where("user.username = :username", { username })
			.getOne();
	}

	findById (id: number): Promise <User | undefined> {
		return this.manager.getRepository(User).createQueryBuilder("user")
			.where("user.id = :id", { id })
			.getOne();
  }
  
  //findByEmail

	saveUser(user: User): void {
		this.manager.save(user);
	}
}