import request from '@/utils/request'

// 查询采购报销列表
export function listBaoxiao(query) {
  return request({
    url: '/PurchaseReimbursement/baoxiao/list',
    method: 'get',
    params: query
  })
}

// 查询采购报销详细
export function getBaoxiao(id) {
  return request({
    url: '/PurchaseReimbursement/baoxiao/' + id,
    method: 'get'
  })
}

// 新增采购报销
export function addBaoxiao(data) {
  return request({
    url: '/PurchaseReimbursement/baoxiao',
    method: 'post',
    data: data
  })
}

// 修改采购报销
export function updateBaoxiao(data) {
  return request({
    url: '/PurchaseReimbursement/baoxiao',
    method: 'put',
    data: data
  })
}

// 删除采购报销
export function delBaoxiao(id) {
  return request({
    url: '/PurchaseReimbursement/baoxiao/' + id,
    method: 'delete'
  })
}

// 导出采购报销
export function exportBaoxiao(query) {
  return request({
    url: '/PurchaseReimbursement/baoxiao/export',
    method: 'get',
    params: query
  })
}