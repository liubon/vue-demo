import { asyncRoutes, constantRoutes } from '@/router';
import { getPermission } from '@/apis/index';
/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
// 权限判定
export function hasPermission(authData, route) {
  return route.meta == authData;
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param routes asyncRoutes
 * @param roles
 */

function filterAsyncRoutes(routes, authData) {
  const result = [];
  routes.forEach((route) => {
    if (hasPermission(authData, route)) {
      result.push(route);
      if (route.children) {
        route.children = filterAsyncRoutes(route.children, authData);
      }
    }
  });
  return result;
}
const permission = {
  state: {
    routes: [],
    dynamicRoutes: 0,
    authData: null,
  },
  mutations: {
    SET_ROUTES: (state, routes) => {
      state.dynamicRoutes = routes.length;
      state.routes = constantRoutes.concat(routes);
    },
    SET_PERMISSIONS: (state, authData) => {
      state.authData = authData;
    },
  },
  actions: {
    // 获取权限信息
    GetPermissions: async function({ commit }) {
      // 权限请求
      const res = await getPermission();
      if (res.authData) {
        const { authData } = res;
        commit('SET_PERMISSIONS', authData);
        // 返回权限码
        return { resultCode: res.resultCode, authData };
      } else {
        return new Error('Verification failed, please check your role.');
      }
    },
    GenerateRoutes: function({ commit, state }) {
      let accessedRoutes = filterAsyncRoutes(asyncRoutes, state.authData);
      commit('SET_ROUTES', accessedRoutes);
      return accessedRoutes;
    },
  },
};

export default permission;
