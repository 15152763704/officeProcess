import request from '@/utils/request'

// 查询货物请购列表
export function listMaterialBuy(query) {
  return request({
    url: '/projectBuy/materialBuy/list',
    method: 'get',
    params: query
  })
}

// 查询货物请购详细
export function getMaterialBuy(id) {
  return request({
    url: '/projectBuy/materialBuy/' + id,
    method: 'get'
  })
}

// 查询货物请购动态表格详细
export function getMaterialBuyClfl(parentId) {
  return request({
    url: '/projectBuy/materialBuy/getClflInfo/' + parentId,
    method: 'get'
  })
}

// 新增货物请购
export function addMaterialBuy(data) {
  return request({
    url: '/projectBuy/materialBuy',
    method: 'post',
    data: data
  })
}

// 修改货物请购
export function updateMaterialBuy(data) {
  return request({
    url: '/projectBuy/materialBuy',
    method: 'put',
    data: data
  })
}

// 删除货物请购
export function delMaterialBuy(id) {
  return request({
    url: '/projectBuy/materialBuy/' + id,
    method: 'delete'
  })
}

// 导出货物请购
export function exportMaterialBuy(query) {
  return request({
    url: '/projectBuy/materialBuy/export',
    method: 'get',
    params: query
  })
}

// 导出货物请购子表模板
export function exportMaterialBuyChildTemplate() {
  return request({
    url: '/projectBuy/materialBuy/exportChildTemplate',
    method: 'get'
  })
}
