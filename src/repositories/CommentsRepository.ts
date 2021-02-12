import { EntityRepository, Repository } from "typeorm";
import { Comment } from "../entities/Comment";

@EntityRepository(Comment)
export class CommentsRepository extends Repository<Comment> {
    public async findByAuthorName(authorsName: string): Promise<Comment[] | undefined> {
        return await this.find({ where: { author: authorsName } });
    }
}