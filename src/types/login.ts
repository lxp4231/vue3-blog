// login-register
export interface ILoginForm {
  user: string;
  password: string;
}
export interface IRegisterForm extends ILoginForm {
  password2?: string;
  code?: string;
}
export interface IBtnStatus {
  loading: boolean;
  disabled: boolean;
  text: string;
}
