// vuex
export interface IState {
  userInfo: IUserInfo;
  token: string;
  isLogin: boolean;
}
export interface IUserInfo {
  user?: string;
  role_name?: string;
  role?: string;
  role_id?: number;
}

export interface DateFmt {
  "M+"?: number;
  "d+"?: number;
  "h+"?: number;
  "m+"?: number;
  "s+"?: number;
  "q+"?: number;
  S?: number;
}

export interface Categories {
  list: Category[];
  pagination: Pagination;
}

export interface Category {
  create_time: string;
  update_time: string;
  id: number;
  name: string;
  value?: number;
  label?: string;
}

export interface Pagination {
  total?: number;
  hasNextPage?: boolean;
  totalPage?: number;
}



