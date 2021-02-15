import { Service } from '@tsed/common';
import { Unauthorized, NotFound } from '@tsed/exceptions';
import { forEachLeadingCommentRange } from 'typescript';
import { promisify } from 'util';
import { Posts } from '../entities/Posts';

import { User } from '../entities/User';
import { JWToken, UserCreation, UserLogin } from '../models/auth.types';
import { SimpleUser, UserDTO } from '../models/user.types';
import { UserRepository } from '../repositories/UserRepository';
import { AuthService } from './AuthService';
import { EncryptService } from './EncryptService';
import { UserValidationService } from './UserValidationService';

@Service()
export class UserService {

	constructor(
		private userRepository: UserRepository,
		private userValidationService: UserValidationService,
		private encryptService: EncryptService,
		private authService: AuthService,
	) {}

	public async create(userCreation: UserCreation): Promise<JWToken> {
		this.userValidationService.validateUserCreation(userCreation);
		
		if (await this.isAvailableUsername(userCreation.username)
		&& await this.isAvailableEmail(userCreation.email)) {
			await this.encryptUsersPassword(userCreation);
			this.userRepository.save(userCreation);
		} 
		return this.authService.getToken(userCreation.username);
    }
    
    public async getAllUsers(): Promise<SimpleUser[]> {
        return await this.userRepository.getAllSimpleUsers();
    }

	public async logIn(userLogin: UserLogin): Promise<JWToken> {
		this.userValidationService.validateUserLogin(userLogin);

		const user: User | undefined = await this.userRepository.findByEmail(userLogin.email);
		if (user) {
			await this.encryptService.compareEncryptedPassword(user.password, userLogin.password);
		} else {
			throw new Unauthorized("This email is not registered!");
		}

		return this.authService.getToken(user.username);
	}
	
	private async isAvailableUsername(username: string): Promise<boolean> {
		if (await this.userRepository.findByUsername(username) == undefined) {
			return true;
		} else {
			throw new Unauthorized("Username already taken!");
		}
	}

	private async isAvailableEmail(email: string): Promise<boolean> {
		if (await this.userRepository.findByEmail(email) == undefined) {
			return true;
		} else {
			throw new Unauthorized("Email already bound to different account!");
		}
	}

	private async encryptUsersPassword(userCreation: UserCreation): Promise<void> {
		userCreation.password = 
		await this.encryptService.getEncryptedPassword(userCreation.password);
	}

	public async getOneUser(id: number): Promise<UserDTO> {
		const user = await this.userRepository.findById(id);
			
		if (user == undefined) {
			throw new NotFound("This user doesn't exist");
		}
		else return this.createUserDTO(user); 
	}

	public createUserDTO(user: User): UserDTO {

			const userDTO: UserDTO = {
				id: user.id,
				username: user.username,
				date_created: user.date_created,
				comments: this.loadAllComments(user);
				posts: user.posts,
		} 
		return userDTO;
	}	

	private async loadAllComments(user: User): Promise<Comment[]> {
		const comments: Comment[] = await Promise.all(user.comments.map( async function (comment) {
			const post: Posts = await comment.post;
			const stableComment: Comment = {
				id: comment.id,
				postId: post.id,
				author: comment.author,
				dateCreated: comment.date_created,
				description: comment.description,
			}
			return stableComment;
		}));
		return comments
		

	}

}