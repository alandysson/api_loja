import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { usersProviders } from './users.providers';
import { DatabaseModule } from 'src/database.module';
import { IsEmailAlreadyExistConstraint } from 'src/validators/email.validtador';
import { IsUserAlreadyExistConstraint } from 'src/validators/userName.validator';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [
    UsersService,
    ...usersProviders,
    IsUserAlreadyExistConstraint,
    IsEmailAlreadyExistConstraint,
  ],
})
export class UsersModule {}
