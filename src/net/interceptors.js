import router from '@/router'
import store from '@/store'
import { Message } from 'element-ui'
/**
 * 请求拦截器 onRequestResolve
 * @param {*} config
 */
let tips = false
export default {
  // 请求发送成功之前
  onRequestResolve: function (config) {
    // ajax异步请求
    config.headers['X-Requested-With'] = 'XMLHttpRequest'
    config.headers['token'] = store.state.token
    return config
  },
  // 请求发送失败之前
  onRequestReject: function (error) {
    return Promise.reject(error)
  },
  // 响应成功
  onResponseResolve: function (response) {
    let { code, message } = response.data
    if (code !== '0000') {
      // token不合法的报错
      if (code === '0002') {
        // message只提示一次
        if (tips) return response.data
        tips = true
        Message({
          type: 'error',
          message,
          duration: 2000,
          onClose: () => {
            tips = false
          }
        })
        let sysParams = {}
        if (router.currentRoute.name) { // 说明路由初始化完成,可以拿到当前路由信息
          sysParams.redirect = router.currentRoute.fullPath
        } else {
          sysParams.redirect = location.pathname + location.search
        }
        router.replace({
          path: '/login',
          query: sysParams
        })
      } else { // 其他业务报错9999, 0003
        if (tips) return response.data
        Message.error(message)
      }
    }
    return response.data
  },
  // 响应失败
  onResponseReject: function (error) {
    // 请求已发出，但服务器响应的状态码不在 2xx 范围内
    if (error.response) {
      switch (error.response.status) {
        case 401:
          router.replace({
            path: '/login',
            query: {
              redirect: router.currentRoute.fullPath
            }
          })
          break
        case 403:
          router.push({
            path: '/error/403', // 禁止访问
            query: {
              redirect: router.currentRoute.fullPath
            }
          })
          break
        case 404:
          console.log(error.response)
          Message({
            message: `status:${error.response.status} ${
              'Api Not Found'
            }`,
            type: 'error',
            duration: 5 * 1000
          })
          break
        case 405:
          Message({
            message: `status:${error.response.status} ${
              error.response.statusText
            }`,
            type: 'error',
            duration: 5 * 1000
          })
          break
        case 500:
          router.push('/error/5xx')
          break
        default:
          router.push('/error/5xx')
      }
      return Promise.reject(error.response)
    } else {
      // Something happened in setting up the request that triggered an Error
      return Promise.reject(error.message)
    }
  }
}
