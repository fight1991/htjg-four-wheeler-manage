// 用户相关api
import { $post_business as $businesss } from '@/net/netInit'

// 退出登录
export const loginOut = (data) => {
  return $businesss({
    url: '/user-center/logout',
    data
  })
}
// 登录
export const goLogin = (data) => {
  return $businesss({
    url: '/user-center/loginByUserName',
    data
  })
}

// 个人信息 个人详情 查询
export const getUserInfo = (data) => {
  return $businesss({
    url: '/user-center/user/getUserInfo',
    data
  })
}
// 修改密码
export const changePassword = (data) => {
  return $businesss({
    url: '/data-user/user/changePassword',
    data
  })
}
// 查询权限
export const getPermissons = (data) => {
  return $businesss({
    url: '/user-center/user/getUserViews',
    data
  })
}

// 会员列表
export const memberList = ({ data, page }) => {
  return $businesss({
    url: '/user-center/user/getMemberList',
    data,
    page
  })
}

// 会员详情
export const memberDetail = (data) => {
  return $businesss({
    url: '/user-center/user/getMemberDetail',
    data
  })
}
