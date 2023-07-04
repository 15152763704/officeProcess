import request from '@/utils/request'

// 查询【请填写功能名称】列表
export function listTravel(query) {
  return request({
    url: '/system/travel/list',
    method: 'get',
    params: query
  })
}

// 查询【请填写功能名称】详细
export function getTravel(id) {
  return request({
    url: '/system/travel/' + id,
    method: 'get'
  })
}

// 新增【请填写功能名称】
export function addTravel(data) {
  return request({
    url: '/system/travel',
    method: 'post',
    data: data
  })
}

// 修改【请填写功能名称】
export function updateTravel(data) {
  return request({
    url: '/system/travel',
    method: 'put',
    data: data
  })
}

// 删除【请填写功能名称】
export function delTravel(id) {
  return request({
    url: '/system/travel/' + id,
    method: 'delete'
  })
}

// 导出【请填写功能名称】
export function exportTravel(query) {
  return request({
    url: '/system/travel/export',
    method: 'get',
    params: query
  })
}