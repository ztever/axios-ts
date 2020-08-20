import { AxiosRequestConfig } from "@/types/index";
import { isObject, deepMerge } from "../helper/util";

export default function mergeConfig(
  defaultConfig: AxiosRequestConfig,
  userConfig: AxiosRequestConfig
): AxiosRequestConfig {
  const config = Object.create(null);
  userConfig = userConfig || {};
  // 1、常规属性，用户配置了就用用户配置的，否则用默认的
  const defaultUserConfig = [
    "baseURL",
    "transformRequest",
    "transformResponse",
    "paramsSerializer",
    "timeout",
    "withCredentials",
    "adapter",
    "responseType",
    "xsrfCookieName",
    "xsrfHeaderName",
    "onUploadProgress",
    "onDownloadProgress",
    "maxContentLength",
    "validateStatus",
    "maxRedirects",
    "httpAgent",
    "httpsAgent",
    "cancelToken",
    "socketPath"
  ];
  defaultUserConfig.forEach(props => {
    if (typeof userConfig[props] !== "undefined") {
      config[props] = userConfig[props];
    } else if (typeof defaultConfig[props] !== "undefined") {
      config[props] = defaultConfig[props];
    }
  });
  // 2、只接受用户配置的，不管默认配置的对象里有没有，都只取用户配置的
  const valueFromUserConfig = ["url", "method", "params", "data"];
  valueFromUserConfig.forEach(props => {
    if (typeof userConfig[props] !== "undefined") {
      config[props] = userConfig[props];
    }
  });
  // 3、复杂对象的深度合并
  const mergeDeepProperties = ["headers", "auth", "proxy"];
  mergeDeepProperties.forEach(prop => {
    if (isObject(userConfig[prop])) {
      config[prop] = deepMerge(defaultConfig[prop], userConfig[prop]);
    } else if (typeof userConfig[prop] !== "undefined") {
      config[prop] = userConfig[prop];
    } else if (isObject(defaultConfig[prop])) {
      config[prop] = deepMerge(defaultConfig[prop]);
    } else if (typeof defaultConfig[prop] !== "undefined") {
      config[prop] = defaultConfig[prop];
    }
  });
  return config;
}
