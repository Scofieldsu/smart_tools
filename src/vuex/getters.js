export const getCount = state => {
  return state.count
}
export const getCenterRightWidth = state => {
  return state.centerRightWidth
}
export const getApiUrl = state => {
  return state.api_url
}
// export const getGitlabInfo = state => {
//   let a = state.gitlab_info
//   let paramsstr = ''
//   for (let x in a.params) {
//     paramsstr = paramsstr + x + '=' + a.params[x] + '&'
//   }
//   return a.gitlaburl + a.path + paramsstr
// }
export const getApplication = state => {
  return state.application
}
