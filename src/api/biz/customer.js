import request from '@/utils/request'

export function list(query) {
  return request({
    url: '/system/customer/list',
    method: 'get',
    params: query
  })
}

export function save(query) {
  return request({
    url: '/system/customer/save',
    method: 'post',
    data: query
  })
}


export function getInfo(id) {
  return request({
    url: "/system/customer/" + id,
    method: "get"
  });
}

