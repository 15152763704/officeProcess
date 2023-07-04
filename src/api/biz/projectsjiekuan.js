import request from '@/utils/request'

// 查询费用借款列表
export function listProjectsjiekuan(query) {
  return request({
    url: '/ProjectLoan/projectsjiekuan/list',
    method: 'get',
    params: query
  })
}

// 查询费用借款详细
export function getProjectsjiekuan(id) {
  return request({
    url: '/ProjectLoan/projectsjiekuan/' + id,
    method: 'get'
  })
}

// 新增费用借款
export function addProjectsjiekuan(data) {
  return request({
    url: '/ProjectLoan/projectsjiekuan',
    method: 'post',
    data: data
  })
}

// 修改费用借款
export function updateProjectsjiekuan(data) {
  return request({
    url: '/ProjectLoan/projectsjiekuan',
    method: 'put',
    data: data
  })
}

// 删除费用借款
export function delProjectsjiekuan(id) {
  return request({
    url: '/ProjectLoan/projectsjiekuan/' + id,
    method: 'delete'
  })
}

// 导出费用借款
export function exportProjectsjiekuan(query) {
  return request({
    url: '/ProjectLoan/projectsjiekuan/export',
    method: 'get',
    params: query
  })
}
