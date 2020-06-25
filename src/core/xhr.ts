import { ConfigOptions } from "../types/index.d";
const xhr = (config: ConfigOptions): void => {
  const { data = null, url, method = "get" } = config;
  const request = new XMLHttpRequest();
  request.open(method.toUpperCase(), url, true);
  request.send(data);
};
export default xhr;
