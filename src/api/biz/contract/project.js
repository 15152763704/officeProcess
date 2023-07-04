import request from '@/utils/request'

// 查询项目合同申请列表
export function listProject(query) {
  return request({
    url: '/contract/project/list',
    method: 'get',
    params: query
  })
}

// 查询项目合同申请详细
export function getProject(id) {
  return request({
    url: '/contract/project/' + id,
    method: 'get'
  })
}

// 新增项目合同申请
export function addProject(data) {
  return request({
    url: '/contract/project',
    method: 'post',
    data: data
  })
}

// 修改项目合同申请
export function updateProject(data) {
  return request({
    url: '/contract/project',
    method: 'put',
    data: data
  })
}

// 删除项目合同申请
export function delProject(id) {
  return request({
    url: '/contract/project/' + id,
    method: 'delete'
  })
}

// 导出项目合同申请
export function exportProject(query) {
  return request({
    url: '/contract/project/export',
    method: 'get',
    params: query
  })
}