import Axios, { AxiosError } from "../../src/index";
Axios({
  url: "/get/error",
  method: "get",
  params: {
    a: 1,
    b: 2
  }
})
  .then(res => {
    console.log(res);
  })
  .catch(error => {
    console.log("error get ", error);
  });
Axios({
  url: "/post/apierror",
  method: "post",
  data: {
    a: 1,
    b: 2
  }
})
  .then(res => {
    console.log("res from data==>", res);
  })
  .catch(error => {
    console.log("apierror error", error);
  });
Axios({
  url: "/post/timeout",
  method: "post",
  timeout: 2000,
  data: {
    a: 1,
    b: 2
  }
})
  .then(res => {
    console.log("res from data==>", res);
  })
  .catch((error: AxiosError) => {
    console.log("timeout error", error);
  });
