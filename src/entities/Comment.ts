import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Posts } from "./Posts";

@Entity({name: "comments"})
export class Comment {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Posts, post => post.comments)
    post: Posts;

    @Column()
    author: string;

    @CreateDateColumn()
    date_created: Date;

    @Column()
    description: string;
}