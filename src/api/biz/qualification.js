import request from '@/utils/request'

// 查询资质申请列表
export function listQualification(query) {
  return request({
    url: '/system/qualification/list',
    method: 'get',
    params: query
  })
}

// 查询资质申请详细
export function getQualification(id) {
  return request({
    url: '/system/qualification/' + id,
    method: 'get'
  })
}

// 新增资质申请
export function addQualification(data) {
  return request({
    url: '/system/qualification',
    method: 'post',
    data: data
  })
}

// 修改资质申请
export function updateQualification(data) {
  return request({
    url: '/system/qualification',
    method: 'put',
    data: data
  })
}

// 删除资质申请
export function delQualification(id) {
  return request({
    url: '/system/qualification/' + id,
    method: 'delete'
  })
}

// 导出资质申请
export function exportQualification(query) {
  return request({
    url: '/system/qualification/export',
    method: 'get',
    params: query
  })
}