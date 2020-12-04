import { EntityRepository, Repository } from "typeorm";
import { Subreddits } from '../entities/Subreddits';

@EntityRepository(Subreddits)
export class SubredditsRepository extends Repository<Subreddits> {
}