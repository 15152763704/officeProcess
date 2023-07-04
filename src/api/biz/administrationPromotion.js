import request from '@/utils/request'

export function list(query) {
  return request({
    url: '/system/administrationpromotion/list',
    method: 'get',
    params: query
  })
}
export function myList(query) {
  return request({
    url: '/system/administrationpromotion/myList',
    method: 'get',
    params: query
  })
}
// 删除新政推进
export function delAdministrationpromotion(id) {
  return request({
    url: '/system/administrationpromotion/' + id,
    method: 'delete'
  })
}
export function save(query) {
  return request({
    url: '/system/administrationpromotion/save',
    method: 'post',
    data: query
  })
}



