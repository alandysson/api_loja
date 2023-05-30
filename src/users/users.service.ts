import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Product } from 'src/product/entities/product.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_REPOSITORY')
    private usersRepository: typeof User,
  ) {}

  create(createUserDto: Partial<CreateUserDto>): Promise<User | Error> {
    const user = this.usersRepository.create(createUserDto);
    return user
      .then((user) => user)
      .catch((err) => {
        return err;
      });
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.findAll({
      include: {
        model: Product,
        attributes: {
          exclude: ['createdAt', 'updatedAt', 'userId'],
        },
      },
    });
  }

  findOne(id: number) {
    return this.usersRepository.findOne({
      where: { id },
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.usersRepository
      .update(updateUserDto, {
        where: { id },
      })
      .then(() => this.findOne(id));
  }

  remove(id: number) {
    return this.usersRepository
      .destroy({
        where: { id },
      })
      .then(() => {
        return { deleted: true };
      });
  }
}
