import request from '@/utils/request'

// 查询serially列表
export function listSequence(query) {
  return request({
    url: '/system/sequence/list',
    method: 'post',
    data: query
  })
}

// 查询serially详细
export function getSequence(id) {
  return request({
    url: '/system/sequence/' + id,
    method: 'get'
  })
}

// 新增serially
export function addSequence(data) {
  return request({
    url: '/system/sequence/save',
    method: 'post',
    data: data
  })
}

// 修改serially
export function updateSequence(data) {
  return request({
    url: '/system/sequence/save',
    method: 'post',
    data: data
  })
}

// 删除serially
export function delSequence(id) {
  return request({
    url: '/system/sequence/' + id,
    method: 'delete'
  })
}

// 导出serially
export function exportSequence(query) {
  return request({
    url: '/system/sequence/export',
    method: 'get',
    params: query
  })
}
