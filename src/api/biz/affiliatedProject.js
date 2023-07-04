import request from '@/utils/request'

export function list(query) {
  return request({
    url: '/system/affiliatedproject/list',
    method: 'get',
    params: query
  })
}

export function save(query) {
  return request({
    url: '/system/affiliatedproject/save',
    method: 'post',
    data: query
  })
}
// 删除挂靠立项
export function delAffiliatedproject(id) {
  return request({
    url: '/system/affiliatedproject/' + id,
    method: 'delete'
  })
}

// 导出
export function exportData(query) {
  return request({
    url: '/system/affiliatedproject/export',
    method: 'get',
    params: query
  })
}
