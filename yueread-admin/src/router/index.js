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
    redirect: 'book',
    children: [
      {
        path: '/book',
        name: 'book',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "book" */ '../views/Book')
      },
      {
        path: '/category',
        name: 'category',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "book" */ '../views/Category')
      },
      {
        path: '/order',
        name: 'order',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "book" */ '../views/Order')
      },
      {
        path: '/user',
        name: 'user',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "book" */ '../views/User')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login'){
    next()
  } else {
    if (localStorage.AdminStore == null) {
      ElMessage.info('?????????')
      next('/login')
    } else {
      const loginData = JSON.parse(localStorage.AdminStore)
      let isLogin = loginData != null;
      if (isLogin) {
        next();
      } else {
        // ????????????????????????

        ElMessage.info('?????????')
        next('/login')
      }
    }
  }
})
export default router
