import request from '@/utils/request'

// 查询预警提醒列表
export function listIndexWarning(query) {
  return request({
    url: '/IndexController/list',
    method: 'get',
    params: query
  })
}
