export const increment = ({commit}) => {
  commit('INCREMENT')
}
export const decrement = ({commit}) => {
  commit('DECREMENT')
}
export const centerRightWidth = ({commit}) => {
  commit('CENTERIGHTWIDTH')
}
export const setApiUrl = ({commit}, msg) => {
  commit('SETAPIURL', msg)
}
