import request from '@/utils/request'

// 查询服务请购列表
export function listServiceBuy(query) {
  return request({
    url: '/projectBuy/serviceBuy/list',
    method: 'get',
    params: query
  })
}

// 查询服务请购详细
export function getServiceBuy(id) {
  return request({
    url: '/projectBuy/serviceBuy/' + id,
    method: 'get'
  })
}

// 新增服务请购
export function addServiceBuy(data) {
  return request({
    url: '/projectBuy/serviceBuy',
    method: 'post',
    data: data
  })
}

// 修改服务请购
export function updateServiceBuy(data) {
  return request({
    url: '/projectBuy/serviceBuy',
    method: 'put',
    data: data
  })
}

// 删除服务请购
export function delServiceBuy(id) {
  return request({
    url: '/projectBuy/serviceBuy/' + id,
    method: 'delete'
  })
}

// 导出服务请购
export function exportServiceBuy(query) {
  return request({
    url: '/projectBuy/serviceBuy/export',
    method: 'get',
    params: query
  })
}