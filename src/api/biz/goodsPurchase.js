import request from "@/utils/request";

export function list(query) {
  return request({
    url: "/system/goodspurchase/list",
    method: "get",
    params: query
  });
}



export function save(query) {
  return request({
    url: "/system/goodspurchase/save",
    method: "post",
    data: query
  });
}

export function getInfo(id) {
  return request({
    url: "/system/goodspurchase/" + id,
    method: "get"
  });
}

export function getPurchaseDetailInfo(parentId) {
  return request({
    url: "/system/goodspurchaselist/getInfoByParentId/" + parentId,
    method: "get"
  });
}

export function del(ids) {
  return request({
    url: "/system/goodspurchase/" + ids,
    method: "delete"
  });
}

// 导出
export function exportData(query) {
  return request({
    url: '/system/goodspurchase/export',
    method: 'get',
    params: query
  })
}


