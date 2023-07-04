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
          <el-form-item label="还款申请" class="title_class">
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
              type="datetime"
              placeholder="选择借款时间"
              align="right"
              value-format="yyyy-MM-dd HH:mm:ss"
              disabled
              style="width:100%;"
              :picker-options="pickerOptions"
            ></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="4" style="padding:0 10px;">
        <el-col :span="24">
          <el-form-item label="借款信息" class="title_class">
            <el-divider></el-divider>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="4" style="padding:0 10px;">
        <el-col :span="12">
          <el-form-item label="借款金额(元)" prop="jiemongy">
            <el-input
              v-model="form.variables.jiemongy"
              disabled
              placeholder="点击选择借款信息"
              @input="changeMoneyToUpperCase"
              style="width:100%;"
            >
              <el-button
                @click="isformdisabled && showSelectLoanBox()"
                slot="append"
                icon="el-icon-third-guide"
              ></el-button>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="借款金额(大写)" prop="jiejinedx">
            <el-input
              v-model="form.variables.jiejinedx"
              disabled
              placeholder="借款金额(大写)	"
              style="width:100%;"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="4" style="padding:0 10px;">
        <el-col :span="12">
          <el-form-item label="借款事由" prop="jkshiyou">
            <el-input
              v-model="form.variables.jkshiyou"
              disabled
              placeholder="请输入借款事由"
              style="width:100%;"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="借款单位" prop="jkdept">
            <el-select
              v-model="form.variables.jkdept"
              disabled
              clearable
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
        <el-col :span="24">
          <el-form-item label="备注" prop="jkbeizhu">
            <el-input
              v-model="form.variables.jkbeizhu"
              disabled
              placeholder="请输入备注"
              style="width:100%;"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="4" style="padding:0 10px;">
        <el-col :span="24">
          <el-form-item label="附件" prop="jkfujian">
            <el-upload
              :before-upload="checkMyFileSize"
              class="upload-demo"
              disabled
              :headers="uploadHeaders"
              :action="uploadUrl"
              :file-list="jkfujianlist"
              :on-remove="handlejkRemove"
              :on-preview="downloadFile"
              style="width:100%;"
              :data="fujiandata"
              multiple
            >
              <el-button size="small" type="primary" v-if="false">点击上传</el-button>
            </el-upload>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="4" style="padding:0 10px;">
        <el-col :span="24">
          <el-form-item label="还款信息" class="title_class">
            <el-divider></el-divider>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="4" style="padding:0 10px;">
        <el-col :span="12">
          <el-form-item label="还款单位" prop="hkdept">
            <el-select
              v-model="form.variables.hkdept"
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
          <el-form-item label="待还款金额(元)" prop="daihuankuan">
            <el-input-number
              v-model="form.variables.daihuankuan"
              disabled
              :min="0"
              :precision="2"
              :step="1"
              placeholder="待还款金额"
              style="width:100%;"
            ></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="4" style="padding:0 10px;">
        <el-col :span="12">
          <el-form-item label="本次还款金额(元)" prop="huankuanjine">
            <el-input-number
              v-model="form.variables.huankuanjine"
              :min="0"
              :precision="2"
              :step="1"
              :disabled="!isformdisabled"
              placeholder="本次还款金额(单位:元)"
              style="width:100%;"
              @change="huankuanjineChange"
            ></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="本次还款金额(大写)" prop="hkjinedx">
            <el-input
              v-model="form.variables.hkjinedx"
              disabled
              placeholder="本次还款金额(大写)	"
              style="width:100%;"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="4" style="padding:0 10px;">
        <el-col :span="12">
          <el-form-item label="剩余未还款金额(元)" prop="daijine">
            <el-input-number
              v-model="form.variables.daijine"
              :min="0"
              :precision="2"
              :step="1"
              disabled
              placeholder="剩余未还款金额(元)"
              style="width:100%;"
            ></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="剩余未还款金额(大写)" prop="whkjinedx">
            <el-input
              v-model="form.variables.whkjinedx"
              disabled
              placeholder="剩余未还款金额(大写)"
              style="width:100%;"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="4" style="padding:0 10px;">
        <el-col :span="24">
          <el-form-item label="备注" prop="hkbeizhu">
            <el-input
              v-model="form.variables.hkbeizhu"
              type="textarea"
              :rows="3"
              :disabled="!isformdisabled"
              placeholder="请输入备注"
              style="width:100%;"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="4" style="padding:0 10px;">
        <el-col :span="24">
          <el-form-item label="附件" prop="hkfujian">
            <el-upload
              :before-upload="checkMyFileSize"
              class="upload-demo"
              :disabled="!isformdisabled"
              :headers="uploadHeaders"
              :action="uploadUrl"
              :on-success="handleAvatarSuccess"
              :file-list="fileList"
              :on-remove="handleRemove"
              :on-preview="downloadFile"
              style="width:100%;"
              :data="fujiandata"
              multiple
            >
              <el-button size="small" type="primary" v-if="isformdisabled">点击上传</el-button>
            </el-upload>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <LoanAmountPopup
      :isshow="isLoanAmountPopup"
      @choosedProect="choosedProect"
      @onBeforeClose="onBeforeClose"
      req-url="/cost/xzborrowmoney/my"
    />
  </div>
</template>

<script>
import { addXzrepayment, updateXzrepayment } from '@/api/biz/xzrepayment'
import { definitionStart } from '@/api/flowable/definition'
import { complete } from '@/api/flowable/process'
import { getFileDetail } from '@/api/system/file'
import { formatDate } from '@/utils'
import LoanAmountPopup from '@/components/Popup/LoanAmountPopup'

export default {
  components: { LoanAmountPopup },
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
        tableName: 'pms_xzrepayment'
      },
      // 部门树选项
      deptOptions: '',
      fileList: [],
      bumennameOptions: [],
      fukuanfangshiOptions: [],
      jkfujianlist: [],
      formUserName: '',
      formDeptName: '',
      Editorneirong: '',
      form: {
        variables: {
          time: '',
          parentid: '',
          jiemongy: '',
          jiejinedx: '',
          jkshiyou: '',
          jkdept: '',
          jkbeizhu: '',
          jkfujian: '',
          hkdept: '',
          daihuankuan: '',
          huankuanjine: '',
          hkjinedx: '',
          daijine: '',
          whkjinedx: '',
          hkbeizhu: '',
          hkfujian: ''
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
        jiemongy: [{ required: true, message: '点击选择借款信息', trigger: 'blur' }],
        jiejinedx: [{ required: true, message: '请输入借款金额', trigger: 'blur' }],
        jkshiyou: [{ required: true, message: '请输入借款事由', trigger: 'blur' }],
        jkdept: [{ required: true, message: '请选择借款单位', trigger: 'change' }],
        jkbeizhu: [{ required: true, message: '请输入备注', trigger: 'blur' }],
        hkdept: [{ required: true, message: '请选择还款单位', trigger: 'change' }],
        daihuankuan: [{ required: true, message: '请输入待还款金额', trigger: 'change' }],
        huankuanjine: [{ required: true, message: '请输入本次还款金额', trigger: 'change' }],
        hkjinedx: [{ required: true, message: '请输入本次还款金额', trigger: 'blur' }],
        daijine: [{ required: true, message: '请输入剩余未还款金额', trigger: 'change' }],
        whkjinedx: [{ required: true, message: '请输入剩余未还款金额', trigger: 'blur' }],
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
      this.form.variables.jiemongy = row.money
      this.form.variables.jiejinedx = this.amountConvertToUpperCase(row.money)
      this.form.variables.jkshiyou = row.reasons
      this.form.variables.jkdept = row.bumenname
      this.form.variables.jkbeizhu = row.beizhu
      this.form.variables.jkfujian = row.fujian
      this.form.variables.daihuankuan = row.daijine
      this.form.variables.daijine =
        this.form.variables.daihuankuan - this.form.variables.huankuanjine
      this.getjkFileDetail(row.fujian)
    },
    async getjkFileDetail(ids) {
      const { code, data, msg } = await getFileDetail(ids)
      if (code == 200) {
        this.jkfujianlist = data.map((item) => {
          return { name: item.fileName, url: item.savePath, id: item.id }
        })
      }
    },
    changeMoneyToUpperCase(data) {
      this.form.variables.jiejinedx = this.amountConvertToUpperCase(data)
    },
    downloadFile({ url }) {
      window.open(url)
    },
    handleAvatarSuccess({ data }, file, fileList) {
      this.form.variables.hkfujian = this.form.variables.hkfujian == null ? '' : this.form.variables.hkfujian
 this.form.variables.hkfujian += `;${data[0].fileId}`
    },
    huankuanjineChange(data) {
      if (data > this.form.variables.daihuankuan) {
        this.$message.error('本次还款金额不能大于待还款金额')
        this.form.variables.huankuanjine = ''
      } else {
        this.form.variables.daijine = (
          this.form.variables.daihuankuan - data
        ).toFixed(2)
        this.form.variables.hkjinedx = this.amountConvertToUpperCase(data)
        this.form.variables.whkjinedx = this.amountConvertToUpperCase(
          this.form.variables.daijine
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
            const updateSealmsg = await updateXzrepayment({
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
            const { code, data } = await addXzrepayment(this.form.variables)
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
      this.form.variables.hkfujian = idArr.join(';')
    },
    handlejkRemove(file, fileList) {
      let idArr
      if (this.form.variables.id) {
        idArr = fileList.map((item) => item.id)
      } else {
        idArr = fileList.map((item) => item.response.data[0].fileId)
      }
      this.form.variables.jkfujian = idArr.join(';')
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
          this.getFileDetail(this.form.variables.hkfujian)
          this.getjkFileDetail(this.form.variables.jkfujian)
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
