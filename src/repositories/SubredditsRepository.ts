import { EntityRepository, Repository } from "typeorm";
import { Subreddits } from '../entities/Subreddits';

@EntityRepository(Subreddits)
export class SubredditsRepository extends Repository<Subreddits> {

  public async findById(idToFind: number): Promise<Subreddits | undefined> {
		return await this.findOne({ where: { id: idToFind } });
  }
  
  public async findAll(): Promise <Subreddits[] | undefined> {
    return await this.findAll();
  }
  
}