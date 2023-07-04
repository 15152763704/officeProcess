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
        label-width="120px"
        style="overflow: hidden;"
    >
      <el-row :gutter="4" style="padding:0 10px;">
        <el-col :span="24">
          <el-form-item label="报销申请" class="title_class">
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
          <el-form-item label="借款时间" prop="time">
            <el-date-picker
                v-model="form.variables.time"
                :picker-options="pickerOptions"
                align="right"
                disabled
                placeholder="选择借款时间"
                style="width:100%;"
                type="datetime"
                value-format="yyyy-MM-dd HH:mm:ss"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="报销编号" prop="nums">
            <el-input v-model="form.variables.xzbxnums" disabled placeholder="自动生成" style="width:100%;"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="4" style="padding:0 10px;">
        <el-col :span="24">
          <el-form-item label="报销概况" class="title_class">
            <el-divider></el-divider>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="4" style="padding:0 10px;">
        <el-col :span="24">
          <el-form-item label="报销事由" prop="baoxiaoshiyou">
            <el-input
                v-model="form.variables.baoxiaoshiyou"
                :disabled="!isformdisabled"
                :rows="3"
                placeholder="请输入报销事由"
                style="width:100%;"
                type="textarea"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="4" style="padding:0 10px;">
        <el-col :span="12">
          <el-form-item label="报支单位" prop="danwei">
            <el-select
                v-model="form.variables.danwei"
                :disabled="!isformdisabled"
                placeholder="请选择报支单位"
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
        <el-col :span="12">
          <el-form-item label="报销金额(元)" prop="baoxiaojine">
            <el-input-number
                v-model="form.variables.baoxiaojine"
                :disabled="!isformdisabled"
                :min="0"
                :precision="2"
                :step="1"
                placeholder="请输入报销金额(元)"
                style="width:100%;"
                @input="baoxiaojineChange"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="4" style="padding:0 10px;">
        <el-col :span="12">
          <el-form-item label="报销金额(大写)" prop="bxjinedx">
            <el-input
                v-model="form.variables.bxjinedx"
                disabled
                placeholder="请输入报销金额(大写)"
                style="width:100%;"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="是否抵消借款" prop="sfdx">
            <el-select
                v-model="form.variables.sfdx"
                :disabled="!isformdisabled"
                placeholder="请选择是否抵消借款金额(元)"
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
      <!-- 增加选择 借款信息  借款金额(元) 本次冲销金额(元) -->
      <el-row :gutter="4" style="padding:0 10px;" v-if="form.variables.sfdx == 'Y'">
        <el-col :span="12">
          <el-form-item label="借款金额(元)" prop="daijine">
            <el-input
                v-model="form.variables.daijine"
                disabled
                placeholder="点击选择借款信息"
                style="width:100%;"
                @input="changeMoneyToUpperCase"
            >
              <el-button
                  slot="append"
                  icon="el-icon-third-guide"
                  @click="isformdisabled && showSelectLoanBox()"
              ></el-button>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="本次冲销金额(元)" prop="offsetjine">
            <el-input-number
                v-model="form.variables.offsetjine"
                :disabled="!isformdisabled"
                :min="0"
                :precision="2"
                :step="1"
                placeholder="请输入本次冲销金额(元)"
                style="width:100%;"
                @change="offsetjineChange"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <!--      <el-row :gutter="4" style="padding:0 10px;" v-if="form.variables.sfdx == 'Y'">-->
      <!--        <el-col :span="12">-->
      <!--          <el-form-item label="待还金额(元)" prop="daijine">-->
      <!--            <el-input-->
      <!--              v-model="form.variables.daijine"-->
      <!--              disabled-->
      <!--              placeholder="请输入待还金额(元)"-->
      <!--              style="width:100%;"-->
      <!--            ></el-input>-->
      <!--          </el-form-item>-->
      <!--        </el-col>-->
      <!--        <el-col :span="12"></el-col>-->
      <!--      </el-row>-->

      <el-row :gutter="4" style="padding:0 10px;">
        <el-col :span="12">
          <el-form-item label="报销类型" prop="reimbursementType">
            <el-select
                v-model="form.variables.reimbursementType"
                :disabled="!isformdisabled"
                placeholder="请选择报销类型"
                style="width:100%;"
            >
              <el-option
                  v-for="dict in reimbursementTypeList"
                  :key="dict.dictValue"
                  :label="dict.dictLabel"
                  :value="dict.dictValue"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col v-if="form.variables.reimbursementType == '2'" :span="12">
          <el-form-item label="推进编号" prop="promotionNo">
            <el-input
                v-model="form.variables.promotionNo"
                disabled
                placeholder="点击选择推进编号"
                style="width:100%;"
            >
              <el-button
                  slot="append"
                  icon="el-icon-third-guide"
                  @click="isformdisabled && showAdministrationPromotion()"
              ></el-button>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="4" style="padding:0 10px;" v-if="form.variables.reimbursementType == '2'">

        <el-col :span="12">
          <el-form-item label="材料种类" prop="materialType">
            <el-select
                v-model="form.variables.materialType"
                disabled
                placeholder="系统自动带入"
                style="width:100%;"
            >
              <el-option
                  v-for="dict in materialTypeList"
                  :key="dict.dictValue"
                  :label="dict.dictLabel"
                  :value="dict.dictValue"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="材料数量" prop="materialNum">
            <el-input
                v-model="form.variables.materialNum"
                disabled
                placeholder="系统自动带入"
                style="width:100%;"
            >
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="4" style="padding:0 10px;" v-if="form.variables.reimbursementType == '2'">

        <el-col :span="12">
          <el-form-item label="其他费用" prop="otherCost">
            <el-input
                v-model="form.variables.otherCost"
                disabled
                placeholder="系统自动带入"
                style="width:100%;"
            >
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="推进成本" prop="promotionCost">
            <el-input
                v-model="form.variables.promotionCost"
                disabled
                placeholder="系统自动带入"
                style="width:100%;"
            >
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>

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
                :action="uploadUrl"
                :before-upload="checkMyFileSize"
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
              <el-button size="small" type="primary" v-if="isformdisabled">点击上传</el-button>
            </el-upload>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="4" style="padding:0 10px;">
        <el-col :span="24">
          <el-form-item label="发票清单" class="title_class">
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

      <el-row :gutter="4" style="padding:0 10px;">
        <el-col :span="24">
          <el-table
              ref="pmsXzbaoxiaoqingdan"
              :data="form.variables.pmsXzbaoxiaoqingdanList"
              :row-class-name="rowPmsXzbaoxiaoqingdanIndex"
              border
              @selection-change="handlePmsXzbaoxiaoqingdanSelectionChange"
          >
            <el-table-column align="center" type="selection"/>
            <el-table-column label="发票类型" prop="billtype">
              <template slot-scope="scope">
                <el-select
                    v-model="scope.row.billtype"
                    :disabled="!isformdisabled"
                    placeholder="请选择发票类型"
                    style="width:100%;"
                >
                  <el-option
                      v-for="dict in InvoiceTypeOptions"
                      :key="dict.dictValue"
                      :label="dict.dictLabel"
                      :value="dict.dictValue"
                  ></el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column label="发票金额(元)" prop="billjine">
              <template slot-scope="scope">
                <el-input-number
                    v-model="scope.row.billjine"
                    :controls="false"
                    :disabled="!isformdisabled"
                    :min="0"
                    :precision="2"
                    :step="1"
                    placeholder="请输入发票金额(元)"
                    size="large"
                    style="width:100%;"
                />
              </template>
            </el-table-column>
            <el-table-column label="发票代码" prop="billnum">
              <template slot-scope="scope">
                <el-input
                    v-model="scope.row.billnum"
                    :disabled="!isformdisabled"
                    placeholder="请输入发票代码"
                    style="width:100%;"
                />
              </template>
            </el-table-column>
            <el-table-column label="发票号码" prop="haoma">
              <template slot-scope="scope">
                <el-input
                    v-model="scope.row.haoma"
                    :disabled="!isformdisabled"
                    placeholder="请输入发票号码"
                    style="width:100%;"
                />
              </template>
            </el-table-column>
            <el-table-column label="发票开具时间" prop="billtime">
              <template slot-scope="scope">
                <el-date-picker
                    v-model="scope.row.billtime"
                    :disabled="!isformdisabled"
                    placeholder="选择发票开具时间"
                    style="width:100%;"
                    type="date"
                ></el-date-picker>
              </template>
            </el-table-column>
            <el-table-column label="备注" prop="beizhu">
              <template slot-scope="scope">
                <el-input
                    v-model="scope.row.beizhu"
                    :disabled="!isformdisabled"
                    placeholder="请输入备注"
                    style="width:100%;"
                />
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <el-row :gutter="4" style="padding:0 10px; margin-top:10px;">
        <el-col :span="24">
          <el-form-item label="合计" prop="totalnum">
            <el-input v-model="totalnum" disabled placeholder="请输入合计" style="width:100%;"/>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <LoanAmountPopup
        :isshow="isLoanAmountPopup"
        req-url="/cost/xzborrowmoney/my"
        @choosedProect="choosedProect"
        @onBeforeClose="onBeforeClose"
    />
    <AdministrationPromotionPopup
        :isshow="isAdministrationPromotionPopup"
        req-url="/system/administrationpromotion/myList"
        @choosedProect="choosedPromotion"
        @onBeforeClose="onBeforeClosePromotion"
    />
  </div>
</template>

<script>
import { addXzbaoxiao, getXzbaoxiao, updateXzbaoxiao } from '@/api/biz/xzbaoxiao'
import { definitionStart } from '@/api/flowable/definition'
import { complete } from '@/api/flowable/process'
import { getFileDetail } from '@/api/system/file'
import { formatDate } from '@/utils'
import LoanAmountPopup from '@/components/Popup/LoanAmountPopup'
import AdministrationPromotionPopup from '../../../../../components/Popup/AdministrationPromotionPopup'

export default {
  components: { LoanAmountPopup, AdministrationPromotionPopup },
  props: {
    proData: {
      type: Object,
      default: () => {
        return {}
      }
    },
    local_val: {
      type: Object,
      default: {}
    },
    isformdisabled: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      isLoanAmountPopup: false,
      isAdministrationPromotionPopup: false,
      fujiandata: {
        fieldName: 'fujian',
        tableName: 'pms_xzbaoxiao'
      },
      // 行政办公报销清单表格数据
      pmsXzbaoxiaoqingdanList: [],
      // 部门树选项
      deptOptions: '',
      fileList: [],
      bumennameOptions: [],
      fukuanfangshiOptions: [],
      reimbursementTypeList: [],
      materialTypeList: [],
      formUserName: '',
      formDeptName: '',
      Editorneirong: '',
      form: {
        variables: {
          time: '',
          baoxiaoshiyou: '',
          danwei: '',
          baoxiaojine: '',
          bxjinedx: '',
          sfdx: '',
          jiemongy: '',
          daijine: '',
          offsetjine: '',
          parentid: '',
          beizhu: '',
          fujian: '',
          pmsXzbaoxiaoqingdanList: [
            {
              billtype: '',
              billjine: '',
              billnum: '',
              haoma: '',
              billtime: '',
              beizhu: ''
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
      formProcessState: [],
      sysYesNoList: [],
      InvoiceTypeOptions: [],
      formCompanyNameTypeList: [],
      checkedPmsXzbaoxiaoqingdan: [],
      printingShowList: [],
      uploadHeaders: {
        Authorization: ''
      },
      uploadUrl: process.env.VUE_APP_BASE_API + '/common/batchUpload',
      rules: {
        baoxiaoshiyou: [
          { required: true, message: '请输入报销事由', trigger: 'blur' }
        ],
        danwei: [
          { required: true, message: '请选择报支单位', trigger: 'change' }
        ],
        baoxiaojine: [
          { required: true, message: '请输入报销金额(元)', trigger: 'change' }
        ],
        sfdx: [
          { required: true, message: '请输入待还金额(元)', trigger: 'change' }
        ],
        reimbursementType: [
          { required: true, message: '请选择报销类型', trigger: 'change' }
        ],
        jiemongy: [
          { required: true, message: '本次冲销金额(元)', trigger: 'change' }
        ],
        beizhu: [{ required: true, message: '请输入备注', trigger: 'blur' }],
        daijine: [{ required: true, message: '请选择借款金额', trigger: 'blur' }]
      }
    }
  },
  computed: {
    totalnum: function() {
      let num = 0.0
      this.form.variables.pmsXzbaoxiaoqingdanList.forEach((item) => {
        num += item.billjine * 1
      })
      return num.toFixed(2)
    }
  },
  created() {
    // const proData = localStorage.getItem('proData')
    this.getDicts('form_company_name').then((res) => {
      this.formCompanyNameTypeList = res.data
    })
    this.getDicts('administration_reimbursement_type').then((res) => {
      this.reimbursementTypeList = res.data
    })
    this.getDicts('project_promotion_material_type').then((res) => {
      this.materialTypeList = res.data
    })
    // const id = localStorage.getItem('id')
    const id = this.local_val.id
    if (id) {
      this.form.id = id
    }
    this.getDicts('sys_yes_no').then((response) => {
      this.sysYesNoList = response.data
    })
    this.getDicts('Invoice_type').then((response) => {
      this.InvoiceTypeOptions = response.data
    })
    // this.form.formId = localStorage.getItem('formId')
    this.form.formId = this.local_val.formId
  },
  methods: {
    onBeforeClose() {
      this.isLoanAmountPopup = false
    },
    onBeforeClosePromotion() {
      this.isAdministrationPromotionPopup = false
    },
    offsetjineChange(data) {
      console.log(data, this.form.variables.daihuankuan * 1)
      if (data > this.form.variables.daihuankuan * 1) {
        this.form.variables.offsetjine = ''
        this.msgError('冲销金额不能大于借款待还款金额')
      } else if (data > this.form.variables.baoxiaojine * 1) {
        this.form.variables.offsetjine = ''
        this.msgError('冲销金额不能大于报销金额(元)')
      }
    },
    /** 单选框选中数据 */
    handlePmsXzbaoxiaoqingdanSelectionChange(selection) {
      this.checkedPmsXzbaoxiaoqingdan = selection.sort(
          (a, b) => b.index - a.index
      )
    },
    /** 行政办公报销清单序号 */
    rowPmsXzbaoxiaoqingdanIndex({ row, rowIndex }) {
      row.index = rowIndex
    },
    showSelectLoanBox() {
      this.isLoanAmountPopup = true
    },
    showAdministrationPromotion() {
      this.isAdministrationPromotionPopup = true
    },
    choosedProect(row) {
      console.log('row', row)
      this.isLoanAmountPopup = false
      this.form.variables.parentid = row.id
      this.form.variables.daijine = row.daijine
    },
    choosedPromotion(row) {
      this.isAdministrationPromotionPopup = false
      this.form.variables.promotionNo = row.bianhao
      this.form.variables.materialType = row.jiushuibiaozhun
      this.form.variables.materialNum = row.nums
      this.form.variables.otherCost = row.qitafeiyong
      this.form.variables.promotionCost = row.jine
    },
    /** 行政办公报销清单添加按钮操作 */
    handleAddPmsXzbaoxiaoqingdan() {
      let obj = {
        billtype: '',
        billjine: '',
        billnum: '',
        haoma: '',
        billtime: '',
        beizhu: ''
      }
      this.form.variables.pmsXzbaoxiaoqingdanList.push(obj)
    },
    /** 行政办公报销清单删除按钮操作 */
    handleDeletePmsXzbaoxiaoqingdan() {
      if (this.checkedPmsXzbaoxiaoqingdan.length == 0) {
        this.$alert('请先选择要删除的发票清单数据', '提示', {
          confirmButtonText: '确定'
        })
      } else {
        this.checkedPmsXzbaoxiaoqingdan.forEach((item) => {
          this.form.variables.pmsXzbaoxiaoqingdanList.splice(item.index, 1)
        })
        if (this.form.variables.pmsXzbaoxiaoqingdanList.length == 0) {
          this.handleAddPmsXzbaoxiaoqingdan()
        }
      }
    },
    baoxiaojineChange(data) {
      this.form.variables.bxjinedx = this.amountConvertToUpperCase(data)
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
    neirongChange({ html, text, quill }) {
      this.form.variables.neirong = html
    },
    checkMoney(){
      let money = 0.0
      this.form.variables.pmsXzbaoxiaoqingdanList.forEach((item) => {
        money += item.billjine * 1
      })
      money = money.toFixed(2)
      console.log(money,this.form.variables.baoxiaojine,this.form.variables.pmsXzbaoxiaoqingdanList)
      if(money != this.form.variables.baoxiaojine){
        this.msgError('请确认发票金额和报销金额一致')
        return false
      }
      return true
    },
    onSubmit() {
      this.$refs['form'].validate(async(valid) => {
        if (valid && this.checkMoney()) {
          // const procInsId = localStorage.getItem('procInsId')
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
            const updateSealmsg = await updateXzbaoxiao({
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
            const { code, data } = await addXzbaoxiao(this.form.variables)
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
      let arr = this.form.variables.fujian.split(';')
      arr.splice(arr.indexOf(file.id), 1)
      this.form.variables.fujian = arr.join(';')
    }
  },
  watch: {
    proData: {
      async handler(val) {
        if (val) {
          let dataArr = JSON.parse(val)
          const { data } = await getXzbaoxiao(dataArr[0].id)
          console.log('getXzbaoxiao', data)
          this.form.variables = {
            ...data
          }
          // 请求附件详情
          this.getFileDetail(this.form.variables.fujian)
          this.form.variables.time = this.form.variables.createTime
          this.formUserName = this.form.variables.createUserName
          this.formDeptName = this.form.variables.createDeptName
          this.Editorneirong = this.form.variables.neirong
          this.form.variables.ccdepartment =
              this.form.variables.ccdepartment.split(';')
          if (
              this.form.variables.documentnumber != null &&
              this.form.variables.documentnumber != ''
          ) {
            this.resondata = this.form.variables.documentnumber
          }
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
