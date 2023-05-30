import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database.module';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { categoryProviders } from './category.providers';
import { ProductModule } from '../product.module';

@Module({
  imports: [DatabaseModule, ProductModule],
  controllers: [CategoryController],
  providers: [CategoryService, ...categoryProviders],
})
export class CategoryModule {}
