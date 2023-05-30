import { Injectable } from '@nestjs/common';
import { HelperConstants } from './helperConstants';
import { Meta } from 'src/response/meta';

@Injectable()
export class HelperService {
  returnMeta(statusCodeParam: number): Meta {
    const list = Array.of(
      new Meta(
        HelperConstants.OPERATION_SUCCESS,
        'Operação realizada com Sucesso!',
      ),
      new Meta(
        HelperConstants.ERROR,
        'Ocorreu um erro ao realizar a operação!',
      ),
      new Meta(
        HelperConstants.UNAUTHORIZED,
        'Acesso não autorizado, tente novamente mais tarde',
      ),
      new Meta(
        HelperConstants.EXPIRED_TOKEN,
        'Token expirado, realize novo login',
      ),
    );

    return list.find((element) => element.statusCode == statusCodeParam);
  }
}
