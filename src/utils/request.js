import axios from 'axios';
import { Message } from 'element-ui';
import store from '@/store';
import config from '../config/config';
const service = axios.create({
  baseURL: config.apiUrl, // api的base_url
  timeout: 5000, // request timeout
});
export const setAuthorization = (token) => {
  console.log('token', token);
  service.defaults.headers.common['Authorization'] = token;
};
service.interceptors.request.use(
  (config) => {
    const userInfo = store.getters.userInfo;
    const token = store.getters.token;
    // Do something before request is sent
    if (['post', 'put', 'delete'].includes(config.method)) {
      // body使用formData形式
      //   config.data = JSON.stringify(config.data);
      config.data = {
        token,
        userInfo,
        ...config.data,
      };
    }
    if (['get', 'head'].includes(config.method)) {
      config.params = {
        ...config.params,
        token,
      };
    }
    return config;
  },

  (error) => {
    // Do something with request error
    Promise.reject(error);
  }
);

// respone interceptor
service.interceptors.response.use(
  (response) => {
    // token 过期
    if (response.data) {
      // 未登录
      store.dispatch('FedLogOut').then(() => {
        location.reload();
      });
      Message({
        message: '登陆过期请重新登陆',
        type: 'error',
        duration: 5 * 1000,
      });
      // }
    }
    return response;
  },
  (error) => {
    if (error.response) {
      const message = error.response.data.meta.message;
      // 处理登录过期时status!==200的情况
      if (message === 'Signature has expired') {
        Message({
          message: '登陆过期请重新登陆',
          type: 'error',
          duration: 5 * 1000,
        });
        setTimeout(() => {
          //   store.dispatch('FedLogOut').then(() => {
          //     location.reload(); // 为了重新实例化vue-router对象 避免bug
          //   });
        }, 1000);
      } else {
        Message({
          message: message,
          type: 'error',
          duration: 5 * 1000,
        });
      }
      return Promise.reject(error);
    }
  }
);

const request = (params) => {
  return service(params).then((res) => res.data);
};
export default request;
