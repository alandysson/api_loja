import { Inject, Injectable } from '@nestjs/common';
import { Category } from './category.entity';

export interface CategoryDto {
  name: string;
}

@Injectable()
export class CategoryService {
  constructor(
    @Inject('CATEGORY_REPOSITORY')
    private categoryRepository: typeof Category,
  ) {}

  create(createCategoryDto: Partial<CategoryDto>): Promise<Category | Error> {
    const category = this.categoryRepository.create(createCategoryDto);
    return category
      .then((category) => category)
      .catch((err) => {
        return err;
      });
  }

  async findAll(): Promise<Category[]> {
    return this.categoryRepository.findAll({
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
    });
  }

  findOne(id: number) {
    return this.categoryRepository
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
}
