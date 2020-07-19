import { AxiosRequestConfig, AxiosResponse } from "../types/index.d";
class AxiosError extends Error {
  private isAxiosError = true;
  private config: AxiosRequestConfig;
  private code?: string | null;
  private request?: any;
  private response?: any;
  constructor(
    message: string,
    config: AxiosRequestConfig,
    code?: string | null,
    requrest?: any,
    response?: AxiosResponse
  ) {
    super(message);
    this.config = config;
    this.code = code;
    this.request = requrest;
    this.response = response;
    Object.setPrototypeOf(this, AxiosError.prototype);
  }
}

export function createError(
  message: string,
  config: AxiosRequestConfig,
  code?: string | null,
  requrest?: any,
  response?: AxiosResponse
) {
  return new AxiosError(message, config, code, requrest, response);
}
