import {
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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

  create(createUserDto: Partial<CreateUserDto>) {
    const user = this.usersRepository.create(createUserDto);
    return user;
  }

  async findAll(page?: number): Promise<User[]> {
    return this.usersRepository.findAll({
      order: [['createdAt', 'DESC']],
      limit: 2,
      offset: page === undefined ? 0 : (page - 1) * 2,
      attributes: {
        exclude: ['password'],
      },
      include: {
        model: Product,
        attributes: {
          exclude: ['createdAt', 'updatedAt', 'userId'],
        },
      },
    });
  }

  async findOne(id: number) {
    const result = await this.usersRepository.findOne({
      where: { id },
    });
    if (!result) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Usuário não encontrado.',
      });
    }
    return result;
  }

  async findByEmail(email: string): Promise<User> {
    const result = await this.usersRepository.findOne({
      where: { email: email },
    });
    if (!result) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Usuário não encontrado.',
      });
    }
    return result;
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
