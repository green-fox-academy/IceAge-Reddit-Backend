import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Post } from "./Post";

@Entity({name: "comments"})
export class Comment {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Post, post => post.comments)
    post: Post;

    @Column()
    author: string;

    @CreateDateColumn()
    date_created: Date;

    @Column()
    description: string;
}