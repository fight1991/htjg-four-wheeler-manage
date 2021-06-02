import { $post_business as $post } from '@/net/netInit'

// 车辆管理api开始>>>>>>>>>>>>>>>>>
// 电子车牌详情
export const eviDetail = (data) => {
  return $post({
    url: '/vehicle-management/operatorVehicle/eviDetail',
    data
  })
}
// 车辆列表
export const carList = ({ data, page }) => {
  return $post({
    url: '/vehicle-management/operatorVehicle/list',
    data,
    page
  })
}
// 解绑电子车牌
export const eviUnbind = (data) => {
  return $post({
    url: '/vehicle-management/operatorVehicle/unbind',
    data
  })
}
// 车辆管理api结束<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
// 网点管理开始>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// 网点列表
export const pointList = ({ data, page }) => {
  return $post({
    url: '/vehicle-management/operatorBranch/list',
    data,
    page
  })
}
// 编辑网点
export const editPoint = (data) => {
  return $post({
    url: '/vehicle-management/operatorBranch/update',
    data
  })
}
// 编辑网点
export const createPoint = (data) => {
  return $post({
    url: '/vehicle-management/operatorBranch/create',
    data
  })
}
// 网点管理结束<<<<<<<<<<<<<<<<<<<<<<<<<<

// 网点领卡开始>>>>>>>>>>>>>>>>>>>>>>>
// 领卡
export const acceptCard = (data) => {
  return $post({
    url: '/vehicle-management/operatorBranchEvi/assign',
    data
  })
}

// 网点名称列表
export const pointNameList = (data) => {
  return $post({
    url: '/vehicle-management/operatorBranchEvi/branchList',
    data
  })
}

// 验证号段是否合法
export const checkNum = (data) => {
  return $post({
    url: '/vehicle-management/operatorBranchEvi/check',
    data
  })
}

// 领卡网点列表
export const acceptCardList = ({ data, page }) => {
  return $post({
    url: '/vehicle-management/operatorBranchEvi/list',
    data,
    page
  })
}
