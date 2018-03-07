/**
 * Created by licong on 2018/3/5.
 */
import Vue from 'vue'
import VueX from 'vuex'
import $axios from '@/plugins/ajax'
Vue.use(VueX)

let store = new VueX.Store({
 state: {
  data: {},
  user: null
 },
 getters:{
 },
 mutations: {
 setLoginStorage(state, data) {
  state.data = data.data
   localStorage.setItem('data',JSON.stringify(data.data))
 },
   SET_TOKEN (state) {
    state.data = JSON.parse(localStorage.getItem('data'))
    state.user = localStorage.getItem('user')
   }
 },
 actions: {
 LOGIN({state, commit}, params) {
  state.email = params.email
  return new Promise((resolve, reject) => {
   $axios.post('/user/login',params).then(function({data}) {
    if (data.status === false) {
     reject(data)
    } else {
     commit('setLoginStorage', data)
     resolve(data)
      localStorage.setItem('user','User')
    }
   })
  })
 },
 adminLOGIN({state, commit}, params) {
  state.email = params.email
  return new Promise((resolve, reject) => {
   $axios.post('/user/adminLogin',params).then(function({data}) {
    if (data.status === false) {
     reject(data)
    } else {
     commit('setLoginStorage', data)
     resolve(data)
      localStorage.setItem('user','Manager')
    }
   })
  })
 }
 }
})
export default store
