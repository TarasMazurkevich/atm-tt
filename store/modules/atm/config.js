const state = () => ({
  limitOfGiveOut: 2000,
  defaultVariantsOfGiveOut: [100, 200, 500, 1000]
})

const getters = {
  LIMIT_OF_GIVE_OUT: state => state.limitOfGiveOut,
  DEFAULT_VARIANTS_OF_GIVE_OUT: (state) => {
    return state.defaultVariantsOfGiveOut.sort((current, next) => current > next ? 1 : -1)
  }
}

const moduleStore = {
  state, getters
}

export default moduleStore
