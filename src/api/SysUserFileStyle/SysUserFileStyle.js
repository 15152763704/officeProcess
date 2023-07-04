import request from '@/utils/request'
//
// 上传 图片
export const uploadMyPhoto = (query,data) => {
  return request({
    url: '/SysUserFileStyle/SysUserFileStyle/uploadMyPhoto',
    method: 'post',
    params: query,
    data: data
  })
}

// 查询图片
export const getUserFileStyleList = (query) => {
  return request({
    url: '/SysUserFileStyle/SysUserFileStyle/list',
    method: 'get',
    params: query
  })
}

//删除图片
export const removeUserFileStyleList = (id) => {
  return request({
    url: '/SysUserFileStyle/SysUserFileStyle/' + id,
    method: 'delete',

  })
}
