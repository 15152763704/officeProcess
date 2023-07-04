import request from '@/utils/request'

// 查询需求申请列表
export function listNeetApply(query) {
  return request({
    url: '/peopleChange/neetApply/list',
    method: 'get',
    params: query
  })
}

// 查询需求申请详细
export function getNeetApply(id) {
  return request({
    url: '/peopleChange/neetApply/' + id,
    method: 'get'
  })
}

// 新增需求申请
export function addNeetApply(data) {
  return request({
    url: '/peopleChange/neetApply',
    method: 'post',
    data: data
  })
}

// 修改需求申请
export function updateNeetApply(data) {
  return request({
    url: '/peopleChange/neetApply',
    method: 'put',
    data: data
  })
}

// 删除需求申请
export function delNeetApply(id) {
  return request({
    url: '/peopleChange/neetApply/' + id,
    method: 'delete'
  })
}

// 导出需求申请
export function exportNeetApply(query) {
  return request({
    url: '/peopleChange/neetApply/export',
    method: 'get',
    params: query
  })
}