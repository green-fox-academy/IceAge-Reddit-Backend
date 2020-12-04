import { type } from 'os';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Subreddits } from './Subreddits';

@Entity()
export class Posts {
	
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	title: string;

	@CreateDateColumn()
	date_created: Date;

	@ManyToOne(type => Subreddits, subreddit => subreddit.posts)
	subreddit: string;

	@Column()
	author: string;

	@Column()
	commentCount: number;

	@Column()
	post_type: string;

	@Column()
	posted_url?: string;

	@Column()
	description: string;

}