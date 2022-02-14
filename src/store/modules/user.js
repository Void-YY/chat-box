import { getToken, removeToken } from '@/utils/storage'
import router from '@/route'

const getDefaultState = () => {
  return {
    token: getToken(),
    login_info: null,
  }
}

const state = getDefaultState()

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_LOGIN_INFO: (state, login_info) => {
    state.login_info = login_info
  },
}
const actions = {
  // user login
  login({ commit }, userInfo) {
    // const { name, password } = userInfo
    return new Promise((resolve) => {
      commit('SET_LOGIN_INFO', userInfo)
      resolve()
      // login({ name: account, password: password })
      //   .then((response) => {
      //     // access_token
      //     commit('SET_TOKEN', response.access_token)
      //     setToken(response.access_token)
      //     resolve()
      //   })
      //   .catch((error) => {
      //     reject(error)
      //   })
    })
  },

  // user signOut
  signOut() {
    return new Promise((resolve) => {
      removeToken()
      router.push('/login')
      resolve()
    })
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
