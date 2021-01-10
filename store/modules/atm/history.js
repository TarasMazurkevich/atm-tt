const state = () => ({
  transactionHistory: []
})

const getters = {
  TRANSACTION_HISTORY: state => state.transactionHistory
}

const mutations = {
  ADD_CHECK_TO_TRANSACTION_HISTORY: (state, check) => {
    state.transactionHistory.push(check)
  }
}

const moduleStore = {
  state, getters, mutations
}

export default moduleStore
