import request from '@/utils/request'

// 查询回笼进度列表
export function listBackProgress(query) {
  return request({
    url: '/moneyBack/backProgress/list',
    method: 'get',
    params: query
  })
}

// 查询回笼进度详细
export function getBackProgress(id) {
  return request({
    url: '/moneyBack/backProgress/' + id,
    method: 'get'
  })
}

// 新增回笼进度
export function addBackProgress(data) {
  return request({
    url: '/moneyBack/backProgress',
    method: 'post',
    data: data
  })
}

// 修改回笼进度
export function updateBackProgress(data) {
  return request({
    url: '/moneyBack/backProgress',
    method: 'put',
    data: data
  })
}

// 删除回笼进度
export function delBackProgress(id) {
  return request({
    url: '/moneyBack/backProgress/' + id,
    method: 'delete'
  })
}

// 导出回笼进度
export function exportBackProgress(query) {
  return request({
    url: '/moneyBack/backProgress/export',
    method: 'get',
    params: query
  })
}

// 查询累计回笼金额
export function findTotalMoney(query) {
  return request({
    url: '/moneyBack/backProgress/findTotalMoney',
    method: 'get',
    params: query
  })
}
