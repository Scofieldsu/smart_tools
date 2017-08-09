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
    msg = state.api_url
  }
  if (!msg.startsWith('http://')) {
    state.api_url = 'http://'.concat(msg)
  } else {
    state.api_url = msg
  }
}

