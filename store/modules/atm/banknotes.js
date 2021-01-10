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
    return state.banknotes.sort((current, next) => current.nominal > next.nominal ? 1 : -1)
  }
}

const mutations = {
  SUBTRACT_ONE_BANKNOTE: (state, nominal) => {
    state.banknotes.forEach((banknote, i) => {
      if (banknote.nominal === nominal) {
        --state.banknotes[i].count
      }
    })
  }
}

const moduleStore = {
  state, getters, mutations
}

export default moduleStore
