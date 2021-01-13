import { Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { Posts } from './Posts';

@Entity()
export class Subreddits {
	
	@PrimaryColumn()
	name: string;

	@Column()
	title: string;

	@CreateDateColumn()
	date_created: Date;
	
	@Column()
	description: string;
	
	@Column()
	userCount: number;
	
	@Column()
	author: string;
	
	@OneToMany(() => Posts, posts => posts.subreddit, {cascade: true})
	posts: Posts[];
}