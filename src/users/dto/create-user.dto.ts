import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { IsEmailAlreadyExist } from 'src/validators/email.validtador';
import { IsUserAlreadyExist } from 'src/validators/userName.validator';

export class CreateUserDto {
  @IsUserAlreadyExist({
    message: 'User $value already exists. Choose another name.',
  })
  @IsNotEmpty()
  userName: string;
  @IsEmailAlreadyExist({
    message: 'Email $value already exists. Choose another email.',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
