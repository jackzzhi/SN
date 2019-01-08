import Vue from 'vue'
import Vuex from 'vuex'
import modules from './modules'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules
})

/**
 * @description 热重载
 */
if (module.hot) {
  module.hot.accept(['./modules'], () => {
    const newMutations = require('./modules').default
    store.hotUpdate({
      modules: newMutations
    })
  })
}

export default store