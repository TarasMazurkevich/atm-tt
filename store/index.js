import Vue from 'vue'
import Vuex from 'vuex'

// STATE for ATM
import ATMConfig from '~/store/modules/atm/config.js'
import ATMBanknotes from '~/store/modules/atm/banknotes.js'
import ATMHistory from '~/store/modules/atm/history.js'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const store = () => new Vuex.Store({
  modules: {
    ATMConfig,
    ATMBanknotes,
    ATMHistory
  },
  strict: debug
})

export default store
