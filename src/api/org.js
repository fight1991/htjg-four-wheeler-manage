import { $post_business as $post } from '@/net/netInit'

// 添加企业
export const orgAdd = (data) => {
  return $post({
    url: '/user-center/org/add',
    data
  })
}
// 企业详情
export const orgDetail = (data) => {
  return $post({
    url: '/user-center/org/detail',
    data
  })
}
// 企业 编辑
export const orgEdit = (data) => {
  return $post({
    url: '/user-center/org/edit',
    data
  })
}
// 企业列表
export const orgList = ({ data, page }) => {
  return $post({
    url: '/user-center/org/list',
    data,
    page
  })
}
// 获取城市列表
export const cityList = (data) => {
  return $post({
    url: '/user-center/org/getCityList',
    data
  })
}

// 更新上下线状态
/**
 *  "orgId": 0,
  * "orgStatus": " online/offline"
 */
export const updateOrgStatus = (data) => {
  return $post({
    url: '/user-center/org/updateStatus',
    data
  })
}
