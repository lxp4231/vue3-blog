import { IState, IUserInfo } from "@/types";
import { SET_TOKEN, SET_USERINFO } from "./types";
import { setStorage } from "@/utils/storage.ts";

export default {
  [SET_USERINFO](state: IState, userInfo?: IUserInfo): void {
    if (userInfo) {
      state.userInfo = userInfo;
      state.isLogin = true;
      setStorage("userInfo", userInfo);
      setStorage("isLogin", true);
    } else {
      let userInfo = { user: "", role_name: "", role: "", role_id: 0 };
      state.userInfo = userInfo;
      state.isLogin = false;
      setStorage("userInfo", userInfo);
      setStorage("isLogin", false);
    }
  },
  [SET_TOKEN](state: IState, token: string): void {
    state.token = token;
    setStorage("token", token);
  },
};
