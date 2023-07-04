import request from '@/utils/request'

// 查询转正申请列表
export function listTansferFormer(query) {
  return request({
    url: '/peopleChange/tansferFormer/list',
    method: 'get',
    params: query
  })
}

// 查询转正申请详细
export function getTansferFormer(id) {
  return request({
    url: '/peopleChange/tansferFormer/' + id,
    method: 'get'
  })
}

// 新增转正申请
export function addTansferFormer(data) {
  return request({
    url: '/peopleChange/tansferFormer',
    method: 'post',
    data: data
  })
}

// 修改转正申请
export function updateTansferFormer(data) {
  return request({
    url: '/peopleChange/tansferFormer',
    method: 'put',
    data: data
  })
}

// 删除转正申请
export function delTansferFormer(id) {
  return request({
    url: '/peopleChange/tansferFormer/' + id,
    method: 'delete'
  })
}

// 导出转正申请
export function exportTansferFormer(query) {
  return request({
    url: '/peopleChange/tansferFormer/export',
    method: 'get',
    params: query
  })
}