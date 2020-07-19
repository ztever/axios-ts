import { RejectedFn, ResolvedFn } from "../types/index";

interface Interceptor<T> {
  resolved: ResolvedFn<T>;
  rejected: RejectedFn;
}

export default class InterceptorManager<T> {
  public interceptors: Array<Interceptor<T> | null>;
  constructor() {
    this.interceptors = [];
  }
  use(resolved: ResolvedFn<T>, rejected: RejectedFn): number {
    this.interceptors.push({
      rejected,
      resolved
    });
    return this.interceptors.length - 1;
  }
  eject(id: number): void {
    if (this.interceptors[id]) {
      this.interceptors[id] = null;
    }
  }
}
