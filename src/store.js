import Vue from 'vue'
import Vuex from 'vuex'
import index from '@/pages/index/store/index'
import demo from '@/pages/demo/store/index'
import mobile from '@/pages/mobile/store/index'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    index,
    demo,
    mobile,
  }
})
