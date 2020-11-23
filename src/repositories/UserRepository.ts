import {EntityRepository, Repository} from "typeorm";
import {User} from "src/models/user";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
       
    findByName() {
        return this.findOne();
    }

    saveUser (user: User) {
      this.save(user);
    }

}