import request from "@/utils/request";

export function list(query) {
  return request({
    url: "/system/trainingrecord/list",
    method: "get",
    params: query
  });
}

export function save(query) {
  return request({
    url: "/system/trainingrecord/save",
    method: "post",
    data: query
  });
}

export function getInfo(id) {
  return request({
    url: "/system/trainingrecord/" + id,
    method: "get"
  });
}


