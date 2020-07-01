import { AxiosRequestConfig, AxiosPromise } from "./types/index.d";
import xhr from "./core/xhr";
import { budildUrl } from "./helper/buildUrl";
import { transformRequest } from "./helper/data";
import { processHeaders } from "./helper/headers";
function transformUrl(config: AxiosRequestConfig): string {
  const { url, params } = config;
  return budildUrl(url, params);
}

function tranfromData(config: AxiosRequestConfig): any {
  return transformRequest(config.data);
}

function transfromHeaders(config: AxiosRequestConfig): string {
  const { headers = {}, data } = config;
  return processHeaders(headers, data);
}
function processConfig(config: AxiosRequestConfig): void {
  config.url = transformUrl(config);
  config.headers = transfromHeaders(config);
  config.data = tranfromData(config);
}

const Axios = (config: AxiosRequestConfig): AxiosPromise => {
  processConfig(config);
  return xhr(config);
};
export default Axios;
