const state = () => ({
  banknotes: [
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
  ]
})

const getters = {
  BANKNOTES: (state) => {
    const banknotesClone = [...state.banknotes]
    return banknotesClone.sort((current, next) => current.nominal < next.nominal ? 1 : -1)
  },
  BALANCE: (state) => {
    return state.banknotes.reduce((sum, current) => sum + (current.nominal * current.count), 0)
  }
}

const mutations = {
  SUBTRACT_BANKNOTES: (state, { selectedNominal, countToDescrease }) => {
    state.banknotes.forEach((banknote, i) => {
      if (banknote.nominal === selectedNominal) {
        state.banknotes[i].count -= countToDescrease
      }
    })
  }
}

const moduleStore = {
  state, getters, mutations
}

export default moduleStore
