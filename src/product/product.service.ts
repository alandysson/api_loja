import {
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { Category } from './category/category.entity';
import { Repository } from 'sequelize-typescript';
import { HelperConstants } from 'src/helpers/helperConstants';
import { HelperService } from 'src/helpers/helper.service';
export default interface Result {
  count: number;
  data: object;
  totalPages: number;
  totalAmount?: number;
}
@Injectable()
export class ProductService {
  constructor(
    @Inject('PRODUCT_REPOSITORY')
    private productRepository: Repository<Product>,
    private helperService: HelperService,
  ) {}

  async create(
    createProductDto: Partial<CreateProductDto>,
  ): Promise<Product | Error> {
    const product = this.productRepository.create(createProductDto);
    return await product
      .then((product) => product)
      .catch((err) => {
        return err;
      });
  }

  async findAll(page: number): Promise<any> {
    const { rows, count } = await this.productRepository.findAndCountAll({
      limit: 3,
      offset: (page - 1) * HelperConstants.RESULTS_PER_PAGE,
      order: [['id', 'DESC']],
      include: {
        model: Category,
        attributes: {
          exclude: ['createdAt', 'updatedAt'],
        },
      },
      attributes: {
        exclude: ['categoryId'],
      },
    });
    let totalPages = this.helperService.calcTotalPages(count);
    return { data: rows, count: count, totalPages: totalPages };
  }

  async findOne(id: number) {
    const result = await this.productRepository.findOne({
      where: {
        id: id,
      },
    });
    return result;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const result = await this.productRepository.update(updateProductDto, {
      where: {
        id: id,
      },
    });
    const product = await this.findOne(id);
    if (result[0] !== 0) {
      return product;
    }
  }

  async remove(id: number) {
    const result = await this.productRepository.destroy({
      where: {
        id: id,
      },
    });
    if (result !== 0) {
      return result;
    }
  }
}
