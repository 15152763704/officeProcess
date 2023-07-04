import request from '@/utils/request'

// 查询evection列表
export function listEvection(query) {
  return request({
    url: '/system/evection/list',
    method: 'get',
    params: query
  })
}

// 查询myevection列表
export function myListEvection(query) {
  return request({
    url: '/system/evection/my',
    method: 'get',
    params: query
  })
}

// 查询evection详细
export function getEvection(id) {
  return request({
    url: '/system/evection/' + id,
    method: 'get'
  })
}

// 新增evection
export function addEvection(data) {
  return request({
    url: '/system/evection',
    method: 'post',
    data: data
  })
}

// 修改evection
export function updateEvection(data) {
  return request({
    url: '/system/evection',
    method: 'put',
    data: data
  })
}

// 删除evection
export function delEvection(id) {
  return request({
    url: '/system/evection/' + id,
    method: 'delete'
  })
}

// 导出evection
export function exportEvection(query) {
  return request({
    url: '/system/evection/export',
    method: 'get',
    params: query
  })
}
