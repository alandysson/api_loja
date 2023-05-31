import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
@ValidatorConstraint({ async: true })
export class IsUserAlreadyExistConstraint
  implements ValidatorConstraintInterface
{
  constructor(private userService: UsersService) {}
  validate(
    userName: string,
    args: ValidationArguments,
  ): Promise<boolean> | boolean {
    const result = this.userService.findOneByParam(userName);
    return result.then((user) => {
      if (user.length > 0) return false;
      return true;
    });
  }
}

export function IsUserAlreadyExist(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsUserAlreadyExistConstraint,
    });
  };
}
