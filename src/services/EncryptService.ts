import { Service } from '@tsed/di';
import { Unauthorized } from '@tsed/exceptions';
import * as bcrypt from 'bcrypt';

@Service()
export class EncryptService {
	public async encryptPassword(password: string): Promise<string> {
		const hashPassword: string = await bcrypt.hash(password, 10) ;
		return hashPassword;
	}

	public async checkEncryptedPassword(
		storedPassword: string, loginPassword: string): Promise<void> {
		if (!await bcrypt.compare(loginPassword, storedPassword)) {
			throw new Unauthorized("Wrong password!");
		}
	}
}