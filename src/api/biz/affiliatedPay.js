import request from '@/utils/request'

// 查询付款申请列表
export function listPayment(query) {
  return request({
    url: '/system/affiliatedPay/list',
    method: 'get',
    params: query
  })
}

// 查询付款申请详细
export function getPayment(id) {
  return request({
    url: '/system/affiliatedPay/' + id,
    method: 'get'
  })
}

// 新增付款申请
export function addPayment(data) {
  return request({
    url: '/system/affiliatedPay',
    method: 'post',
    data: data
  })
}

// 修改付款申请
export function updatePayment(data) {
  return request({
    url: '/system/affiliatedPay',
    method: 'put',
    data: data
  })
}

// 删除付款申请
export function delPayment(id) {
  return request({
    url: '/system/affiliatedPay/' + id,
    method: 'delete'
  })
}

// 导出付款申请
export function exportPayment(query) {
  return request({
    url: '/system/affiliatedPay/export',
    method: 'get',
    params: query
  })
}
