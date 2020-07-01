export type MethodOptions =
  | "get"
  | "GET"
  | "post"
  | "POST"
  | "delete"
  | "DELETE"
  | "put"
  | "PUT"
  | "head"
  | "HEAD"
  | "options"
  | "OPTIONS"
  | "patch"
  | "PATCH";
export interface AxiosRequestConfig {
  url: string;
  method?: MethodOptions;
  data?: any;
  params?: unknown;
  headers?: any;
  timeout?: any;
  responseType?: XMLHttpRequestResponseType;
}
export interface AxiosResponse {
  data: any;
  status: number;
  statusText: string;
  headers: any;
  config: AxiosRequestConfig;
  request: any;
}
export type AxiosPromise = Promise<AxiosResponse>;
