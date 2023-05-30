import { BelongsTo, Column, Model, Table } from 'sequelize-typescript';
import { Product } from '../entities/product.entity';

@Table
export class Category extends Model {
  @Column
  name: string;
}
