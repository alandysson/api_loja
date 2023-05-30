import { Injectable } from '@nestjs/common';
import { Meta } from './meta';

@Injectable()
export class RestResponse {
  data: object;
  meta: Meta;
}
