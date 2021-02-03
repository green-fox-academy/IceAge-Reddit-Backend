import { EntityRepository, Repository } from "typeorm";
import { User } from '../entities/User';
import { SimpleUser } from "../models/user.types";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
	public async findByUsername(usernameToFind: string): Promise<User | undefined> {
		return await this.findOne({ where: { username: usernameToFind } });
	}

	public async findByEmail(emailToFind: string): Promise<User | undefined> {
		return await this.findOne({ where: { email: emailToFind } });
    }
    
    public async getAllSimpleUsers(): Promise<SimpleUser[]> {
        return await 
        (this.query(`SELECT id, username, date_created FROM reddit.user;`)) as SimpleUser[];
    }
}