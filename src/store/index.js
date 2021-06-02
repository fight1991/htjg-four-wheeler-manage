import Vuex from 'vuex'

// 一次性导入所有modules
const modulesFiles = require.context('./modules', true, /\.js$/)
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // './set.js' => set
  let moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  let value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})

const state = {
  token: '', // 用户令牌
  tableH: 330, // 表格高度
  successCode: '0000', // 业务成功状态码
  isFirst: true, // 是否第一次进入系统
  collapse: false, // 是否折叠
  loadingNum: 0, // 全局loading数量计数, 防止一个请求没有回来被另一个请求关掉了
  tabView: true, // 是否开启页签模式
  isGlobalLoading: false, // 是否进入后台管理(business)页面, 是的话设置适当的loading范围
  pagination: {
    pageSize: 10,
    pageIndex: 1,
    total: 0
  },
  access: -1, // 0 游客， 1 终端用户 ，2 安装商 3 代理商 ，255 厂商
  userInfo: {},
  permissions: [],
  errorInfo: {}
}
const getters = {
  isLoading (state) {
    return state.loadingNum > 0
  },
  username (state) {
    return state.userInfo.userName
  }
}
const mutations = {
  saveToken (state, token) {
    state.token = token
  },
  changeLoading (state, res) {
    res ? state.loadingNum++ : state.loadingNum--
    if (state.loadingNum < 0) {
      state.loadingNum = 0
    }
  },
  changeLoadingStatus (state, type) {
    state.isGlobalLoading = type
  },
  changeCollapse (state, status) {
    if (status) {
      state.collapse = (status === 1)
    } else {
      state.collapse = !state.collapse
    }
  },
  toggleLang (state, payLoad) {
    state.lang = payLoad
  },
  setAccess (state, payLoad) { // 用户权限
    state.access = payLoad
  },
  setUserInfo (state, payLoad) {
    state.userInfo = payLoad
  },
  setPermissions (state, payLoad) {
    state.permissions = payLoad
  },
  changeFirst (state, payLoad) {
    state.isFirst = payLoad
  },
  getErrorInfo (state, errorInfo) {
    state.errorInfo = errorInfo
  },
  changeErrorStatus (state, status) {
    state.hasErrorInfo = status
  }
}
const actions = {}
export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions,
  modules
})
