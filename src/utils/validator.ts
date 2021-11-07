/**
 *
 * @export
 * @description 去无效字符
 * @name stripscript
 * @param {string} str
 * @return {string}
 */
export function stripscript(str: string): string {
  let pattern = new RegExp(
    "[`~!@#$^&*()=|{}':;',\\[\\]%<>/?~！@#￥……&*（）&;—|{ }【】‘；：”“'。，、？]"
  );
  let rs = "";
  for (let i = 0; i < str.length; i++) {
    rs = rs + str.substr(i, 1).replace(pattern, "");
  }
  return rs;
}
/**
 * @export
 * @description 验证用户名/邮箱
 * @name valUsername
 * @param {string} value
 * @returns {boolean}
 */
export function valUsername(value?: string): boolean {
  let reg = /^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
  return !reg.test(value as string) ? true : false;
}

/**
 * @export
 * @description 验证密码
 * @name valPassword
 * @param {string} value
 * @returns {boolean}
 */
export function valPassword(value: string): boolean {
  let reg = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/;
  return !reg.test(value as string) ? true : false;
}

// 验证验证码
export function valCode(value:string):boolean {
  let reg = /^[a-zA-Z0-9]{6}$/
  return !reg.test(value as string) ? true : false
}
