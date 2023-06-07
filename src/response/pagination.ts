export class Pagination {
  current: number;
  totalPages: number;
  totalRecords: number;

  constructor(
    current: number | null,
    totalPages: number | null,
    totalRecords: number | null,
  ) {
    this.current = current;
    this.totalPages = totalPages;
    this.totalRecords = totalRecords;
  }
}
