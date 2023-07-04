import request from '@/utils/request'

// 查询营销报销列表
export function listYxbaoxiao(query) {
  return request({
    url: '/MarketingReimbursement/yxbaoxiao/list',
    method: 'get',
    params: query
  })
}

// 查询营销报销详细
export function getYxbaoxiao(id) {
  return request({
    url: '/MarketingReimbursement/yxbaoxiao/' + id,
    method: 'get'
  })
}

// 新增营销报销
export function addYxbaoxiao(data) {
  return request({
    url: '/MarketingReimbursement/yxbaoxiao',
    method: 'post',
    data: data
  })
}

// 修改营销报销
export function updateYxbaoxiao(data) {
  return request({
    url: '/MarketingReimbursement/yxbaoxiao',
    method: 'put',
    data: data
  })
}

// 删除营销报销
export function delYxbaoxiao(id) {
  return request({
    url: '/MarketingReimbursement/yxbaoxiao/' + id,
    method: 'delete'
  })
}

// 导出营销报销
export function exportYxbaoxiao(query) {
  return request({
    url: '/MarketingReimbursement/yxbaoxiao/export',
    method: 'get',
    params: query
  })
}
