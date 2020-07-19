import { AxiosInstance } from "./types/index.d";
import Axios from "./core/axios";
import { extend } from "./helper/util";
function getAxios(): AxiosInstance {
  const context = new Axios();
  const axios = Axios.prototype.request.bind(context);
  extend(axios, context);
  return axios as AxiosInstance;
}

export default getAxios();
