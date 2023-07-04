import request from '@/utils/request'

// 查询耗材领用列表
export function listMaterialUsed(query) {
  return request({
    url: '/administrationMaterialManage/materialUsed/list',
    method: 'get',
    params: query
  })
}

// 查询耗材领用详细
export function getMaterialUsed(id) {
  return request({
    url: '/administrationMaterialManage/materialUsed/' + id,
    method: 'get'
  })
}

// 新增耗材领用
export function addMaterialUsed(data) {
  return request({
    url: '/administrationMaterialManage/materialUsed',
    method: 'post',
    data: data
  })
}

// 修改耗材领用
export function updateMaterialUsed(data) {
  return request({
    url: '/administrationMaterialManage/materialUsed',
    method: 'put',
    data: data
  })
}

// 删除耗材领用
export function delMaterialUsed(id) {
  return request({
    url: '/administrationMaterialManage/materialUsed/' + id,
    method: 'delete'
  })
}

// 导出耗材领用
export function exportMaterialUsed(query) {
  return request({
    url: '/administrationMaterialManage/materialUsed/export',
    method: 'get',
    params: query
  })
}