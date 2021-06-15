export const state = () => ({})

export const mutations = {
  setItem(state, obj) {
    state[obj.key] = obj.object
  },
  removeItem(state, key) {
    delete state[key]
  },
}

export const getters = {
  getAllItem: (state) => () => {
    return state
  },
  getItem: (state) => (key) => {
    return state[key]
  },
}
