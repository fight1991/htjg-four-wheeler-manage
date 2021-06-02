import { MessageBox } from 'element-ui'
export function openConfirm ({ header = '提示', content = 'nothing', type = 'warning', showHeader = true }) {
  let headerTip = showHeader ? header : ''
  return MessageBox.confirm(content, headerTip, {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type
  }).then(() => true).catch(() => false)
}

export default {
  install (Vue) {
    Vue.prototype.$openConfirm = openConfirm
  }
}
