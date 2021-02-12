import { User } from "../entities/User";

export interface NewComment {
    postId: number;
    author: string;
    description: string;
    user: User;
}
