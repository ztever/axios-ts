type MethodOptions =
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
  url?: string;
  method?: MethodOptions;
  data?: any;
  params?: unknown;
  headers?: any;
  timeout?: any;
  responseType?: XMLHttpRequestResponseType;
}
export interface AxiosResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
  headers: any;
  config: AxiosRequestConfig;
  request: any;
}
export type AxiosPromise<T = any> = Promise<AxiosResponse<T>>;

export interface AxiosError<T = any> extends Error {
  isAxiosError: boolean;
  config: AxiosRequestConfig;
  code?: string | null;
  request?: any;
  response?: AxiosResponse<T>;
}

export interface Axios {
  interceptors: {
    request: AxiosInterceptorManager<AxiosRequestConfig>;
    response: AxiosInterceptorManager<AxiosResponse>;
  };
  request<T>(config: AxiosRequestConfig): AxiosPromise<T>;
  get<T>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>;
  delete<T>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>;
  head<T>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>;
  option<T>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>;
  post<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): AxiosPromise<T>;
  put<T>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>;
  patch<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): AxiosPromise<T>;
  getUri(config: AxiosRequestConfig): string;
}

export interface AxiosInstance extends Axios {
  <T = any>(config: AxiosRequestConfig): AxiosPromise<T>;
  <T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>;
}

export interface AxiosInterceptorManager<T> {
  use(resolved: ResolvedFn<T>, rejected?: RejectedFn): number;
  eject(id: number): void;
}
export interface ResolvedFn<T = any> {
  (val: T): T | Promise<T>;
}
export interface RejectedFn {
  (error: any): any;
}
