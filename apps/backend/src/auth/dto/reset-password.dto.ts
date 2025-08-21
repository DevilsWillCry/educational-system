import { IsEmail } from "class-validator";

class ResetPasswordDto {
    @IsEmail()
    email: string;
}

export { ResetPasswordDto };