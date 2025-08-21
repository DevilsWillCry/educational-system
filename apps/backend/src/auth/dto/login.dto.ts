import { IsEmail, IsString, isEmpty, IsNotEmpty, MinLength } from "class-validator";

class LoginDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @MinLength(6)
    @IsNotEmpty()
    password: string;
}

export { LoginDto };