import Axios from "../../src/axios";
Axios({
  url: "/interface/get"
});
Axios("/interface/post", {
  method: "post",
  data: {
    aaas: 1
  }
});
Axios.request({
  url: "/interface/request",
  method: "post"
});
Axios.post(
  "/interface/post",
  { a: 1 },
  {
    headers: {
      aaaa: 1
    }
  }
);
