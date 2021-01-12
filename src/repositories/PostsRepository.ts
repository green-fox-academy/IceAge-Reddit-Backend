import { EntityRepository, Repository } from "typeorm";
import { Posts } from '../entities/Posts';

@EntityRepository(Posts)
export class PostsRepository extends Repository<Posts> {
    public async findByName(subredditName: string): Promise <Posts[] | undefined> {
        return await this.find({ where: { subreddit: subredditName} });
    }

}