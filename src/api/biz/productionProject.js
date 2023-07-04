import request from '@/utils/request'

export function list(query) {
  return request({
    url: '/system/productionproject/list',
    method: 'get',
    params: query
  })
}

export function listAll(query) {
  return request({
    url: '/system/productionproject/listAll',
    method: 'get',
    params: query
  })
}

export function getInfo(id) {
  return request({
    url: '/system/productionproject/' + id,
    method: 'get',
  })
}

export function save(query) {
  return request({
    url: '/system/productionproject/save',
    method: 'post',
    data: query
  })
}

export function update(query) {
  return request({
    url: '/system/productionproject/update',
    method: 'post',
    data: query
  })
}

// 导出
export function exportData(query) {
  return request({
    url: '/system/productionproject/export',
    method: 'get',
    params: query
  })
}
// 删除生成立项
export function delProductionproject(id) {
  return request({
    url: '/system/productionproject/' + id,
    method: 'delete'
  })
}
// 导出
export function exportOverViewData(query) {
  return request({
    url: '/system/productionproject/exportOverView',
    method: 'get',
    params: query
  })
}
// 导出营销费用统计
export function exportTrackCost(query) {
  return request({
    url: '/system/trackproject/exportCost',
    method: 'get',
    params: query
  })
}
// 导出生产费用统计
export function exportProductionCost(query) {
  return request({
    url: '/system/productionproject/exportCost',
    method: 'get',
    params: query
  })
}




