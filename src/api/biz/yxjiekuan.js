import request from '@/utils/request'

// 查询营销借款列表
export function listYxjiekuan(query) {
  return request({
    url: '/system/yxjiekuan/list',
    method: 'get',
    params: query
  })
}

// 查询我的营销借款列表
export function mylistYxjiekuan(query) {
  return request({
    url: '/system/yxjiekuan/my',
    method: 'get',
    params: query
  })
}

// 查询营销借款详细
export function getYxjiekuan(id) {
  return request({
    url: '/system/yxjiekuan/' + id,
    method: 'get'
  })
}

// 新增营销借款
export function addYxjiekuan(data) {
  return request({
    url: '/system/yxjiekuan',
    method: 'post',
    data: data
  })
}

// 修改营销借款
export function updateYxjiekuan(data) {
  return request({
    url: '/system/yxjiekuan',
    method: 'put',
    data: data
  })
}

// 删除营销借款
export function delYxjiekuan(id) {
  return request({
    url: '/system/yxjiekuan/' + id,
    method: 'delete'
  })
}

// 导出营销借款
export function exportYxjiekuan(query) {
  return request({
    url: '/system/yxjiekuan/export',
    method: 'get',
    params: query
  })
}
