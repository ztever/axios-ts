import { isPlainObject, deepMerge } from "./util";
import { MethodOptions } from "@/types/index";
function normalIseHeadersName(headers: any, normaliseName: string): void {
  if (!headers) {
    return;
  }
  Object.keys(headers).forEach(name => {
    if (
      name !== normaliseName &&
      name.toUpperCase() === normaliseName.toUpperCase()
    ) {
      headers[normaliseName] = headers[name];
      delete headers[name];
    }
  });
}
export function processHeaders(headers: any, data: any): any {
  normalIseHeadersName(headers, "Content-Type");
  if (isPlainObject(data)) {
    if (headers && !headers["Content-Type"]) {
      headers["Content-Type"] = "application/json;charset=utf-8";
    }
  }
  return headers;
}

export function parseHeaders(headers: string): any {
  const parsed = Object.create(null);
  if (!headers) {
    return parsed;
  }
  headers.split("\r\n").forEach(item => {
    let [key, value] = item.split(":");
    key = key.trim().toLowerCase();
    if (!key) {
      return;
    }
    parsed[key] = value.trim();
  });
  return parsed;
}

export function flattenHeaders(headers: any, method: MethodOptions): any {
  if (!headers) {
    return headers;
  }
  headers = deepMerge(headers.common || {}, headers[method] || {}, headers);
  const methodsToDelete = [
    "delete",
    "get",
    "head",
    "options",
    "post",
    "put",
    "patch",
    "common"
  ];
  methodsToDelete.forEach(method => {
    delete headers[method];
  });
  return headers;
}
