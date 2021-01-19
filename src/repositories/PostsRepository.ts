import { EntityRepository, Repository } from "typeorm";
import { Post } from '../entities/Post';

@EntityRepository(Post)
export class PostsRepository extends Repository<Post> {
    public async findByName(subredditName: string): Promise <Post[] | undefined> {
        return await this.find({ where: { subreddit: subredditName} });
    }

}