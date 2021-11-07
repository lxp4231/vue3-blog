import { Ref } from "vue";
import { Router, useRouter } from "vue-router";
import { Store, useStore } from "vuex";
import api from "@/utils/api";
import server from "@/utils/axios";
import { message } from "ant-design-vue";
import { ILoginForm } from "@/types/login";

interface IUseLoginBtns {
  submit: (type:string,formData: ILoginForm,emit?:Event) => boolean;
  reset: () => void;
}
export default function useLoginBtns(ruleForm: Ref): IUseLoginBtns {
  const store: Store<any> = useStore();
  const router: Router = useRouter();
  function submit(type:string,formData: ILoginForm): boolean {
    if(type === 'login'){
      ruleForm.value.validate().then(async () => {
        let res = await server.request({
          url: api.login,
          method: "post",
          data: { ...formData },
        });
        if (res.data.code == 1000) {
          message.success("登陆成功");
          // 储存到vuex
          store.dispatch("SET_USERINFO", res.data.data);
          store.dispatch("SET_TOKEN", res.data.data.token);
          router.push("/main");
          return true
        }else{
          return false
        }
      }).catch((err: Error) => {
        console.log("error", err);
        return true
      });
    }else if(type === 'register'){
      ruleForm.value.validate().then(async () => {
        let res = await server.request({
          url: api.register,
          method: "post",
          data: { ...formData },
        });
        if(res.data.code === 1000){
          message.success("注册成功");
          return true
        }else{
          return false
        }
      }).catch((err:Error) => {
        console.log("error", err);
        return true
      });
    } 
    return true
  }
  const reset = () => {
    (ruleForm as Ref).value.resetFields();
  };
  return { submit, reset };
}
