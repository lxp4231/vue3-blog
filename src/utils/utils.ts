import { DateFmt } from '@/types/index'
export function formatDate(value: string, fmt?: string, emptyText?: string) {
  fmt = fmt || "yyyy-MM-dd hh:mm:ss";
  if (!value) return emptyText || "";
  let getDate = new Date(value);
  let o: DateFmt = {
    "M+": getDate.getMonth() + 1,
    "d+": getDate.getDate(),
    "h+": getDate.getHours(),
    "m+": getDate.getMinutes(),
    "s+": getDate.getSeconds(),
    "q+": Math.floor((getDate.getMonth() + 3) / 3),
    S: getDate.getMilliseconds(),
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (getDate.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  }
  let k: keyof DateFmt;
  for (k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1
          ? o[k] + ""
          : ("00" + o[k]).substr(("" + o[k]).length)
      );
    }
  }
  return fmt;
}
//十六进制颜色随机
export function randomColor() {
  function makeC() {
    return Math.floor(Math.random() * 256).toString(16);
  }
  function add0(str: string) {
    return str.length < 2 ? str + "0" : str;
  }
  return "#" + add0(makeC()) + add0(makeC()) + add0(makeC());
}
