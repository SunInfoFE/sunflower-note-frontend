/**
 * Created by licong on 2018/3/5.
 */
import Vue from 'vue'
import VueX from 'vuex'
import $axios from '@/plugins/ajax'
Vue.use(VueX)

let store = new VueX.Store({
 state: {
  userName: '',
  password: '',
  uuid: ''
 },
 getters:{},
 mutations: {},
 actions: {
 LOGIN({state, commit}, params) {
  state.userName = params.userName
  return new Promise((resolve, reject) => {
   $axios
  })
 }
 }
})
export default store
