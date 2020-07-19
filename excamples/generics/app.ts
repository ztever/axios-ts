import Axios from "../../src/axios";
interface UserInfo {
  name: string;
  age: number;
}

async function getUser<T>() {
  return await Axios.get<T>("/generics/user");
}

async function getUserInfo() {
  const userInfo = await getUser<UserInfo>();
  if (userInfo) {
    //可以推导出data的数据结构
    console.log("userinfo", userInfo.data.name);
  }
}

getUserInfo();
