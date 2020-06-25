import Axios from "../../src/index";
Axios({
  url: "/get/base",
  method: "get",
  params: {
    a: 1,
    b: 2,
  },
});
Axios({
  url: "/get/base",
  method: "get",
  params: {
    a: [1, 2, 3],
  },
});
Axios({
  url: "/get/base",
  method: "get",
  params: {
    a: {
      b: 2,
      c: 3,
    },
  },
});
Axios({
  url: "/get/base",
  method: "get",
  params: {
    a: null,
    b: "bb",
  },
});
Axios({
  url: "/get/base",
  method: "get",
  params: {
    a: "@:$, ",
  },
});
Axios({
  url: "/get/base?c=1",
  method: "get",
  params: {
    a: "3",
  },
});
Axios({
  url: "/get/base#",
  method: "get",
  params: {
    a: "3",
  },
});
const date = new Date();
Axios({
  url: "/get/base",
  method: "get",
  params: {
    date,
  },
});
Axios({
  url: "/post/base",
  method: "post",
  data: {
    a: 2,
  },
});

const buffer = new Int32Array([21, 32]);
Axios({
  url: "/post/base/buffer",
  method: "post",
  data: buffer,
});
