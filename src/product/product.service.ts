import { Inject, Injectable, NotFoundException } from '@nestjs/common';
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

  notFound() {
    throw new NotFoundException({
      statusCode: 404,
      message: 'Produto não encontrado',
    });
  }
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

  async findOne(id: number) {
    return await this.productRepository
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
        throw new Error(err);
      });
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const result = await this.productRepository.update(updateProductDto, {
      where: {
        id: id,
      },
    });
    const product = this.findOne(id);
    if (result[0] !== 0) {
      return product;
    }
    this.notFound();
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
    this.notFound();
  }
}
