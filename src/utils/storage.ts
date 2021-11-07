//  存储
export function setStorage(key:string, value:any) {
  localStorage.setItem(key, JSON.stringify(value));
}
//  取出数据
export function getStorage(key:string):any{
  let res = localStorage.getItem(key) as string
  return JSON.parse(res);
}
// 删除数据
export function removeStorage(key:string) {
  localStorage.removeItem(key);
}
