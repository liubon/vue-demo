import { setAuthorization } from './request';
class InitInfo {
  constructor() {
    this.token = sessionStorage.getItem('token');
    this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
  }
  getToken() {
    return sessionStorage.getItem('token');
  }
  setToken(token) {
    this.token = token;
    setAuthorization(token);
    sessionStorage.setItem('token', token);
  }
  removeToken() {
    this.token = '';
    sessionStorage.removeItem('token');
  }
  getUserInfo() {
    return this.userInfo;
  }
  setUserInfo(userInfo) {
    this.userInfo = userInfo;
    sessionStorage.setItem('userInfo', JSON.stringify(userInfo));
  }
  removeUserInfo() {
    this.userInfo = '';
    sessionStorage.removeItem('userInfo');
  }
}
export default new InitInfo();
