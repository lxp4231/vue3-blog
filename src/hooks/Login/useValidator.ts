import { IRegisterForm } from "@/types/login";
import {
  stripscript,
  valUsername,
  valPassword,
  valCode,
} from "@/utils/validator.ts";
interface IUseValidator {
  validateUsername: (_rule: [], value: string) => Promise<void>;
  validatePassword: (_rule: [], value: string) => Promise<void>;
  validatePassword2: (_rule: [], value: string) => Promise<void>;
  validateCode: (_rule: [], value: string) => Promise<void>;
}

export default function useValidator(formData?: IRegisterForm): IUseValidator {
  async function validateUsername(_rule: [], value: string): Promise<void> {
    if (value === "") {
      return Promise.reject("用户名不能为空");
    } else {
      if (valUsername(value)) {
        return Promise.reject("用户名格式不正确");
      }
      return Promise.resolve();
    }
  }
  async function validatePassword(_rule: [], value: string): Promise<void> {
    value = stripscript(value);
    if (value === "") {
      return Promise.reject("密码不能为空");
    } else if (valPassword(value)) {
      return Promise.reject("请输入6-20位数字+字母");
    } else {
      return Promise.resolve();
    }
  }

  async function validatePassword2(_rule: [], value: string): Promise<void> {
    value = stripscript(value);
    if (value === "") {
      return Promise.reject("密码不能为空");
    } else if (valPassword(value)) {
      return Promise.reject("请输入6-20位数字+字母");
    } else if (value != (formData as IRegisterForm).password) {
      return Promise.reject("两次输入的密码不一致");
    } else {
      return Promise.resolve();
    }
  }

  async function validateCode(_rule: [], value: string): Promise<void> {
    if (value === "") {
      return Promise.reject("验证码不能为空");
    } else if (valCode(value as string)) {
      return Promise.reject("验证码格式不正确");
    } else {
      return Promise.resolve();
    }
  }

  return {
    validateUsername,
    validatePassword,
    validatePassword2,
    validateCode,
  };
}
