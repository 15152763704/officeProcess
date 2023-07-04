import request from "@/utils/request";

// 查询个人资质详情列表
export function listGrzizhixiangqing(query) {
  return request({
    url: "/qualifications/grzizhixiangqing/list",
    method: "get",
    params: query
  });
}

// 查询个人资质详情列表BYcompanyid
export function getGrzizhiByCompanyId(companyid) {
  return request({
    url: "/qualifications/grzizhixiangqing/company/" + companyid,
    method: "get"
  });
}

// 查询个人资质详情详细
export function getGrzizhixiangqing(id) {
  return request({
    url: "/qualifications/grzizhixiangqing/" + id,
    method: "get"
  });
}

// 新增个人资质详情
export function addGrzizhixiangqing(data) {
  return request({
    url: "/qualifications/grzizhixiangqing",
    method: "post",
    data: data
  });
}

// 修改个人资质详情
export function updateGrzizhixiangqing(data) {
  return request({
    url: "/qualifications/grzizhixiangqing",
    method: "put",
    data: data
  });
}

// 删除个人资质详情
export function delGrzizhixiangqing(id) {
  return request({
    url: "/qualifications/grzizhixiangqing/" + id,
    method: "delete"
  });
}

// 导出个人资质详情
export function exportGrzizhixiangqing(query) {
  return request({
    url: "/qualifications/grzizhixiangqing/export",
    method: "get",
    params: query
  });
}
