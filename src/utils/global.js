import request from '@/utils/request'

// GET
export function getReqAction(url,param) {
  return request({
    url: url,
    method: 'get',
    params: param
  })
}

// POST
export function postReqAction(url,param) {
  return request({
    url: url,
    method: 'post',
    data: param
  })
}


// PUT
export function putReqAction(url,param) {
  return request({
    url: url,
    method: param,
    data: data
  })
}

// DELETE
export function deleteReqAction(url,param) {
  return request({
    url: url + '/' + param,
    method: 'delete'
  })
}


// 获取省市区树
export function getRegionTree() {
  return request({
    url: '/system/region/getRegionTree',
    method: 'get'
  })
}

// 获取所有省市区
export function getRegionAll() {
  return request({
    url: '/system/region/queryAll',
    method: 'get'
  })
}

// 获取所有用户
export function getUserAll() {
  return request({
    url: '/system/user/queryAll',
    method: 'get'
  })
}

// 回显省市区字典
export function selectRegionName(datas, value) {
  var actions = [];
  var arr = value.split(",");
  var size = arr.length;
  for(var i=0;i<size;i++){
    var code = arr[i];
    Object.keys(datas).some((key) => {
      if (datas[key].code == (code)) {
        actions.push(datas[key].name);
        return true;
      }
    })
  }

  return actions.join('');
}

// 回显用户
export function selectUserNameByUserId(datas, value) {
  var userNameArr = []
  if(value == null){
    value = ''
  }
  var userArr = value.split(',')
  for(var i=0;i<userArr.length;i++){
    for(var j=0;j<datas.length;j++){
      if(userArr[i] == datas[j].userId){
        userNameArr.push(datas[j].nickName);
        break;
      }
    }
  }
  return userNameArr.join(',');
}






