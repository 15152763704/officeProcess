<!--
 * @Author: chad
 * @Date: 2021-10-26 09:02:48
 * @LastEditTime: 2021-11-18 10:38:03
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jshxpms-vue\src\views\flowable\formView\test.vue
-->
<template>
<div class="const_box">
  <el-button type="primary" size="mini" class="elclose" @click="doclose">关闭</el-button>
  <el-button type="primary" size="mini" class="zhijie" v-print="printObj">打印</el-button>
  <el-form
    ref="form"
    :model="form.variables"
    :rules="rules"
    label-width="140px"
    style="overflow: hidden;"
    class="box"
    id="printContents"
  >

    <el-row :gutter="4" style="padding:0 10px;">
      <el-col :span="24">
        <el-form-item class="title_class" label="基本信息" style="margin-bottom: unset">
          <el-divider></el-divider>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="4" style="padding:0 10px;">
      <el-col :span="12">
        <el-form-item label="申请人：" prop="username" style="margin-bottom: unset">
          <!--          <el-input v-model="formUserName" disabled placeholder="请输入申请人" style="width:100%;"/>-->
          <span>{{ formUserName }}</span>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="申请部门：" prop="dept" style="margin-bottom: unset">
          <!--          <el-input v-model="formDeptName" disabled placeholder="请输入申请部门" style="width:100%;"/>-->
          <span>{{ formDeptName }}</span>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="4" style="padding:0 10px;">
      <el-col :span="12">
        <el-form-item label="申请时间：" prop="createTime" style="margin-bottom: unset">
          <!--          <el-date-picker-->
          <!--            v-model="form.variables.createTime"-->
          <!--            type="datetime"-->
          <!--            placeholder="选择申请时间"-->
          <!--            align="right"-->
          <!--            value-format="yyyy-MM-dd HH:mm:ss"-->
          <!--            disabled-->
          <!--            style="width:100%;"-->
          <!--            :picker-options="pickerOptions"-->
          <!--          ></el-date-picker>-->
          <span>{{form.variables.createTime.split('.')[0]}}</span>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="货物采购编号：" prop="caigounum" style="margin-bottom: unset">
          <!--          <el-input v-model="form.variables.caigounum" disabled placeholder="系统自动生成" style="width:100%;"/>-->
          <span>{{ form.variables.caigounum }}</span>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="4" style="padding:0 10px;">
      <el-col :span="24">
        <el-form-item class="title_class" label="货物采购详情" style="margin-bottom: unset">
          <el-divider></el-divider>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="4" style="padding:0 10px;">
      <el-col :span="12">
        <el-form-item label="请购编号：" prop="qinggoubianhao" style="margin-bottom: unset">
          <!--          <el-input v-model="form.variables.qinggoubianhao" disabled placeholder="请选择项目请购" style="width:100%;">-->
          <!--            <el-button-->
          <!--              v-on:click.native="isformdisabled && chooseProjectBuyMaterial()"-->
          <!--              slot="append"-->
          <!--              icon="el-icon-third-guide"-->
          <!--            ></el-button>-->
          <!--          </el-input>-->
          <span>{{ form.variables.qinggoubianhao }}</span>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="请购申请人：" prop="qinggouren" style="margin-bottom: unset">
          <!--          <el-input v-model="form.variables.qinggouren" disabled placeholder="请购申请人" style="width:100%;"/>-->
          <span>{{ form.variables.qinggouren }}</span>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="4" style="padding:0 10px;">
      <el-col :span="12">
        <el-form-item label="请购部门：" prop="qinggoubumen" style="margin-bottom: unset">
          <!--          <el-input v-model="form.variables.qinggoubumen" disabled placeholder="请购部门" style="width:100%;"/>-->
          <span>{{ form.variables.qinggoubumen }}</span>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="请购单位：" prop="qinggoudanwei" style="margin-bottom: unset">
          <!--          <el-input :value="formCompanyNameTypeListFormat(form.variables.qinggoudanwei)" disabled placeholder="请购单位"-->
          <!--                    style="width:100%;"-->
          <!--          />-->
          <span>{{ formCompanyNameTypeListFormat(form.variables.qinggoudanwei) }}</span>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="4" style="padding:0 10px;">
      <el-col :span="12">
        <el-form-item label="项目编号：" prop="num" style="margin-bottom: unset">
          <!--          <el-input v-model="form.variables.num" disabled placeholder="项目编号" style="width:100%;"/>-->
          <span>{{ form.variables.num }}</span>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="项目名称：" prop="projectname" style="margin-bottom: unset">
          <!--          <el-input v-model="form.variables.projectname" disabled placeholder="项目名称" style="width:100%;"/>-->
          <span>{{ form.variables.projectname }}</span>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="4" style="padding:0 10px;">
      <el-col :span="12">
        <el-form-item label="收货地址：" prop="xiangmujingli" style="margin-bottom: unset">
          <!--          <el-input v-model="form.variables.xiangmujingli" disabled placeholder="收货地址" style="width:100%;"/>-->
          <span>{{ form.variables.xiangmujingli }}</span>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="供应商名称：" prop="qinggougys" style="margin-bottom: unset">
          <!--          <el-input v-model="form.variables.qinggougys" disabled placeholder="供应商名称" style="width:100%;"/>-->
          <span>{{ form.variables.qinggougys }}</span>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="4" style="padding:0 10px;">
      <el-col :span="24">
        <el-form-item label="备注：" prop="qinggoubeizhu" style="margin-bottom: unset">
          <!--          <el-input-->
          <!--            v-model="form.variables.qinggoubeizhu"-->
          <!--            type="textarea"-->
          <!--            :rows="2"-->
          <!--            disabled-->
          <!--            placeholder="请输入备注"-->
          <!--            style="width:100%;"-->
          <!--          />-->
          <span>{{ form.variables.qinggoubeizhu }}</span>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="4" style="padding:0 10px;">
      <el-col :span="24">
        <el-form-item class="title_class" label="需求内容" style="margin-bottom: unset">
          <el-divider></el-divider>
        </el-form-item>
      </el-col>
    </el-row>
    <el-card shadow="never">
      <table id="printId" border="0" cellpadding="0" cellspacing="0"
             style="font-size: 12px;
             background-color: white;
             border-collapse: collapse;
             color: white;
             table-layout: auto;
             width: 100%;
             text-align: center;
             border-bottom-width: 1px;
             border-bottom-style: solid;
             border-bottom-color: #dadcde;
              ">
        <thead style="border-top-width: 1px;
              border-top-style: solid;
              background-color: #f8f8f8;
              border-top-color: #dadcde;
              font-weight: bold;
              color: #454c70;"
        >
        <tr >
          <td style="
            padding: 5px 10px;
            font-size: 14px;
            font-family: Verdana;

            word-break: break-all; // 元素换行
                  ">
            建议供应商
          </td>
          <td style="
            padding: 5px 10px;
            font-size: 14px;
            font-family: Verdana;

            word-break: break-all; // 元素换行
                  ">
            材料名称
          </td>
          <td style="
            padding: 5px 10px;
            font-size: 14px;
            font-family: Verdana;

            word-break: break-all; // 元素换行
                  ">
            品牌-规格型号
          </td>
          <td style="
            padding: 5px 10px;
            font-size: 14px;
            font-family: Verdana;

            word-break: break-all; // 元素换行
                  ">
            单位
          </td>
          <td style="
            padding: 5px 10px;
            font-size: 14px;
            font-family: Verdana;

            word-break: break-all; // 元素换行
                  ">
            数量
          </td>
          <td style="
            padding: 5px 10px;
            font-size: 14px;
            font-family: Verdana;

            word-break: break-all; // 元素换行
                  ">
            建议单价(元)
          </td>
          <td style="
            padding: 5px 10px;
            font-size: 14px;
            font-family: Verdana;

            word-break: break-all; // 元素换行
                  ">
            建议总价(元)
          </td>

        </tr>
        </thead>
        <tbody v-if="form.variables.purchaseList.length">
        <tr v-for="item in form.variables.purchaseList" style="border-top-width: 1px;
      border-top-style: solid;
      border-top-color: #dadcde;
      font-weight: bold;
      color: #454c70;">
          <td style="
            padding: 5px 10px;
            font-size: 12px;
            font-weight: 100;
            font-family: Verdana;

            word-break: break-all; // 元素换行
                  ">{{ item.name }}</td>
          <td style="
            padding: 5px 10px;
            font-size: 12px;
            font-weight: 100;
            font-family: Verdana;

            word-break: break-all; // 元素换行
                  ">{{ item.qicainame }}</td>
          <td style="
            padding: 5px 10px;
            font-size: 12px;
            font-weight: 100;
            font-family: Verdana;

            word-break: break-all; // 元素换行
                  ">{{ item.leixing }}</td>
          <td style="
            padding: 5px 10px;
            font-size: 12px;
            font-weight: 100;
            font-family: Verdana;

            word-break: break-all; // 元素换行
                  ">{{ item.danwei }}</td>
          <td style="
            padding: 5px 10px;
            font-size: 12px;
            font-weight: 100;
            font-family: Verdana;

            word-break: break-all; // 元素换行
                  ">{{ item.shuliang }}</td>
          <td style="
            padding: 5px 10px;
            font-size: 12px;
            font-weight: 100;
            font-family: Verdana;

            word-break: break-all; // 元素换行
                  ">{{ item.jianyidanjia }}</td>
          <td style="
            padding: 5px 10px;
            font-size: 12px;
            font-weight: 100;
            font-family: Verdana;

            word-break: break-all; // 元素换行
                  ">{{ computeAdviceTotal(item) }}</td>
        </tr>
        </tbody>
      </table>
      <div v-if="!form.variables.purchaseList.length"
           style="
           min-height: 60px;
           text-align: center;
           width: 100%;
           height: 100%;
           display: flex;
           justify-content: center;
           align-items: center;
           border-bottom: 1px solid #ebeef5;

            ">
        <span style="
        line-height: 60px;
        width: 50%;
        color: #909399;
          ">暂无数据</span>
      </div>
    </el-card>

    <el-row :gutter="4" style="padding:0 10px;">
      <el-col :span="24">
        <el-form-item label="备注：" prop="beizhu" style="margin-bottom: unset">
          <!--          <el-input-->
          <!--            v-model="form.variables.beizhu"-->
          <!--            type="textarea"-->
          <!--            :rows="2"-->
          <!--            :disabled="!isformdisabled"-->
          <!--            placeholder="请输入备注"-->
          <!--            style="width:100%;"-->
          <!--          />-->
          <span>{{ form.variables.beizhu }}</span>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="4" style="padding:0 10px;">
      <el-col :span="12">
        <el-form-item label="建议采购总额(元)：" prop="shijizonge" style="margin-bottom: unset">
          <!--          <el-input v-model="form.variables.shijizonge" disabled placeholder="系统自动计算" style="width:100%;"/>-->
          <span>{{ form.variables.shijizonge }}</span>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="借款单位：" prop="jiekuandanwei" style="margin-bottom: unset">
          <!--          <el-select-->
          <!--            v-model="form.variables.jiekuandanwei"-->
          <!--            :disabled="!isformdisabled"-->
          <!--            placeholder="请选择借款单位"-->
          <!--            style="width:100%;"-->
          <!--          >-->
          <!--            <el-option-->
          <!--              v-for="dict in formCompanyNameTypeList"-->
          <!--              :key="dict.dictValue"-->
          <!--              :label="dict.dictLabel"-->
<!--              :value="dict.dictValue"-->
<!--            ></el-option>-->
<!--          </el-select>-->
          <span>{{form.variables.jiekuandanwei}}</span>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="4" style="padding:0 10px;">
      <el-col :span="12">
        <el-form-item label="借款金额(元)：" prop="jinex" style="margin-bottom: unset">
          <!--          <el-input-number-->
          <!--            v-model="form.variables.jinex"-->
          <!--            :disabled="!isformdisabled"-->
          <!--            :min="0"-->
          <!--            :precision="2"-->
          <!--            :step="1"-->
          <!--            placeholder="请输入借款金额(元)"-->
          <!--            style="width:100%;"-->
          <!--            @input="baoxiaojineChange"-->
          <!--          />-->
          <span>{{form.variables.jinex}}</span>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="借款金额(大写)：" prop="jined" style="margin-bottom: unset">
          <!--          <el-input-->
          <!--            v-model="form.variables.jined"-->
          <!--            disabled-->
          <!--            placeholder="请输入借款金额"-->
          <!--            style="width:100%;"-->
          <!--          />-->
          <span>{{ form.variables.jined }}</span>
        </el-form-item>
      </el-col>
    </el-row>

<!--    <el-row :gutter="4" style="padding:0 10px;">-->
<!--      <el-col :span="24">-->
<!--        <el-form-item label="合同附件" prop="fujian">-->
<!--          <el-upload-->
<!--            class="upload-demo"-->
<!--            :disabled="!isformdisabled"-->
<!--            :headers="uploadHeaders"-->
<!--            :action="uploadUrl"-->
<!--            :on-success="handleAvatarSuccess"-->
<!--            :file-list="fileList"-->
<!--            :on-remove="handleRemove"-->
<!--            :on-preview="downloadFile"-->
<!--            :data="fileData"-->
<!--            style="width:100%;"-->
<!--            multiple-->
<!--          >-->
<!--            <el-button size="small" type="primary" v-if="isformdisabled">点击上传</el-button>-->
<!--          </el-upload>-->
<!--        </el-form-item>-->
<!--      </el-col>-->
<!--    </el-row>-->

    <!-- 弹窗 -->
    <el-row :gutter="4" style="padding:0 10px;">
      <el-col :span="24">
        <ProjectBuyMaterialPopup
          :isshow="isChoose"
          req-url="/projectBuy/materialBuy/findFinshedAndUesd"
          @transferProjectBuyMaterialData="getProjectBuyMaterial"
          @onBeforeClose="onBeforeClose"
        />
      </el-col>
    </el-row>
    <el-row>
      <!--流程流转记录-->
      <!--      class="box-card"-->
      <el-card v-if="flowRecordList.length > 0" style="box-shadow: unset;margin-top: 5px">
        <div slot="header">
          <!--          class="clearfix"-->
          <span class="el-icon-notebook-1">审批记录</span>
        </div>

        <el-col :span="24">
          <div class="block">
            <el-timeline>
              <template v-for="(item,index ) in flowRecordList">
                <el-timeline-item
                  :key="index"
                  v-if="item.taskId"
                  :icon="setIcon(item.finishTime)"
                  :color="setColor(item.finishTime)"
                  style="padding-bottom: unset!important;"
                >
                  <p style="font-weight: 700">{{ item.taskName }}</p>
                  <el-card :body-style="{ padding: '1rem' }">
                    <label v-if="item.assigneeName" style="font-weight: normal;margin-right: 3rem;">
                      实际办理： {{ item.assigneeName }}
                      <el-tag size="mini" type="info">{{ item.deptName }}</el-tag>
                    </label>
                    <label
                      v-if="item.candidate"
                      style="font-weight: normal;margin-right: 3rem;"
                    >候选办理： {{ item.candidate }}</label>
                    <label style="font-weight: normal">接收时间：</label>
                    <label style="color:#8a909c;font-weight: normal">{{ item.createTime }}</label>
                    <label v-if="item.finishTime" style="margin-left: 3rem;font-weight: normal">办结时间：</label>
                    <label style="color:#8a909c;font-weight: normal">{{ item.finishTime }}</label>
                    <label v-if="item.duration" style="margin-left: 3rem;font-weight: normal">耗时：</label>
                    <label style="color:#8a909c;font-weight: normal">{{ item.duration }}</label>

                    <p v-if="item.comment">
                    <span v-if="item.comment.type === '1'">
                      审批意见:
                      <el-tag type="success">{{ item.comment.comment }}</el-tag>
                    </span>
                      <span v-if="item.comment.type === '2'">
                      退回意见:
                      <el-tag type="warning">{{ item.comment.comment }}</el-tag>
                    </span>
                      <span v-if="item.comment.type === '3'">
                      不予批准意见:
                      <el-tag type="danger">{{ item.comment.comment }}</el-tag>
                    </span>
                    </p>
                  </el-card>
                </el-timeline-item>
              </template>
            </el-timeline>
          </div>
        </el-col>
      </el-card>
    </el-row>
  </el-form>


</div>

</template>

<script>
import {getPurchaseDetailInfo, save} from '@/api/biz/goodsPurchase'
import {getMaterialBuyClfl} from '@/api/biz/projectBuy/materialBuy'
import {definitionStart} from '@/api/flowable/definition'
import {complete} from '@/api/flowable/process'
import {getFileDetail, getFileDetailByServiceId, saveFile} from '@/api/system/file'
import {formatDate} from '@/utils'
import ProjectBuyMaterialPopup from '@/components/Popup/ProjectBuyMaterialPopup'
import {uuid} from 'vue-uuid'

export default {
  components: {ProjectBuyMaterialPopup},
  props: {
    proData: {
      type: String,
      default: () => {
        return ''
      }
    },
    isformdisabled: {
      type: Boolean,
      default: false
    },
    local_val:{
      type: Object,
      default: () => {
        return {}
      }
    },
    flowRecordList:{
      type: Array,
      default: []
    },

  },
  data() {
    return {
      // flowRecordList: [], // 流程流转数据
      printObj: {
        id: 'printContents',
        popTitle: '打印',
        ignoreClass: 'noprint',
        // extraCss: 'https://www.google.com,https://www.google.com',
        extraHead: '<meta http-equiv="Content-Language"content="zh-cn"/>'
      },
      //动态表格打印隐藏数据
      isShowNum:true,
      formCompanyNameTypeList: [],//借款单位
      checkedProjectBuyMaterial: [],
      isChoose: false,
      isShowTrackProject: false,
      isShowAdvanceCost: false,
      siteShiArr: [],
      fileProjectBuyMaterialList: [],
      fileList: [],
      fileData: {
        fieldName: 'fujian',
        tableName: 'pms_goods_purchase'
      },
      formUserName: '',
      formDeptName: '',
      form: {
        variables: {
          fujian: '',
          purchaseList: [
            {
              key: uuid.v1(),
              qicainame: '',
              leixing: '',
              danwei: '',
              shuliang: '',
              cankaodanjia1: '',
              cankaodanjia2: '',
              cankaodanjia3: '',
              name: '',
              jianyidanjia: '',
              shijizonge: ''
            }
          ]
        },
        // 必传值
        formTableName: '',
        formType: '',
        id: 0,
        formId: 0
      },
      isUpdate: false,
      completeData: {
        comment: '退回重新审批',
        defaultTaskShow: true,
        delegateTaskShow: false,
        deployId: null,
        instanceId: '',
        multiple: false,
        procInsId: '',
        returnTaskShow: false,
        sendUserShow: true,
        targetKey: '',
        taskId: '',
        values: {},
        vars: ''
      },
      pickerOptions: {
        shortcuts: [
          {
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date())
            }
          },
          {
            text: '昨天',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24)
              picker.$emit('pick', date)
            }
          },
          {
            text: '一周前',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', date)
            }
          }
        ]
      },
      uploadHeaders: {
        Authorization: ''
      },
      uploadUrl: process.env.VUE_APP_BASE_API + '/common/batchUpload',
      rules: {
        qinggoubianhao: [
          { required: true, message: '请选择请购编号', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    // console.log(this.)
    // const id = localStorage.getItem('id')
    const id = this.local_val.id
    if (id) {
      this.form.id = id
    }

   // this.local_val.procInsId
    // procInsId
    // this.form.formId = localStorage.getItem('formId')
    this.form.formId =  this.local_val.formId

    this.getDicts('form_company_name').then((res) => {
      this.formCompanyNameTypeList = res.data
    })
  },
  methods: {
    doclose(){
      this.$emit("close",false)
    },
    formCompanyNameTypeListFormat(row) {
      return this.selectDictLabel(this.formCompanyNameTypeList, row)
    },
    //借款金额小写，change事件联动大写
    baoxiaojineChange(data) {
      this.form.variables.jined = this.amountConvertToUpperCase(data)
    },
    handleRemove(file, fileList) {
      let idArr
      if (this.form.variables.id) {
        idArr = fileList.map((item) => item.id)
      } else {
        idArr = fileList.map((item) => item.response.data[0].fileId)
      }
      this.form.variables.fujian = idArr.join(';')
      if (idArr.length == 0) {
        this.rules.fujian = [
          { required: true, message: '请上传合同附件', trigger: 'change' }
        ]
      }
    },
    handleAvatarSuccess({ data }, file, fileList) {
      this.form.variables.fujian = this.form.variables.fujian == null ? '' : this.form.variables.fujian
      this.form.variables.fujian += `;${data[0].fileId}`
      this.rules.fileLaborContract = []
      this.$refs.form.clearValidate('fujian')
      console.log(this.form.variables.fujian)
    },
    getPurchaseDetailInfo(parentId) {
      getPurchaseDetailInfo(parentId).then((res) => {
        this.$set(this.form.variables, 'purchaseList', res.data)
      })
    },
    handleAdviceTotalChange(value, row) {
      row.shijizonge = value
      let purchaseList = this.form.variables.purchaseList
      let advicePurchaseTotal = 0
      for (let i = 0; i < purchaseList.length; i++) {
        advicePurchaseTotal += purchaseList[i].shijizonge
      }
      this.$set(this.form.variables, 'shijizonge', advicePurchaseTotal)
    },
    onBeforeClose() {
      this.isChoose = false
    },
    addDomain() {
      this.form.variables.purchaseList.push({
        key: uuid.v1(),
        qicainame: '',
        leixing: '',
        danwei: '',
        shuliang: '',
        cankaodanjia1: '',
        cankaodanjia2: '',
        cankaodanjia3: '',
        name: '',
        jianyidanjia: '',
        shijizonge: ''
      })
    },
    handleDeleteDomain() {
      if (this.checkedProjectBuyMaterial.length == 0) {
        this.$alert('请先选择要删除的需求内容', '提示', {
          confirmButtonText: '确定'
        })
      } else {
        this.checkedProjectBuyMaterial.forEach((item) => {
          this.form.variables.purchaseList.splice(item.index, 1)
        })
        if (this.form.variables.purchaseList.length == 0) {
          this.addDomain()
        }
      }
    },
    handleProjectBuyMaterialSelectionChange(selection) {
      this.checkedProjectBuyMaterial = selection.sort(
        (a, b) => b.index - a.index
      )
    },
    rowProjectBuyMaterialIndex({ row, rowIndex }) {
      row.index = rowIndex
    },
    chooseProjectBuyMaterial() {
      this.isChoose = true
    },
    getProjectBuyMaterial(row) {
      if (row) {
        this.form.variables.qinggoubianhao = row.qinggoubianhao
        this.form.variables.projectname = row.xmmc
        this.form.variables.num = row.num
        this.form.variables.qinggouren = row.createUserName
        this.form.variables.qinggoubumen = row.createDeptName
        this.form.variables.qinggoudanwei = row.qinggoudanwei
        this.form.variables.xiangmujingli = row.projectdirector
        this.form.variables.qinggougys = row.gongyingshang
        this.form.variables.qinggoubeizhu = row.beizhu
        this.findChildFile(row.id)
        this.fillProjectBuyMaterialByParentId(row)
      }
      this.isChoose = false
    },
    fillProjectBuyMaterialByParentId(row) {
      getMaterialBuyClfl(row.id).then((res) => {
        let purchaseList = []
        let data = res.data
        if (data.length == 0) {
          this.form.variables.purchaseList = [
            {
              key: uuid.v1(),
              qicainame: '',
              leixing: '',
              danwei: '',
              shuliang: '',
              cankaodanjia1: '',
              cankaodanjia2: '',
              cankaodanjia3: '',
              name: '',
              jianyidanjia: '',
              shijizonge: ''
            }
          ]
        } else {
          for (let i = 0; i < data.length; i++) {
            let purchase = {}
            purchase.key = uuid.v1()
            purchase.name = row.gongyingshang
            purchase.qicainame = data[i].cailiaoname
            purchase.leixing = data[i].pinpai + '-' + data[i].guige
            purchase.danwei = data[i].danwei
            purchase.shuliang = data[i].num
            purchase.cankaodanjia1 = ''
            purchase.cankaodanjia2 = ''
            purchase.cankaodanjia3 = ''
            purchase.pinpai = data[i].pinpai
            purchase.jianyidanjia = ''
            purchase.shijizonge = ''
            purchaseList.push(purchase)
          }
          this.form.variables.purchaseList = purchaseList
        }

      })
    },
    downloadFile({ url }) {
      window.open(url)
    },
    onSubmit() {
      this.$refs['form'].validate(async(valid) => {
        if (valid) {
          // const procInsId = localStorage.getItem('procInsId')
          console.log(this);
          debugger
          let procInsId = this.local_val.procInsId
          if (procInsId != '' && typeof(procInsId) != "undefined" && procInsId != 'undefined' ) {
            this.completeData.instanceId = procInsId
            this.completeData.procInsId = procInsId
            // const taskId = localStorage.getItem('taskId')
            const taskId = this.local_val.taskId
            if (taskId) {
              this.completeData.taskId = taskId
            }
            console.log('审批更新逻辑', this.form)
            const updateSealmsg = await save({
              id: this.form.id,
              ...this.form.variables
            })
            if (updateSealmsg.code == 200) {
              const completemsg = await complete(this.completeData)
              if (completemsg.code == 200) {
                this.msgSuccess(completemsg.msg)
                this.goBack()
              }
            }
          } else {
            // this.form.formTableName = localStorage.getItem('formTableName')
            // this.form.formType = localStorage.getItem('formType')
            // let procDefId = localStorage.getItem('procDefId')

            this.form.formTableName = this.local_val.formTableName
            this.form.formType = this.local_val.formType
            let procDefId = this.local_val.procDefId

            console.log('submit!', this.form)
            const { code, data } = await save({
              ...this.form.variables
            })
            if (code == 200) {
              this.form.id = data
              const { code, msg } = await definitionStart(procDefId, this.form)
              if (code == 200) {
                this.msgSuccess(msg)
                this.goBack()
              }
            }
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    goBack() {
      // 关闭当前标签页并返回上个页面
      this.$store.dispatch('tagsView/delView', this.$route)
      this.$router.go(-1)
    },
    async getFileDetail(id) {
      const { code, data, msg } = await getFileDetail(id)
      if (code == 200) {
        data.map((item) => {
          if (item.fieldName == 'fujian') {
            this.fileList.push({
              name: item.fileName,
              url: item.savePath,
              id: item.id
            })
          } else {
            this.fileProjectBuyMaterialList.push({
              name: item.fileName,
              url: item.savePath,
              id: item.id
            })
          }

        })
      }
    },
    //根据业务id查询附件列表（ 选择的货物类采购附件 ）
    findChildFile(serviceId) {
      getFileDetailByServiceId(serviceId).then((res) => {
        //清空附件id
        this.fileProjectBuyMaterialList.map((item) => {
          let arr = this.form.variables.fujian.split(';')
          arr.splice(arr.indexOf(item), 1)
          this.form.variables.fujian = arr.join(';')
        })
        this.fileProjectBuyMaterialList = []
        //重写附件id
        if (res.code == 200) {
          res.data.map((item) => {
            //页面渲染
            this.fileProjectBuyMaterialList.push({
              name: item.fileName,
              url: item.savePath,
              id: item.id
            })
            //后台在保存以边附件信息
            let saveInfo = item
            saveInfo.id = null
            saveInfo.tableName = 'pms_goods_purchase'
            saveInfo.fieldName = 'QINGGOUFUJIAN'
            saveInfo.objectId = null
            saveFile(saveInfo).then((fileRes) => {
              this.form.variables.fujian =
                this.form.variables.fujian == null ? '' : this.form.variables.fujian
              this.form.variables.fujian += (';' + fileRes.data.id)
            })
          })
        }
      })
    },
    danjiaChange(row) {
      // let price1 = row.cankaodanjia1 == null ? 0 : row.cankaodanjia1
      // let price2 = row.cankaodanjia2 == null ? 0 : row.cankaodanjia2
      // let price3 = row.cankaodanjia3 == null ? 0 : row.cankaodanjia3
      // let min = 0
      // if (price1 <= price2) {
      //   min = price1
      // } else {
      //   min = price2
      // }
      // if (min <= price3) {
      //   min = min
      // } else {
      //   min = price3
      // }
      let priceArr = []
      row.cankaodanjia1 != null && row.cankaodanjia1 != 0 && priceArr.push(row.cankaodanjia1)
      row.cankaodanjia2 != null && row.cankaodanjia2 != 0 && priceArr.push(row.cankaodanjia2)
      row.cankaodanjia3 != null && row.cankaodanjia3 != 0 && priceArr.push(row.cankaodanjia3)
      row.jianyidanjia = this.$_.min(this.$_.uniq(priceArr))
    },
    setIcon(val) {
      if (val) {
        return 'el-icon-check'
      } else {
        return 'el-icon-time'
      }
    },
    setColor(val) {
      if (val) {
        return '#2bc418'
      } else {
        return '#b3bdbb'
      }
    },
  },
  watch: {
    proData: {
      handler(val) {
        this.uploadHeaders.Authorization = 'Bearer ' + this.$store.getters.token
        if (val) {
          console.log(val)
          let dataArr = JSON.parse(val)
          this.form.variables = {
            ...dataArr[0]
          }
          this.getPurchaseDetailInfo(this.form.variables.id)
          // 请求附件详情
          this.getFileDetail(this.form.variables.fujian)
          this.formUserName = this.form.variables.createUserName
          this.formDeptName = this.form.variables.createDeptName

        } else {
          const currentUser = this.$store.getters.user
          this.formUserName = currentUser.nickName
          this.formDeptName = currentUser.dept.deptName
          this.form.variables.createTime = formatDate(new Date().getTime())

        }
      },
      immediate: true
    }
  },
  computed: {
    computeAdviceTotal() {
      return function(row) {
        let num = row.shuliang == null ? 0 : row.shuliang
        let advicePrice = row.jianyidanjia == null ? 0 : row.jianyidanjia
        let adviceTotal = num * advicePrice
        row.shijiacaigoujia = adviceTotal
        let purchaseList = this.form.variables.purchaseList
        let advicePurchaseTotal = 0
        for (let i = 0; i < purchaseList.length; i++) {
          let adviceTotal = parseFloat(purchaseList[i].shijiacaigoujia)
          advicePurchaseTotal += adviceTotal
        }
        console.log('advicePurchaseTotal', advicePurchaseTotal)
        this.$set(this.form.variables, 'shijizonge', advicePurchaseTotal.toFixed(2))
        return adviceTotal.toFixed(2)
      }
    },



  }
}
</script>
<style scoped lang="scss">
.const_box {
  position: relative;
  padding-top: 40px;
  //::v-deep .el-form-item{
  //  margin-bottom: 0px;
  //}
  .el-form-item__content {
    justify-content: flex-start;
  }

  //.noleftform{
  //  ::v-deep .el-form-item__content{
  //    line-height: unset;
  //  }
  //}

  .elclose {
    position: absolute;
    top: 16px;
    right: 15px;
  }

  .zhijie {
    position: absolute;
    top: 16px;
    right: 80px;
  }

  .but-form {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  table {
    // 斑马纹效果stripe
    tr:nth-child(even) {
      background: #F5F7F9;
    }

    tr:nth-child(odd) {
      background: #FFF;
    }
  }


}


//.box {
//  width: 140%;
//  position: relative;
//  left: -180px;
//  //left: -100px;
//  background: white;
//}

</style>
<style lang="scss">
.material_class .el-form-item__content {
  margin-left: 0 !important;
}

//  .el-col-16{
//    width: 100%!important;
//
//  }
//  .el-col-offset-4{
//    margin-left: 0!important;
//  }
//}

</style>

