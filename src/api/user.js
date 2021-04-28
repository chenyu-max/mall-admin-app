// 对于用户操作的接口管理
import axios from '../axios';

export default {
  login(params) {
    return axios.post('/passport/login', params);
  },
  register(params) {
    return axios.post('/passport/logon', params);
  },
  findBackPassword(params) {
    return axios.post('/passport/findBack', params);
  },
  getCode(email) {
    return axios.post('/passport/getCode', email);
  },
  changeUserInfo(params) {
    return axios.put('/passport/changeUserInfo', params);
  },
};
