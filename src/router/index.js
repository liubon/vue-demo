import Vue from 'vue';
import VueRouter from 'vue-router';

export const constantRoutes = [
  // 登陆页面
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue'),
  },
];
export const asyncRoutes = [
  {
    path: '/',
    name: 'home',
    meta: '206',
    component: () => import('@/views/home/index.vue'),
  },
];
const router = new VueRouter({
  mode: 'hash',
  routes: constantRoutes,
});
Vue.use(VueRouter);
const routerPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch((error) => error);
};

export default router;
