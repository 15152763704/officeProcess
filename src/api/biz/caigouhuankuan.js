import request from '@/utils/request'

// 查询采购还款列表
export function listCaigouhuankuan(query) {
  return request({
    url: '/system/caigouhuankuan/list',
    method: 'get',
    params: query
  })
}

// 查询采购还款详细
export function getCaigouhuankuan(id) {
  return request({
    url: '/system/caigouhuankuan/' + id,
    method: 'get'
  })
}

// 新增采购还款
export function addCaigouhuankuan(data) {
  return request({
    url: '/system/caigouhuankuan',
    method: 'post',
    data: data
  })
}

// 修改采购还款
export function updateCaigouhuankuan(data) {
  return request({
    url: '/system/caigouhuankuan',
    method: 'put',
    data: data
  })
}

// 删除采购还款
export function delCaigouhuankuan(id) {
  return request({
    url: '/system/caigouhuankuan/' + id,
    method: 'delete'
  })
}

// 导出采购还款
export function exportCaigouhuankuan(query) {
  return request({
    url: '/system/caigouhuankuan/export',
    method: 'get',
    params: query
  })
}