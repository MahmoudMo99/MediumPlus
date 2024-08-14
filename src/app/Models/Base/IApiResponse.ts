export interface IApiResponse<T> {
  message: string;
  data: T;
  succeeded: boolean;
  statusCode: number;
  meta: any;
  errors: { [key: string]: string[] };
}
