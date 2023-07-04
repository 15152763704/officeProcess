import request from '@/utils/request'

// 查询费用报销列表
export function listXzbaoxiao(query) {
  return request({
    url: '/system/xzbaoxiao/list',
    method: 'get',
    params: query
  })
}

// 查询费用报销详细
export function getXzbaoxiao(id) {
  return request({
    url: '/system/xzbaoxiao/' + id,
    method: 'get'
  })
}

// 新增费用报销
export function addXzbaoxiao(data) {
  return request({
    url: '/system/xzbaoxiao',
    method: 'post',
    data: data
  })
}

// 修改费用报销
export function updateXzbaoxiao(data) {
  return request({
    url: '/system/xzbaoxiao',
    method: 'put',
    data: data
  })
}

// 删除费用报销
export function delXzbaoxiao(id) {
  return request({
    url: '/system/xzbaoxiao/' + id,
    method: 'delete'
  })
}

// 导出费用报销
export function exportXzbaoxiao(query) {
  return request({
    url: '/system/xzbaoxiao/export',
    method: 'get',
    params: query
  })
}