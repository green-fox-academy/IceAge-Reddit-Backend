import { EntityRepository, Repository } from "typeorm";
import { Posts } from '../entities/Posts';

@EntityRepository(Posts)
export class PostsRepository extends Repository<Posts> {

  public async findById(idToFind: number): Promise<Posts | undefined> {
		return await this.findOne({ where: { id: idToFind } });
  }
  
  public async findAll(): Promise <Posts[] | undefined> {
    return await this.findAll();
  }
  
}