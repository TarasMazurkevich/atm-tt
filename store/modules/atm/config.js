const state = () => ({
  withdrawalLimit: 2000,
  defaultWithdrawalVariants: [100, 200, 500, 1000]
})

const getters = {
  WITHDRAWAL_LIMIT: state => state.withdrawalLimit,
  DEFAULT_WITHDRAWAL_VARIANTS: (state) => {
    return state.defaultWithdrawalVariants.sort((current, next) => current > next ? 1 : -1)
  }
}

const moduleStore = {
  state, getters
}

export default moduleStore
