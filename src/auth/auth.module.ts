import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserRepository } from './user.respository';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'Secret1234',
      signOptions: {
        expiresIn: 60 * 60
      }
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserRepository, JwtStrategy], //auth 에서 사용하기 위해
  exports: [JwtStrategy, PassportModule] //다른 모듈에서 사용하기 위해 
})
export class AuthModule {}
