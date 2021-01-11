import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'

import ATMHistory from '~/store/modules/atm/history.js'

describe('Transaction History', () => {
  test('Mutation "ADD_TRANSACTION_TO_HISTORY" adds a new object to history', () => {
    const localVue = createLocalVue()
    localVue.use(Vuex)
    const store = new Vuex.Store({
      modules: {
        ATMHistory
      }
    })

    expect(store.state.ATMHistory.transactionHistory).toEqual([])
    store.commit('ADD_TRANSACTION_TO_HISTORY', { sum: 20, banknotes: [{ nominal: 10, count: 2 }] })
    expect(store.state.ATMHistory.transactionHistory).toEqual([{ sum: 20, banknotes: [{ nominal: 10, count: 2 }] }])
  })
})
