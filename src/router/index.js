import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/home/Login'
import Register from '@/home/Register'
import teamManage from '@/home/teamManage'
import User from '@/home/User'
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
      path: '/teamManage',
      name: 'teamManage',
      component: teamManage
    },
    {
      path: '/User',
      name: 'User',
      component: User
    }
  ]
});
