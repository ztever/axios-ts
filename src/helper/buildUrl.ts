import { isDate, isObject } from "./util";
function encode(val: string): string {
  return encodeURIComponent(val)
    .replace(/%40/g, "@")
    .replace(/%3A/gi, ":")
    .replace(/%24/g, "$")
    .replace(/%2C/gi, ",")
    .replace(/%20/g, "+")
    .replace(/%5B/gi, "[")
    .replace(/%5D/gi, "]");
}
export function budildUrl(url: string, params: any): string {
  if (!params) {
    return url;
  }

  const parts: string[] = [];
  Object.keys(params).forEach((key) => {
    const val = params[key];
    if (val === null || typeof val === "undefined") {
      return;
    }
    let values: any = [];
    if (Array.isArray(val)) {
      values = val;
      key += "[]";
    } else {
      values = [val];
    }
    values.forEach((ele: any) => {
      if (isDate(ele)) {
        ele = ele.toISOString();
      } else if (isObject(ele)) {
        ele = JSON.stringify(ele);
      }
      parts.push(`${encode(key)}=${encode(ele)}`);
    });
  });
  const serializedParams = parts.join("&");
  if (serializedParams) {
    const hashIndex = url.indexOf("#");
    url = hashIndex !== -1 ? url.slice(0, hashIndex) : url;
    url += (url.includes("?") ? "&" : "?") + serializedParams;
  }
  return url;
}
