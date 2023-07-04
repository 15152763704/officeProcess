import request from '@/utils/request'

// 查询开票申请列表
export function listInvoiceApply(query) {
  return request({
    url: '/moneyBack/invoiceApply/list',
    method: 'get',
    params: query
  })
}

// 查询开票申请详细
export function getInvoiceApply(id) {
  return request({
    url: '/moneyBack/invoiceApply/' + id,
    method: 'get'
  })
}

// 新增开票申请
export function addInvoiceApply(data) {
  return request({
    url: '/moneyBack/invoiceApply',
    method: 'post',
    data: data
  })
}

// 修改开票申请
export function updateInvoiceApply(data) {
  return request({
    url: '/moneyBack/invoiceApply',
    method: 'put',
    data: data
  })
}

// 删除开票申请
export function delInvoiceApply(id) {
  return request({
    url: '/moneyBack/invoiceApply/' + id,
    method: 'delete'
  })
}

// 导出开票申请
export function exportInvoiceApply(query) {
  return request({
    url: '/moneyBack/invoiceApply/export',
    method: 'get',
    params: query
  })
}