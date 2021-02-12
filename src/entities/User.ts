import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Posts } from "./Posts";
import { Comment } from "./Comment";

@Entity()
export class User {
	
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	username: string;

	@Column()
	email: string;

	@Column()
	password: string;

	@CreateDateColumn()
	date_created: Date;

	@OneToMany( () => Posts, post => post.user, {eager: true})
	posts:Posts[];

	@OneToMany( () => Comment, comment =>comment.user )
	comments: Comment[];
}