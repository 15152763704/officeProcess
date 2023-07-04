import request from '@/utils/request'

export function list(query) {
  return request({
    url: '/system/productionprojectpromotion/list',
    method: 'get',
    params: query
  })
}

export function save(query) {
  return request({
    url: '/system/productionprojectpromotion/save',
    method: 'post',
    data: query
  })
}

/* 导出推进申请 */
export function exportProjectPromotion(query) {
  return request({
    url: '/system/productionprojectpromotion/export/',
    method: 'get',
    params: query
  })
}


// 删除项目推进
export function delProductionprojectpromotion(id) {
  return request({
    url: '/system/productionprojectpromotion/' + id,
    method: 'delete'
  })
}
export function getHisCostByProjectNo(projectNo) {
  return request({
    url: '/system/productionprojectpromotion/getHisCostByProjectNo/' + projectNo,
    method: 'get'
  })
}



