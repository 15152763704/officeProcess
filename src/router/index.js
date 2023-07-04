import Vue from 'vue'
import Router from 'vue-router'
/* Layout */
import Layout from '@/layout'

Vue.use(Router)

/**
 * Note: 路由配置项
 *
 * hidden: true                   // 当设置 true 的时候该路由不会再侧边栏出现 如401，login等页面，或者如一些编辑页面/edit/1
 * alwaysShow: true               // 当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式--如组件页面
 *                                // 只有一个时，会将那个子路由当做根路由显示在侧边栏--如引导页面
 *                                // 若你想不管路由下面的 children 声明的个数都显示你的根路由
 *                                // 你可以设置 alwaysShow: true，这样它就会忽略之前定义的规则，一直显示根路由
 * redirect: noRedirect           // 当设置 noRedirect 的时候该路由在面包屑导航中不可被点击
 * name:'router-name'             // 设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
 * meta : {
    noCache: true                // 如果设置为true，则不会被 <keep-alive> 缓存(默认 false)
    title: 'title'               // 设置该路由在侧边栏和面包屑中展示的名字
    icon: 'svg-name'             // 设置该路由的图标，对应路径src/assets/icons/svg
    breadcrumb: false            // 如果设置为false，则不会在breadcrumb面包屑中显示
  }
 */

// 公共路由
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: resolve => require(['@/views/redirect'], resolve)
      }
    ]
  },
  {
    path: '/login',
    component: resolve => require(['@/views/login'], resolve),
    hidden: true
  },
  {
    path: '/404',
    component: resolve => require(['@/views/error/404'], resolve),
    hidden: true
  },
  {
    path: '/401',
    component: resolve => require(['@/views/error/401'], resolve),
    hidden: true
  },
  {
    path: '',
    component: Layout,
    redirect: 'index',
    children: [
      {
        path: 'index',
        component: resolve => require(['@/views/index'], resolve),
        name: '首页',
        meta: { title: '首页', icon: 'dashboard', noCache: true, affix: true }
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    hidden: true,
    redirect: 'noredirect',
    children: [
      {
        path: 'profile',
        component: resolve =>
          require(['@/views/system/user/profile/index'], resolve),
        name: 'Profile',
        meta: { title: '个人中心', icon: 'user' }
      }
    ]
  },
  {
    path: '/dict',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'type/data/:dictId(\\d+)',
        component: resolve => require(['@/views/system/dict/data'], resolve),
        name: 'Data',
        meta: { title: '字典数据', icon: '' }
      }
    ]
  },
  {
    path: '/flowable',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'definition/model/',
        component: resolve =>
          require(['@/views/flowable/definition/model'], resolve),
        name: 'Model',
        meta: { title: '流程设计', icon: '', noCache: true }
      }
    ]
  },
  {
    path: '/flowable',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/task/record/index/projectcompletionrate',
        component: resolve =>
          require(['@/views/biz/projectcompletionrate/form/sclxxiangqing'], resolve),
        name: 'projectcompletionrate',
        meta: { title: '生产立项详情', icon: '', noCache: true }
      }
    ]
  },
  {
    path: '/flowable',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/task/record/index/announcementdetails',
        component: resolve =>
          require(['@/views/biz/announcementdetails/form/gonggaoxq'], resolve),
        name: 'announcementdetails',
        meta: { title: '公告详情', icon: '', noCache: true }
      }
    ]
  },
  {
    path: '/flowable',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/task/record/index',
        component: resolve =>
          require(['@/views/flowable/task/record/index'], resolve),
        name: 'Record',
        meta: { noCache: true },
        children: [
          {
            path: '/task/record/index/seal',
            component: resolve =>
              require(['@/views/biz/seal/form/seal'], resolve),
            hidden: true,
            name: 'seal',
            meta: { title: '印章表单', icon: '', noCache: true }
          },
          {
            path: '/task/record/index/notice',
            component: resolve =>
              require(['@/views/biz/notice/form/notice'], resolve),
            hidden: true,
            name: 'notice',
            meta: { title: '公告表单', icon: '', noCache: true }
          },
          {
            path: '/task/record/index/trackPorject',
            component: resolve =>
              require(['@/views/biz/trackProject/form/index'], resolve),
            hidden: true,
            name: 'trackProject',
            meta: { title: '跟踪立项表单', icon: '', noCache: true }
          },
          {
            path: '/task/record/index/bidProject',
            component: resolve =>
              require(['@/views/biz/bidProject/form/index'], resolve),
            hidden: true,
            name: 'bidProject',
            meta: { title: '投标立项表单', icon: '', noCache: true }
          },
          {
            path: '/task/record/index/affiliatedProject',
            component: resolve =>
              require(['@/views/biz/affiliatedProject/form/index'], resolve),
            hidden: true,
            name: 'affiliatedProject',
            meta: { title: '挂靠立项表单', icon: '', noCache: true }
          },
          {
            path: '/task/record/index/productionProject',
            component: resolve =>
              require(['@/views/biz/productionProject/form/index'], resolve),
            hidden: true,
            name: 'productionProject',
            meta: { title: '生产立项表单', icon: '', noCache: true }
          },
          {
            path: '/task/record/index/trainingApplication',
            component: resolve =>
              require(['@/views/biz/trainingApplication/form/index'], resolve),
            hidden: true,
            name: 'trainingApplication',
            meta: { title: '培训申请表单', icon: '', noCache: true }
          },
          {
            path: '/task/record/index/projectPromotion',
            component: resolve =>
              require(['@/views/biz/projectPromotion/form/index'], resolve),
            hidden: true,
            name: 'projectPromotion',
            meta: { title: '项目推进表单', icon: '', noCache: true }
          },
          {
            path: '/task/record/index/administrationPromotion',
            component: resolve =>
              require(['@/views/biz/administrationPromotion/form/index'], resolve),
            hidden: true,
            name: 'administrationPromotion',
            meta: { title: '行政推进表单', icon: '', noCache: true }
          },
          {
            path: '/task/record/index/productionProjectPromotion',
            component: resolve =>
              require(['@/views/biz/productionProjectPromotion/form/index'], resolve),
            hidden: true,
            name: 'productionProjectPromotion',
            meta: { title: '项目推进表单', icon: '', noCache: true }
          },
          {
            path: '/task/record/index/servicePurchase',
            component: resolve =>
              require(['@/views/biz/servicePurchase/form/index'], resolve),
            hidden: true,
            name: 'servicePurchase',
            meta: { title: '服务类采购表单', icon: '', noCache: true }
          },
          {
            path: '/task/record/index/goodsPurchase',
            component: resolve =>
              require(['@/views/biz/goodsPurchase/form/index'], resolve),
            hidden: true,
            name: 'goodsPurchase',
            meta: { title: '货物类采购表单', icon: '', noCache: true }
          },
          {
            path: '/task/record/index/administration',
            component: resolve =>
              require([
                '@/views/biz/contract/administration/form/administration'
              ], resolve),
            hidden: true,
            name: 'administration',
            meta: { title: '行政合同申请', icon: '', noCache: true }
          },
          {
            path: '/task/record/index/qualification',
            component: resolve =>
              require([
                '@/views/biz/qualification/form/qualification'
              ], resolve),
            hidden: true,
            name: 'qualification',
            meta: { title: '资质申请表单', icon: '', noCache: true }
          },
          {
            path: '/task/record/index/projectContract',
            component: resolve =>
              require([
                '@/views/biz/project/contract/form/projectContract'
              ], resolve),
            hidden: true,
            name: 'projectContract',
            meta: { title: '项目合同申请', icon: '', noCache: true }
          },
          {
            path: '/task/record/index/administrationCarApply',
            component: resolve =>
              require([
                '@/views/biz/administrationCarManage/carApply/form/index'
              ], resolve),
            hidden: true,
            name: 'administrationCarApply',
            meta: { title: '车辆预定', icon: '', noCache: true }
          },
          {
            path: '/task/record/index/xzborrowmoney',
            component: resolve =>
              require([
                '@/views/biz/cost/xzborrowmoney/form/xzborrowmoney'
              ], resolve),
            hidden: true,
            name: 'xzborrowmoney',
            meta: { title: '借款申请', icon: '', noCache: true }
          },
          {
            path: '/task/record/index/xzrepayment',
            component: resolve =>
              require([
                '@/views/biz/cost/xzrepayment/form/xzrepayment'
              ], resolve),
            hidden: true,
            name: 'xzrepayment',
            meta: { title: '还款申请', icon: '', noCache: true }
          },
          {
            path: '/task/record/index/xzbaoxiao',
            component: resolve =>
              require(['@/views/biz/cost/xzbaoxiao/form/xzbaoxiao'], resolve),
            hidden: true,
            name: 'xzbaoxiao',
            meta: { title: '费用报销', icon: '', noCache: true }
          },
          {
            path: '/task/record/index/administrationReturnCar',
            component: resolve =>
              require([
                '@/views/biz/administrationCarManage/returnCar/form/index'
              ], resolve),
            hidden: true,
            name: 'administrationReturnCar',
            meta: { title: '还车管理', icon: '', noCache: true }
          },
          {
            path: '/task/record/index/evection',
            component: resolve =>
              require(['@/views/biz/evection/form/evection'], resolve),
            hidden: true,
            name: 'evection',
            meta: { title: '出差申请', icon: '', noCache: true }
          }
          , {
            path: '/task/record/index/administrationMaterialBuy',
            component: resolve =>
              require([
                '@/views/biz/administrationMaterialManage/materialBuy/form/index'
              ], resolve),
            hidden: true,
            name: 'administrationMaterialBuy',
            meta: { title: '耗材采购', icon: '', noCache: true }
          }, {
            path: '/task/record/index/traveladvance',
            component: resolve =>
              require([
                '@/views/biz/traveladvance/form/traveladvance'
              ], resolve),
            hidden: true,
            name: 'traveladvance',
            meta: { title: '人事借款', icon: '', noCache: true }
          }, {
            path: '/task/record/index/travelreimbursement',
            component: resolve =>
              require([
                '@/views/biz/travelreimbursement/form/travelreimbursement'
              ], resolve),
            hidden: true,
            name: 'travelreimbursement',
            meta: { title: '人事还款', icon: '', noCache: true }
          }
          , {
            path: '/task/record/index/administrationMaterialUse',
            component: resolve =>
              require([
                '@/views/biz/administrationMaterialManage/materialUsed/form/index'
              ], resolve),
            hidden: true,
            name: 'administrationMaterialUse',
            meta: { title: '耗材领用', icon: '', noCache: true }
          }, {
            path: '/task/record/index/chailvbaoxiao',
            component: resolve =>
              require([
                '@/views/biz/chailvbaoxiao/form/chailvbaoxiao'
              ], resolve),
            hidden: true,
            name: 'chailvbaoxiao',
            meta: { title: '人事报销', icon: '', noCache: true }
          }, {
            path: '/task/record/index/yxjiekuan',
            component: resolve =>
              require([
                '@/views/biz/yxjiekuan/form/yxjiekuan'
              ], resolve),
            hidden: true,
            name: 'yxjiekuan',
            meta: { title: '营销借款', icon: '', noCache: true }
          }, {
            path: '/task/record/index/yxhuankuan',
            component: resolve =>
              require([
                '@/views/biz/yxhuankuan/form/yxhuankuan'
              ], resolve),
            hidden: true,
            name: 'yxhuankuan',
            meta: { title: '营销还款', icon: '', noCache: true }
          }, {
            path: '/task/record/index/yxbaoxiao',
            component: resolve =>
              require([
                '@/views/biz/yxbaoxiao/form/yxbaoxiao'
              ], resolve),
            hidden: true,
            name: 'yxbaoxiao',
            meta: { title: '营销报销', icon: '', noCache: true }
          }, {
            path: '/task/record/index/peopleChangeNeetApply',
            component: resolve =>
              require([
                '@/views/biz/peopleChange/neetApply/form/index'
              ], resolve),
            hidden: true,
            name: 'peopleChangeNeetApply',
            meta: { title: '需求申请', icon: '', noCache: true }
          }, {
            path: '/task/record/index/peopleChangeLeaveOffice',
            component: resolve =>
              require([
                '@/views/biz/peopleChange/leaveOffice/form/index'
              ], resolve),
            hidden: true,
            name: 'peopleChangeLeaveOffice',
            meta: { title: '离职申请', icon: '', noCache: true }
          }, {
            path: '/task/record/index/projectsjiekuan',
            component: resolve =>
              require([
                '@/views/biz/projectsjiekuan/form/projectsjiekuan'
              ], resolve),
            hidden: true,
            name: 'projectsjiekuan',
            meta: { title: '项目借款', icon: '', noCache: true }
          }, {
            path: '/task/record/index/projectBuyServiceBuy',
            component: resolve =>
              require([
                '@/views/biz/projectBuy/serviceBuy/form/index'
              ], resolve),
            hidden: true,
            name: 'projectBuyServiceBuy',
            meta: { title: '服务请购', icon: '', noCache: true }
          }, {
            path: '/task/record/index/projectshuankuan',
            component: resolve =>
              require([
                '@/views/biz/projectshuankuan/form/projectshuankuan'
              ], resolve),
            hidden: true,
            name: 'projectshuankuan',
            meta: { title: '项目还款', icon: '', noCache: true }
          }, {
            path: '/task/record/index/projectbaoxiao',
            component: resolve =>
              require([
                '@/views/biz/projectbaoxiao/form/projectbaoxiao'
              ], resolve),
            hidden: true,
            name: 'projectbaoxiao',
            meta: { title: '项目报销', icon: '', noCache: true }
          }, {
            path: '/task/record/index/projectBuyMaterialBuy',
            component: resolve =>
              require([
                '@/views/biz/projectBuy/materialBuy/form/index'
              ], resolve),
            hidden: true,
            name: 'projectBuyMaterialBuy',
            meta: { title: '货物请购', icon: '', noCache: true }
          }
          , {
            path: '/task/record/index/peopleChangeTansferFormer',
            component: resolve =>
              require([
                '@/views/biz/peopleChange/tansferFormer/form/index'
              ], resolve),
            hidden: true,
            name: 'peopleChangeTansferFormer',
            meta: { title: '转正申请', icon: '', noCache: true }
          }
          , {
            path: '/task/record/index/moneyBackInvoiceApply',
            component: resolve =>
              require([
                '@/views/biz/moneyBack/invoiceApply/form/index'
              ], resolve),
            hidden: true,
            name: 'moneyBackInvoiceApply',
            meta: { title: '开票申请', icon: '', noCache: true }
          }, {
            path: '/task/record/index/caigouloan',
            component: resolve =>
              require([
                '@/views/biz/caigouloan/form/caigouloan'
              ], resolve),
            hidden: true,
            name: 'caigouloan',
            meta: { title: '采购借款', icon: '', noCache: true }
          }, {
            path: '/task/record/index/caigouhuankuan',
            component: resolve =>
              require([
                '@/views/biz/caigouhuankuan/form/caigouhuankuan'
              ], resolve),
            hidden: true,
            name: 'caigouhuankuan',
            meta: { title: '采购还款', icon: '', noCache: true }
          }, {
            path: '/task/record/index/baoxiao',
            component: resolve =>
              require([
                '@/views/biz/baoxiao/form/baoxiao'
              ], resolve),
            hidden: true,
            name: 'baoxiao',
            meta: { title: '采购报销', icon: '', noCache: true }
          }, {
            path: '/task/record/index/payment',
            component: resolve =>
              require([
                '@/views/biz/payment/form/payment'
              ], resolve),
            hidden: true,
            name: 'payment',
            meta: { title: '施工付款', icon: '', noCache: true }
          }, {
            path: '/task/record/index/affiliatedPayment',
            component: resolve =>
              require([
                '@/views/biz/affiliated/form/payment'
              ], resolve),
            hidden: true,
            name: 'affiliatedPayment',
            meta: { title: '挂靠项目付款', icon: '', noCache: true }
          }
        ]
      }
    ]
  },
  {
    path: '/tool',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'build/index',
        component: resolve => require(['@/views/tool/build/index'], resolve),
        name: 'FormBuild',
        meta: { title: '表单配置', icon: '' }
      }
    ]
  },
  {
    path: '/job',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'log',
        component: resolve => require(['@/views/monitor/job/log'], resolve),
        name: 'JobLog',
        meta: { title: '调度日志' }
      }
    ]
  },
  {
    path: '/gen',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'edit/:tableId(\\d+)',
        component: resolve => require(['@/views/tool/gen/editTable'], resolve),
        name: 'GenEdit',
        meta: { title: '修改生成配置' }
      }
    ]
  },
  // {
  //   path: '/administration',
  //   component: Layout,
  //   hidden: true,
  //   children: [
  //     {
  //       path: 'seal/apply',
  //       component: resolve => require(['@/views/biz/seal/index'], resolve),
  //       name: 'apply',
  //       meta: { title: '印章申请', noCache: true }
  //     }
  //   ]
  // },
  {
    path: '/announcement',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'gonggao',
        component: resolve => require(['@/views/biz/notice/index'], resolve),
        name: 'applys',
        meta: { title: '发文申请', noCache: true }
      }
    ]
  }
]

export default new Router({
  mode: 'history', // 去掉url中的#
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})
