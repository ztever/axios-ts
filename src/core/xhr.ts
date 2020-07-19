import {
  AxiosRequestConfig,
  AxiosPromise,
  AxiosResponse
} from "../types/index.d";
import { parseHeaders } from "../helper/headers";
import { transfromResponseData } from "../helper/data";
import { createError } from "../helper/error";
const xhr = (config: AxiosRequestConfig): AxiosPromise => {
  return new Promise((resolve, reject) => {
    const {
      data = null,
      url = "",
      method = "get",
      headers,
      responseType,
      timeout
    } = config;
    const request = new XMLHttpRequest();
    if (responseType) {
      request.responseType = responseType;
    }
    if (timeout) {
      request.timeout = timeout;
    }
    request.open(method.toUpperCase(), url, true);
    function handleResponse(response: AxiosResponse): void {
      if (response.status >= 200 && response.status < 300) {
        resolve(response);
      } else {
        reject(
          createError(
            "Requrest failed with status code " + response.status,
            config,
            null,
            request,
            response
          )
        );
      }
    }
    request.onreadystatechange = function () {
      if (request.readyState !== 4 || request.status === 0) {
        return;
      }
      const responseHeaders = request.getAllResponseHeaders();
      const responseData =
        responseType !== "text" ? request.response : request.responseText;
      const response: AxiosResponse = {
        data: transfromResponseData(responseData),
        status: request.status,
        statusText: request.statusText,
        headers: parseHeaders(responseHeaders),
        config,
        request
      };
      handleResponse(response);
    };
    request.onerror = function () {
      reject(createError("Network Error", config, null, request));
    };
    request.ontimeout = function () {
      reject(
        createError(
          `Timeout of ${timeout}ms exceeded`,
          config,
          "ECONNABORTED",
          request
        )
      );
    };
    Object.keys(headers).forEach(name => {
      if (data === null && name.toLowerCase() === "content-type") {
        delete headers[name];
      } else {
        request.setRequestHeader(name, headers[name]);
      }
    });
    request.send(data);
  });
};

export default xhr;
