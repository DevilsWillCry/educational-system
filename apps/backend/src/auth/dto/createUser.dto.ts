import { IsEmail, IsEnum, IsOptional, IsString, MinLength, IsPhoneNumber, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateUserDto {
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(6)
    password: string;

    @IsString()
    name: string;

    @IsString()
    lastName: string;

    @IsOptional()
    @IsPhoneNumber()
    phone?: string;

    @IsOptional()
    @IsDate()
    address?: Date;

    @IsEnum(['student', 'teacher', 'addmin'])
    role: string
}
