import request from "@/utils/request";

export function list(query) {
  return request({
    url: "/system/trainingapplication/list",
    method: "get",
    params: query
  });
}

export function listAll(query) {
  return request({
    url: "/system/trainingapplication/listAll",
    method: "get",
    params: query
  });
}
// 删除培训申请
export function delTrainingapplication(id) {
  return request({
    url: '/system/trainingapplication/' + id,
    method: 'delete'
  })
}
export function save(query) {
  return request({
    url: "/system/trainingapplication/save",
    method: "post",
    data: query
  });
}


