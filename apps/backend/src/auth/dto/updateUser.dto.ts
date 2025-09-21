import { IsEmail, IsEnum, IsOptional, IsString, MinLength, IsPhoneNumber, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateUserDto {

    @IsOptional()
    @IsEmail()
    email?: string;

    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    lastName?: string;

    @IsOptional()
    @IsPhoneNumber()
    phone?: string;

    @IsOptional()
    @IsString()
    address?: Date;

    @IsOptional()
    @IsEnum(['active', 'inactive'])
    status?: string

}