import { Sequelize } from 'sequelize-typescript';
import { User } from './users/entities/user.entity';
import { Product } from './product/entities/product.entity';
import { Category } from './product/category/category.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        models: [User, Product, Category],
      });
      await sequelize.sync();
      return sequelize;
    },
  },
];
