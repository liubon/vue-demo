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
      if (res) {
        commit('SET_USER', res.user);
        commit('SET_TOKEN', res.token);
        return res;
      }
    },
    // 前端 登出
    FedLogOut({ commit }) {
      commit('CLEAR_USER');
    },
  },
};

export default user;
