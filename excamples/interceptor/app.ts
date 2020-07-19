import axios from "../../src/axios";
axios.interceptors.request.use(
  config => {
    config.headers.test += "interceptor request 1-- ";
    return config;
  },
  error => Promise.reject(error)
);
const requestIterptor = axios.interceptors.request.use(
  config => {
    config.headers.test += "interceptor request 2-- ";
    return config;
  },
  error => Promise.reject(error)
);
axios.interceptors.request.use(
  config => {
    config.headers.test += "interceptor request 3-- ";
    return config;
  },
  error => Promise.reject(error)
);
axios.interceptors.response.use(response => {
  response.data.test += "respose interptro 1 ---";
  return response;
});
const responseInterceptor = axios.interceptors.response.use(response => {
  response.data.test += "respose interptro 2 ---";
  return response;
});
axios.interceptors.response.use(response => {
  response.data.test += "respose interptro 3 ---";
  return response;
});

axios
  .get("/generics/user", {
    headers: {
      test: "test---"
    }
  })
  .then(res => {
    console.log("res", res);
  });
axios.interceptors.request.eject(requestIterptor);
axios
  .get("/generics/user", {
    headers: {
      test: "test---"
    }
  })
  .then(res => {
    console.log("res requestIterptor eject ", res);
  });

axios.interceptors.response.eject(responseInterceptor);
axios
  .get("/generics/user", {
    headers: {
      test: "test---"
    }
  })
  .then(res => {
    console.log("res responseInterceptor eject ", res);
  });
