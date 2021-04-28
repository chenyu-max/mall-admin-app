import Cookies from 'js-cookie';

/**
 * 设置用户的 Cookie 信息
 * @param {Object} info
 * @returns {boolean}
 */
export function setCookie(info) {
  // 将对象中的键值对转化程数组 例如
  // {key1:value1,key2,value2} => [[key1,value1],[key2,value2]]
  const arr = Object.entries(info);
  for (let i = 0; i < arr.length; i += 1) {
    Cookies.set(arr[i][0], arr[i][1]);
  }
  return true;
}

/**
 * 获取 cookies 的user信息
 * @returns {{role: string, appkey: string, email: string, username: string}}
 */
export function getUserCookie() {
  return {
    username: Cookies.get('username'),
    appkey: Cookies.get('appkey'),
    role: Cookies.get('role'),
    email: Cookies.get('email'),
  };
}

/**
 * 删除cookies的信息
 * @returns {boolean}
 */
export function removeUserCookie() {
  Cookies.remove('username');
  Cookies.remove('appkey');
  Cookies.remove('role');
  Cookies.remove('email');
  return true;
}
