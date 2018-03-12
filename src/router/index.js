import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Manager from '@/pages/Manager'
import User from '@/pages/User'
import AdminLogin from '@/pages/adminLogin'
import notFound from '@/components/404'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      beforeEnter (to, from, next) {
        next('/login')
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/adminLogin',
      name: 'adminLogin',
      component: AdminLogin
    },
    {
      path: '/Register',
      name: 'Register',
      component: Register
    },
    {
      path: '/Manager/:path?',
      name: 'Manager',
      component: Manager
    },
    {
      path: '/User/:path?',
      name: 'User',
      component: User
    },
    {
      path: '*',
      name: '404',
      component: notFound
    }
  ]
});
