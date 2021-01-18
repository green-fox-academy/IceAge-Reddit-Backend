import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Posts } from "./Posts";

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

	@OneToMany( () => Posts, post => post.user)
	posts:Posts[];
}