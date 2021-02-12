import { Posts } from "../entities/Posts";
import { Comment } from "../entities/Comment";

export interface SimpleUser {
    id: number;
    username: string;
    date_created: Date;
}

export interface UserWithComments {
    id: number;
    username: string;
    date_created: Date;
    comments: Comment[];
    posts: Posts[];
}