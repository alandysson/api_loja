import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Category } from '../category/category.entity';
import { User } from 'src/users/entities/user.entity';

@Table({ tableName: 'products' })
export class Product extends Model<Product> {
  @Column
  name: string;

  @Column({ type: DataType.DECIMAL(10, 2) })
  value: number;

  @Column
  quantityAvailable: number;

  @ForeignKey(() => Category)
  @Column
  categoryId: number;

  @ForeignKey(() => User)
  @Column
  userId: number;

  @BelongsTo(() => Category)
  category: Category;
}
