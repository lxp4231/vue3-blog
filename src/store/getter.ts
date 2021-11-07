import { IState } from '@/types';
import { GET_TOKEN, GET_USERINFO,GET_ISLOGING } from './types';
import { getStorage } from "@/utils/storage.ts";

export default {
  [GET_USERINFO](state:IState){
    return state.userInfo.user ? state.userInfo : getStorage("userInfo");
  },
  [GET_TOKEN](state:IState){
    return state.token
  },
  [GET_ISLOGING](state:IState){
    return state.isLogin ? state.isLogin : getStorage("isLogin");
  }
}