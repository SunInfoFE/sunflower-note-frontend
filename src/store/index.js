/**
 * Created by licong on 2018/3/5.
 */
import Vue from 'vue'
import VueX from 'vuex'

Vue.use(VueX)

let store = new VueX.Store({
 state: {
  userName: '',
  password: '',
  uuid: ''
 },
 getters:{},
 mutations: {},
 actions: {}
})
export default store
