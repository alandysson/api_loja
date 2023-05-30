import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { DatabaseModule } from 'src/database.module';
import { productProviders } from './product.providers';
import { categoryProviders } from './category/category.providers';
import { UsersModule } from 'src/users/users.module';
import { HelperService } from 'src/helpers/helper.service';
import { RestResponse } from 'src/response/restResponse';

@Module({
  imports: [DatabaseModule, UsersModule],
  controllers: [ProductController],
  providers: [
    ProductService,
    HelperService,
    RestResponse,
    ...productProviders,
    ...categoryProviders,
  ],
})
export class ProductModule {}
