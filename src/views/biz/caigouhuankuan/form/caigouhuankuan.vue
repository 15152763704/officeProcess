<!--
xzrepayment.vue * @Author: chad
 * @Date: 2021-10-26 09:02:48
 * @LastEditTime: 2021-11-18 14:34:59
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
      label-width="160px"
      style="overflow: hidden;"
    >
      <el-row :gutter="4" style="padding:0 10px;">
        <el-col :span="24">
          <el-form-item class="title_class" label="还款申请">
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
      </el-row>
      <el-row :gutter="4" style="padding:0 10px;">
        <el-col :span="24">
          <el-form-item class="title_class" label="借款信息">
            <el-divider></el-divider>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="4" style="padding:0 10px;">
        <el-col :span="12">
          <el-form-item label="借款金额(元)" prop="jiekuanjinex">
            <el-input
              v-model="form.variables.jiekuanjinex"
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
          <el-form-item label="借款金额(大写)" prop="jiekuanjined">
            <el-input
              v-model="form.variables.jiekuanjined"
              disabled
              placeholder="借款金额(大写)	"
              style="width:100%;"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="4" style="padding:0 10px;">
        <el-col :span="12">
          <el-form-item label="借款事由" prop="jiekuanshiyou">
            <el-input
              v-model="form.variables.jiekuanshiyou"
              disabled
              placeholder="请输入借款事由"
              style="width:100%;"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="借款单位" prop="jiekuandanwei">
            <el-select
              v-model="form.variables.jiekuandanwei"
              clearable
              disabled
              placeholder="请选择借款单位"
              style="width:100%;"
            >
              <el-option
                v-for="item in bumennameOptions"
                :key="item.dictValue"
                :label="item.dictLabel"
                :value="item.dictValue"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="4" style="padding:0 10px;">
        <el-col :span="12">
          <el-form-item label="付款方式" prop="fukuanfangshi">
            <el-select
              v-model="form.variables.fukuanfangshi"
              clearable
              disabled
              placeholder="请选择付款方式"
              style="width:100%;"
            >
              <el-option
                v-for="item in bumennameOptions"
                :key="item.dictValue"
                :label="item.dictLabel"
                :value="item.dictValue"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="借款编号" prop="nums">
            <el-input
              v-model="form.variables.nums"
              disabled
              placeholder="请输入借款编号"
              style="width:100%;"
            />
          </el-form-item>
        </el-col>

      </el-row>
      <el-row :gutter="4" style="padding:0 10px;">
        <el-col :span="24">
          <el-form-item label="备注" prop="beizhu">
            <el-input
              v-model="form.variables.beizhu"
              disabled
              placeholder="请输入备注"
              style="width:100%;"
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
              :file-list="fujianlist"
              :headers="uploadHeaders"
              :on-preview="downloadFile"
              :on-remove="handlejkRemove"
              class="upload-demo"
              disabled
              multiple
              style="width:100%;"
            >
              <el-button v-if="false" size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="4" style="padding:0 10px;">
        <el-col :span="24">
          <el-form-item class="title_class" label="还款信息">
            <el-divider></el-divider>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="4" style="padding:0 10px;">
        <el-col :span="12">
          <el-form-item label="还款单位" prop="huankuandanwei">
            <el-select
              v-model="form.variables.huankuandanwei"
              :disabled="!isformdisabled"
              clearable
              placeholder="请选择还款单位"
              style="width:100%;"
            >
              <el-option
                v-for="item in bumennameOptions"
                :key="item.dictValue"
                :label="item.dictLabel"
                :value="item.dictValue"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="待还款金额(元)" prop="daijine">
            <el-input-number
              v-model="form.variables.daijine"
              :min="0"
              :precision="2"
              :step="1"
              disabled
              placeholder="待还款金额(元)"
              style="width:100%;"
            ></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="4" style="padding:0 10px;">
        <el-col :span="12">
          <el-form-item label="本次还款金额(元)" prop="huankuanjinex">
            <el-input-number
              v-model="form.variables.huankuanjinex"
              :disabled="!isformdisabled"
              :min="0"
              :precision="2"
              :step="1"
              placeholder="本次还款金额(元)(单位:元)"
              style="width:100%;"
              @change="hmoneyChange"
            ></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="本次还款金额(大写)" prop="huankuanjined">
            <el-input
              v-model="form.variables.huankuanjined"
              disabled
              placeholder="本次还款金额(大写)	"
              style="width:100%;"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="4" style="padding:0 10px;">
        <el-col :span="12">
          <el-form-item label="剩余未还款金额(元)" prop="weihuankuanjinex">
            <el-input-number
              v-model="form.variables.weihuankuanjinex"
              :min="0"
              :precision="2"
              :step="1"
              disabled
              placeholder="剩余未还款金额(元)(单位:元)"
              style="width:100%;"
            ></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="剩余未还款金额(大写)" prop="weihuankuanjined">
            <el-input
              v-model="form.variables.weihuankuanjined"
              disabled
              placeholder="剩余未还款金额"
              style="width:100%;"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="4" style="padding:0 10px;">
        <el-col :span="24">
          <el-form-item label="备注" prop="beizhut">
            <el-input
              v-model="form.variables.beizhut"
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
          <el-form-item label="附件" prop="fujiant">
            <el-upload
              :before-upload="checkMyFileSize"
              :action="uploadUrl"
              :data="fujiandatas"
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
    </el-form>
    <PurchaseLoanPopup
      :isshow="isLoanAmountPopup"
      req-url="/system/caigouloan/my"
      @choosedProect="choosedProect"
      @onBeforeClose="onBeforeClose"
    />
  </div>
</template>

<script>
import { addCaigouhuankuan, updateCaigouhuankuan } from '@/api/biz/caigouhuankuan'
import { definitionStart } from '@/api/flowable/definition'
import { complete } from '@/api/flowable/process'
import { getFileDetail } from '@/api/system/file'
import { formatDate } from '@/utils'
import PurchaseLoanPopup from '@/components/Popup/PurchaseLoanPopup'

export default {
  components: { PurchaseLoanPopup },
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
      fujiandata: {
        fieldName: 'fujian',
        tableName: 'pms_caigouhuankuan'
      }
      , fujiandatas: {
        fieldName: 'fujiant',
        tableName: 'pms_caigouhuankuan'
      },
      // 部门树选项
      deptOptions: '',
      fileList: [],
      bumennameOptions: [],
      fukuanfangshiOptions: [],
      fujianlist: [],
      formUserName: '',
      formDeptName: '',
      Editorneirong: '',
      form: {
        variables: {
          time: '',
          parentid: '',
          jiekuanjinex: '',
          jiekuanjined: '',
          jiekuanshiyou: '',
          jiekuandanwei: '',
          fukuanfangshi: '',
          nums: '',
          beizhu: '',
          fujian: '',
          huankuandanwei: '',
          daijine: '',
          huankuanjinex: '',
          huankuanjined: '',
          weihuankuanjinex: '',
          weihuankuanjined: '',
          beizhut: '',
          fujiant: ''
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
      printingShowList: [],
      uploadHeaders: {
        Authorization: ''
      },
      uploadUrl: process.env.VUE_APP_BASE_API + '/common/batchUpload',
      rules: {
        zmoney: [{ required: true, message: '点击选择借款信息', trigger: 'blur' }],
        jkjinedx: [{ required: true, message: '请输入借款金额(元)', trigger: 'blur' }],
        jkshiyou: [{ required: true, message: '请输入借款事由', trigger: 'blur' }],
        jkdanwei: [{ required: true, message: '请选择借款单位', trigger: 'change' }],
        beizhu: [{ required: true, message: '请输入备注', trigger: 'blur' }],
        hkdanwei: [{ required: true, message: '请选择还款单位', trigger: 'blur' }],
        daihuankuan: [{ required: true, message: '请输入待还款金额(元)', trigger: 'change' }],
        hmoney: [{ required: true, message: '请输入本次还款金额(元)', trigger: 'change' }],
        hkjinedx: [{ required: true, message: '请输入本次还款金额(元)', trigger: 'blur' }],
        smoney: [{ required: true, message: '请输入剩余未还款金额(元)', trigger: 'change' }],
        whkjinedx: [{ required: true, message: '请输入剩余未还款金额(元)', trigger: 'blur' }],
        hkbeizhu: [{ required: true, message: '请输入备注', trigger: 'blur' }]
      }
    }
  },
  created() {
    // const proData = localStorage.getItem('proData')
    this.getDicts('document_type').then((res) => {
      this.formDataTypeList = res.data
    })
    // const id = localStorage.getItem('id')
    const id = this.local_val.id
    if (id) {
      this.form.id = id
    }
    this.getDicts('form_company_name').then((response) => {
      this.bumennameOptions = response.data
    })
    // this.form.formId = localStorage.getItem('formId')
    this.form.formId = this.local_val.formId
  },
  methods: {
    onBeforeClose() {
      this.isLoanAmountPopup = false
    },
    showSelectLoanBox() {
      this.isLoanAmountPopup = true
    },
    choosedProect(row) {
      console.log('choosedProect', row)
      this.isLoanAmountPopup = false
      this.form.variables.parentid = row.id
      this.form.variables.jiekuanjinex = row.jinex
      this.form.variables.jiekuanjined = row.jined
      this.form.variables.jiekuanshiyou = row.borrowingreason
      this.form.variables.jiekuandanwei = row.jiekuandanwei
      this.form.variables.fukuanfangshi = row.fukuanfangshi
      this.form.variables.nums = row.nums
      this.form.variables.beizhu = row.beizhu
      this.form.variables.fujian = row.fujian
      this.form.variables.daijine = row.daijine
      this.form.variables.weihuankuanjinex =
        this.form.variables.daijine - this.form.variables.huankuanjinex
      this.getjkFileDetail(row.fujian)
    },
    async getjkFileDetail(ids) {
      const { code, data, msg } = await getFileDetail(ids)
      if (code == 200) {
        this.fujianlist = data.map((item) => {
          return { name: item.fileName, url: item.savePath, id: item.id }
        })
      }
    },
    changeMoneyToUpperCase(data) {
      this.form.variables.jkjinedx = this.amountConvertToUpperCase(data)
    },
    downloadFile({ url }) {
      window.open(url)
    },
    handleAvatarSuccess({ data }, file, fileList) {
      this.form.variables.fujiant = this.form.variables.fujiant == null ? '' : this.form.variables.fujiant
 this.form.variables.fujiant += `;${data[0].fileId}`
    },
    hmoneyChange(data) {
      if (data > this.form.variables.daijine) {
        this.$message.error('本次还款金额不能大于待还款金额')
        this.form.variables.huankuanjinex = ''
      } else {
        this.form.variables.weihuankuanjinex = (
          this.form.variables.daijine - data
        ).toFixed(2)
        this.form.variables.huankuanjined = this.amountConvertToUpperCase(data)
        this.form.variables.weihuankuanjined = this.amountConvertToUpperCase(
          this.form.variables.weihuankuanjinex
        )
      }
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
    onSubmit() {
      this.$refs['form'].validate(async(valid) => {
        if (valid) {
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
            const updateSealmsg = await updateCaigouhuankuan({
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
            const { code, data } = await addCaigouhuankuan(this.form.variables)
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
      this.form.variables.fujiant = idArr.join(';')
    },
    handlejkRemove(file, fileList) {
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
      handler(val) {
        if (val) {
          let dataArr = JSON.parse(val)
          this.form.variables = {
            ...dataArr[0]
          }
          // 请求附件详情
          this.getFileDetail(this.form.variables.fujiant)
          this.getjkFileDetail(this.form.variables.fujian)
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
