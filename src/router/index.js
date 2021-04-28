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
      component: () => import('../views/page/statistics.vue'),
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
  {
    path: '/register',
    name: 'Register',
    meta: {
      title: '注册',
      hidden: true,
    },
    component: () => import('../views/layout/register.vue'),
  },
  {
    path: '/findBack',
    name: 'FindBackPassword',
    meta: {
      title: '找回密码',
      hidden: true,
    },
    component: () => import('../views/layout/findBackPassword.vue'),
  },
];
const router = new VueRouter({
  routes,
});

let isAddRoutes = false;

router.beforeEach((to, from, next) => {
  // 如果想要进入其他的路由，会进行判断
  if (to.path !== '/login' && to.path !== '/findBack' && to.path !== '/register') {
    // 从非登录页面进入 系统内部页面 开始进行判断
    // 或者从非登录页面 改变路由的方式进入系统内部页面 进行判断
    if (from.path !== '/login') {
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
    // 从登录页面进入系统页面，进行数据填写，并进入系统
    if (from.path === '/login') {
      const menuRoutes = getMenuRoute(store.state.user.role, asyncRouterMap);
      store.dispatch('changeMenuRoutes', routes.concat(menuRoutes))
        .then(() => {
          next();
        });
    }
  }
  return next();
});
export default router;
