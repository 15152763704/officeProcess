import request from '@/utils/request'

// 查询人事报销列表
export function listChailvbaoxiao(query) {
  return request({
    url: '/system/chailvbaoxiao/list',
    method: 'get',
    params: query
  })
}

// 查询人事报销详细
export function getChailvbaoxiao(id) {
  return request({
    url: '/system/chailvbaoxiao/' + id,
    method: 'get'
  })
}

// 新增人事报销
export function addChailvbaoxiao(data) {
  return request({
    url: '/system/chailvbaoxiao',
    method: 'post',
    data: data
  })
}

// 修改人事报销
export function updateChailvbaoxiao(data) {
  return request({
    url: '/system/chailvbaoxiao',
    method: 'put',
    data: data
  })
}

// 删除人事报销
export function delChailvbaoxiao(id) {
  return request({
    url: '/system/chailvbaoxiao/' + id,
    method: 'delete'
  })
}

// 导出人事报销
export function exportChailvbaoxiao(query) {
  return request({
    url: '/system/chailvbaoxiao/export',
    method: 'get',
    params: query
  })
}