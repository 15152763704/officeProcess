import request from '@/utils/request'

// 查询公告发文列表
export function listGonggao(query) {
  return request({
    url: '/notice/gonggao/list',
    method: 'get',
    params: query
  })
}

// 查询公告发文详细
export function getGonggao(id) {
  return request({
    url: '/notice/gonggao/' + id,
    method: 'get'
  })
}

// 新增公告发文
export function addGonggao(data) {
  return request({
    url: '/notice/gonggao',
    method: 'post',
    data: data
  })
}

// 修改公告发文
export function updateGonggao(data) {
  return request({
    url: '/notice/gonggao',
    method: 'put',
    data: data
  })
}

// 删除公告发文
export function delGonggao(id) {
  return request({
    url: '/notice/gonggao/' + id,
    method: 'delete'
  })
}

// 导出公告发文
export function exportGonggao(query) {
  return request({
    url: '/notice/gonggao/export',
    method: 'get',
    params: query
  })
}

// 查询当前登录人可显示的抄送公告
export function currentCcDept() {
  return request({
    url: '/notice/gonggao/currentCcDept',
    method: 'get',
  })
}

//移动端查询显示公告
export function getNoticeOsList(params) {
  return request({
    url: '/notice/gonggao/oslist',
    method: 'get',
    params,
  })
}


// 导出
export function exportData(query) {
  return request({
    url: '/notice/gonggao/export',
    method: 'get',
    params: query
  })
}
