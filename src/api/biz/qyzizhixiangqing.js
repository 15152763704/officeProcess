import request from "@/utils/request";

// 查询企业资质详情列表
export function listQyzizhixiangqing(query) {
  return request({
    url: "/system/qyzizhixiangqing/list",
    method: "get",
    params: query
  });
}

// 查询企业资质详情列表BYcompanyid
export function getCompanyListByCompanyId(companyid) {
  return request({
    url: "/system/qyzizhixiangqing/company/" + companyid,
    method: "get"
  });
}

// 查询企业资质详情详细
export function getQyzizhixiangqing(id) {
  return request({
    url: "/system/qyzizhixiangqing/" + id,
    method: "get"
  });
}

// 新增企业资质详情
export function addQyzizhixiangqing(data) {
  return request({
    url: "/system/qyzizhixiangqing",
    method: "post",
    data: data
  });
}

// 修改企业资质详情
export function updateQyzizhixiangqing(data) {
  return request({
    url: "/system/qyzizhixiangqing",
    method: "put",
    data: data
  });
}

// 删除企业资质详情
export function delQyzizhixiangqing(ids) {
  return request({
    url: "/system/qyzizhixiangqing",
    method: "delete",
    data: ids
  });
}

// 导出企业资质详情
export function exportQyzizhixiangqing(query) {
  return request({
    url: "/system/qyzizhixiangqing/export",
    method: "get",
    params: query
  });
}
