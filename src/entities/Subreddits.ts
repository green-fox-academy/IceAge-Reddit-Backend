import { Property } from "@tsed/schema";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { Posts } from './Posts';

@Entity()
export class Subreddits {
	
	@PrimaryColumn()
	@Property()
	name: string;

	@Column()
	title: string;

	@CreateDateColumn()
	date_created: Date;
	
	@Column()
	description: string;
	
	//nullable is just a temporal solution before we connect user to subreddit
	@Column({
		nullable: true
	})
	userCount: number;
	
	@Column({
		nullable: true
	})
	author: string;
	
	@OneToMany(() => Posts, posts => posts.subreddit, {cascade: true})
	posts: Posts[];
}