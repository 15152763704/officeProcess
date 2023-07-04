import request from '@/utils/request'

// 查询purchaseCost列表
export function listCaigouloan(query) {
  return request({
    url: '/system/caigouloan/list',
    method: 'get',
    params: query
  })
}

// 查询purchaseCost详细
export function getCaigouloan(id) {
  return request({
    url: '/system/caigouloan/' + id,
    method: 'get'
  })
}

export function getInfoByParentId(parentId) {
  return request({
    url: '/system/goodspurchaselist/getInfoByParentId/' + parentId,
    method: 'get'
  })
}

// 新增purchaseCost
export function addCaigouloan(data) {
  return request({
    url: '/system/caigouloan',
    method: 'post',
    data: data
  })
}

// 修改purchaseCost
export function updateCaigouloan(data) {
  return request({
    url: '/system/caigouloan',
    method: 'put',
    data: data
  })
}

// 删除purchaseCost
export function delCaigouloan(id) {
  return request({
    url: '/system/caigouloan/' + id,
    method: 'delete'
  })
}

// 导出purchaseCost
export function exportCaigouloan(query) {
  return request({
    url: '/system/caigouloan/export',
    method: 'get',
    params: query
  })
}
