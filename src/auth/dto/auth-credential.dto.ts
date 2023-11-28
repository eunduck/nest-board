import { IsString, Matches, MaxLength, MinLength } from "class-validator";

export class AuthCredentialDto {
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    username: string;

    @IsString()
    @MinLength(4)
    @MaxLength(20)
    //영어랑 숫자만 가능
    @Matches(/^[a-zA-z0-9]*$/, {
        message: 'password only accepts english and number'
    })
    password: string;
}