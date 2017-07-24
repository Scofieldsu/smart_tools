export const INCREMENT = state => {
  state.count++
}
export const DECREMENT = state => {
  state.count--
}
export const CENTERIGHTWIDTH = state => {
  state.centerRightWidth = state.centerRightWidth ? 0 : 230
}
export const SETAPIURL = (state, msg) => {
  if (!msg) {
    msg = 'http://localhost:5050/api'
  }
  if (!msg.startsWith('http://')) {
    state.api_url = 'http://'.concat(msg)
  } else {
    state.api_url = msg
  }
}
export const Service = (state, msg) => {
  state.EditService = msg
}
