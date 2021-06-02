// 初始化用户信息
import store from '@/store'
import { getPermissons, getUserInfo } from './user'
const initUserInfo = async () => {
  let { result: userInfo } = await getUserInfo()
  if (userInfo) {
    store.commit('setUserInfo', userInfo)
    let { result: permissions } = await getPermissons({
      accountId: userInfo.accountId,
      appId: process.env.VUE_APP_APPID,
      orgId: userInfo.orgId
    })
    permissions && store.commit('setPermissions', permissions)
  }
  return true
}
export default initUserInfo
