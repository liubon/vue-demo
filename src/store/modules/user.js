import Initinfo from '@/utils/initinfo';
import { Login } from '@/apis/index';
const user = {
  state: {
    userInfo: Initinfo.getUserInfo(),
    token: Initinfo.getToken(),
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
      Initinfo.setToken(token);
    },
    SET_USER: (state, userInfo) => {
      state.user = userInfo;
      Initinfo.setUserInfo(userInfo);
    },
    CLEAR_USER: (state) => {
      state.user = '';
      state.userInfo = '';
      Initinfo.removeToken();
      Initinfo.removeUserInfo();
    },
  },
  actions: {
    async UserLogin({ commit }, data) {
      const res = await Login(data);
      if (res.meta.resultCode == 'SUCCESS') {
        commit('SET_USER', res.data.userInfo);
        commit('SET_TOKEN', res.data.token);
        return true;
      }
      return false;
    },
    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise((resolve) => {
        commit('CLEAR_USER');
        location.reload();
        resolve();
      });
    },
  },
};

export default user;
