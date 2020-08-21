import request from '@/utils/request';
import Qs from 'qs';
function handleQuery(query) {
  return Qs.stringify(query, { arrayFormat: 'brackets' });
}
export function Login(data) {
  //   return request({
  //     url: '/users/login',
  //     method: 'post',
  //     data,
  //   });
  // 模拟登录请求
  return new Promise((res) => {
    res({ user: data, token: 'testToken', resultCode: 'SUCCESS' });
  });
}
export function getPermission() {
  //   return request({
  //     url: '/permission',
  //     method: 'post',
  //   });
  // 模拟权限查询请求
  return new Promise((res) => {
    res({ resultCode: 'SUCCESS', authData: '206' });
  });
}
export function getUserInfo(query) {
  return request({
    url: '/v1/users?' + handleQuery(query),
    method: 'get',
  });
}
