import store from '@/store'
import storage from '@/util/storage'
import Vue from 'vue'
import NProgress from 'nprogress'
import initUserInfo from '../api/initUserInfo'
NProgress.configure({ showSpinner: false })

const _this = Vue.prototype

// 登录校验、放行 注意: 有些cdn路由版本 地址栏输入路由地址时会加载2次
const beforeEach = async (to, from, next) => {
  NProgress.start()
  // 访问store router.app.$options.store
  // 是否是开启全局loading
  store.commit('changeLoadingStatus', !to.path.includes('bus'))
  // 登录页直接放行
  if (to.path === '/login') {
    storage.removeStorage('token')
    storage.clearSession()
    store.commit('changeFirst', true)
    next()
    return
  }
  // 不需权限,直接放行,/error-xx等
  if (to.meta.requiresAuth === false) {
    next()
    return
  }
  // token不存在,跳转到login
  if (!storage.getStorage('token')) {
    next('/login')
    return
  }
  // 第一次进入系统需要获取权限状态和用户信息(刷新地址栏)
  if (store.state.isFirst) {
    // 将token保存在内存中
    store.state.token = storage.getStorage('token')
    // 用户信息查询
    // 权限查询
    await initUserInfo()
    store.commit('changeFirst', false)
  }
  // 路由跳转鉴别权限
  if (to.meta.permission && !store.state.permissions.includes(to.meta.permission)) {
    _this.$message.error('无权访问此页面,请联系管理员!')
    return
  }
  next()
}

const afterEach = (to, from) => {
  NProgress.done()
  document.title = to.meta.title || 'HTJG'
  if (store.state.tabView && to.meta.component) {
    if (store.state.tab.isInitTab) {
      _this.$tab.append({
        name: to.name,
        query: to.query,
        params: to.params
      })
    }
    store.dispatch('setInitTabStatus', false)
    // token异常拦截到登录页 有可能dom没更新完成就跳转到登录页,造成echart渲染异常
    // 从login页面跳到指定redirect中的地址,刷新组件
    // if (from.query.redirect) {
    //   store.dispatch('refreshTab', { name: to.name })
    // }
  }
}

export { beforeEach, afterEach }
