import request from "@/utils/request";

// 查询附件详细
export function getFileDetail(ids) {
  return request({
    url: "/sysfile/findById",
    method: "get",
    params: {
      ids
    }
  });
}
// 通过业务ID查询附件详细
export function getFileDetailByServiceId(serviceId) {
  return request({
    url: "/sysfile/findByServiceId",
    method: "get",
    params: {
      serviceId
    }
  });
}

export function saveFile(query) {
  return request({
    url: '/sysfile/save',
    method: 'post',
    data: query
  })
}
