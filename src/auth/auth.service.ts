import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.respository';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { User } from './user.entity';

@Injectable()
export class AuthService {
    constructor(private readonly userRepository: UserRepository){}

    async signUp(authCredentialDto: AuthCredentialDto): Promise<void> {
        return this.userRepository.createUser(authCredentialDto);
    }
    async get(id: number): Promise<User> {
        return await this.userRepository.getUser(id);
    }
}
