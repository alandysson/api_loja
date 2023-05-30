import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './product/category/category.module';

@Module({
  imports: [UsersModule, ProductModule, CategoryModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
