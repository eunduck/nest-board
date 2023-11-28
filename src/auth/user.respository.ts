import { DataSource, Repository } from "typeorm";
import { User } from "./user.entity";
import { ConflictException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { AuthCredentialDto } from "./dto/auth-credential.dto";
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserRepository {
    private userRepository: Repository<User>;

    constructor(private readonly dataSource: DataSource) {
        this.userRepository = this.dataSource.getRepository(User);
    }

    async createUser(authCredentialDto: AuthCredentialDto): Promise<void> {
        const {username, password} = authCredentialDto;

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        try {
            await this.userRepository.save({ username, password: hashedPassword });
        } catch (error) {
            if (error.code === '23505') {
                throw new ConflictException('Existing username');
            } else {
                throw new InternalServerErrorException();
            }
        }
    }
    
    async getUser(id: number): Promise<User> {
        return this.userRepository.findOneBy({ id });
    }
}