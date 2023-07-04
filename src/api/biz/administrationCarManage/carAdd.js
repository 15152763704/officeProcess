import request from '@/utils/request'

// 查询车辆添加列表
export function listCarAdd(query) {
  return request({
    url: '/administrationCarManage/carAdd/list',
    method: 'get',
    params: query
  })
}

// 查询车辆添加详细
export function getCarAdd(id) {
  return request({
    url: '/administrationCarManage/carAdd/' + id,
    method: 'get'
  })
}

// 新增车辆添加
export function addCarAdd(data) {
  return request({
    url: '/administrationCarManage/carAdd',
    method: 'post',
    data: data
  })
}

// 修改车辆添加
export function updateCarAdd(data) {
  return request({
    url: '/administrationCarManage/carAdd',
    method: 'put',
    data: data
  })
}

// 删除车辆添加
export function delCarAdd(id) {
  return request({
    url: '/administrationCarManage/carAdd/' + id,
    method: 'delete'
  })
}

// 导出车辆添加
export function exportCarAdd(query) {
  return request({
    url: '/administrationCarManage/carAdd/export',
    method: 'get',
    params: query
  })
}