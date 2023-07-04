import request from "@/utils/request";

export function list(query) {
  return request({
    url: "/system/servicepurchase/list",
    method: "get",
    params: query
  });
}



export function save(query) {
  return request({
    url: "/system/servicepurchase/save",
    method: "post",
    data: query
  });
}

export function getInfo(id) {
  return request({
    url: "/system/servicepurchase/" + id,
    method: "get"
  });
}

export function getPurchaseDetailInfo(parentId) {
  return request({
    url: "/system/servicepurchaselist/getInfoByParentId/" + parentId,
    method: "get"
  });
}

export function del(ids) {
  return request({
    url: "/system/servicepurchase/" + ids,
    method: "delete"
  });
}


