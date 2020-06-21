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
export interface ConfigOptions {
  url: string;
  method?: MethodOptions;
  data?: any;
  params?: unknown;
  headers?: any;
  timeout?: any;
}
