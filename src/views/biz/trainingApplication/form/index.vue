<!--
 * @Author: chad
 * @Date: 2021-10-26 09:02:48
 * @LastEditTime: 2021-11-18 10:38:03
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jshxpms-vue\src\views\flowable\formView\test.vue
-->
<template>
  <el-form
    ref="form"
    :model="form.variables"
    :rules="rules"
    label-width="120px"
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
        <el-form-item label="申请时间" prop="time">
          <el-date-picker
            v-model="form.variables.time"
            type="datetime"
            placeholder="选择申请时间"
            align="right"
            value-format="yyyy-MM-dd HH:mm:ss"
            disabled
            style="width:100%;"
            :picker-options="pickerOptions"
          ></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="培训编号" prop="trainnumber">
          <el-input v-model="form.variables.trainnumber" disabled placeholder="系统自动生成" style="width:100%;"/>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="4" style="padding:0 10px;">
      <el-col :span="12">
        <el-form-item label="培训内容" prop="neirong">
          <el-input
            v-model="form.variables.neirong"
            :disabled="!isformdisabled"
            placeholder="请输入培训内容"
            style="width:100%;"
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="培训方式" prop="sfwc">
          <el-select
            v-model="form.variables.sfwc"
            :disabled="!isformdisabled"
            clearable
            placeholder="请选择培训方式"
            style="width:100%;"
          >
            <el-option
              v-for="item in formTrainMethodList"
              :key="item.dictValue"
              :label="item.dictLabel"
              :value="item.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="4" style="padding:0 10px;" v-if="isOutside">
      <el-col :span="12">
        <el-form-item label="预计费用(元)" prop="budget">
          <template>
            <el-input-number
              v-model="form.variables.budget"
              :precision="2"
              :step="1"
              :min="0"
              :max="9999999999.99"
              placeholder="请输入预计费用"
              style="width:100%;"
              :disabled="!isformdisabled"
            ></el-input-number>
          </template>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="培训机构" prop="trainingagency">
          <el-input
            v-model="form.variables.trainingagency"
            :disabled="!isformdisabled"
            placeholder="请输入培训机构"
            style="width:100%;"
          />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="4" style="padding:0 10px;">
      <el-col :span="12">
        <el-form-item label="培训类型" prop="leixing">
          <el-select
            v-model="form.variables.leixing"
            :disabled="!isformdisabled"
            clearable
            placeholder="请选择培训类型"
            style="width:100%;"
          >
            <el-option
              v-for="item in formTrainTypeList"
              :key="item.dictValue"
              :label="item.dictLabel"
              :value="item.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="培训时间" prop="trainingtime">
          <el-date-picker
            v-model="form.variables.trainingtime"
            type="datetime"
            placeholder="选择培训时间"
            align="right"
            value-format="yyyy-MM-dd HH:mm:ss"
            style="width:100%;"
            :picker-options="pickerOptions"
            :disabled="!isformdisabled"
          ></el-date-picker>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="4" style="padding:0 10px;">
      <el-col :span="12">
        <el-form-item label="培训地点" prop="trainingplace">
          <el-input
            v-model="form.variables.trainingplace"
            :disabled="!isformdisabled"
            placeholder="请输入培训地点"
            style="width:100%;"
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="培训讲师" prop="traininginstructors">
          <el-input
            v-model="form.variables.traininginstructors"
            :disabled="!isformdisabled"
            placeholder="请输入培训讲师"
            style="width:100%;"
          />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="4" style="padding:0 10px;">
      <el-col :span="12">
        <el-form-item label="参与人员" prop="traininguserName">
          <el-input
            v-model="form.variables.traininguserName"
            :disabled="!isformdisabled"
            placeholder="请选择参与人员"
            style="width:100%;"
            @focus="dialogName = 'participantsDialog'"
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="培训课时(小时)" prop="keshi">
          <el-input
            v-model="form.variables.keshi"
            :disabled="!isformdisabled"
            placeholder="请输入培训课时"
            style="width:100%;"
          />
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="4" style="padding:0 10px;">
      <el-col :span="24">
        <el-form-item label="备注" prop="remark">
          <el-input
            v-model="form.variables.remark"
            type="textarea"
            :rows="2"
            :disabled="!isformdisabled"
            placeholder="请输入备注"
            style="width:100%;"
          />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="4" style="padding:0 10px;">
      <el-col :span="24">
        <el-form-item label="附件" prop="file">
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
            :data="fileParam"
            style="width:100%;"
            multiple
          >
            <el-button size="small" type="primary" v-if="isformdisabled">点击上传</el-button>
          </el-upload>
        </el-form-item>
      </el-col>
    </el-row>

    <!-- 弹窗 -->
    <candidateUsersDialog
      v-if="dialogName === 'participantsDialog'"
      @close="finishParticipants"
      :list="treeselectData"
    />
  </el-form>
</template>

<script>
import { save } from '../../../../api/biz/trainingApplication'
import { definitionStart } from '@/api/flowable/definition'
import { complete } from '@/api/flowable/process'
import { getFileDetail } from '@/api/system/file'
import candidateUsersDialog from '@/components/Process/components/nodePanel/property/candidateUsers'
import { treeselect } from '@/api/system/dept'

export default {
  components: { candidateUsersDialog },
  props: {
    proData: {
      type: String,
      default: () => {
        return ''
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
      usersList: [],
      dialogName: '',
      treeselectData: [],
      isChoose: false,
      isOutside: false,
      fileIds: '',
      fileList: [],
      fileParam: {
        fieldName: 'file',
        tableName: 'pms_track_project'
      },
      formUserName: '',
      formDeptName: '',
      form: {
        variables: {
          fujian: '',
          traininguserName: ''
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
      formTrainMethodList: [],
      formTrainTypeList: [],
      uploadHeaders: {
        Authorization: ''
      },
      uploadUrl: process.env.VUE_APP_BASE_API + '/common/batchUpload',
      rules: {
        neirong: [
          { required: true, message: '请输入培训内容', trigger: 'blur' }
        ],
        sfwc: [
          { required: true, message: '请选择培训方式', trigger: 'blur' }
        ],
        leixing: [
          { required: true, message: '请选择培训类型', trigger: 'blur' }
        ],
        trainingtime: [
          { required: true, message: '请选择培训时间', trigger: 'blur' }
        ],
        trainingplace: [
          { required: true, message: '请输入培训地点', trigger: 'blur' }
        ],
        traininginstructors: [
          { required: true, message: '请输入培训讲师', trigger: 'blur' }
        ],
        traininguserName: [
          { required: true, message: '请选择参与人员', trigger: 'blur' }
        ],
        keshi: [
          { required: true, message: '请输入培训课时', trigger: 'blur' }
        ],
        budget: [
          { required: true, message: '请输入预计费用', trigger: 'blur' }
        ],
        trainingagency: [
          { required: true, message: '请输入培训机构', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    // 培训方式
    this.getDicts('train_method').then((res) => {
      this.formTrainMethodList = res.data
    })
    // 培训类型
    this.getDicts('train_type').then((res) => {
      this.formTrainTypeList = res.data
    })
    // const id = localStorage.getItem('id')
    const id = this.local_val.id
    if (id) {
      this.form.id = id
    }

    // this.form.formId = localStorage.getItem('formId')
    this.form.formId = this.local_val.formId
    this.gettreeselect()
  },
  methods: {
    gettreeselect() {
      treeselect().then((res) => {
        this.treeselectData = res.data.map((item) => {
          item.value = item.id
          return item
        })
      })
    },
    finishParticipants(checkList) {
      this.dialogName = ''
      this.form.variables.traininguser = checkList.map((item) => item.userId).join(',')
      this.form.variables.traininguserName = checkList.map((item) => item.nickName).join(',')
      this.$refs.form.clearValidate('traininguserName')
    },
    downloadFile({ url }) {
      window.open(url)
    },
    handleAvatarSuccess({ data }, file, fileList) {
      this.fileIds = this.fileIds == null ? '' : this.fileIds
 this.fileIds += `;${data[0].fileId}`
    },
    onSubmit() {
      this.$refs['form'].validate(async(valid) => {
        if (valid) {
          // const procInsId = localStorage.getItem('procInsId')
          this.form.variables.fujian = this.fileIds
          let procInsId = this.local_val.procInsId
          if (procInsId != '' && typeof (procInsId) != 'undefined' && procInsId != 'undefined') {
            this.completeData.instanceId = procInsId
            this.completeData.procInsId = procInsId
            // const taskId = localStorage.getItem('taskId')
            const taskId = this.local_val.taskId
            if (taskId) {
              this.completeData.taskId = taskId
            }
            const updateSealmsg = await save({
              id: this.form.id,
              ...this.form.variables
            })
            this.completeData.selected = this.form.variables.sfwc
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

            const { code, data } = await save({
              ...this.form.variables
            })
            this.form.selected = this.form.variables.sfwc
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
          if (item.fieldName == 'file') {
            this.fileList.push({
              name: item.fileName,
              url: item.savePath,
              id: item.id
            })
          }
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
      this.fileIds = idArr.join(';')
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
          // 请求附件详情
          this.getFileDetail(this.form.variables.fujian)
          this.formUserName = this.form.variables.createUserName
          this.formDeptName = this.form.variables.createDeptName
          this.form.variables.time = this.form.variables.createTime
        } else {
          const currentUser = this.$store.getters.user
          this.formUserName = currentUser.nickName
          this.formDeptName = currentUser.dept.deptName
          this.form.variables.time = new Date()
        }
      },
      immediate: true
    },
    form: {
      handler(val) {
        //培训方式
        if (val.variables.sfwc == '2') {
          this.isOutside = true
        } else {
          this.isOutside = false
        }
        if (val.variables.traininguser) {
          // 用户列表
          this.getUserAll().then((res) => {
            this.usersList = res
            this.$set(this.form.variables,'traininguserName',this.selectUserNameByUserId(this.usersList, val.variables.traininguser))
          })

        }

      },
      deep: true
    }
  }

}
</script>
<style scoped lang="scss">
.but-form {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

