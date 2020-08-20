import {
  AxiosPromise,
  AxiosRequestConfig,
  MethodOptions,
  AxiosResponse,
  ResolvedFn,
  RejectedFn
} from "../types/index";
import InterceptorManager from "./interceptorManager";
import dispatchRequest from "./dispatchRequest";
import mergeConfig from "./mergeConfig";
interface PromiseArr<T> {
  resolved: ResolvedFn<T> | ((config: AxiosRequestConfig) => AxiosPromise);
  rejected?: RejectedFn;
}
export default class Axios {
  private interceptors: {
    request: InterceptorManager<AxiosRequestConfig>;
    response: InterceptorManager<AxiosResponse<any>>;
  };
  private defaults: AxiosRequestConfig;
  constructor(defaultConfig: AxiosRequestConfig) {
    this.defaults = defaultConfig;
    this.interceptors = {
      request: new InterceptorManager<AxiosRequestConfig>(),
      response: new InterceptorManager<AxiosResponse>()
    };
  }
  request(url: any, config?: any): AxiosPromise {
    if (typeof url === "string") {
      config = config || {};
      config.url = url;
    } else {
      config = url;
    }
    config = mergeConfig(this.defaults, config);
    const arr: PromiseArr<any>[] = [
      {
        resolved: dispatchRequest,
        rejected: undefined
      }
    ];
    this.interceptors.request.interceptors.forEach(interceptor => {
      if (interceptor !== null) {
        arr.unshift(interceptor);
      }
    });
    this.interceptors.response.interceptors.forEach(interceptor => {
      if (interceptor !== null) {
        arr.push(interceptor);
      }
    });
    let promise = Promise.resolve(config);
    while (arr.length) {
      const interceptorItem = arr.shift();
      if (interceptorItem) {
        const { resolved, rejected } = interceptorItem;
        promise = promise.then(resolved, rejected);
      }
    }
    return promise;
  }
  get(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this.requestMethodWithoutData("get", url, config);
  }
  delete(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this.requestMethodWithoutData("delete", url, config);
  }
  head(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this.requestMethodWithoutData("head", url, config);
  }
  options(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this.requestMethodWithoutData("options", url, config);
  }
  put(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    return this.requestMethodWithData("put", url, data, config);
  }
  post(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    return this.requestMethodWithData("post", url, data, config);
  }
  patch(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    return this.requestMethodWithData("patch", url, data, config);
  }
  requestMethodWithData(
    method: MethodOptions,
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ) {
    const newConfig: AxiosRequestConfig = Object.assign(config || {}, {
      method,
      url,
      data
    });
    return this.request(newConfig);
  }
  requestMethodWithoutData(
    method: MethodOptions,
    url: string,
    config?: AxiosRequestConfig
  ) {
    const newConfig: AxiosRequestConfig = Object.assign(config || {}, {
      method,
      url
    });
    return this.request(newConfig);
  }
}
