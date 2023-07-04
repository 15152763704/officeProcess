import request from "@/utils/request";

// 项目看板数据
export function listDeptExcludeChild(projectCode) {
  return request({
    url: "/system/productionproject/getPorjectView/" + projectCode,
    method: "get"
  });
}
