import axios from 'axios'
import interceptors from './interceptors'
import { requestFunc, allFunc } from './netUtils'
let {
  onRequestResolve,
  onRequestReject,
  onResponseResolve,
  onResponseReject
} = interceptors

// 入参统一包装
const paramsPack = (data, page = {}) => {
  return {
    accessType: 'pc',
    data,
    page
  }
}

/* eslint-disable */
// axios构造实例类
class InitAxios {
  constructor (baseURL, proxyHead) {
    this.instance = axios.create({
      // 开发环境中以/api开头的接口需要设置代理
      baseURL: process.env.NODE_ENV === 'development' ? proxyHead : baseURL,
      timeout: 15000
    })
    this.instance.interceptors.request.use(onRequestResolve, onRequestReject)
    this.instance.interceptors.response.use(onResponseResolve, onResponseReject)
  }
}

// 配置get/post等请求实例
// 用户相关
const Fetch_USER = new InitAxios(process.env.VUE_APP_USER_API, '/api/user')['instance']
// 车辆相关
const Fetch_BUSINESS = new InitAxios(process.env.VUE_APP_BUSINESS_API, '/api/business')['instance']
// 上传
const Fetch_UPLOAD = new InitAxios(process.env.VUE_APP_FILE, '/api/file')['instance']

// 初始化post方法
const userPostInstance = (url, data, page) => {
  return Fetch_USER['post'](url, paramsPack(data, page))
}
const businessPostInstance = (url, data, page) => {
  return Fetch_BUSINESS['post'](url, paramsPack(data, page))
}
// 初始化upload方法
const uploadInstance = (url, data) => {
  return Fetch_UPLOAD['post'](url, data, { headers: { 'Content-Type': 'multipart/form-data' } })
}
// 初始化批量请求all方法
const allInstance = (data, page) => {
  return Promise.all(paramsPack(data, page))
}

export const $post_user = ({ url, data, page, isLoad, globalLoading }) => {
  return requestFunc({ url, data, page, isLoad, globalLoading, func: userPostInstance })
}
export const $post_business = ({ url, data, page, isLoad, globalLoading }) => {
  return requestFunc({ url, data, page, isLoad, globalLoading, func: businessPostInstance })
}
export const $upload = ({ url, data, isLoad, globalLoading }) => {
  return requestFunc({ url, data, isLoad, globalLoading, func: uploadInstance })
}
export const $all = ({ data, page, isLoad, globalLoading }) => {
  // data数据类型为 List<Promise>
  return allFunc({ data, page, isLoad, globalLoading, func: allInstance })
}
