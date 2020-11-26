import { EntityRepository, Repository } from "typeorm";
import { User } from '../entitys/User';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
	public async findByUsername(usernameToFind: string): Promise<User | undefined> {
		return await this.findOne({ where: { username: usernameToFind } });
	}
}