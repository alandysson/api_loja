import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Product } from 'src/product/entities/product.entity';
import { Op } from 'sequelize';

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

  async findOne(id: number) {
    return await this.usersRepository.findOne({
      where: { id },
    });
  }

  async findOneByParam(userName?: string, email?: string) {
    return await this.usersRepository.findAll({
      attributes: ['userName', 'email'],
      where: {
        [Op.or]: [
          { userName: userName === undefined ? null : userName },
          { email: email === undefined ? null : email },
        ],
      },
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
