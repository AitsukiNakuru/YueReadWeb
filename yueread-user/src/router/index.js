import { createRouter, createWebHistory } from 'vue-router'
import {ElMessage} from "element-plus";





const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "login" */ '../views/Login')
  },
  {
    path: '/home',
    name: 'home',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "home" */ '../views/Home'),
    redirect: 'carousel',

    children: [
      {
        path: '/carousel',
        name: 'carousel',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "carousel" */ '../views/Carousel')
      },
      {
        path: '/category',
        name: 'category',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "category" */ '../views/Category')
      },
      {
        path: '/book',
        name: 'book',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "book" */ '../views/Book')
      },
    ]
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
router.beforeEach((to, from, next) => {
  if (to.path === '/login'){
    next()
  } else {
    if (localStorage.UserStore == null) {
      ElMessage.info('请登录')
      next('/login')
    } else {
      const loginData = JSON.parse(localStorage.UserStore)
      let isLogin = loginData != null;
      if (isLogin) {
        next();
      } else {
        // 是否在登录状态下

        ElMessage.info('请登录')
        next('/login')
      }
    }
  }
})
export default router
