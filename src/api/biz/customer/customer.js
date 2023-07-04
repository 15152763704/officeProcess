import request from '@/utils/request'

// 查询customer列表
export function listCustomer(query) {
  return request({
    url: '/customer/customer/list',
    method: 'get',
    params: query
  })
}

// 查询customer详细
export function getCustomer(id) {
  return request({
    url: '/customer/customer/' + id,
    method: 'get'
  })
}

// 新增customer
export function addCustomer(data) {
  return request({
    url: '/customer/customer',
    method: 'post',
    data: data
  })
}

// 修改customer
export function updateCustomer(data) {
  return request({
    url: '/customer/customer',
    method: 'put',
    data: data
  })
}

// 删除customer
export function delCustomer(id) {
  return request({
    url: '/customer/customer/' + id,
    method: 'delete'
  })
}

// 导出customer
export function exportCustomer(query) {
  return request({
    url: '/customer/customer/export',
    method: 'get',
    params: query
  })
}