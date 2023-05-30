import { IsNotEmpty, MinLength } from 'class-validator';
import { Product } from 'src/product/entities/product.entity';

export class CreateUserDto {
  @IsNotEmpty()
  userName: string;
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
