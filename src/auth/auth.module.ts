import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './strategies/local.strategy';
import { DatabaseModule } from 'src/database.module';
import { JwtStrategy } from './strategies/jwt.strategy';
import { usersProviders } from 'src/users/users.providers';

@Module({
  imports: [
    DatabaseModule,
    PassportModule,
    UsersModule,
    JwtModule.register({
      privateKey: process.env.SECRET_KEY,
      signOptions: {
        expiresIn: '360s',
      },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, ...usersProviders],
  controllers: [AuthController],
})
export class AuthModule {}
