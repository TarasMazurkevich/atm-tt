import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'

import ATMBanknotes from '~/store/modules/atm/banknotes.js'

describe('Banknotes', () => {
  test('Mutation "SUBTRACT_BANKNOTES" will remove a couple of banknote with a nominal of 20', () => {
    const localVue = createLocalVue()
    localVue.use(Vuex)
    const store = new Vuex.Store({
      modules: {
        ATMBanknotes
      }
    })

    expect(store.state.ATMBanknotes.banknotes).toEqual([
        {
          nominal: 10,
          count: 20
        },
        {
          nominal: 20,
          count: 20
        },
        {
          nominal: 50,
          count: 20
        },
        {
          nominal: 100,
          count: 20
        },
        {
          nominal: 200,
          count: 20
        },
        {
          nominal: 500,
          count: 20
        }
    ])
    store.commit('SUBTRACT_BANKNOTES', { selectedNominal: 20, countToDescrease: 2 })
    expect(store.state.ATMBanknotes.banknotes).toEqual([
        {
          nominal: 10,
          count: 20
        },
        {
          nominal: 20,
          count: 18
        },
        {
          nominal: 50,
          count: 20
        },
        {
          nominal: 100,
          count: 20
        },
        {
          nominal: 200,
          count: 20
        },
        {
          nominal: 500,
          count: 20
        }
    ])
  })
})
