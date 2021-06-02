import { $post_business as $post, $upload } from '@/net/netInit'
import { Message } from 'element-ui'
/* eslint-disable */

export const upload_token = () => {
  return $post({
    url: '/user-center/token/getUploadToken'
  })
}
// 私有上传
export const upload_private = (uploadToken, file, accountId) => {
  let formData = new FormData()
  formData.append('uploadToken', uploadToken)
  formData.append('file', file)
  formData.append('accountId', accountId)
  return $upload({
    url: '/service-oss/upload/uploadPrivate',
    data: formData
  })
}
// 共享上传
export const upload_public = (uploadToken, file) => {
  let formData = new FormData()
  formData.append('uploadToken', uploadToken)
  formData.append('file', file)
  return $upload({
    url: '/service-oss/upload/uploadPublic',
    data: formData
  })
}
// 获取文件token 并上传图片得到文件服务器中的地址
export const upload_func_private = async ({ file, accountId }) => {
  if (!accountId) {
    Message.error('账户id不能为空!')
    return null
  }
  let { result: token } = await upload_token()
  if (!token) return null
  let { result: res2 } = await upload_private(token, file, accountId)
  if (!res2) return null  
  return res2
}
export const upload_func_public = async ({ file }) => {
  let { result: token } = await upload_token()
  if (!token) return null
  let { result: res2 } = await upload_public(token, file)
  if (!res2) return null
  return res2
}