import { IState, IUserInfo } from "@/types";
import { Commit } from "vuex";
import { SET_TOKEN, SET_USERINFO } from "./types";

interface Ictx {
  commit: Commit;
  state: IState;
}

export default {
  [SET_USERINFO]({ commit }: Ictx, userInfo?: IUserInfo):void {
    commit(SET_USERINFO,userInfo)
  },
  [SET_TOKEN]({ commit }: Ictx, token: string):void {
    commit(SET_TOKEN,token)
  },
};
