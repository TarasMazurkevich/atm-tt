import Vue from 'vue'
import Vuex from 'vuex'

// STATE for ATM
import ATMConfig from '~/store/modules/atm/config.js'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const store = () => new Vuex.Store({
  modules: {
    ATMConfig
  },
  strict: debug
})

export default store
