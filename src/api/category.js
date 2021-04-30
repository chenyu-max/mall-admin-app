// 所有类目的接口
import axios from '@/axios';

export default {
  list(params) {
    return axios.get('/category/all', { params });
  },
  add(params) {
    return axios.get('/category/add', { params });
  },
  edit(params) {
    return axios.put('category/edit', params);
  },
};
