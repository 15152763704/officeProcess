import request from "@/utils/request";

export function list(query) {
  return request({
    url: "/system/personnelmanagement/list",
    method: "get",
    params: query
  });
}

export function listAll(query) {
  return request({
    url: "/system/personnelmanagement/listAll",
    method: "get",
    params: query
  });
}

export function save(query) {
  return request({
    url: "/system/personnelmanagement/save",
    method: "post",
    data: query
  });
}

export function getInfo(id) {
  return request({
    url: "/system/personnelmanagement/" + id,
    method: "get"
  });
}

export function del(ids) {
  return request({
    url: "/system/personnelmanagement/" + ids,
    method: "delete"
  });
}


