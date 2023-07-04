import request from '@/utils/request'

// 查询卡片数据
export function getCardData(query) {
  return request({
    url: '/system/promotionAnalysis/getCardData',
    method: 'get',
    params: query
  })
}

// 查询营销人员分析（部门）
export function getDeptTableData(query) {
  return request({
    url: '/system/promotionAnalysis/getDeptTableData',
    method: 'get',
    params: query
  })
}

// 查询营销人员分析（个人）
export function getSingleTableData(query) {
  return request({
    url: '/system/promotionAnalysis/getSingleTableData',
    method: 'get',
    params: query
  })
}

// 查询人员列表（个人）
export function getDeptUserDict(query) {
  return request({
    url: '/system/user/getDeptUserDict',
    method: 'get',
    params: query
  })
}

// 查询部门列表（部门）
export function getPromotionDeptDict(query) {
  return request({
    url: '/system/dept/getPromotionDeptDict',
    method: 'get',
    params: query
  })
}

// 能力模型
// export function (query) {
//   return request({
//     url: '/system/',
//     method: 'get',
//     params: query
//   })
// }

// 数据转化分析 bar
export function getBarEchartsData(query) {
  return request({
    url: '/system/promotionAnalysis/getBarEchartsData',
    method: 'get',
    params: query
  })
}

// 数据转化分析 line
export function getLineEchartsData(query) {
  return request({
    url: '/system/promotionAnalysis/getLineEchartsData',
    method: 'get',
    params: query
  })
}

//
// export function getAnswer(answerId) {
//   return request({
//     url: '/survey/answer/' + answerId,
//     method: 'get'
//   })
// }

