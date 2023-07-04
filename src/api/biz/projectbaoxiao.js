import request from '@/utils/request'

// 查询项目报销列表
export function listProjectbaoxiao(query) {
  return request({
    url: '/ProjectReimbursement/projectbaoxiao/list',
    method: 'get',
    params: query
  })
}

// 查询项目报销详细
export function getProjectbaoxiao(id) {
  return request({
    url: '/ProjectReimbursement/projectbaoxiao/' + id,
    method: 'get'
  })
}

/**
 * 通过 项目编号 查询 总历史报销金额
 * @param ProjectNum
 * @returns {AxiosPromise}
 */
export function getReimbursementByProjectNum(ProjectNum) {
  return request({
    url: '/ProjectReimbursement/projectbaoxiao/getReimbursementByProjectNum/' + ProjectNum,
    method: 'get'
  })
}

// 新增项目报销
export function addProjectbaoxiao(data) {
  return request({
    url: '/ProjectReimbursement/projectbaoxiao',
    method: 'post',
    data: data
  })
}

// 修改项目报销
export function updateProjectbaoxiao(data) {
  return request({
    url: '/ProjectReimbursement/projectbaoxiao',
    method: 'put',
    data: data
  })
}

// 删除项目报销
export function delProjectbaoxiao(id) {
  return request({
    url: '/ProjectReimbursement/projectbaoxiao/' + id,
    method: 'delete'
  })
}

// 导出项目报销
export function exportProjectbaoxiao(query) {
  return request({
    url: '/ProjectReimbursement/projectbaoxiao/export',
    method: 'get',
    params: query
  })
}
