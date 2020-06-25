import Axios from "../../src";
Axios({
  method: "get",
  url: "/simple/get",
  params: {
    a: 1,
  },
});
