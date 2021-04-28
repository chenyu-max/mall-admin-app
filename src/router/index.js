import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store';
import getMenuRoute from '@/utils/permission';
import Home from '../views/layout/Home.vue';
import Login from '../views/layout/Login.vue';

Vue.use(VueRouter);

const asyncRouterMap = [{
  path: '/product',
  name: 'Product',
  meta: {
    title: '商品',
    icon: 'inbox',
    hidden: false,
  },
  component: Home,
  children: [{
    path: 'list',
    name: 'ProductList',
    meta: {
      title: '商品列表',
      icon: 'unordered-list',
      hidden: false,
    },
    component: () => import('../views/page/productList.vue'),
  }, {
    path: 'add',
    name: 'ProductAdd',
    meta: {
      title: '添加商品',
      icon: 'file-add',
      hidden: false,
    },
    component: () => import('../views/page/productAdd.vue'),
  }, {
    path: 'edit/:id',
    name: 'ProductEdit',
    meta: {
      title: '编辑商品',
      icon: 'edit',
      hidden: true,
    },
    component: () => import('../views/page/productEdit.vue'),
  }, {
    path: 'category',
    name: 'Category',
    meta: {
      title: '类目管理',
      icon: 'project',
      hidden: false,
    },
    component: () => import('../views/page/category.vue'),
  }],
}];

const routes = [
  {
    path: '/',
    name: 'Home',
    redirect: '/index',
    component: Home,
    meta: {
      title: '首页',
      icon: 'home',
      hidden: false,
    },
    children: [{
      path: 'index',
      name: 'Index',
      meta: {
        title: '统计',
        icon: 'number',
        hidden: false,
      },
      component: () => import('../views/page/index.vue'),
    }],
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      title: '登录',
      hidden: true,
    },
    component: Login,
  },
];
const router = new VueRouter({
  routes,
});

let isAddRoutes = false;

router.beforeEach((to, from, next) => {
  // 如果没有进行过登录，直接选择进入系统，会进行判断
  // 如果是不通过登录页面的途径 想要进入系统，需要判断 cookies中，是否具有相应的信息
  // 如果通过登录途径进入页面，则直接进入系统
  if (to.path !== '/login' && from.path !== '/login') {
    if (store.state.user.appkey && store.state.user.username && store.state.user.role) {
      if (!isAddRoutes) {
        const menuRoutes = getMenuRoute(store.state.user.role, asyncRouterMap);
        store.dispatch('changeMenuRoutes', routes.concat(menuRoutes))
          .then(() => {
            router.addRoutes(menuRoutes);
            next();
          });
        isAddRoutes = true;
      }
      return next();
    }
    return next('/login');
  }
  return next();
});
export default router;
