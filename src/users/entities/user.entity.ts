import { Column, HasMany, Model, Table } from 'sequelize-typescript';
import { Product } from 'src/product/entities/product.entity';

@Table({ tableName: 'users' })
export class User extends Model<User> {
  @Column
  userName: string;

  @Column({ allowNull: false })
  email: string;

  @Column
  password: string;

  @HasMany(() => Product)
  product: Product[];
}
