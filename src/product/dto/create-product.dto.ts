import { Category } from '../category/category.entity';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { User } from 'src/users/entities/user.entity';

export class CreateProductDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  value: number;

  @IsNotEmpty()
  @IsNumber()
  quantityAvailable: number;

  @IsOptional()
  categoryId: number;

  @IsOptional()
  userId: number;

  category: Category;

  user: User;
}
