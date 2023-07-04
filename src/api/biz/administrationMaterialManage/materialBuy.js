import request from '@/utils/request'

// 查询耗材采购列表
export function listMaterialBuy(query) {
  return request({
    url: '/administrationMaterialManage/materialBuy/list',
    method: 'get',
    params: query
  })
}

// 查询耗材采购详细
export function getMaterialBuy(id) {
  return request({
    url: '/administrationMaterialManage/materialBuy/' + id,
    method: 'get'
  })
}

// 新增耗材采购
export function addMaterialBuy(data) {
  return request({
    url: '/administrationMaterialManage/materialBuy',
    method: 'post',
    data: data
  })
}

// 修改耗材采购
export function updateMaterialBuy(data) {
  return request({
    url: '/administrationMaterialManage/materialBuy',
    method: 'put',
    data: data
  })
}

// 删除耗材采购
export function delMaterialBuy(id) {
  return request({
    url: '/administrationMaterialManage/materialBuy/' + id,
    method: 'delete'
  })
}

// 导出耗材采购
export function exportMaterialBuy(query) {
  return request({
    url: '/administrationMaterialManage/materialBuy/export',
    method: 'get',
    params: query
  })
}