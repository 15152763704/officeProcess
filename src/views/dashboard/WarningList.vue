<template>
  <div>
    <el-card class="box-card" shadow="never">
      <div slot="header" class="clearfix">
        <el-badge :value="tableData.totalCount" class="badge" :hidden="!totalCount_show" >
          <span>预警提醒</span>
        </el-badge>
        <i class="el-icon-setting" @click="showWarningEditer" v-if="isShowWarning"></i>
      </div>
      <span class="more_than" @click="goMoreThan">更多<i class="el-icon-d-arrow-right"/></span>
      <el-tabs v-model="activeName" >
        <el-tab-pane name="first" :key="'first'" class="tab-title">
          <span slot="label">
            <span class="span-box">
              <el-badge :value="tableData.hetongList.length" class="badge" :hidden="!hetongCount_show">
                <el-tooltip effect="light" content="当一个生产立项项目审批通过时，在规定时间内没有上传合同，系统发出合同预警提醒项目相关人员及时上传合同！" placement="top">
                  <span>合同预警</span>
                </el-tooltip>
              </el-badge>
            </span>
          </span>
          <div v-for="(item , i ) in tableData.hetongList"  class="text item" @click="goDetail(item)">
            <i :class="item.days >= form.hetongyellow&&item.days < form.hetongred ? 'el-icon-warning' : 'el-icon-error'"></i>
            <span :class="item.days >= form.hetongyellow&&item.days < form.hetongred ? 'willWarning' : 'warning'">【{{item.days >= form.hetongyellow&&item.days < form.hetongred ? '即将超期' : '超期'}}】</span>
            <el-tooltip effect="dark" :content="item.content" placement="top">
              <span class="item_text" style="vertical-align: middle;">{{ item.content }}</span>
            </el-tooltip>
            <span style="float: right;display: inline-block;width: 160px;">
              <span style="font-weight: 600">立项时间：</span>
              <span>{{formatDateWithoutTime(item.objectTime)}}</span>
              <svg-icon icon-class="right-arrow"/>
            </span>
          </div>
        </el-tab-pane>

        <!--<el-tab-pane   name="second" :key="'second'" class="tab-title">-->
          <!--<span slot="label">-->
            <!--<span class="span-box">-->
              <!--<el-badge :value="tableData.invoiceList.length" class="badge" :hidden="!invoiceCount_show">-->
                <!--<el-tooltip effect="light" content="当一个项目即将完工时，比如还有30天完工时，系统发出开票预警提醒项目相关人员及时开票！" placement="top">-->
                  <!--<span>开票预警</span>-->
                <!--</el-tooltip>-->
              <!--</el-badge>-->
            <!--</span>-->
          <!--</span>-->
          <!--<div v-for="(item , i ) in tableData.invoiceList" class="text item" @click="goDetail(item)">-->
            <!--<i :class="item.days >= form.invoiceyellow&&item.days < form.invoicered ? 'el-icon-error' : 'el-icon-warning'"></i>-->
            <!--<span :class="item.days >= form.invoiceyellow&&item.days < form.invoicered ? 'warning' : 'willWarning'">【{{item.days >= form.invoiceyellow&&item.days < form.invoicered ? '超期' : '即将超期'}}】</span>-->
            <!--<el-tooltip effect="dark" :content="item.content" placement="top">-->
              <!--<span class="item_text">{{ item.content }}</span>-->
            <!--</el-tooltip>-->
            <!--<span style="float: right;display: inline-block;width: 160px;">-->
              <!--<span style="font-weight: 600">完工时间：</span>-->
              <!--<span>{{formatDateWithoutTime(item.objectTime)}}</span>-->
              <!--<svg-icon icon-class="right-arrow"/>-->
            <!--</span>-->
          <!--</div>-->
        <!--</el-tab-pane>-->

        <el-tab-pane   name="three" :key="'three'" class="tab-title">
          <span slot="label">
            <span class="span-box">
              <el-badge :value="tableData.moneyBackList.length" class="badge" :hidden="!moneyBackCount_show">
                <el-tooltip effect="light" content="当一个开票申请审批通过时，在规定时间内没有资金回笼进账，系统发出回笼预警提醒项目相关人员及时关注项目汇款！" placement="top">
                  <span>回笼预警</span>
                </el-tooltip>
              </el-badge>
            </span>
          </span>
          <div v-for="(item , i ) in tableData.moneyBackList" class="text item" @click="goDetail(item)">
            <i :class="item.days >= form.moneyyellow&&item.days < form.moneyred ? 'el-icon-warning' : 'el-icon-error'"></i>
            <span :class="item.days >= form.moneyyellow&&item.days < form.moneyred ? 'willWarning' : 'warning'">【{{item.days >= form.moneyyellow&&item.days < form.moneyred ? '即将超期' : '超期'}}】</span>
            <el-tooltip effect="dark" :content="item.content" placement="top">
              <span class="item_text">{{ item.content }}</span>
            </el-tooltip>
            <span style="float: right;display: inline-block;width: 160px;" >
              <span style="font-weight: 600">回款时间：</span>
              <span>{{formatDateWithoutTime(item.objectTime)}}</span>
              <svg-icon icon-class="right-arrow"/>
            </span>
          </div>
        </el-tab-pane>

        <el-tab-pane   name="four" :key="'four'" class="tab-title">
          <span slot="label">
            <span class="span-box">
              <el-badge :value="tableData.chengbengList.length" class="badge" :hidden="!chengbengListCount_show">
                <el-tooltip effect="light" content="当一个项目的累计消耗成本超过合同金额的指定比例时触发报警" placement="top">
                  <span>成本预警</span>
                </el-tooltip>
              </el-badge>
            </span>
          </span>
          <div v-for="(item , i ) in tableData.chengbengList" class="text item" @click="goDetail(item)">
            <i :class="item.dhlzj >= (form.chenbenyellow/100)&&item.dhlzj < (form.chenbenred/100) ? 'el-icon-warning' : 'el-icon-error'"></i>
            <span :class="item.dhlzj >= (form.chenbenyellow/100)&&item.dhlzj < (form.chenbenred/100) ? 'willWarning' : 'warning'">【{{item.dhlzj >= (form.chenbenyellow/100)&&item.dhlzj < (form.chenbenred/100) ? '即将超标' : '超标'}}】</span>
            <el-tooltip effect="dark" :content="item.content" placement="top">
              <span class="item_text">{{ item.content }}</span>
            </el-tooltip>
            <span style="float: right;display: inline-block;width: 160px;" >
              <span style="font-weight: 600">立项时间：</span>
              <span>{{formatDateWithoutTime(item.objectTime)}}</span>
              <svg-icon icon-class="right-arrow"/>
            </span>
          </div>
        </el-tab-pane>


      </el-tabs>
      <!-- 注释
  　　　　　　　label：选项卡显示的title
  　　　　　　　name：与选项卡绑定的activeName对应的标识符，表示选项卡的别名
  　　　　　-->
    </el-card>

    <!--预警配置弹框-->
    <el-dialog title="预警时间配置" :visible.sync="dialogFormVisible">
      <el-form :model="form"  :rules="rules" ref="form" >
        <el-row :gutter="4" style="padding:0 10px;">
          <el-col :span="24">
            <el-form-item label="合同预警" class="title_class">
              <el-divider style="display: inline-block;width: 80%;"  class="title_line"></el-divider>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="4" style="padding:0 10px;">
          <el-col :span="4">
          </el-col>
          <el-col :span="10">
            <el-form-item label="超期提醒时限(天)" :label-width="formLabelWidth" prop="hetongyellow">
              <el-input-number :precision=0 v-model="form.hetongyellow" size="small" ></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="超期预警时限(天)" :label-width="formLabelWidth" prop="hetongred">
              <el-input-number :precision=0 v-model="form.hetongred" size="small" ></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
        <!--<el-row :gutter="4" style="padding:0 10px;">-->
          <!--<el-col :span="24">-->
            <!--<el-form-item label="开票预警" class="title_class">-->
              <!--<el-divider style="display: inline-block;width: 80%;"></el-divider>-->
            <!--</el-form-item>-->
          <!--</el-col>-->
        <!--</el-row>-->
        <!--<el-row :gutter="4" style="padding:0 10px;">-->
          <!--<el-col :span="4">-->
          <!--</el-col>-->
          <!--<el-col :span="10">-->
            <!--<el-form-item label="黄色预警天数" :label-width="formLabelWidth" prop="invoiceyellow">-->
              <!--<el-input-number :precision=0 v-model="form.invoiceyellow"  size="small" ></el-input-number>-->
            <!--</el-form-item>-->
          <!--</el-col>-->
          <!--<el-col :span="10">-->
            <!--<el-form-item label="红色预警天数" :label-width="formLabelWidth" prop="invoicered">-->
              <!--<el-input-number :precision=0 v-model="form.invoicered" size="small" ></el-input-number>-->
            <!--</el-form-item>-->
          <!--</el-col>-->
        <!--</el-row>-->
        <el-row :gutter="4" style="padding:0 10px;">
          <el-col :span="24">
            <el-form-item label="回笼预警" class="title_class">
              <el-divider style="display: inline-block;width: 80%;"class="title_line"></el-divider>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="4" style="padding:0 10px;">
          <el-col :span="4">
          </el-col>
          <el-col :span="10">
            <el-form-item label="超期提醒时限(天)" :label-width="formLabelWidth" prop="moneyyellow">
              <el-input-number :precision=0 v-model="form.moneyyellow" size="small"  ></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="超期预警时限(天)" :label-width="formLabelWidth" prop="moneyred">
              <el-input-number :precision=0 v-model="form.moneyred" size="small" ></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="4" style="padding:0 10px;">
          <el-col :span="24">
            <el-form-item label="成本预警" class="title_class">
              <el-divider style="display: inline-block;width: 80%;"class="title_line"></el-divider>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="4" style="padding:0 10px;">
          <el-col :span="4">
          </el-col>
          <el-col :span="10">
            <el-form-item label="成本/合同金额提醒比列(%)" :label-width="formLabelWidth" prop="moneyyellow">
              <el-input-number :precision=0 v-model="form.chenbenyellow" size="small" :min="0" :max="100" :step="1" ></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="成本/合同金额预警比列(%)" :label-width="formLabelWidth" prop="moneyred">
              <el-input-number :precision=0 v-model="form.chenbenred" size="small" :min="0" :max="100" :step="1"  ></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>


      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitWarning">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<style scoped>
  .title_line{
    width: calc( 100%  - 150px );
    margin-left: 150px ;
  }
.el-tabs__header .el-tabs__nav-scroll{
  display: inline-block;
  width: 220px;
}
  .more_than{
    float: right;
    height: 44px;
    line-height: 44px;
    font-size: 13px;
    color: #1890ff;
    display: inline-block;
    width: 40px;
  }
  .more_than:hover{
    cursor: pointer;
  }
  .el-dialog{
    width: 300px;
  }
  .commonFunctionItem:hover,.el-icon-setting:hover{
    cursor:pointer
  }
  .el-icon-setting{
    width: calc( 100% - 70px );
    text-align: right;
    display: inline-block;
  }
  .badge span{
    display: inline-block;
    width: 70px;
  }
  .badge{
    height: 16px;
    line-height: 20px;
    width: 70px;
  }
  .warning,.willWarning{
    display: inline-block;
    width: 88px;
  }
  .warning,.el-icon-error{
    color: red;
  }
  .willWarning,.el-icon-warning{
    color: #ffb205;
  }
  .el-icon-warning,.el-icon-error{
    vertical-align: middle;
  }
  .el-icon-warning,.el-icon-error{
    font-size: 20px;
  }
  .text {
    font-size: 14px;
  }
  .item {
    margin-bottom: 18px;
  }
  .item:hover{
    cursor:pointer
  }
  .item_text{
    display: inline-block;
    width: calc( 100% - 280px );
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
  .box-card {
    width: 100%;
    height: 450px;
  }
</style>
<style>
  /* 设置滚动条的样式 */
  ::-webkit-scrollbar {
    width:5px;
  }
  /* 滚动槽 */
  ::-webkit-scrollbar-track {
    -webkit-box-shadow:inset006pxrgba(0,0,0,0.3);
    border-radius:10px;
  }
  /* 滚动条滑块 */
  ::-webkit-scrollbar-thumb {
    border-radius:10px;
    background:rgba(0,0,0,0.1);
    -webkit-box-shadow:inset006pxrgba(0,0,0,0.5);
  }
  ::-webkit-scrollbar-thumb:window-inactive {
    background:rgba(255,0,0,0.4);
  }
  .tab-title{
    overflow-y: scroll;
    height: 280px;
  }
  .hello{
    height: 400px;
    width: 100%;
    padding-right: 16px;
    background-color: #ffffff;
  }
  .el-tabs__nav-wrap::after{
    height: 0;
  }
  .el-tabs__header{
    text-align: center;
    width: calc( 100% - 40px );
  }

  .title_count,.total_count{
    display: inline-block;
    background-color: red;
    height: 15px;
    position: absolute;
    top: 10px;
    line-height: 15px;
    border-radius: 50%;
    padding: 0 3px;
    color: #fff;
    font-size: 10px;
    font-weight: 100;
   }
  .total_count{
    top: 0px;
  }
  .title{
    position: absolute;
    top: 8px;
    font-size: 16px;
    font-weight: 600;
  }
  .chart-wrapper{
    padding: 0!important;
  }
</style>
<script>

import resize from './mixins/resize'
import request from '@/utils/request'
import { formatDateWithoutTime } from '@/utils'
import { getFlowInfoByFlowId } from '@/api/flowable/definition'
import { definitionStart, getFlowViewer, getFormDetail, getProcessVariables, readXml } from '@/api/flowable/definition'

export default {
  mixins: [resize],
  props: {},
  data() {
    let checkHetongred = (rule, value, callback) => {
      if (value < this.form.hetongyellow) {
        callback(new Error('红色预警天数需大于黄色预警天数'));
      } else {
        callback();
      }
    };
    let checkInvoicered = (rule, value, callback) => {
      if (value < this.form.invoiceyellow) {
        callback(new Error('红色预警天数需大于黄色预警天数'));
      } else {
        callback();
      }
    };
    let checkMoneyred = (rule, value, callback) => {
      if (value < this.form.moneyyellow) {
        callback(new Error('红色预警天数需大于黄色预警天数'));
      } else {
        callback();
      }
    };
    return {
      isShowWarning:false,//是否显示预警配置按钮
      dialogFormVisible: false,//预警配置弹框
      formatDateWithoutTime,
      chart: null,
      tableData: {
        moneyBackList: [],
        invoiceList: [],
        hetongList: [],
        chengbengList:[],
        totalCount:0
      },
      //默认第一个选项卡
      //activeName：默认显示那个tab。
      //activeName：el-tabs组件双向绑定的值，activeName值的取值是要对应el-tab-pane标记的name值
      activeName: "first",

      moneyBackCount_show: false,
      hetongCount_show: false,
      invoiceCount_show: false,
      totalCount_show : false,
      chengbengListCount_show:false,
      form: {
        id:'',
        hetongyellow:'',
        hetongred:'',
        invoiceyellow:'',
        invoicered:'',
        chenbenred:'',
        chenbenyellow:'',
        moneyyellow:'',
        moneyred:''

      },
      formLabelWidth: '190px',
      rules:{
        hetongyellow:[{ required: true, message: '请输入预警天数', trigger: 'blur' }],
        hetongred:[{ required: true, message: '请输入预警天数', trigger: 'blur' }
        ,{ validator: checkHetongred, trigger: 'blur' }],
        chenbenyellow:[{ required: true, message: '请输入成本合同金额提醒比列', trigger: 'blur' }],
        chenbenred:[{ required: true, message: '请输入成本合同金额预警比列', trigger: 'blur' }],
        invoiceyellow:[{ required: true, message: '请输入预警天数', trigger: 'blur' }],
        invoicered:[{ required: true, message: '请输入预警天数', trigger: 'blur' }
          ,{ validator: checkInvoicered, trigger: 'blur' }],
        moneyyellow:[{ required: true, message: '请输入预警天数', trigger: 'blur' }],
        moneyred:[{ required: true, message: '请输入预警天数', trigger: 'blur' }
          ,{ validator: checkMoneyred, trigger: 'blur' }]
      },
    }
  },
  created(){
    this.getWarningList();
    this.getWarningSet();
    this.isShowWarningSet();
  },
  mounted() {
  },
  beforeDestroy() {
  },
  methods: {
    //跳转预警列表页面
    goMoreThan(){
      this.$router.push({
        path: '/systemWarning/indexWarning'
      })
    },
    //init预警配置按钮显示
    isShowWarningSet(){
      const currentUser = this.$store.getters.user
      for(let i = 0 ; i < currentUser.roles.length ; i++){
        if(currentUser.roles[i].roleKey === 'admin'){
          this.isShowWarning = true
        }
      }
    },
    //查询预警配置数据
    getWarningSet(){
      request({
        url: '/warningset/find',
        method: 'get'
      }).then(response => {
        if(response.data.length > 0){
          this.form = response.data[0]
        }
      });
    },
    submitWarning(){
      this.$refs['form'].validate(async(valid) => {
        if (valid) {
          return request({
            url: '/warningset/save',
            method: 'post',
            data: this.form
          }).then((response)=>{
            console.log(response)
            this.dialogFormVisible = false;
            this.$message({
              showClose: true,
              message: '配置成功',
              type: 'success'
            });
          })
        }
      })
    },
    //显示菜单配置弹框
    showWarningEditer(){
      this.dialogFormVisible  = !this.dialogFormVisible
    },
    //预警点击详情
    async goDetail(item){
      console.log(item)
      let path = "";
      let id = "";
      switch (item.warnType) {
        case "资金回笼预警" :
          this.$router.push({
            path: '/project/moneyBack/backProgress',
            query: {
              warningObjectId:item.objectId,//付款节点id
              warningObjectParentId:item.objectParentId,//合同id
            }
          })
          return
        case "合同签订预警" :
          const { code, data, msg } = await getFlowInfoByFlowId({
            flowId: 'process_pm2hhuaa'
          })
          if (code == 200) {
            localStorage.setItem('proData', '')
            localStorage.setItem('procInsId', '')
            this.$router.push({
              path: '/task/record/index/projectContract',
              query: {
                deployId: data.deploymentId,
                procDefId: data.id,
                warningObjectId:item.objectId,
                formId: data.formId
              }
            })
          }
          return
        case "成本预警" :
          path = '/task/record/index/productionProject'
          id = item.objectId
          break
        case "开票预警" :
          path = '/task/record/index/projectContract'
          id = item.objectId
          break
      }
      this.$router.push({
        path: path,
        query: {
          id: id,
          tableName: item.objectTable,
        },
      })
    },

    getWarningList(){
      let that = this;
      request({
        url: '/IndexController/getWarningList',
        method: 'get'
      }).then(response => {
        that.tableData = response
        //that.$set(that.tableData, response, null)

        that.moneyBackCount_show = response.moneyBackList.length > 0 ? true : false
        that.chengbengListCount_show = response.chengbengList.length > 0 ? true : false
        that.invoiceCount_show = response.invoiceList.length > 0 ? true : false
        that.hetongCount_show = response.hetongList.length > 0 ? true : false
        that.totalCount_show = that.moneyBackCount_show || that.invoiceCount_show || that.hetongCount_show || chengbengListCount_show

        console.log(that)
      });
    }
  }
}
</script>
