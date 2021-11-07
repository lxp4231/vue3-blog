import { IBtnStatus, IRegisterForm } from "@/types/login";
import api from "@/utils/api";
import server from "@/utils/axios";
import { message } from "ant-design-vue";
import { Ref, ref } from "vue";
interface IUseCode {
  getCode: (formData: IRegisterForm, btnStatus: IBtnStatus) => void;
  updateStatus: (data: IBtnStatus) => void;
}

export default function useCode(
  formData: IRegisterForm,
  btnStatus: IBtnStatus
): IUseCode {
  const timer: Ref = ref(null);
  async function getCode() {
    if (!formData.user) {
      message.error("用户名不能为空");
      return;
    }
    updateStatus({
      loading: true,
      disabled: true,
      text: "发送中",
    });
    let res = await server.request({
      url: api.nodemailer,
      method: "post",
      data: { user: formData.user },
    });
    if (res.data.code === 1000) {
      countDown(60);
    } else {
      updateStatus({
        loading: false,
        disabled: false,
        text: "再次获取",
      });
    }
  }
  function updateStatus(data: IBtnStatus): void {
    btnStatus.loading = data.loading;
    btnStatus.disabled = data.disabled;
    btnStatus.text = data.text;
  }
  function countDown(number: number): void {
    if (timer.value) {
      clearCountDown(timer.value);
    }
    timer.value = setInterval(() => {
      number--;
      if (number === 0) {
        // 清除定时器
        clearCountDown(timer);
        // 修改验证码按钮状态
        updateStatus({
          loading: false,
          disabled: false,
          text: "再次获取",
        });
      } else {
        btnStatus.text = `${number}S`;
      }
    }, 1000);
  }
  function clearCountDown(timer: Ref): void {
    clearInterval(timer.value);
  }

  return { getCode, updateStatus };
}
