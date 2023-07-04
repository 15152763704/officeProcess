import request from '@/utils/request'

// 查询营销还款列表
export function listYxhuankuan(query) {
  return request({
    url: '/MarketRepayment/yxhuankuan/list',
    method: 'get',
    params: query
  })
}

// 查询营销还款详细
export function getYxhuankuan(id) {
  return request({
    url: '/MarketRepayment/yxhuankuan/' + id,
    method: 'get'
  })
}

// 新增营销还款
export function addYxhuankuan(data) {
  return request({
    url: '/MarketRepayment/yxhuankuan',
    method: 'post',
    data: data
  })
}

// 修改营销还款
export function updateYxhuankuan(data) {
  return request({
    url: '/MarketRepayment/yxhuankuan',
    method: 'put',
    data: data
  })
}

// 删除营销还款
export function delYxhuankuan(id) {
  return request({
    url: '/MarketRepayment/yxhuankuan/' + id,
    method: 'delete'
  })
}

// 导出营销还款
export function exportYxhuankuan(query) {
  return request({
    url: '/MarketRepayment/yxhuankuan/export',
    method: 'get',
    params: query
  })
}
