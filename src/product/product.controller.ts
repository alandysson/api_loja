import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { RestResponse } from 'src/response/restResponse';
import { HelperService } from 'src/helpers/helper.service';

@Controller('product')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private helperService: HelperService,
  ) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    const result = this.helperService.responseResult(
      this.productService.create(createProductDto),
      1,
      true, // isCreat
    );
    return result;
  }

  @Get()
  async findAll(@Query('page') page: number): Promise<RestResponse> {
    const result = this.helperService.responseResult(
      this.productService.findAll(page),
      page,
    );
    return result;
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<RestResponse> {
    const result = this.helperService.responseResult(
      this.productService.findOne(+id),
    );
    return result;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<RestResponse> {
    const result = this.helperService.responseResult(
      this.productService.update(+id, updateProductDto),
    );
    return result;
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<RestResponse> {
    const result = this.helperService.responseResult(
      this.productService.remove(+id),
    );
    return result;
  }
}
