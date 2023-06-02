import { Injectable } from '@nestjs/common';
import { HelperConstants } from './helperConstants';
import { Meta } from 'src/response/meta';
import { RestResponse } from 'src/response/restResponse';

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

  async responseResult(promise: Promise<any>) {
    const restResponse = new RestResponse();
    try {
      const result = await promise;
      restResponse.data = result;
      restResponse.meta = this.returnMeta(HelperConstants.OPERATION_SUCCESS);
    } catch (error) {
      restResponse.data = null;
      restResponse.meta = this.returnMeta(HelperConstants.ERROR);
    }
    return restResponse;
  }
}
