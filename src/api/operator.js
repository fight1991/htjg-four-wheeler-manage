// 审核相关api
import { $post_business as $post } from '@/net/netInit'

// 居民车业务开始>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// 备案人变更 - 审核
export const changeCheck = (data) => {
  return $post({
    url: '/ebike-management/operator/changeOwnershipStatus',
    data
  })
}
// 备案人变更 - 详情
export const changeDetail = (data) => {
  return $post({
    url: '/ebike-management/operator/getOwnershipChangeDetail',
    data
  })
}
// 备案人变更 - 列表
export const changeList = ({ data, page }) => {
  return $post({
    url: '/ebike-management/operator/getOwnershipChangeList',
    data,
    page
  })
}
// 备案申报 - 审核
export const recordCheck = (data) => {
  return $post({
    url: '/ebike-management/operator/changeRecordFilingStatus',
    data
  })
}
// 备案申报 - 详情
export const recordDetail = (data) => {
  return $post({
    url: '/ebike-management/operator/getRecordFilingDetail',
    data
  })
}
// 备案申报 - 列表
export const recordList = ({ data, page }) => {
  return $post({
    url: '/ebike-management/operator/getRecordFilingList',
    data,
    page
  })
}
// 报废审核
export const scrapCheck = (data) => {
  return $post({
    url: '/ebike-management/operator/changeScrapStatus',
    data
  })
}
// 报废详情
export const scrapDetail = (data) => {
  return $post({
    url: '/ebike-management/operator/getScrapDetail',
    data
  })
}
// 报废审核列表
export const scrapList = ({ data, page }) => {
  return $post({
    url: '/ebike-management/operator/getScrapList',
    data,
    page
  })
}
// 电动自行车查询
export const vehicleList = ({ data, page }) => {
  return $post({
    url: '/ebike-management/operator/getVehicleList',
    data,
    page
  })
}
// 电动自行车详情
export const vehicleDetail = (data) => {
  return $post({
    url: '/ebike-management/operator/getVehicleDetail',
    data
  })
}
// 居民车业务结束<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

// 行业车业务开始>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// 备案申报 列表
export const industryRecordList = ({ data, page }) => {
  return $post({
    url: '/ebike-management/operator/getIndustryRecordFilingList',
    data,
    page
  })
}

// 备案申报 详情
export const industryRecordDetail = (data) => {
  return $post({
    url: '/ebike-management/operator/getIndustryRecordFilingDetail',
    data
  })
}
// 报废 列表
export const industryScrapList = ({ data, page }) => {
  return $post({
    url: '/ebike-management/operator/getIndustryScrapList',
    data,
    page
  })
}
// 报废详情
export const industryScrapDetail = (data) => {
  return $post({
    url: '/ebike-management/operator/getIndustryScrapDetail',
    data
  })
}
// 备案申报 审核
export const industryRecordCheck = (data) => {
  return $post({
    url: '/ebike-management/operator/industryRecordFilingChangeStatus',
    data
  })
}
// 报废 审核
export const industryScrapCheck = (data) => {
  return $post({
    url: '/ebike-management/operator/industryScrapChangeStatus',
    data
  })
}

// 行业车业务结束<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

// 安装员配置相关api
// 安装员删除
export const operatorDelete = (data) => {
  return $post({
    url: '/user-center/role/delete',
    data
  })
}

// 安装员模糊查询
export const operatorQuery = (data) => {
  return $post({
    url: '/user-center/role/fuzzyQuery',
    isLoad: false,
    data
  })
}
// 安装员列表
export const operatorList = ({ data, page }) => {
  return $post({
    url: '/user-center/role/list',
    data,
    page
  })
}
// 安装员添加
export const operatorAdd = (data) => {
  return $post({
    url: '/user-center/role/add',
    data
  })
}
