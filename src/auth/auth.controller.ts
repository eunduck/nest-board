import { Body, Controller, Get, Param, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService){}

    //실행이 되기 전에 validation 을 탄다.
    @Post('/signup')
    signUp(@Body(ValidationPipe) authCredentialDto: AuthCredentialDto): Promise<void> {
        return this.authService.signUp(authCredentialDto);
    }
    @Get('/:id')
    get(@Param('id') id: number): Promise<User> {
        return this.authService.get(id);
    }
}
