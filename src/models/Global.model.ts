export type RestResponse<T> = {
  status: 'success' | 'failed';
  data: T;
}

export type TypeError = {
  error: string;
}