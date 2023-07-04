import request from '@/utils/request'

// 查询行政办公还款列表
export function listXzrepayment(query) {
  return request({
    url: '/system/xzrepayment/list',
    method: 'get',
    params: query
  })
}

// 查询行政办公还款详细
export function getXzrepayment(id) {
  return request({
    url: '/system/xzrepayment/' + id,
    method: 'get'
  })
}

// 新增行政办公还款
export function addXzrepayment(data) {
  return request({
    url: '/system/xzrepayment',
    method: 'post',
    data: data
  })
}

// 修改行政办公还款
export function updateXzrepayment(data) {
  return request({
    url: '/system/xzrepayment',
    method: 'put',
    data: data
  })
}

// 删除行政办公还款
export function delXzrepayment(id) {
  return request({
    url: '/system/xzrepayment/' + id,
    method: 'delete'
  })
}

// 导出行政办公还款
export function exportXzrepayment(query) {
  return request({
    url: '/system/xzrepayment/export',
    method: 'get',
    params: query
  })
}