import { EntityRepository, Repository } from "typeorm";
import { User } from '../entitys/User';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
}