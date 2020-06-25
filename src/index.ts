import { ConfigOptions } from "./types/index.d";
import xhr from "./core/xhr";
import { budildUrl } from "./helper/buildUrl";
import { transformRequest } from "./helper/data";
function transformUrl(config: ConfigOptions): string {
  const { url, params } = config;
  return budildUrl(url, params);
}

function tranfromData(config: ConfigOptions): any {
  return transformRequest(config.data);
}

function processConfig(config: ConfigOptions): void {
  config.url = transformUrl(config);
  config.data = tranfromData(config);
}

const Axios = (config: ConfigOptions): void => {
  processConfig(config);
  xhr(config);
};
export default Axios;
