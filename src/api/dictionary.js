import { $post_user as $post } from '@/net/netInit'

/* eslint-disable */

// 查询字典版本
export const checkDictionaryVersion = (data) => {
  return $post({
    url: '/data-dict/dict/batchGetDictVersionTime',
    data
  })
}
// 按需查询字典
export const getDictionaryData = (data, resultType = 'map') => {
  return $post({
    url: '/data-dict/dict/batchGetDictDetail',
    data: {
      dictNames: data,
      resultType
    }
  })
}

// 翻译
export const translateDic = async (dicName, type) => {
  let localKey = 'dicData' + dicName
  let localV = 'dicVersion' + dicName
  let localDicData = localStorage.getItem(localKey)
  let localVersion = localStorage.getItem(localV)
  // 如果本地存在数据, 则查询版本号
  let { result: versionInfo } = await checkDictionaryVersion([dicName])
  if (!versionInfo) return {}
  if (localDicData) {
    if (versionInfo[dicName] == localVersion) {
      return JSON.parse(localDicData)
    }
  }
  localStorage.setItem(localV, versionInfo[dicName])
  // 重新查询
  let { result: dicDataInfo } = await getDictionaryData([dicName], type)
  if (!dicDataInfo) return {}
  localStorage.setItem(localKey, JSON.stringify(dicDataInfo[dicName]))
  return dicDataInfo[dicName]
}
