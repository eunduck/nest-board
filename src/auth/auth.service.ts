import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.respository';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly userRepository: UserRepository,
        private jwtService: JwtService ){}

    async signUp(authCredentialDto: AuthCredentialDto): Promise<void> {
        return this.userRepository.createUser(authCredentialDto);
    }
    async get(id: number): Promise<User> {
        return await this.userRepository.getUser(id);
    }

    async singIn(authCredentialDto: AuthCredentialDto): Promise<{accessToken: string}> {
        const { username, password } = authCredentialDto;
        const user = await this.userRepository.findOneByUsername(username);

        if (user && (await bcrypt.compare(password, user.password))) {
            // 유저 토큰 생성 (secret + payload)
            const payload = { username };
            const accessToken = await this.jwtService.sign(payload);

            return { accessToken };
        } else {
            throw new UnauthorizedException('login failed');
        }
    }
}
