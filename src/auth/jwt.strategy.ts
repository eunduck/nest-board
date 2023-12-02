import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserRepository } from "./user.respository";
import { User } from "./user.entity";

//다른곳에서도 사용할 수 있게
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) { //jwt 설치했기 때문에 jwt 기본 전략으로 가져온다.

    constructor(private readonly userRepository: UserRepository){
        super({
            secretOrKey: 'Secret1234',
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        })
    }

    //token 이 유효하면 실행되는 메소드
    async validate(payload) {
        const { username } = payload;
        const user: User = await this.userRepository.findOneByUsername(username);

        if(!user) {
            throw new UnauthorizedException('not found');
        }
        return user;
    }
}