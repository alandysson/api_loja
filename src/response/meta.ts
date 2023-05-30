// import { Pagination } from "./pagination";

export class Meta {
  // pagination: Pagination;
  statusCode: number;
  statusMessage: string;

  constructor(statusCode: number, statusMessage: string, token?: string) {
    this.statusCode = statusCode;
    this.statusMessage = statusMessage;
  }
}
