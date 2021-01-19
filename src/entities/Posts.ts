import { Column, CreateDateColumn, Entity, ManyToOne, 
    OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Comment } from "./Comment";
import { Subreddits } from './Subreddits';
import { User } from './User';

@Entity()
export class Posts {
	
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	title: string;

	@CreateDateColumn()
	date_created: Date;

	@ManyToOne(() => Subreddits, subreddit => subreddit.posts)
	@Column()
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

	@ManyToOne(() => User, user => user.posts)
    user: User;
    
    @OneToMany(() => Comment, comment => comment.post)
    comments: Comment[];
}