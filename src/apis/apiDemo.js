import request from '@/utils/request';
import Qs from 'qs';
function handleQuery(query) {
  return Qs.stringify(query, { arrayFormat: 'brackets' });
}
/* ['post', 'put', 'delete']等请求参数使用data*/
export function post(data) {
  return request({
    url: '/users/login',
    method: 'post',
    /* 使用data */
    data,
  });
}
/* ['get', 'head']等请求参数使用params */
export function get(params) {
  return request({
    url: '/permission',
    method: 'get',
    /* 使用params */
    params,
  });
}
export function get(id, params) {
  return request({
    url: '/permission' + handleQuery(id), //如果为动态url使用 handleQuery()处理
    method: 'get',
    /* 使用params */
    params,
  });
}
