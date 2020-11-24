import {EntityRepository, Repository} from "typeorm";
import {User} from "src/models/user";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
       
    findByUserName(username: string) {
      return this.createQueryBuilder("user")
          .where("user.username = :username", { username })
          .getOne();
    }

    findById (id: number) {
    return this.createQueryBuilder("user")
    .where("user.id = :id", { id })
    .getOne();
    }

    saveUser (user: User) {
      this.save(user);
    }

}