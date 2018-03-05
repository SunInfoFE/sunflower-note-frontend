import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import teamManage from '@/pages/teamManage'
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
