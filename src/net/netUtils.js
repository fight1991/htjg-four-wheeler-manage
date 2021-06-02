import store from '@/store'
import { startLoading, closeLoading } from '@/util'
// post,get方法统一包装
export const requestFunc = async ({ url, data, page, isLoad = true, globalLoading, func }) => {
  // 无论resolve还是reject都返回一个结果
  let tabId = store.state.tab.currentTab
  let loadingStatus = globalLoading || store.state.isGlobalLoading

  try {
    isLoad && startLoading(store, tabId, loadingStatus)
    let res = await func(url, data, page)
    isLoad && closeLoading(store, tabId, loadingStatus)
    if (res.code === '0000') {
      return { result: res.data || true, page: res.page }
    }
    return { other: res }
  } catch (err) {
    isLoad && closeLoading(store, tabId, loadingStatus)
    return { error: err }
  }
}
// all方法统一包装处理一次性批量请求
export const allFunc = async ({ data, isLoad = true, globalLoading, func }) => {
  let res = null
  let tabId = store.state.tab.currentTab
  let loadingStatus = globalLoading || store.state.isGlobalLoading
  try {
    isLoad && startLoading(store, tabId, loadingStatus)
    res = await func(data)
    isLoad && closeLoading(store, tabId, loadingStatus)
    return res
  } catch (err) {
    isLoad && closeLoading(store, tabId, loadingStatus)
    return false
  }
}
