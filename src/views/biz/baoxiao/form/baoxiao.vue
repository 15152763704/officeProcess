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
          <el-form-item class="title_class" label="报销申请">
            <el-divider></el-divider>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="4" style="padding:0 10px;">
        <el-col :span="12">
          <el-form-item label="报销人" prop="username">
            <el-input v-model="formUserName" disabled placeholder="请输入报销人" style="width:100%;"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="报销部门" prop="dept">
            <el-input v-model="formDeptName" disabled placeholder="请输入报销部门" style="width:100%;"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="4" style="padding:0 10px;">
        <el-col :span="12">
          <el-form-item label="报销时间" prop="time">
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
      </el-row>
      <el-row :gutter="4" style="padding:0 10px;">
        <el-col :span="24">
          <el-form-item class="title_class" label="报销概况">
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
          <el-form-item label="报支单位" prop="baozhidanwei">
            <el-select
                v-model="form.variables.baozhidanwei"
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
          <el-form-item label="报销金额(元)" prop="bxjinex">
            <el-input-number
                v-model="form.variables.bxjinex"
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
          <el-form-item label="报销金额大写" prop="bxjined">
            <el-input
                v-model="form.variables.bxjined"
                disabled
                placeholder="请输入报销金额大写"
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
      <el-row v-if="form.variables.sfdx == 'Y'" :gutter="4" style="padding:0 10px;">
        <el-col :span="12">
          <el-form-item label="借款金额(元)" prop="jiekuanjine">
            <el-input
                v-model="form.variables.jiekuanjine"
                disabled
                placeholder="点击选择借款信息"
                style="width:100%;"
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
          <el-form-item label="本次冲销金额(元)" prop="writeoffs">
            <el-input-number
                v-model="form.variables.writeoffs"
                :disabled="!isformdisabled"
                :min="0"
                :precision="2"
                :step="1"
                placeholder="请输入本次冲销金额(元)"
                style="width:100%;"
                @change="writeoffsChange"
            />
          </el-form-item>
        </el-col>
      </el-row>


      <el-row :gutter="4" style="padding:0 10px;">
        <el-col :span="12">
          <el-form-item label="采购报销编号" prop="cgbxnums">
            <el-input
                v-model="form.variables.cgbxnums"
                disabled
                placeholder="自动生成编号"
                style="width:100%;"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12"></el-col>
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
              <el-button v-if="isformdisabled" size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="4" style="padding:0 10px;">
        <el-col :span="24">
          <el-form-item class="title_class" label="发票清单">
            <el-divider></el-divider>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row v-if="isformdisabled" :gutter="10" class="mb8" style="padding:0 10px;">
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
              :data="form.variables.pmsBapxiaoqingdanList"
              :row-class-name="rowPmsXzbaoxiaoqingdanIndex"
              border
              @selection-change="handlePmsXzbaoxiaoqingdanSelectionChange"
          >
            <el-table-column align="center" type="selection"/>
            <el-table-column label="发票类型" prop="fptype">
              <template slot-scope="scope">
                <el-select
                    v-model="scope.row.fptype"
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
            <el-table-column label="发票金额(元)" prop="jine">
              <template slot-scope="scope">
                <el-input-number
                    v-model="scope.row.jine"
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
            <el-table-column label="发票编号" prop="fpnum">
              <template slot-scope="scope">
                <el-input
                    v-model="scope.row.fpnum"
                    :disabled="!isformdisabled"
                    placeholder="请输入发票编号"
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
            <el-table-column label="发票开具时间" prop="fptime">
              <template slot-scope="scope">
                <el-date-picker
                    v-model="scope.row.fptime"
                    :disabled="!isformdisabled"
                    placeholder="选择发票开具时间"
                    style="width:100%;"
                    type="date"
                    value-format="yyyy-MM-dd"
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
          <el-form-item label="合计" prop="heji">
            <el-input v-model="totalnum" disabled placeholder="请输入合计" style="width:100%;"/>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <PurchaseLoanPopup
        :isshow="isLoanAmountPopup"
        req-url="/system/caigouloan/my"
        @choosedProect="choosedProect"
        @onBeforeClose="onBeforeClose"
    />
    <!--    <ProductionProjectPopup v-if="isChoose === 'ProductionProjectPopup'" req-url="/system/productionproject/my"-->
    <!--                            @choosedProect="getProjectPromotion"-->
    <!--    />-->
  </div>
</template>

<script>
import { addBaoxiao, getBaoxiao, updateBaoxiao } from '@/api/biz/baoxiao'
import { definitionStart } from '@/api/flowable/definition'
import { complete } from '@/api/flowable/process'
import { getFileDetail } from '@/api/system/file'
import { formatDate } from '@/utils'
import PurchaseLoanPopup from '@/components/Popup/PurchaseLoanPopup'
// 通过跟踪立项编号获取已使用推进成本
import { getHisCostByTrackNo } from '@/api/biz/projectPromotion'

export default {
  components: {
    PurchaseLoanPopup
  },
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
      isChoose: '',
      fujiandata: {
        fieldName: 'fujian',
        tableName: 'pms_caigou_baoxiao'
      },
      // 行政办公报销清单表格数据
      pmsBapxiaoqingdanList: [],
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
          baoxiaoshiyou: '',
          baozhidanwei: '',
          bxjinex: '',
          bxjined: '',
          sfdx: '',
          jiekuanjine: '',
          writeoffs: '',
          cgbxnums: '',
          beizhu: '',
          fujian: '',
          parentid: '',
          pmsBapxiaoqingdanList: [
            {
              fptype: '',
              jine: '',
              fpnum: '',
              haoma: '',
              fptime: '',
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
      // 用途类型字典
      typeOptions: [],
      printingShowList: [],
      uploadHeaders: {
        Authorization: ''
      },
      uploadUrl: process.env.VUE_APP_BASE_API + '/common/batchUpload',
      rules: {
        baoxiaoshiyou: [
          { required: true, message: '请输入报销事由', trigger: 'blur' }
        ],
        baozhidanwei: [
          { required: true, message: '请选择报支单位', trigger: 'change' }
        ],
        bxjinex: [
          { required: true, message: '请输入报销金额(元)', trigger: 'change' }
        ],
        bxjined: [
          { required: true, message: '请输入报销金额(元)大写', trigger: 'blur' }
        ],
        sfdx: [
          { required: true, message: '请选择是否抵消借款金额(元)', trigger: 'change' }
        ],
        jiekuanjine: [
          { required: true, message: '点击选择借款信息', trigger: 'blur' }
        ],
        writeoffs: [
          { required: true, message: '请输入本次冲销金额(元)', trigger: 'change' }
        ],
        beizhu: [{ required: true, message: '请输入备注', trigger: 'blur' }]
      }
    }
  },
  computed: {
    totalnum: function() {
      let num = 0.0
      this.form.variables.pmsBapxiaoqingdanList.forEach((item) => {
        num += item.jine * 1
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
    // const id = localStorage.getItem('id')
    const id = this.local_val.id
    if (id) {
      this.form.id = id
    }
    this.getDicts('sys_yes_no').then((response) => {
      this.sysYesNoList = response.data
    })
    this.getDicts('purchase_invoice_type').then((response) => {
      this.InvoiceTypeOptions = response.data
    })
    // this.form.formId = localStorage.getItem('formId')
    this.form.formId = this.local_val.formId
  },
  methods: {
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
    writeoffsChange(data) {
      if (data > this.form.variables.daidixiaojine * 1) {
        this.form.variables.writeoffs = ''
        this.msgError('冲销金额不能大于借款待还款金额')
      } else if (data > this.form.variables.bxjinex * 1) {
        this.form.variables.writeoffs = ''
        this.msgError('冲销金额不能大于报销金额(元)')
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
        this.form.variables.projectnum = row.projectCode
        this.form.variables.projectname = row.projectName
        this.form.variables.xmxtjine = row.guanlifei
        // const { data } = await getReimbursementByProjectNum(row.projectCode)
        // this.form.variables.zheji = data
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
        this.form.variables.jiekuanjine = row.jinex
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
        beizhu: ''
      }
      this.form.variables.pmsBapxiaoqingdanList.push(obj)
    },
    /** 行政办公报销清单删除按钮操作 */
    handleDeletePmsXzbaoxiaoqingdan() {
      if (this.checkedPmsXzbaoxiaoqingdan.length == 0) {
        this.$alert('请先选择要删除的发票清单数据', '提示', {
          confirmButtonText: '确定'
        })
      } else {
        this.checkedPmsXzbaoxiaoqingdan.forEach((item) => {
          this.form.variables.pmsBapxiaoqingdanList.splice(item.index, 1)
        })
        if (this.form.variables.pmsBapxiaoqingdanList.length == 0) {
          this.handleAddPmsXzbaoxiaoqingdan()
        }
      }
    },
    baoxiaojineChange(data) {
      this.form.variables.bxjined = this.amountConvertToUpperCase(data)
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
    checkMoney(){
      console.log(this.form.variables.heji,this.form.variables.bxjinex,this.form.variables.pmsBapxiaoqingdanList)
      if(this.form.variables.heji != this.form.variables.bxjinex){
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
            const updateSealmsg = await updateBaoxiao({
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
            const { code, data } = await addBaoxiao(this.form.variables)
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
          const { data } = await getBaoxiao(dataArr[0].id)
          console.log('getBaoxiao', data)
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
