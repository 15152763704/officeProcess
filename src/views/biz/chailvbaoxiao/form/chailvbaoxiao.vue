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
        label-width="150px"
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
          <!--          <el-form-item label="借款编号" prop="nums">-->
          <!--            <el-input disabled value="自动生成" style="width:100%;" />-->
          <!--          </el-form-item>-->
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
          <el-form-item label="报销事由" prop="bxshiyou">
            <el-input
                v-model="form.variables.bxshiyou"
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
          <el-form-item label="报销类型" prop="bxtype">
            <el-select v-model="form.variables.bxtype" :disabled="!isformdisabled" placeholder="请选择报销类型"
                       style="width:100%;"
                       @change="clearNum"
            >
              <el-option
                  v-for="dict in typeOptions"
                  :key="dict.dictValue"
                  :label="dict.dictLabel"
                  :value="dict.dictValue"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item v-if="isShowNumDiv" :label="fixNumLabel+'编号'" prop="num">
            <el-input
                v-model="form.variables.num"
                :placeholder="`点击选择${fixNumLabel}编号`"
                disabled
                style="width:100%;"
            >
              <el-button
                  slot="append"
                  icon="el-icon-third-guide"
                  @click="isformdisabled && showSelectLoanBoxs(form.variables.bxtype)"
              ></el-button>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="isShowNumDiv && isShowNameAndJSF" :gutter="4" style="padding:0 10px;">
        <el-col :span="12">
          <el-form-item label="项目名称" prop="projectname">
            <el-input
                v-model="form.variables.projectname"
                disabled
                style="width:100%;"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="建设方" prop="jianshefang">
            <el-input
                v-model="form.variables.jianshefang"
                disabled
                style="width:100%;"
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
          <el-form-item label="报销金额(元)" prop="bxjinexx">
            <el-input-number
                v-model="form.variables.bxjinexx"
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
          <el-form-item label="报销金额大写" prop="bxjinedx">
            <el-input
                v-model="form.variables.bxjinedx"
                disabled
                placeholder="请输入报销金额大写"
                style="width:100%;"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="是否抵消借款" prop="counteract">
            <el-select
                v-model="form.variables.counteract"
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
      <el-row v-if="form.variables.counteract == 'Y'" :gutter="4" style="padding:0 10px;">
        <el-col :span="12">
          <el-form-item label="借款金额(元)" prop="jiekuan">
            <el-input
                v-model="form.variables.jiekuan"
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
          <el-form-item label="本次冲销金额(元)" prop="money">
            <el-input-number
                v-model="form.variables.money"
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
      <el-row :gutter="4" style="padding:0 10px;">
        <el-col :span="12">
          <el-form-item label="人事报销编号" prop="clbxnums">
            <el-input
                v-model="form.variables.clbxnums"
                disabled
                placeholder="自动生成人事报销编号"
                style="width:100%;"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12"></el-col>
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
              :data="form.variables.pmsBxqingdanList"
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
            <el-table-column label="发票金额(元)" prop="fpjine">
              <template slot-scope="scope">
                <el-input-number
                    v-model="scope.row.fpjine"
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
            <el-table-column label="发票开具时间" prop="times">
              <template slot-scope="scope">
                <el-date-picker
                    v-model="scope.row.times"
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
          <el-form-item label="合计" prop="totalnum">
            <el-input v-model="totalnum" disabled placeholder="请输入合计" style="width:100%;"/>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <PersonnelLoanPopup
        :isshow="isLoanAmountPopup"
        req-url="/system/traveladvance/my"
        @choosedProect="choosedProect"
        @onBeforeClose="onBeforeClose"
    />
    <EvectionPopup :isshow="isChoose === 'EvectionPopup'"
                   @choosedProect="getTrackProject"
                   @onBeforeClose="isChoose = ''"
                   req-url="/system/evection/my"
    />
    <TrainProjectPopup v-if="isChoose === 'TrainProjectPopup'" req-url="/system/trainingapplication/my"
                       @choosedProect="getTrackProject"
    />
  </div>
</template>

<script>
import { addChailvbaoxiao, getChailvbaoxiao, updateChailvbaoxiao } from '@/api/biz/chailvbaoxiao'
import { definitionStart } from '@/api/flowable/definition'
import { complete } from '@/api/flowable/process'
import { getFileDetail } from '@/api/system/file'
import { formatDate } from '@/utils'
import PersonnelLoanPopup from '@/components/Popup/PersonnelLoanPopup'
import TrainProjectPopup from '@/components/Popup/TrainProjectPopup'
import EvectionPopup from '@/components/Popup/EvectionPopup'

export default {
  components: {
    PersonnelLoanPopup,
    TrainProjectPopup,
    EvectionPopup
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
        tableName: 'pms_chailvbaoxiao'
      },
      // 行政办公报销清单表格数据
      pmsBxqingdanList: [],
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
          bxshiyou: '',
          bxtype: '',
          num: '',
          projectname: '',
          jianshefang: '',
          baozhidanwei: '',
          baoxiaojine: '',
          bxjinexx: '',
          bxjinedx: '',
          counteract: '',
          jiekuan: '',
          money: '',
          clbxnums: '',
          parentid: '',
          beizhu: '',
          fujian: '',
          pmsBxqingdanList: [
            {
              fptype: '',
              fpjine: '',
              fpnum: '',
              haoma: '',
              times: '',
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
        bxshiyou: [
          { required: true, message: '请输入报销事由', trigger: 'blur' }
        ],
        bxtype: [
          { required: true, message: '请选择报销类型', trigger: 'change' }
        ],
        num: [
          { required: true, message: '点击选择编号', trigger: 'blur' }
        ],
        projectname: [
          { required: true, message: '请输入项目名称', trigger: 'blur' }
        ],
        jianshefang: [
          { required: true, message: '请输入建设方', trigger: 'blur' }
        ],
        baozhidanwei: [{ required: true, message: '请选择报支单位', trigger: 'change' }],
        bxjinexx: [{ required: true, message: '请输入报销金额(元)', trigger: 'change' }],
        bxjinedx: [{ required: true, message: '请输入报销金额(元)大写', trigger: 'blur' }],
        counteract: [{ required: true, message: '请选择是否抵消借款金额(元)', trigger: 'change' }],
        jiekuan: [{ required: true, message: '点击选择借款信息', trigger: 'blur' }],
        money: [{ required: true, message: '请输入本次冲销金额(元)', trigger: 'change' }],
        beizhu: [{ required: true, message: '请输入备注', trigger: 'blur' }]
      }
    }
  },
  computed: {
    totalnum: function() {
      let num = 0.0
      this.form.variables.pmsBxqingdanList.forEach((item) => {
        num += item.fpjine * 1
      })
      return num.toFixed(2)
    },
    isShowNumDiv: function() {
      return ['1', '2'].indexOf(this.form.variables.bxtype) !== -1
    },
    isShowNameAndJSF() {
      return ['1'].indexOf(this.form.variables.bxtype) !== -1
    },
    fixNumLabel() {
      return this.typeOptions.filter(
          (item) => item.dictValue === this.form.variables.bxtype
      )[0].dictLabel
    }
  },
  created() {
    this.getDicts('use_personnel_loan').then(response => {
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
    this.getDicts('personnel_reimbursement_type').then((response) => {
      this.InvoiceTypeOptions = response.data
    })
    // this.form.formId = localStorage.getItem('formId')
    this.form.formId = this.local_val.formId
  },
  methods: {
    clearNum() {
      this.form.variables.num = null
    },
    onBeforeClose() {
      this.isLoanAmountPopup = false
    },
    offsetjineChange(data) {
      console.log(data, this.form.variables.jiekuan * 1)
      if (data > this.form.variables.jiekuan * 1) {
        this.form.variables.money = ''
        this.msgError('冲销金额不能大于借款待还款金额')
      } else if (data > this.form.variables.bxjinexx * 1) {
        this.form.variables.money = ''
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
    showSelectLoanBoxs(value) {
      const keymap = new Map([
        ['1', () => 'EvectionPopup'],
        ['2', () => 'TrainProjectPopup']
      ])
      this.isChoose = keymap.get(value) && keymap.get(value)()
    },
    getTrackProject(row) {
      const keymap = new Map([
        [
          '1',
          () => ({
            num: row.chuchainum,
            projectname: row.argument,
            jianshefang: row.jianshefang
          })
        ],

        [
          '2',
          () => ({
            num: row.trainnumber
          })
        ]
      ])
      const result =
          row &&
          keymap.get(this.form.variables.bxtype) &&
          keymap.get(this.form.variables.bxtype)()
      this.form.variables = {
        ...this.form.variables,
        ...result
      }
      this.isChoose = ''
    },
    choosedProect(row) {
      console.log('row', row)
      this.isLoanAmountPopup = false
      this.form.variables.parentid = row.id
      this.form.variables.jiekuan = row.money
      this.form.variables.daihuankuan = row.daijine
    },
    /** 行政办公报销清单添加按钮操作 */
    handleAddPmsXzbaoxiaoqingdan() {
      let obj = {
        fptype: '',
        fpjine: '',
        fpnum: '',
        haoma: '',
        times: '',
        beizhu: ''
      }
      this.form.variables.pmsBxqingdanList.push(obj)
    },
    /** 行政办公报销清单删除按钮操作 */
    handleDeletePmsXzbaoxiaoqingdan() {
      if (this.checkedPmsXzbaoxiaoqingdan.length == 0) {
        this.$alert('请先选择要删除的发票清单数据', '提示', {
          confirmButtonText: '确定'
        })
      } else {
        this.checkedPmsXzbaoxiaoqingdan.forEach((item) => {
          this.form.variables.pmsBxqingdanList.splice(item.index, 1)
        })
        if (this.form.variables.pmsBxqingdanList.length == 0) {
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
    checkMoney(){
      let money = 0.0
      this.form.variables.pmsBxqingdanList.forEach((item) => {
        money += item.fpjine * 1
      })
      money = money.toFixed(2)
      console.log(money,this.form.variables.bxjinexx,this.form.variables.pmsBxqingdanList)
      if(money != this.form.variables.bxjinexx){
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
            const updateSealmsg = await updateChailvbaoxiao({
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
            const { code, data } = await addChailvbaoxiao(this.form.variables)
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
          const { data } = await getChailvbaoxiao(dataArr[0].id)
          console.log('getChailvbaoxiao', data)
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
