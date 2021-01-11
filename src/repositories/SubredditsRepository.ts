import { EntityRepository, Repository } from "typeorm";
import { Subreddits } from '../entities/Subreddits';

@EntityRepository(Subreddits)
export class SubredditsRepository extends Repository<Subreddits> {
    public async findByName(subredditName: string): Promise<Subreddits | undefined> {
        return await this.findOne({ where: { name: subredditName } });
    }
}