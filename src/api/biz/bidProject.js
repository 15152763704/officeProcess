import request from '@/utils/request'

export function list(query) {
  return request({
    url: '/system/bidproject/list',
    method: 'get',
    params: query
  })
}

export function save(query) {
  return request({
    url: '/system/bidproject/save',
    method: 'post',
    data: query
  })
}

export function mylist(query) {
  return request({
    url: '/system/bidproject/my',
    method: 'get',
    params: query
  })
}
// 删除新政推进
export function delBidproject(id) {
  return request({
    url: '/system/bidproject/' + id,
    method: 'delete'
  })
}
// 导出
export function exportData(query) {
  return request({
    url: '/system/bidproject/export',
    method: 'get',
    params: query
  })
}

