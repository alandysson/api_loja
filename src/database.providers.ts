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
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'root',
        database: 'loja',
        models: [User, Product, Category],
      });
      await sequelize.sync();
      return sequelize;
    },
  },
];
