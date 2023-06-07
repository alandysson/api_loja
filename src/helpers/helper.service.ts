import {
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Meta } from '../response/meta';
import { RestResponse } from '../response/restResponse';
import { HelperConstants } from './helperConstants';
import { Pagination } from 'src/response/pagination';

@Injectable()
export class HelperService {
  returnMeta(statusCodeParam: number): Meta {
    const list = Array.of(
      new Meta(HttpStatus.OK, 'Operação realizada com Sucesso!'),
      new Meta(HttpStatus.AMBIGUOUS, 'Ocorreu um erro ao realizar a operação!'),
      new Meta(HttpStatus.METHOD_NOT_ALLOWED, 'Acesso não autorizado!'),
      new Meta(HttpStatus.UNAUTHORIZED, 'Token expirado, realize novo login'),
      new Meta(HttpStatus.CREATED, 'Objeto criado!'),
    );

    return list.find((element) => element.statusCode == statusCodeParam);
  }

  calcTotalPages(count: number, perPageParam?: number) {
    const perPage = perPageParam
      ? perPageParam
      : HelperConstants.RESULTS_PER_PAGE;
    const totalCalculation = count / perPage;
    return count % perPage == 0
      ? totalCalculation
      : Math.trunc(totalCalculation + 1);
  }

  notFound(entity: string) {
    throw new NotFoundException({
      data: null,
      meta: new Meta(HttpStatus.NOT_FOUND, `${entity} não encontrado`),
    });
  }

  async responseResult(
    promise: Promise<any>,
    page?: number,
    isCreating: boolean = false,
  ) {
    const restResponse = new RestResponse();
    try {
      const result = await promise;
      if (!result) {
        this.notFound('Produto');
      }
      restResponse.data = result.data;
      restResponse.meta = this.returnMeta(
        isCreating ? HttpStatus.CREATED : HttpStatus.OK,
      );
      restResponse.meta.pagination = new Pagination(
        page,
        result.totalPages,
        result.count,
      );
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.log(error);
      throw new InternalServerErrorException('Internal server error');
    }
    return restResponse;
  }
}
