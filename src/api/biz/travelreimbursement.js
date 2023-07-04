import request from '@/utils/request'

// 查询还款申请列表
export function listTravelreimbursement(query) {
  return request({
    url: '/repayment/travelreimbursement/list',
    method: 'get',
    params: query
  })
}

// 查询还款申请详细
export function getTravelreimbursement(id) {
  return request({
    url: '/repayment/travelreimbursement/' + id,
    method: 'get'
  })
}

// 新增还款申请
export function addTravelreimbursement(data) {
  return request({
    url: '/repayment/travelreimbursement',
    method: 'post',
    data: data
  })
}

// 修改还款申请
export function updateTravelreimbursement(data) {
  return request({
    url: '/repayment/travelreimbursement',
    method: 'put',
    data: data
  })
}

// 删除还款申请
export function delTravelreimbursement(id) {
  return request({
    url: '/repayment/travelreimbursement/' + id,
    method: 'delete'
  })
}

// 导出还款申请
export function exportTravelreimbursement(query) {
  return request({
    url: '/repayment/travelreimbursement/export',
    method: 'get',
    params: query
  })
}