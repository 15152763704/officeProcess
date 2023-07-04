import request from '@/utils/request'

export function list(query) {
  return request({
    url: '/system/projectpromotion/list',
    method: 'get',
    params: query
  })
}

export function save(query) {
  return request({
    url: '/system/projectpromotion/save',
    method: 'post',
    data: query
  })
}

export function getHisCostByTrackNo(trackNo) {
  return request({
    url: '/system/projectpromotion/getHisCostByTrackNo/' + trackNo,
    method: 'get'
  })
}

/* 导出推进申请 */
export function exportProjectPromotion(query) {
  return request({
    url: '/system/projectpromotion/export/',
    method: 'get',
    params: query
  })
}


// 删除营销推进
export function delProjectpromotion(id) {
  return request({
    url: '/system/projectpromotion/' + id,
    method: 'delete'
  })
}
export function myList(query) {
  return request({
    url: '/system/projectpromotion/my',
    method: 'get',
    params: query
  })
}

