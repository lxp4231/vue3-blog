export interface Pagination {
  total?: number;
  hasNextPage?: boolean;
  totalPage?: number;
}

export enum Order {
  positive,
  reverse,
}

export interface INav {
  list?: Array<INavItem>;
}

export interface INavItem {
  id: number;
  name: string;
  path: string;
  pid: number;
  role_id: number;
  create_time: string;
  update_time: string;
  children?: Array<INavItem>;
}

export interface IArtCate {
  list: Array<IArtCateItem>;
  pagination: Pagination;
}

export interface IArtCateItem {
  id: number;
  name: string;
  create_time: string;
  update_time: string;
  editable?: boolean;
}

export interface IUsers {
  list: Array<IUsersItem>;
  pagination: Pagination;
}

export interface IUsersItem {
  id: number;
  role: string;
  role_id: number;
  role_name: string;
  create_time: string;
  update_time: string;
  user: string;
}

export interface Pagination {
  total?: number;
  hasNextPage?: boolean;
  totalPage?: number;
}

export interface IArticles {
  list: Array<IArticle>;
  pagination: Pagination;
}

export interface IArticle {
  id: number;
  title: string;
  tags: Array<ITag> | string;
  category_name: string;
  content: string;
  create_time: string;
  update_time: string;
  top?: string;
}

export interface ITag {
  name: string;
  color: string;
}

export interface IPrveNext {
  id: number;
  title: string;
}
