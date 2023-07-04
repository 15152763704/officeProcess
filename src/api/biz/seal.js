import request from '@/utils/request'

// 查询【请填写功能名称】列表
export function listSeal(query) {
  return request({
    url: '/system/seal/list',
    method: 'get',
    params: query
  })
}

// 查询【请填写功能名称】详细
export function getSeal(id) {
  return request({
    url: '/system/seal/' + id,
    method: 'get'
  })
}

// 新增【请填写功能名称】
export function addSeal(data) {
  return request({
    url: '/system/seal',
    method: 'post',
    data: data
  })
}

// 修改【请填写功能名称】
export function updateSeal(data) {
  return request({
    url: '/system/seal',
    method: 'put',
    data: data
  })
}

// 删除【请填写功能名称】
export function delSeal(id) {
  return request({
    url: '/system/seal/' + id,
    method: 'delete'
  })
}

// 导出【请填写功能名称】
export function exportSeal(query) {
  return request({
    url: '/system/seal/export',
    method: 'get',
    params: query
  })
}