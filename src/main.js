import Vue from 'vue'

import Cookies from 'js-cookie'
import {checkMyFileSize} from '@/utils/validate'
import Element from 'element-ui'
import './assets/styles/element-variables.scss'

import '@/assets/styles/index.scss' // global css
import '@/assets/styles/ruoyi.scss' // ruoyi css
import App from './App'
import store from './store'
import router from './router'
import permission from './directive/permission'

import './assets/icons' // icon
import './permission' // permission control
import { getDicts } from '@/api/system/dict/data'
import { getConfigKey } from '@/api/system/config'
import {
  getRegionAll,
  getRegionTree,
  getReqAction,
  getUserAll,
  postReqAction,
  selectRegionName,
  selectUserNameByUserId
} from './utils/global'
import UUID from 'vue-uuid'
import '@/assets/thirdIcon/iconfont.css'
import {
  addDateRange,
  download,
  handleTree,
  parseTime,
  resetForm,
  selectDictLabel,
  selectDictLabels
} from '@/utils/ruoyi'
import Pagination from '@/components/Pagination'
// 自定义表格工具扩展
import RightToolbar from '@/components/RightToolbar'
// 金额数字转大写文字
import { amountConvertToUpperCase } from '@/utils/amountConvertToUpperCase'
import infiniteScroll from 'vue-infinite-scroll'

//表格导出
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
import _ from 'lodash'

//打印
import Print from '@/utils/vue-print-nb/src'

//轮播
import 'swiper/css/swiper.css'

//图片裁剪
import VueCropper from 'vue-cropper'



Vue.use(VueCropper)

Vue.prototype.$FileSaver = FileSaver //设置全局
Vue.prototype.$XLSX = XLSX //设置全局

// 下拉加载
Vue.use(infiniteScroll)

Vue.prototype.amountConvertToUpperCase = amountConvertToUpperCase
// 全局方法挂载
Vue.prototype.getDicts = getDicts
Vue.prototype.getRegionTree = getRegionTree
Vue.prototype.getRegionAll = getRegionAll
Vue.prototype.selectRegionName = selectRegionName
Vue.prototype.selectUserNameByUserId = selectUserNameByUserId
Vue.prototype.getUserAll = getUserAll
Vue.prototype.getReqAction = getReqAction
Vue.prototype.postReqAction = postReqAction
Vue.prototype.getConfigKey = getConfigKey
Vue.prototype.parseTime = parseTime
Vue.prototype.resetForm = resetForm
Vue.prototype.addDateRange = addDateRange
Vue.prototype.selectDictLabel = selectDictLabel
Vue.prototype.selectDictLabels = selectDictLabels
Vue.prototype.download = download
Vue.prototype.handleTree = handleTree
Vue.prototype.checkMyFileSize = checkMyFileSize

Vue.prototype.$_ = _

Vue.prototype.msgSuccess = function(msg) {
  this.$message({ showClose: true, message: msg, type: 'success' })
}

Vue.prototype.msgError = function(msg) {
  this.$message({ showClose: true, message: msg, type: 'error' })
}

Vue.prototype.msgInfo = function(msg) {
  this.$message.info(msg)
}

// 全局组件挂载
Vue.component('Pagination', Pagination)
Vue.component('RightToolbar', RightToolbar)

Vue.use(permission)
Vue.use(UUID)
Vue.use(Print)
/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online! ! !
 */

Vue.use(Element, {
  size: Cookies.get('size') || 'medium' // set element-ui default size
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
