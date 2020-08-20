import { AxiosInstance, AxiosRequestConfig } from "./types/index.d";
import Axios from "./core/axios";
import { extend } from "./helper/util";
import defaults from "./core/defaults";

function getAxios(config: AxiosRequestConfig): AxiosInstance {
  const context = new Axios(config);
  const axios = Axios.prototype.request.bind(context);
  extend(axios, context);
  return axios as AxiosInstance;
}

export default getAxios(defaults);
