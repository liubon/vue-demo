import router from './index';
import store from '../store';
import { Message } from 'element-ui';
const whiteList = ['/login', '/404']; // no redirect whitelist
router.beforeEach(async (to, from, next) => {
  if (store.getters.token) {
    // determine if there has token
    /* has token*/
    if (to.path === '/login') {
      next({ path: '/' });
      return;
    }
    // 如果存在动态路由在这里处理
    if (store.getters.authData === null || store.getters.dynamicRoutes < 1) {
      // 获取动态路由
      // 获取权限
      const res = await store.dispatch('GetPermissions');
      if (res.resultCode === 'SUCCESS') {
        const accessRoutes = await store.dispatch('GenerateRoutes');
        // 动态添加路由
        router.addRoutes(accessRoutes);
        next({ ...to, replace: true });
      } else {
        // 请求权限失败,退出
        await store.dispatch('FedLogOut');
        Message.error('请重新登录');
        next({ path: '/login' });
      }
    }
    next();
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) {
      // 在免登录白名单，直接进入
      next();
    } else {
      next('/login'); // 否则全部重定向到登录页
    }
  }
});
