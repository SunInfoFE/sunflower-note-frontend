/**
 * Created by licong on 2018/3/5.
 */
import Vue from 'vue'
import VueX from 'vuex'
import $axios from '@/plugins/ajax'
Vue.use(VueX)

let store = new VueX.Store({
 state: {
  login: false,
   email: '',
  password: '',
  uuid: ''
 },
 getters:{},
 mutations: {
 setLoginStorage(state, data) {
  state.userData = data.user
  state.login = true
 }
 },
 actions: {
 LOGIN({state, commit}, params) {
  state.email = params.email
  return new Promise((resolve, reject) => {
  console.log(params)
   $axios.post('/user/login',params).then(function({data}) {
    if (data.status === false) {
     reject(data)
    } else {
     commit('setLoginStorage', data)
     resolve(data)
    }
   })
  })
 }
 }
})
export default store
