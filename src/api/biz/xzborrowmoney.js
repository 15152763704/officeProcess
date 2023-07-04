import request from "@/utils/request";

// 查询行政管理借款列表
export function listXzborrowmoney(query) {
  return request({
    url: "/cost/xzborrowmoney/list",
    method: "get",
    params: query
  });
}

// 查询当前用户已完成未还清列表
export function getMyLoanInfo(query) {
  return request({
    url: "/cost/xzborrowmoney/my",
    method: "get",
    params: query
  });
}

// 查询行政管理借款详细
export function getXzborrowmoney(id) {
  return request({
    url: "/cost/xzborrowmoney/" + id,
    method: "get"
  });
}

// 新增行政管理借款
export function addXzborrowmoney(data) {
  return request({
    url: "/cost/xzborrowmoney",
    method: "post",
    data: data
  });
}

// 修改行政管理借款
export function updateXzborrowmoney(data) {
  return request({
    url: "/cost/xzborrowmoney",
    method: "put",
    data: data
  });
}

// 删除行政管理借款
export function delXzborrowmoney(id) {
  return request({
    url: "/cost/xzborrowmoney/" + id,
    method: "delete"
  });
}

// 导出行政管理借款
export function exportXzborrowmoney(query) {
  return request({
    url: "/cost/xzborrowmoney/export",
    method: "get",
    params: query
  });
}
