import request from '@/utils/request'

// 查询项目还款列表
export function listProjectshuankuan(query) {
  return request({
    url: '/ProjectRepayment/projectshuankuan/list',
    method: 'get',
    params: query
  })
}

// 查询项目还款详细
export function getProjectshuankuan(id) {
  return request({
    url: '/ProjectRepayment/projectshuankuan/' + id,
    method: 'get'
  })
}

// 新增项目还款
export function addProjectshuankuan(data) {
  return request({
    url: '/ProjectRepayment/projectshuankuan',
    method: 'post',
    data: data
  })
}

// 修改项目还款
export function updateProjectshuankuan(data) {
  return request({
    url: '/ProjectRepayment/projectshuankuan',
    method: 'put',
    data: data
  })
}

// 删除项目还款
export function delProjectshuankuan(id) {
  return request({
    url: '/ProjectRepayment/projectshuankuan/' + id,
    method: 'delete'
  })
}

// 导出项目还款
export function exportProjectshuankuan(query) {
  return request({
    url: '/ProjectRepayment/projectshuankuan/export',
    method: 'get',
    params: query
  })
}
