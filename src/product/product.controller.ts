import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { RestResponse } from 'src/response/restResponse';
import { HelperConstants } from 'src/helpers/helperConstants';
import { HelperService } from 'src/helpers/helper.service';

@Controller('product')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private helperService: HelperService,
    private restResponse: RestResponse,
  ) {}

  @Post('/create')
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @Patch('/update/:id')
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<RestResponse> {
    try {
      const result = await this.productService.update(+id, updateProductDto);
      this.restResponse.data = result;
      this.restResponse.meta = this.helperService.returnMeta(
        HelperConstants.OPERATION_SUCCESS,
      );
    } catch (error) {
      this.restResponse.data = null;
      this.restResponse.meta = this.helperService.returnMeta(
        HelperConstants.ERROR,
      );
    }
    return this.restResponse;
  }

  @Delete('/delete/:id')
  async remove(@Param('id') id: string): Promise<RestResponse> {
    try {
      const result = await this.productService.remove(+id);
      this.restResponse.data = [result];
      this.restResponse.meta = this.helperService.returnMeta(
        HelperConstants.OPERATION_SUCCESS,
      );
    } catch (error) {
      this.restResponse.data = null;
      this.restResponse.meta = this.helperService.returnMeta(
        HelperConstants.ERROR,
      );
    }
    return this.restResponse;
  }
}
