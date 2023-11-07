export interface ApiResponse<T> {
  currentPage: number;
  pageSize: number;
  totalPages: number;
  totalCount: number;
  message: string;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  data: T;
  succeeded: boolean;
  statusCode: number;
  meta: any;
  errors: { [key: string]: string[] };
}
