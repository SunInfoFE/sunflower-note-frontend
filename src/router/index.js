import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Manager from '@/pages/Manager'
import User from '@/pages/User'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
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
    }
  ]
});
