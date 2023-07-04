<!--
 * @Author: chad
 * @Date: 2021-10-26 09:02:48
 * @LastEditTime: 2021-11-18 10:38:03
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jshxpms-vue\src\views\flowable\formView\test.vue
-->
<template>
  <div class="goodspurchaseindex">
    <el-button v-if="isCommitBtnShow" class="btnyl" size="mini" type="primary" @click="isShowPage=true">订单打印</el-button>
    <el-form
        ref="form"
        :model="form.variables"
        :rules="rules"
        class="box"
        label-width="140px"
        style="overflow: hidden;"
    >
      <el-row :gutter="4" style="padding:0 10px;">
        <el-col :span="24">
          <el-form-item label="基本信息" class="title_class">
            <el-divider></el-divider>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="4" style="padding:0 10px;">
        <el-col :span="12">
          <el-form-item label="申请人" prop="username">
            <el-input v-model="formUserName" disabled placeholder="请输入申请人" style="width:100%;"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="申请部门" prop="dept">
            <el-input v-model="formDeptName" disabled placeholder="请输入申请部门" style="width:100%;"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="4" style="padding:0 10px;">
        <el-col :span="12">
          <el-form-item label="申请时间" prop="createTime">
            <el-date-picker
                v-model="form.variables.createTime"
                :picker-options="pickerOptions"
                align="right"
                disabled
                placeholder="选择申请时间"
                style="width:100%;"
                type="datetime"
                value-format="yyyy-MM-dd HH:mm:ss"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="货物采购编号" prop="caigounum">
            <el-input v-model="form.variables.caigounum" disabled placeholder="系统自动生成" style="width:100%;"/>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="4" style="padding:0 10px;">
        <el-col :span="24">
          <el-form-item label="货物采购详情" class="title_class">
            <el-divider></el-divider>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="4" style="padding:0 10px;">
        <el-col :span="12">
          <el-form-item label="请购编号" prop="qinggoubianhao">
            <el-input v-model="form.variables.qinggoubianhao" disabled placeholder="请选择项目请购" style="width:100%;">
              <el-button
                  slot="append"
                  icon="el-icon-third-guide"
                  v-on:click.native="isformdisabled && chooseProjectBuyMaterial()"
              ></el-button>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="请购申请人" prop="qinggouren">
            <el-input v-model="form.variables.qinggouren" disabled placeholder="请购申请人" style="width:100%;"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="4" style="padding:0 10px;">
        <el-col :span="12">
          <el-form-item label="请购部门" prop="qinggoubumen">
            <el-input v-model="form.variables.qinggoubumen" disabled placeholder="请购部门" style="width:100%;"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="请购单位" prop="qinggoudanwei">
            <el-input :value="formCompanyNameTypeListFormat(form.variables.qinggoudanwei)" disabled placeholder="请购单位"
                      style="width:100%;"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="4" style="padding:0 10px;">
        <el-col :span="12">
          <el-form-item label="项目编号" prop="num">
            <el-input v-model="form.variables.num" disabled placeholder="项目编号" style="width:100%;"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="项目名称" prop="projectname">
            <el-input v-model="form.variables.projectname" disabled placeholder="项目名称" style="width:100%;"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="4" style="padding:0 10px;">
        <el-col :span="12">
          <el-form-item label="收货地址" prop="xiangmujingli">
            <el-input v-model="form.variables.xiangmujingli" disabled placeholder="收货地址" style="width:100%;"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="供应商名称" prop="qinggougys">
            <el-input v-model="form.variables.qinggougys" disabled placeholder="供应商名称" style="width:100%;"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="4" style="padding:0 10px;">
        <el-col :span="24">
          <el-form-item label="备注" prop="qinggoubeizhu">
            <el-input
                v-model="form.variables.qinggoubeizhu"
                :rows="2"
                disabled
                placeholder="请输入备注"
                style="width:100%;"
                type="textarea"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="4" style="padding:0 10px;">
        <el-col :span="24">
          <el-form-item label="附件" prop="fileProjectBuyMaterial">
            <el-upload
                :action="uploadUrl"
                :before-upload="checkMyFileSize"
                :disabled="!isformdisabled"
                :file-list="fileProjectBuyMaterialList"
                :headers="uploadHeaders"
                :on-preview="downloadFile"
                class="upload-demo"
                multiple
                style="width:100%;"
            >
            </el-upload>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="4" style="padding:0 10px;">
        <el-col :span="24">
          <el-form-item label="需求内容" class="title_class">
            <el-divider></el-divider>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10" class="mb8" style="padding:0 10px;" v-if="isformdisabled">
        <el-col :span="1.5">
          <el-button
              icon="el-icon-plus"
              size="mini"
              type="primary"
              @click="addDomain"
          >添加
          </el-button>
        </el-col>
        <el-col :span="1.5">
          <el-button
              icon="el-icon-delete"
              size="mini"
              type="danger"
              @click="handleDeleteDomain"
          >删除
          </el-button>
        </el-col>
      </el-row>

      <el-table
          ref="table"
          :data="form.variables.purchaseList"
          :row-class-name="rowProjectBuyMaterialIndex"
          border
          class="material_class"
          size="small"
          tooltip-effect="dark"
          @selection-change="handleProjectBuyMaterialSelectionChange"
      >
        <template>
          <el-table-column align="center" type="selection"/>
          <el-table-column align="center" header-align="center" label="建议供应商">
            <template slot-scope="scope">
              <el-form-item
                  class="noleftform"
                  style="width: 100%;margin-bottom:0;"
              >
                <el-input v-model="scope.row.name" :disabled="!isformdisabled" placeholder="请输入建议供应商"/>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column align="center" header-align="center" label="材料名称">
            <template slot-scope="scope">
              <el-form-item
                  class="noleftform"
                  style="width: 100%;margin-bottom:0;"
              >
                <el-input v-model="scope.row.qicainame" :disabled="!isformdisabled" placeholder="请输入材料名称"/>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="品牌-规格型号" align="center" header-align="center" width="120px">
            <template slot-scope="scope">
              <el-form-item
                  class="noleftform"
                  style="width: 100%;margin-bottom:0;"
              >
                <el-input v-model="scope.row.leixing" :disabled="!isformdisabled" placeholder="请输入品牌-规格型号"/>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="单位" align="center" header-align="center" width="100px">
            <template slot-scope="scope">
              <el-form-item
                  class="noleftform"
                  style="width: 100%;margin-bottom:0;"
              >
                <el-input v-model="scope.row.danwei" :disabled="!isformdisabled" placeholder="请输入单位"/>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="数量" align="center" header-align="center">
            <template slot-scope="scope">
              <el-form-item
                  class="noleftform"
                  style="width: 100%;margin-bottom:0;"
              >
                <el-input-number
                    v-model="scope.row.shuliang"
                    :controls="false"
                    :disabled="!isformdisabled"
                    :max="9999999999.99"
                    :min="0"
                    :step="1"
                    placeholder="请输入数量"
                    step-strictly
                    style="width:100%;"
                ></el-input-number>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column align="center" header-align="center" label="参考单价1(元)">
            <template slot-scope="scope">
              <el-form-item
                  class="noleftform"
                  style="width: 100%;margin-bottom:0;"
              >
                <el-input-number
                    v-model="scope.row.cankaodanjia1"
                    :controls="false"
                    :disabled="!isformdisabled"
                    :max="9999999999.99"
                    :min="0"
                    :precision="2"
                    :step="1"
                    placeholder="请输入参考单价1(元)"
                    style="width:100%;"
                    @change="danjiaChange(scope.row)"
                ></el-input-number>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column align="center" header-align="center" label="参考单价2(元)">
            <template slot-scope="scope">
              <el-form-item
                  class="noleftform"
                  style="width: 100%;margin-bottom:0;"
              >
                <el-input-number
                    v-model="scope.row.cankaodanjia2"
                    :controls="false"
                    :disabled="!isformdisabled"
                    :max="9999999999.99"
                    :min="0"
                    :precision="2"
                    :step="1"
                    placeholder="请输入参考单价2(元)"
                    style="width:100%;"
                    @change="danjiaChange(scope.row)"
                ></el-input-number>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column align="center" header-align="center" label="参考单价3(元)">
            <template slot-scope="scope">
              <el-form-item
                  class="noleftform"
                  style="width: 100%;margin-bottom:0;"
              >
                <el-input-number
                    v-model="scope.row.cankaodanjia3"
                    :controls="false"
                    :disabled="!isformdisabled"
                    :max="9999999999.99"
                    :min="0"
                    :precision="2"
                    :step="1"
                    placeholder="请输入参考单价3(元)"
                    style="width:100%;"
                    @change="danjiaChange(scope.row)"
                ></el-input-number>
              </el-form-item>
            </template>
          </el-table-column>

          <el-table-column label="建议单价(元)" align="center" header-align="center">
            <template slot-scope="scope">
              <el-form-item
                  class="noleftform"
                  style="width: 100%;margin-bottom:0;"
              >
                <el-input-number v-model="scope.row.jianyidanjia"
                                 :controls="false"
                                 :disabled="!isformdisabled"
                                 :max="9999999999.99"
                                 :min="0" :precision="2" :step="1"
                                 style="width:100%;"
                />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="建议总价(元)" align="center" header-align="center">
            <template slot-scope="scope">
              <el-form-item
                  class="noleftform"
                  style="width: 100%;margin-bottom:0;"
              >
                <el-input :value="computeAdviceTotal(scope.row)" disabled placeholder="系统自动计算" style="width:100%;"/>
              </el-form-item>
            </template>
          </el-table-column>
        </template>
      </el-table>
      <el-row :gutter="4" style="padding:0 10px;">
        <el-col :span="24">
          <el-form-item></el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="4" style="padding:0 10px;">
        <el-col :span="24">
          <el-form-item label="备注" prop="beizhu">
            <el-input
                v-model="form.variables.beizhu"
                :disabled="!isformdisabled"
                :rows="2"
                placeholder="请输入备注"
                style="width:100%;"
                type="textarea"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="4" style="padding:0 10px;">
        <el-col :span="12">
          <el-form-item label="建议采购总额(元)" prop="shijizonge">
            <el-input v-model="form.variables.shijizonge" disabled placeholder="系统自动计算" style="width:100%;"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="借款单位" prop="jiekuandanwei">
            <el-select
                v-model="form.variables.jiekuandanwei"
                :disabled="!isformdisabled"
                placeholder="请选择借款单位"
                style="width:100%;"
            >
              <el-option
                  v-for="dict in formCompanyNameTypeList"
                  :key="dict.dictValue"
                  :label="dict.dictLabel"
                  :value="dict.dictValue"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="4" style="padding:0 10px;">
        <el-col :span="12">
          <el-form-item label="借款金额(元)" prop="jinex">
            <el-input-number
                v-model="form.variables.jinex"
                :disabled="!isformdisabled"
                :min="0"
                :precision="2"
                :step="1"
                placeholder="请输入借款金额(元)"
                style="width:100%;"
                @input="baoxiaojineChange"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="借款金额(大写)" prop="jined">
            <el-input
                v-model="form.variables.jined"
                disabled
                placeholder="请输入借款金额"
                style="width:100%;"
            />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="4" style="padding:0 10px;">
        <el-col :span="24">
          <el-form-item label="合同附件" prop="fujian">
            <el-upload
                :action="uploadUrl"
                :before-upload="checkMyFileSize"
                :data="fileData"
                :disabled="!isformdisabled"
                :file-list="fileList"
                :headers="uploadHeaders"
                :on-preview="downloadFile"
                :on-remove="handleRemove"
                :on-success="handleAvatarSuccess"
                class="upload-demo"
                multiple
                style="width:100%;"
            >
              <el-button size="small" type="primary" v-if="isformdisabled">点击上传</el-button>
            </el-upload>
          </el-form-item>
        </el-col>
      </el-row>

      <!-- 弹窗 -->
      <el-row :gutter="4" style="padding:0 10px;">
        <el-col :span="24">
          <ProjectBuyMaterialPopup
              :isshow="isChoose"
              req-url="/projectBuy/materialBuy/findFinshedAndUesd"
              @onBeforeClose="onBeforeClose"
              @transferProjectBuyMaterialData="getProjectBuyMaterial"
          />
        </el-col>
      </el-row>
    </el-form>
    <div v-if="isShowPage" class="goodspurpage">
      <div class="container_box">

        <GoodsPurchasePage :id="this.$route.query.id" :flowRecordList="this.flowRecordList" :local_val="this.local_val"
                           :proData="this.proData" @close="boxclose(val)"
        ></GoodsPurchasePage>
      </div>
    </div>
  </div>

</template>

<script>
import { getPurchaseDetailInfo, save } from '@/api/biz/goodsPurchase'
import { getMaterialBuyClfl } from '@/api/biz/projectBuy/materialBuy'
import { definitionStart } from '@/api/flowable/definition'
import { complete } from '@/api/flowable/process'
import { getFileDetail, getFileDetailByServiceId, saveFile } from '@/api/system/file'
import { formatDate } from '@/utils'
import ProjectBuyMaterialPopup from '@/components/Popup/ProjectBuyMaterialPopup'
import GoodsPurchasePage from '@/components/printpage/goodsPurchasepage'
import { uuid } from 'vue-uuid'

export default {
  components: { ProjectBuyMaterialPopup, GoodsPurchasePage },
  props: {
    proData: {
      type: String,
      default: () => {
        return ''
      }
    },
    isformdisabled: {
      type: Boolean,
      default: true
    },
    local_val: {
      type: Object,
      default: {}
    },
    flowRecordList: {
      type: Object,
      default: {}
    },
    isCommitBtnShow: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {

      //动态表格打印隐藏数据
      isShowPage: false,
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

    console.log(this.local_val)
    // const id = localStorage.getItem('id')
    const id = this.local_val.id
    if (id) {
      this.form.id = id
    }

    // this.form.formId = localStorage.getItem('formId')
    this.form.formId = this.local_val.formId

    this.getDicts('form_company_name').then((res) => {
      this.formCompanyNameTypeList = res.data
    })
  },
  methods: {
    boxclose(val) {
      this.isShowPage = val
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
          console.log(this)
          let procInsId = this.local_val.procInsId
          if (procInsId != '' && typeof (procInsId) != 'undefined' && procInsId != 'undefined') {
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
      localStorage.setItem("needLoadList","yes")
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
    }
  },
  watch: {
    proData: {
      handler(val) {
        this.uploadHeaders.Authorization = 'Bearer ' + this.$store.getters.token
        if (val) {
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
    }

  }
}
</script>
<style scoped lang="scss">
.goodspurchaseindex {
  position: relative;

  .btnyl {
    position: absolute;
    top: -50px;
    right: -200px;
  }

  .but-form {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .box {
    width: 140%;
    position: relative;
    left: -180px;
    //left: -100px;
    background: white;
  }

  .goodspurpage {
    background: #000000ab;

    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;

    .container_box {
      width: 70%;
      height: 90%;
      margin: 30px auto;
      background: white;
      overflow-y: scroll;

    }

  }
}


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

