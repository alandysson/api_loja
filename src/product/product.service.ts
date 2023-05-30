import { Inject, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { Category } from './category/category.entity';
import { Repository } from 'sequelize-typescript';

@Injectable()
export class ProductService {
  constructor(
    @Inject('PRODUCT_REPOSITORY')
    private productRepository: Repository<Product>,
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

  async findAll(): Promise<Product[]> {
    return await this.productRepository.findAll({
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
  }

  findOne(id: number) {
    return this.productRepository
      .findOne({
        where: {
          id: id,
        },
      })
      .then((product) => {
        if (product) {
          return product;
        } else {
          return [];
        }
      })
      .catch((err) => {
        err;
      });
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    return await this.productRepository.update(updateProductDto, {
      where: {
        id: id,
      },
    });
  }

  remove(id: number) {
    return this.productRepository.destroy({
      where: {
        id: id,
      },
    });
  }
}
