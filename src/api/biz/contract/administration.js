import request from '@/utils/request'

// 查询行政合同申请列表
export function listAdministration(query) {
  return request({
    url: '/contract/administration/list',
    method: 'get',
    params: query
  })
}

// 查询行政合同申请详细
export function getAdministration(id) {
  return request({
    url: '/contract/administration/' + id,
    method: 'get'
  })
}

// 新增行政合同申请
export function addAdministration(data) {
  return request({
    url: '/contract/administration',
    method: 'post',
    data: data
  })
}

// 修改行政合同申请
export function updateAdministration(data) {
  return request({
    url: '/contract/administration',
    method: 'put',
    data: data
  })
}

// 删除行政合同申请
export function delAdministration(id) {
  return request({
    url: '/contract/administration/' + id,
    method: 'delete'
  })
}

// 导出行政合同申请
export function exportAdministration(query) {
  return request({
    url: '/contract/administration/export',
    method: 'get',
    params: query
  })
}