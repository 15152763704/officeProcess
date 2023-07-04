import request from '@/utils/request'

// 查询borrow列表
export function listTraveladvance(query) {
  return request({
    url: '/system/traveladvance/list',
    method: 'get',
    params: query
  })
}

// 查询borrow详细
export function getTraveladvance(id) {
  return request({
    url: '/system/traveladvance/' + id,
    method: 'get'
  })
}

// 查询当前用户已完成未还清列表
export function getMyLoanInfo(query) {
  return request({
    url: '/system/traveladvance/my',
    method: 'get',
    params: query
  })
}

// 新增borrow
export function addTraveladvance(data) {
  return request({
    url: '/system/traveladvance',
    method: 'post',
    data: data
  })
}

// 修改borrow
export function updateTraveladvance(data) {
  return request({
    url: '/system/traveladvance',
    method: 'put',
    data: data
  })
}

// 删除borrow
export function delTraveladvance(id) {
  return request({
    url: '/system/traveladvance/' + id,
    method: 'delete'
  })
}

// 导出borrow
export function exportTraveladvance(query) {
  return request({
    url: '/system/traveladvance/export',
    method: 'get',
    params: query
  })
}
