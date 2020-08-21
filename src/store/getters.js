const getters = {
  userInfo: (state) => state.user.userInfo,
  token: (state) => state.user.token,
  dynamicRoutes: (state) => state.permission.dynamicRoutes,
  authData: (state) => state.permission.authData,
};
export default getters;
