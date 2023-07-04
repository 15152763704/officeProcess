<!--
 * @Author: chad
 * @Date: 2021-10-26 09:02:48
 * @LastEditTime: 2021-11-18 14:38:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jshxpms-vue\src\views\flowable\formView\test.vue
-->
<template>
  <div>
    <el-form
      ref="form"
      :model="form.variables"
      :rules="rules"
      label-width="130px"
      style="overflow: hidden;"
    >
      <el-row :gutter="4" style="padding:0 10px;">
        <el-col :span="24">
          <el-form-item class="title_class" label="采购借款">
            <el-divider></el-divider>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="4" style="padding:0 10px;">
        <el-col :span="24">
          <el-form-item label="借款原因" prop="borrowingreason">
            <el-input
              v-model="form.variables.borrowingreason"
              :disabled="!isformdisabled"
              :rows="3"
              placeholder="请输入借款原因"
              style="width:100%;"
              type="textarea"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="4" style="padding:0 10px;">
        <el-col :span="12">
          <el-form-item label="借款人" prop="username">
            <el-input v-model="formUserName" disabled placeholder="请输入报销人" style="width:100%;"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="借款部门" prop="dept">
            <el-input v-model="formDeptName" disabled placeholder="请输入报销部门" style="width:100%;"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="4" style="padding:0 10px;">
        <el-col :span="12">
          <el-form-item label="借款时间" prop="time">
            <el-date-picker
              v-model="form.variables.time"
              disabled
              placeholder="选择日期时间"
              style="width:100%;"
              type="datetime"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="是否关联采购单" prop="caigoushow">
            <el-select @change="caigoushowChange"
                       v-model="form.variables.caigoushow"
                       :disabled="!isformdisabled"
                       placeholder="请选择是否关联采购订单"
                       style="width:100%;"
            >
              <el-option
                v-for="dict in sysYesNoList"
                :key="dict.dictValue"
                :label="dict.dictLabel"
                :value="dict.dictValue"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>


      <el-row :gutter="4" style="padding:0 10px;" v-if="form.variables.caigoushow == 'Y'">
        <el-col :span="12">
          <el-form-item label="货物采购订单" prop="huowudingdan">
            <el-input
              v-model="form.variables.huowudingdan"
              disabled
              placeholder="点击选择采购订单"
              style="width:100%;"
            >
              <el-button
                slot="append"
                icon="el-icon-third-guide"
                @click="isformdisabled && (isChoose = 'GoodsProcurementPopup')"
              ></el-button>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="项目编号" prop="projectnum">
            <el-input
              v-model="form.variables.projectnum"
              disabled
              placeholder="请输入项目编号"
              style="width:100%;"
            />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="4" style="padding:0 10px;" v-if="form.variables.caigoushow == 'Y'">
        <el-col :span="12">
          <el-form-item label="项目名称" prop="projectname">
            <el-input
              v-model="form.variables.projectname"
              disabled
              placeholder="点击选择项目名称"
              style="width:100%;"
            >
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="项目经理" prop="pm">
            <el-input
              v-model="form.variables.pm"
              disabled
              placeholder="请输入项目经理"
              style="width:100%;"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="4" style="padding:0 10px;" v-if="form.variables.caigoushow == 'Y'">
        <el-col :span="12">
          <el-form-item label="付款方式" prop="fukuanfangshi">
            <el-select
              v-model="form.variables.fukuanfangshi"
              :disabled="!isformdisabled"
              placeholder="请选择付款方式"
              style="width:100%;"
            >
              <el-option
                v-for="dict in formPaymentMethod"
                :key="dict.dictValue"
                :label="dict.dictLabel"
                :value="dict.dictValue"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="采购借款编号" prop="nums">
            <el-input
              disabled
              v-model="form.variables.nums"
              placeholder="后台自动生成"
              style="width:100%;"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="4" style="padding:0 10px;">
        <el-col :span="24">
          <el-form-item class="title_class" label="材料明细">
            <el-divider></el-divider>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row v-if="isformdisabled&&form.variables.caigoushow == 'Y'" :gutter="10" class="mb8" style="padding:0 10px;">
        <el-col :span="1.5">
          <el-button
            icon="el-icon-plus"
            size="mini"
            type="primary"
            @click="handleAddPmsXzbaoxiaoqingdan"
          >添加
          </el-button>
        </el-col>
        <el-col :span="1.5">
          <el-button
            icon="el-icon-delete"
            size="mini"
            type="danger"
            @click="handleDeletePmsXzbaoxiaoqingdan"
          >删除
          </el-button>
        </el-col>
      </el-row>

      <el-row :gutter="4" style="padding:0 10px;" v-if="form.variables.caigoushow == 'Y'">
        <el-col :span="24">
          <el-table
            ref="pmsXzbaoxiaoqingdan"
            :data="form.variables.pmsBorrowingdetailList"
            :row-class-name="rowPmsXzbaoxiaoqingdanIndex"
            border
            @selection-change="handlePmsXzbaoxiaoqingdanSelectionChange"
          >
            <el-table-column align="center" type="selection"/>
            <el-table-column label="材料名称" prop="name">
              <template slot-scope="scope">
                <el-input
                  v-model="scope.row.name"
                  :disabled="!isformdisabled"
                  placeholder="请输入材料名称"
                  style="width:100%;"
                />
              </template>
            </el-table-column>
            <el-table-column label="品牌-规格型号" prop="xinghao">
              <template slot-scope="scope">
                <el-input
                  v-model="scope.row.xinghao"
                  :disabled="!isformdisabled"
                  placeholder="请输入品牌-规格型号"
                  style="width:100%;"
                />
              </template>
            </el-table-column>
            <el-table-column label="单位" prop="danwei">
              <template slot-scope="scope">
                <el-input
                  v-model="scope.row.danwei"
                  :disabled="!isformdisabled"
                  placeholder="请输入单位"
                  style="width:100%;"
                />
              </template>
            </el-table-column>
            <el-table-column label="数量" prop="num">
              <template slot-scope="scope">
                <el-input-number
                  v-model="scope.row.num"
                  disabled
                  :min="0"
                  :precision="0"
                  placeholder="请输入数量"
                  style="width:100%;"
                />
              </template>
            </el-table-column>

            <el-table-column label="建议单价" align="center" header-align="center">
              <template slot-scope="scope">
                <el-input :value="scope.row.jianyidanjia" disabled placeholder="系统自动计算"/>
              </template>
            </el-table-column>

            <el-table-column label="建议总价" align="center" header-align="center">
              <template slot-scope="scope">
                <el-input :value="computeAdviceTotal(scope.row)" disabled placeholder="系统自动计算"/>
              </template>
            </el-table-column>


          </el-table>
        </el-col>
      </el-row>
      <el-row :gutter="4" style="padding:0 10px; margin-top:10px;">


        <el-row :gutter="4" style="padding:0 10px;">
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
          <el-col :span="12" v-if="form.variables.caigoushow == 'Y'">
            <el-form-item label="货物总额(元)" prop="shijizonge">
              <el-input v-model="form.variables.shijizonge" disabled placeholder="系统自动计算" style="width:100%;"/>
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
                placeholder="请输入报销金额"
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
                placeholder="请输入借款金额(元)"
                style="width:100%;"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <!--      正式立项选择 -->
        <el-row :gutter="4" style="padding:0 10px;">
          <el-col :span="24">
            <el-form-item label="备注" prop="beizhu">
              <el-input
                v-model="form.variables.beizhu"
                :disabled="!isformdisabled"
                :rows="3"
                placeholder="请输入备注"
                style="width:100%;"
                type="textarea"
              />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="4" style="padding:0 10px;">
          <el-col :span="24">
            <el-form-item label="附件" prop="fujian">
              <el-upload
                :before-upload="checkMyFileSize"
                :action="uploadUrl"
                :data="fujiandata"
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
                <el-button v-if="isformdisabled" size="small" type="primary">点击上传</el-button>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>


      </el-row>
    </el-form>
    <GoodsProcurementPopup v-if="isChoose === 'GoodsProcurementPopup'"
                           req-url="/system/goodspurchase/caigoujiekuantankuang"
                           @choosedProect="getProjectPromotion"
    />
  </div>
</template>

<script>
import { addCaigouloan, getCaigouloan, getInfoByParentId, updateCaigouloan } from '@/api/biz/caigouloan'
import { definitionStart } from '@/api/flowable/definition'
import { complete } from '@/api/flowable/process'
import { getFileDetail } from '@/api/system/file'
import { formatDate } from '@/utils'
import GoodsProcurementPopup from '@/components/Popup/GoodsProcurementPopup'
// 通过跟踪立项编号获取已使用推进成本
import { getHisCostByTrackNo } from '@/api/biz/projectPromotion'

export default {
  components: {
    GoodsProcurementPopup
  },
  props: {
    proData: {
      type: String,
      default: () => {
        return {}
      }
    },
    isformdisabled: {
      type: Boolean,
      default: true
    },
    local_val:{
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      isLoanAmountPopup: false,
      isChoose: '',
      fujiandata: {
        fieldName: 'fujian',
        tableName: 'pms_caigouloan'
      },
      // 行政办公报销清单表格数据
      pmsBorrowingdetailList: [],
      // 部门树选项
      deptOptions: '',
      fileList: [],
      bumennameOptions: [],
      fukuanfangshiOptions: [],
      formUserName: '',
      formDeptName: '',
      Editorneirong: '',
      form: {
        variables: {
          time: '',
          borrowingreason: '',
          huowudingdan: '',
          projectnum: '',
          projectname: '',
          pm: '',
          fukuanfangshi: '',
          jiekuandanwei: '',
          jinex: '',
          jined: '',
          beizhu: '',
          fujian: '',
          parentid: '',
          pmsBorrowingdetailList: [
            {
              name: '',
              xinghao: '',
              danwei: '',
              num: '',
              cankaodanjia1: '',
              cankaodanjia2: '',
              cankaodanjia3: '',
              jianyidanjia: ''
            }
          ]
        },
        // 必传值
        formTableName: '',
        formType: '',
        id: 0,
        formId: 0
      },
      resondata: '系统自动生成',
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
      meansList: [],
      formDataTypeList: [],
      formCompanyNameList: [],
      formSealTypeList: [],
      formPaymentMethod: [],
      formProcessState: [],
      sysYesNoList: [],
      InvoiceTypeOptions: [],
      formCompanyNameTypeList: [],
      checkedPmsXzbaoxiaoqingdan: [],
      // 用途类型字典
      typeOptions: [],
      printingShowList: [],
      uploadHeaders: {
        Authorization: ''
      },
      uploadUrl: process.env.VUE_APP_BASE_API + '/common/batchUpload',
      rules: {
        borrowingreason: [
          { required: true, message: '请输入借款原因', trigger: 'blur' }
        ],
        huowudingdan: [
          { required: false, message: '点击选择项目名称', trigger: 'blur' }
        ],
        projectnum: [
          { required: false, message: '请输入项目编号', trigger: 'blur' }
        ],
        projectname: [
          { required: false, message: '点击选择项目名称', trigger: 'blur' }
        ],
        pm: [
          { required: false, message: '请输入项目经理', trigger: 'blur' }
        ],
        fukuanfangshi: [
          { required: false, message: '请选择付款方式', trigger: 'change' }
        ],
        jiekuandanwei: [
          { required: true, message: '请选择借款单位', trigger: 'change' }
        ],
        jinex: [
          { required: true, message: '请输入借款金额(元)', trigger: 'change' }
        ],
        jined: [{ required: true, message: '请输入借款金额(元)', trigger: 'blur' }],
        beizhu: [{ required: true, message: '请输入备注', trigger: 'blur' }],
        caigoushow: [{ required: true, message: '请选择是否关联采购单', trigger: 'blur' }]
      }
    }
  },
  computed: {
    computeAdvicePrice() {
      return function(row) {

        let price1 = row.cankaodanjia1 == null ? 0 : row.cankaodanjia1
        let price2 = row.cankaodanjia2 == null ? 0 : row.cankaodanjia2
        let price3 = row.cankaodanjia3 == null ? 0 : row.cankaodanjia3
        let min = 0
        if (price1 <= price2) {
          min = price1
        } else {
          min = price2
        }
        if (min <= price3) {
          min = min
        } else {
          min = price3
        }
        row.jianyidanjia = min
        return min
      }
    },
    computeAdviceTotal() {
      return function(row) {
        console.log(row)
        let num = row.num == null ? 0 : row.num
        let advicePrice = row.jianyidanjia == null ? 0 : row.jianyidanjia
        let adviceTotal = (num * advicePrice).toFixed(2)
        row.shijiacaigoujia = adviceTotal
        let purchaseList = this.form.variables.pmsBorrowingdetailList
        let advicePurchaseTotal = 0
        for (let i = 0; i < purchaseList.length; i++) {
          let adviceTotal = purchaseList[i].shijiacaigoujia
          advicePurchaseTotal += Number(adviceTotal)
        }
        this.$set(this.form.variables, 'shijizonge', advicePurchaseTotal)
        return adviceTotal
      }
    },
    totalnum: function() {
      let num = 0.0
      this.form.variables.pmsBorrowingdetailList.forEach((item) => {
        num += item.fpjine * 1
      })
      this.form.variables.heji = num.toFixed(2)
      return num.toFixed(2)
    },
    isShowNumDiv: function() {
      return ['1', '2'].indexOf(this.form.variables.leixing) !== -1
    },
    isShowNameAndJSF() {
      return ['3', '4'].indexOf(this.form.variables.leixing) !== -1
    },
    fixNumLabel() {
      return this.typeOptions.filter(
        (item) => item.dictValue === this.form.variables.leixing
      )[0].dictLabel
    }
  },
  created() {
    this.getDicts('Market_loan_type').then(response => {
      this.typeOptions = response.data
    })
    // const proData = localStorage.getItem('proData')
    this.getDicts('form_company_name').then((res) => {
      this.formCompanyNameTypeList = res.data
    })
    this.getDicts('form_payment_method').then((res) => {
      this.formPaymentMethod = res.data
    })
    // const id = localStorage.getItem('id')
    const id = this.local_val.id
    if (id) {
      this.form.id = id
    }
    this.getDicts('sys_yes_no').then((response) => {
      this.sysYesNoList = response.data
    })
    this.getDicts('project_reimbursement_invoice').then((response) => {
      this.InvoiceTypeOptions = response.data
    })
    // this.form.formId = localStorage.getItem('formId')
    this.form.formId = this.local_val.formId
  },
  methods: {
    caigoushowChange(val) {
      if (val === 'Y') {
        this.rules.huowudingdan[0].required = true
        this.rules.projectnum[0].required = true
        this.rules.projectname[0].required = true
        this.rules.pm[0].required = true
        this.rules.fukuanfangshi[0].required = true
      } else {
        this.rules.huowudingdan[0].required = false
        this.rules.projectnum[0].required = false
        this.rules.projectname[0].required = false
        this.rules.pm[0].required = false
        this.rules.fukuanfangshi[0].required = false
      }
    },
    clearNum() {
      this.form.variables.yxnum = ''
      this.form.variables.yxname = ''
      this.form.variables.xtfsx = ''
      this.form.variables.zbaoxiao = ''
      this.form.variables.gongguannum = ''
      this.form.variables.gongguanname = ''
      this.form.variables.gongguanyusuan = ''
      this.form.variables.toubiaonum = ''
      this.form.variables.toubiaoname = ''
    },
    onBeforeClose() {
      this.isLoanAmountPopup = false
    },
    offsetjineChange(data) {
      if (data > this.form.variables.daidixiaojine * 1) {
        this.form.variables.offsetjine = ''
        this.msgError('冲销金额不能大于借款待还款金额')
      } else if (data > this.form.variables.baoxiaojine * 1) {
        this.form.variables.offsetjine = ''
        this.msgError('冲销金额不能大于报销金额')
      }
    },
    /** 单选框选中数据 */
    handlePmsXzbaoxiaoqingdanSelectionChange(selection) {
      this.checkedPmsXzbaoxiaoqingdan = selection.sort(
        (a, b) => b.index - a.index
      )
    },
    async getProjectPromotion(row) {
      if (row) {
        this.form.variables.huowudingdan = row.caigounum
        this.form.variables.projectnum = row.num
        this.form.variables.projectname = row.projectname
        this.form.variables.pm = row.qinggouren
        this.parentid = row.id
        const { data } = await getInfoByParentId(row.id)
        console.log(data)
        // if (this.form.variables.pmsBorrowingdetailList[0].name == '') {
        this.form.variables.pmsBorrowingdetailList = []
        // }
        data.map((item) => {
          this.form.variables.pmsBorrowingdetailList.push({
            name: item.qicainame,
            xinghao: item.leixing,
            danwei: item.danwei,
            num: item.shuliang,
            cankaodanjia1: item.cankaodanjia1,
            cankaodanjia2: item.cankaodanjia2,
            cankaodanjia3: item.cankaodanjia3,
            jianyidanjia: item.jianyidanjia
          })
        })

      }
      this.isChoose = ''
    },

    /** 行政办公报销清单序号 */
    rowPmsXzbaoxiaoqingdanIndex({ row, rowIndex }) {
      row.index = rowIndex
    },
    showSelectLoanBox(value) {
      this.isLoanAmountPopup = true
    },
    showSelectLoanBoxs(value) {
      const keymap = new Map([
        ['1', () => 'TrackProjectPopup'],
        ['2', () => 'TrackProjectPopup'],
        ['3', () => 'BidProjectPopup'],
        ['4', () => 'BidProjectPopup']
      ])
      this.isChoose = keymap.get(value) && keymap.get(value)()
    },
    async getHisCostByTrackNum(numbers) {
      const { data } = await getHisCostByTrackNo(numbers)
      return data.reimbursement
    },
    async getTrackProject(row) {
      const keymap = new Map([
        [
          '1',
          async() => ({
            projectid: row.id,
            yxnum: row.numbers,
            yxname: row.projectName,
            xtfsx: row.xtfsx,
            zbaoxiao: await this.getHisCostByTrackNum(row.numbers)
          })
        ],
        [
          '2',
          async() => ({
            projectid: row.id,
            yxnum: row.numbers,
            yxname: row.projectName,
            xtfsx: row.xtfsx,
            zbaoxiao: await this.getHisCostByTrackNum(row.numbers)
          })
        ],
        [
          '3',
          () => ({
            toubiaonum: row.num,
            toubiaoname: row.projectname
          })
        ],
        [
          '4',
          () => ({
            toubiaonum: row.num,
            toubiaoname: row.projectname
          })
        ]
      ])
      const result =
        row &&
        await keymap.get(this.form.variables.leixing) &&
        await keymap.get(this.form.variables.leixing)()
      console.log('result', result)
      this.form.variables = {
        ...this.form.variables,
        ...result
      }
      this.isChoose = ''
    },
    choosedProect(row) {
      this.isLoanAmountPopup = false
      if (row) {
        console.log(row)
        this.form.variables.parentid = row.id
        this.form.variables.daijine = row.jiekuanjine
        this.form.variables.daidixiaojine = row.daijine
      }
    },
    /** 行政办公报销清单添加按钮操作 */
    handleAddPmsXzbaoxiaoqingdan() {
      let obj = {
        leixing: '',
        jine: '',
        num: '',
        nums: '',
        time: '',
        beizhu: '',
        cankaodanjia1: '',
        cankaodanjia2: '',
        cankaodanjia3: '',
        jianyidanjia: ''
      }
      this.form.variables.pmsBorrowingdetailList.push(obj)
    },
    /** 行政办公报销清单删除按钮操作 */
    handleDeletePmsXzbaoxiaoqingdan() {
      if (this.checkedPmsXzbaoxiaoqingdan.length == 0) {
        this.$alert('请先选择要删除的发票清单数据', '提示', {
          confirmButtonText: '确定'
        })
      } else {
        this.checkedPmsXzbaoxiaoqingdan.forEach((item) => {
          this.form.variables.pmsBorrowingdetailList.splice(item.index, 1)
        })
        if (this.form.variables.pmsBorrowingdetailList.length == 0) {
          this.handleAddPmsXzbaoxiaoqingdan()
        }
      }
    },
    baoxiaojineChange(data) {
      this.form.variables.jined = this.amountConvertToUpperCase(data)
    },
    downloadFile({ url }) {
      window.open(url)
    },
    handleAvatarSuccess({ data }, file, fileList) {
      this.form.variables.fujian = this.form.variables.fujian == null ? '' : this.form.variables.fujian
      this.form.variables.fujian += `;${data[0].fileId}`
    },
    printingChange(arr) {
      console.log(arr, arr.length)
      this.form.variables.printing = arr.join(';')
      if (arr.length > 0) {
        this.$refs.printingCheck.clearValidate()
      } else {
        this.$refs.form.validateField('printing')
      }
    },
    onSubmit() {
      this.$refs['form'].validate(async(valid) => {
        if (valid) {
          // const procInsId = localStorage.getItem('procInsId')
          const procInsId = this.local_val.procInsId
          if (procInsId != '' && typeof (procInsId) != 'undefined' && procInsId != 'undefined') {
            this.completeData.instanceId = procInsId
            this.completeData.procInsId = procInsId
            // const taskId = localStorage.getItem('taskId')
            const taskId = this.local_val.taskId
            if (taskId) {
              this.completeData.taskId = taskId
            }
            console.log('审批更新逻辑', this.form)
            const updateSealmsg = await updateCaigouloan({
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
            const { code, data } = await addCaigouloan(this.form.variables)
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
      console.log({ code, data, msg })
      if (code == 200) {
        data.map((item) => {
          this.fileList.push({
            name: item.fileName,
            url: item.savePath,
            id: item.id
          })
        })
      }
    },
    handleRemove(file, fileList) {
      let idArr
      if (this.form.variables.id) {
        idArr = fileList.map((item) => item.id)
      } else {
        idArr = fileList.map((item) => item.response.data[0].fileId)
      }
      this.form.variables.fujian = idArr.join(';')
    }
  },
  watch: {
    proData: {
      async handler(val) {
        if (val) {
          let dataArr = JSON.parse(val)
          const { data } = await getCaigouloan(dataArr[0].id)
          console.log('getCaigouloan', data)
          this.form.variables = {
            ...data
          }
          // 请求附件详情
          this.getFileDetail(this.form.variables.fujian)
          this.form.variables.time = this.form.variables.createTime
          this.formUserName = this.form.variables.createUserName
          this.formDeptName = this.form.variables.createDeptName
          // this.Editorneirong = this.form.variables.neirong
          // this.form.variables.ccdepartment =
          //   this.form.variables.ccdepartment.split(';')
          // if (
          //   this.form.variables.documentnumber != null &&
          //   this.form.variables.documentnumber != ''
          // ) {
          //   this.resondata = this.form.variables.documentnumber
          // }
        } else {
          this.form.variables.time = formatDate(new Date().getTime())
          const currentUser = this.$store.getters.user
          this.formUserName = currentUser.nickName
          this.form.variables.name = currentUser.userId
          this.formDeptName = currentUser.dept.deptName
          this.form.variables.partment = currentUser.deptId
        }
        this.uploadHeaders.Authorization = 'Bearer ' + this.$store.getters.token
      },
      immediate: true
    }
  }
}
</script>
<style scoped>
.but-form {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
