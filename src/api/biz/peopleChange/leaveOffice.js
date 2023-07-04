import request from '@/utils/request'

// 查询离职申请列表
export function listLeaveOffice(query) {
  return request({
    url: '/peopleChange/leaveOffice/list',
    method: 'get',
    params: query
  })
}

// 查询离职申请详细
export function getLeaveOffice(id) {
  return request({
    url: '/peopleChange/leaveOffice/' + id,
    method: 'get'
  })
}

// 新增离职申请
export function addLeaveOffice(data) {
  return request({
    url: '/peopleChange/leaveOffice',
    method: 'post',
    data: data
  })
}

// 修改离职申请
export function updateLeaveOffice(data) {
  return request({
    url: '/peopleChange/leaveOffice',
    method: 'put',
    data: data
  })
}

// 删除离职申请
export function delLeaveOffice(id) {
  return request({
    url: '/peopleChange/leaveOffice/' + id,
    method: 'delete'
  })
}

// 导出离职申请
export function exportLeaveOffice(query) {
  return request({
    url: '/peopleChange/leaveOffice/export',
    method: 'get',
    params: query
  })
}