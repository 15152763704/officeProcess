import request from '@/utils/request'

// 查询车辆预定列表
export function listCarApply(query) {
  return request({
    url: '/administrationCarManage/carApply/list',
    method: 'get',
    params: query
  })
}

// 查询车辆预定详细
export function getCarApply(id) {
  return request({
    url: '/administrationCarManage/carApply/' + id,
    method: 'get'
  })
}

// 新增车辆预定
export function addCarApply(data) {
  return request({
    url: '/administrationCarManage/carApply',
    method: 'post',
    data: data
  })
}

// 修改车辆预定
export function updateCarApply(data) {
  return request({
    url: '/administrationCarManage/carApply',
    method: 'put',
    data: data
  })
}

// 删除车辆预定
export function delCarApply(id) {
  return request({
    url: '/administrationCarManage/carApply/' + id,
    method: 'delete'
  })
}

// 导出车辆预定
export function exportCarApply(query) {
  return request({
    url: '/administrationCarManage/carApply/export',
    method: 'get',
    params: query
  })
}