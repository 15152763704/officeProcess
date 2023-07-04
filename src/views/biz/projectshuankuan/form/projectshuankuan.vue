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
          <el-form-item label="待还款金额(元)" prop="daijine">
            <el-input
              v-model="form.variables.daijine"
              disabled
              placeholder="待还款金额(元)"
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
          <el-form-item label="本次还款金额(元)" prop="huankuanjine">
            <el-input-number
              v-model="form.variables.huankuanjine"
              :disabled="!isformdisabled"
              :min="0"
              :precision="2"
              :step="1"
              placeholder="本次还款金额(元)"
              style="width:100%;"
              @change="huankuanjineChange"
            ></el-input-number>
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
              size="small"
              style="width: 100%;"
            >
              <el-option
                v-for="dict in formDataTypeList"
                :key="dict.dictValue"
                :label="dict.dictLabel"
                :value="dict.dictValue"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="借款编号" prop="nums">
            <el-input
              v-model="form.variables.nums"
              disabled
              placeholder="借款编号"
              style="width:100%;"
            >
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="4" style="padding:0 10px;">
        <el-col :span="12">
          <el-form-item label="剩余未还款金额(元)" prop="smoney">
            <el-input-number
              v-model="form.variables.smoney"
              :min="0"
              :precision="2"
              :step="1"
              disabled
              placeholder="剩余未还款金额(元)"
              style="width:100%;"
            ></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <ProjectLoanPopup
      :isshow="isLoanAmountPopup"
      req-url="/ProjectLoan/projectsjiekuan/my"
      @choosedProect="choosedProect"
      @onBeforeClose="onBeforeClose"
    />
  </div>
</template>

<script>
import { addProjectshuankuan, updateProjectshuankuan } from '@/api/biz/projectshuankuan'
import { definitionStart } from '@/api/flowable/definition'
import { complete } from '@/api/flowable/process'
import { getFileDetail } from '@/api/system/file'
import { formatDate } from '@/utils'
import ProjectLoanPopup from '@/components/Popup/ProjectLoanPopup'

export default {
  components: { ProjectLoanPopup },
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
        tableName: 'pms_projectshuankuan'
      },
      // 部门树选项
      deptOptions: '',
      fileList: [],
      fileLists: [],
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
          daijine: '',
          huankuanjine: '',
          fukuanfangshi: '',
          nums: '',
          smoney: ''
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
        daijine: [
          {
            required: true,
            message: '请输入待还款金额(元)',
            trigger: 'blur'
          }
        ],
        huankuanjine: [
          {
            required: true,
            message: '请输入本次还款金额',
            trigger: 'change'
          }
        ],
        fukuanfangshi: [
          {
            required: true,
            message: '请选择付款方式',
            trigger: 'change'
          }
        ],
        nums: [
          {
            required: true,
            message: '请输入借款编号',
            trigger: 'blur'
          }
        ],
        smoney: [
          {
            required: true,
            message: '请输入剩余未还款金额',
            trigger: 'change'
          }
        ]
      }
    }
  },
  created() {
    // const proData = localStorage.getItem('proData')  form_payment_method
    this.getDicts('form_payment_method').then((res) => {
      this.formDataTypeList = res.data
    })
    // const id = localStorage.getItem('id')
    const id = this.local_val.id
    if (id) {
      this.form.id = id
    }
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
      if (row) {
        this.form.variables.parentid = row.id
        this.form.variables.daijine = row.daijine
        this.form.variables.fukuanfangshi = row.fukuanfangshi
        this.form.variables.nums = row.nums
      }
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
      this.form.variables.daxiejine = this.amountConvertToUpperCase(data)
    },
    downloadFile({ url }) {
      window.open(url)
    },
    handleAvatarSuccess({ data }, file, fileList) {
      this.form.variables.huankuanfujian = this.form.variables.huankuanfujian == null ? '' : this.form.variables.huankuanfujian
 this.form.variables.huankuanfujian += `;${data[0].fileId}`
    },
    huankuanjineChange(data) {
      if (data > this.form.variables.daijine) {
        this.$message.error('本次还款金额不能大于待还款金额')
        this.form.variables.huankuanjine = ''
      } else {
        this.form.variables.smoney = (
          this.form.variables.daijine - data
        ).toFixed(2)
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
            const updateSealmsg = await updateProjectshuankuan({
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
            const { code, data } = await addProjectshuankuan(this.form.variables)
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
          this.fileLists.push({
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
          // this.getFileDetail(this.form.variables.huankuanfujian)
          // this.getjkFileDetail(this.form.variables.jiekuanfujian)
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
