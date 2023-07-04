//公共请求js
import request from '@/utils/request'

// 查询【请填写功能名称】列表
export function initHtbh(query) {
  return request({
    url: '/system/sequence/sequenceFormat',
    method: 'get',
    params: query
  })
}
