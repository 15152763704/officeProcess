import request from '@/utils/request'

// 查询还车管理列表
export function listReturnCar(query) {
  return request({
    url: '/administrationCarManage/returnCar/list',
    method: 'get',
    params: query
  })
}

// 查询还车管理详细
export function getReturnCar(id) {
  return request({
    url: '/administrationCarManage/returnCar/' + id,
    method: 'get'
  })
}

// 新增还车管理
export function addReturnCar(data) {
  return request({
    url: '/administrationCarManage/returnCar',
    method: 'post',
    data: data
  })
}

// 修改还车管理
export function updateReturnCar(data) {
  return request({
    url: '/administrationCarManage/returnCar',
    method: 'put',
    data: data
  })
}

// 删除还车管理
export function delReturnCar(id) {
  return request({
    url: '/administrationCarManage/returnCar/' + id,
    method: 'delete'
  })
}

// 导出还车管理
export function exportReturnCar(query) {
  return request({
    url: '/administrationCarManage/returnCar/export',
    method: 'get',
    params: query
  })
}