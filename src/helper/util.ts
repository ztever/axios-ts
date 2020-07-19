const toString = Object.prototype.toString;
export function isDate(val: any): val is Date {
  return toString.call(val) === "[object Date]";
}
export function isObject(val: any): boolean {
  return val !== null && typeof val === "object"; // 如果是formdata这种复杂的对象，无法判断
}
export function isPlainObject(val: any): boolean {
  return toString.call(val) === "[object Object]";
}

export function extend<T, U>(to: T, from: U): T & U {
  for (const key in from) {
    (to as T & U)[key] = from[key] as any;
  }
  return to as T & U;
}
