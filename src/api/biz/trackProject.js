import request from '@/utils/request'

export function list(query) {
  return request({
    url: '/system/trackproject/list',
    method: 'get',
    params: query
  })
}

export function save(query) {
  return request({
    url: '/system/trackproject/save',
    method: 'post',
    data: query
  })
}
// 删除培训申请
export function delTrackproject(id) {
  return request({
    url: '/system/trackproject/' + id,
    method: 'delete'
  })
}
// 导出
export function exportData(query) {
  return request({
    url: '/system/trackproject/export',
    method: 'get',
    params: query
  })
}
