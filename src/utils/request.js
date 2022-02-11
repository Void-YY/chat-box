import { getEncryptToBase64 as encrypt } from './encryption'
const defaultSettings = require('../../conf/config.json')
const serverSetting = defaultSettings.server
import axios from 'axios'
// import { Message } from 'element-ui'
// import store from '@/core/store'
// import {
//   getToken,
//   getRefreshToken,
//   setRefreshToken,
//   setToken,
// } from '@/core/utils/auth'
// import { refreshToken } from '@/core/basic/api'
// import router from '@/core/router'

// create an axios instance
const request = axios.create({
  baseURL: window.location.protocol + '//' + serverSetting.host + '/api', // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 60 * 1000, // request timeout
})

// request interceptor
request.interceptors.request.use(
  (config) => {
    const encryptData = {}
    if (config.method === 'get') {
      encryptData[defaultSettings.BASE_ENCRYPT_KEY] = encrypt(config.params)
      config.params = encryptData
    } else {
      encryptData[defaultSettings.BASE_ENCRYPT_KEY] = encrypt(config.data)
      config.data = encryptData
    }
    // do something before request is sent

    // if (store.getters.token) {
    //   // let each request carry token
    //   // 如果 token 存在
    //   // 让每个请求携带自定义 token 请根据实际情况自行修改
    //   config.headers.common.Authorization = `bearer ${getToken()}`
    // }
    return config
  },
  (error) => {
    // do something with request error
    return Promise.reject(error)
  }
)
// refresh status
// let isRefreshing = false
// let retryRequests = []

// response interceptor
// request.interceptors.response.use(
//   /**
//    * If you want to get http information such as headers or status
//    * Please return  response => response
//    */

//   /**
//    * Determine the request status by custom code
//    * Here is just an example
//    * You can also judge the status by HTTP Status Code
//    */
//   (response) => {
//     if (response.headers['content-disposition']) {
//       return response
//     }
//     const res = response.data
//     return res
//   },
//   (error) => {
//     if ([560].includes(error.response.status) && error.response.data) {
//       // 別のところに既にログインしましたので、再ログインが必要です。再ログインしてください！
//       if (error.response.data.code === 400) {
//         setTimeout(() => {
//           // store.dispatch('user/resetToken')
//         }, 5 * 1000)
//       }
//       if (error.response.data.msg) {
//         Message({
//           message: error.response.data.msg,
//           type: 'error',
//           duration: 5 * 1000,
//         })
//       }
//     } else if ([403].includes(error.response.status) && error.response.data) {
//       Message({
//         message: error.response.data.detail.msg,
//         type: 'error',
//         duration: 5 * 1000,
//       })
//       // store.dispatch('user/logout')
//     } else if ([401].includes(error.response.status)) {
//       // need refresh token
//       const config = error.config
//       if (getRefreshToken()) {
//         if (!isRefreshing) {
//           isRefreshing = true
//           return refreshToken(getRefreshToken())
//             .then((res) => {
//               if (res.data.access_token && res.data.refresh_access_token) {
//                 // setToken(res.data.access_token)
//                 // setRefreshToken(res.data.refresh_access_token)
//                 // config.headers['Authorization'] = `bearer ${getToken()}`

//                 retryRequests.forEach((item) => {
//                   item()
//                 })
//                 retryRequests = []
//                 return request(config)
//               }
//             })
//             .catch(() => {
//               // refresh failed
//               // logout
//               // store.dispatch('user/logout')
//               Message({
//                 message: '再ログインしてください。',
//                 type: 'error',
//                 duration: 5 * 1000,
//               })
//             })
//             .finally(() => {
//               isRefreshing = false
//             })
//         } else {
//           return new Promise((resolve) => {
//             retryRequests.push(() => {
//               config.headers['Authorization'] = `bearer ${getToken()}`
//               resolve(request(config))
//             })
//           })
//         }
//       } else {
//         // store.dispatch('user/logout')
//         Message({
//           message: '再ログインしてください。',
//           type: 'error',
//           duration: 5 * 1000,
//         })
//       }
//     } else if ([500].includes(error.response.status)) {
//       Message({
//         message:
//           'サーバと接続ができないため、この状態がしばらく続くようであれば、システム管理者に連絡して下さい。',
//         type: 'error',
//         duration: 5 * 1000,
//       })
//     }
//     return Promise.reject(error)
//   }
// )
// noAuthRequest
const noAuth = require('axios')
const noAuthRequest = noAuth.create()
// response interceptor
// noAuthRequest.interceptors.response.use(
//   (response) => {
//     return response
//   },
//   (error) => {
//     console.error(error.response.data)
//     if ([560].includes(error.response.status) && error.response.data) {
//       Message({
//         message: error.response.data.msg,
//         type: 'error',
//         duration: 5 * 1000,
//       })
//     } else if ([401].includes(error.response.status) && error.response.data) {
//       // router.push({ path: 'login' })
//       Message({
//         message: '招待の有効期限が切れました、招待者と連絡してください。',
//         type: 'error',
//         duration: 5 * 1000,
//       })
//     } else {
//       Message({
//         message: error.message,
//         type: 'error',
//         duration: 5 * 1000,
//       })
//     }
//     return Promise.reject(error)
//   }
// )

export { noAuthRequest, request }
