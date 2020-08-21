import request from '@/utils/request';
import Qs from 'qs';
function handleQuery(query) {
  return '?' + Qs.stringify(query, { arrayFormat: 'brackets' });
}
export function Login(data) {
  return request({
    url: '/users/login',
    method: 'post',
    data,
  });
  // 模拟登录请求
  //   return new Promise((res) => {
  //     const request = {
  //       data: {
  //         userInfo: {
  //           name: data.name,
  //           authData: '206',
  //         },
  //         token: 'test-token',
  //       },
  //       meta: { resultCode: 'SUCCESS' },
  //     };
  //     res(request);
  //   });
}
export function getPermission() {
  return request({
    url: 'user/permission',
    method: 'post',
  });
  // 模拟权限查询请求
  //   return new Promise((res) => {
  //     const request = {
  //       data: {
  //         authData: '206',
  //       },
  //       meta: { resultCode: 'SUCCESS' },
  //     };
  //     res(request);
  //   });
}
export function getUserInfo(query) {
  return request({
    url: '/getUserInfo' + handleQuery(query),
    method: 'get',
  });
}
