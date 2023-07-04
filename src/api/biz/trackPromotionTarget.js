import request from '@/utils/request'

// 查询serially列表
export function listTarget(query) {
  return request({
    url: '/system/trackPromotionTarget/list',
    method: 'post',
    data: query
  })
}

// 查询serially详细
export function getTarget(id) {
  return request({
    url: '/system/trackPromotionTarget/' + id,
    method: 'get'
  })
}

// 新增serially
export function addTarget(data) {
  return request({
    url: '/system/trackPromotionTarget/save',
    method: 'post',
    data: data
  })
}

// 修改serially
export function updateTarget(data) {
  return request({
    url: '/system/trackPromotionTarget/save',
    method: 'post',
    data: data
  })
}

// 删除serially
export function delTarget(id) {
  return request({
    url: '/system/trackPromotionTarget/' + id,
    method: 'delete'
  })
}


