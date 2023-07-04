<!--
 * @Author: chad
 * @Date: 2021-10-26 09:02:48
 * @LastEditTime: 2021-11-10 14:19:08
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
        <el-form-item label="申请事由" prop="shenqingshiyou">
          <el-input
            v-model="form.variables.shenqingshiyou"
            :disabled="!isformdisabled"
            placeholder="请输入申请事由"
            style="width:100%;"
          />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="4" style="padding:0 10px;">
      <el-col :span="12">
        <el-form-item label="申请部门" prop="dept">
          <el-input v-model="formDeptName" disabled placeholder="请输入申请部门" style="width:100%;"/>
        </el-form-item>
      </el-col>
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
    </el-row>
    <el-row :gutter="4" style="padding:0 10px;">
      <el-col :span="12">
        <el-form-item label="申请人" prop="username">
          <el-input v-model="formUserName" disabled placeholder="请输入申请人" style="width:100%;"/>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="申请车辆" prop="carname">
          <el-input v-model="form.variables.carname" disabled placeholder="请输入申请车辆" style="width:100%;">
            <el-button
              v-on:click.native="isformdisabled && chooseProjectData()"
              slot="append"
              icon="el-icon-third-guide"
            ></el-button>
          </el-input>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="4" style="padding:0 10px;">
      <el-col :span="12">
        <el-form-item label="车牌号码" prop="carno">
          <el-input v-model="form.variables.carno" disabled placeholder="请输入车牌号码" style="width:100%;"/>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="用途类型" prop="yongtuleixing">
          <el-select
            v-model="form.variables.yongtuleixing"
            :disabled="!isformdisabled"
            clearable
            placeholder="请选择用途类型"
            style="width:100%;"
          >
            <el-option
              v-for="item in car_use_type"
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
        <el-form-item label="目的地" prop="destinations">
          <el-input
            v-model="form.variables.destinations"
            :disabled="!isformdisabled"
            placeholder="请输入目的地"
            style="width:100%;"
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="所属区域" prop="travelscope">
          <el-select
            v-model="form.variables.travelscope"
            :disabled="!isformdisabled"
            clearable
            placeholder="请选择所属区域"
            style="width:100%;"
          >
            <el-option
              v-for="item in car_belong_area"
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
        <el-form-item label="借用时间" prop="starttime">
          <el-date-picker
            v-model="form.variables.starttime"
            type="datetime"
            placeholder="选择借用时间"
            :disabled="!isformdisabled"
            align="right"
            value-format="yyyy-MM-dd HH:mm:ss"
            style="width:100%;"
            :picker-options="pickerOptions"
          ></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="归还时间" prop="endtime">
          <el-date-picker
            v-model="form.variables.endtime"
            :disabled="!isformdisabled"
            type="datetime"
            placeholder="选择归还时间"
            align="right"
            value-format="yyyy-MM-dd HH:mm:ss"
            style="width:100%;"
            :picker-options="pickerOptions"
          ></el-date-picker>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="4" style="padding:0 10px;" v-if="isChoose">
      <el-col :span="24">
        <AdministrationCarDialog req-url="/administrationCarManage/carAdd/list" @choosedProect="choosedProect"/>
      </el-col>
    </el-row>

    <el-row :gutter="4" style="padding:0 10px;">
      <el-col :span="24">
        <el-form-item label="备注" prop="memo">
          <el-input
            v-model="form.variables.memo"
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
        <el-form-item label="附件" prop="fujian">
          <el-upload
            class="upload-demo"
            :disabled="!isformdisabled"
            :headers="uploadHeaders"
            :action="uploadUrl"
            :on-success="handleAvatarSuccess"
            :file-list="fileList"
            :on-remove="handleRemove"
            :on-preview="downloadFile"
            :data="fujiandata"
            style="width:100%;"
            multiple
          >
            <el-button size="small" type="primary" v-if="isformdisabled">点击上传</el-button>
          </el-upload>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
import { addCarApply, updateCarApply } from '@/api/biz/administrationCarManage/carApply'
import { definitionStart } from '@/api/flowable/definition'
import { complete } from '@/api/flowable/process'
import { getFileDetail } from '@/api/system/file'
import { formatDate } from '@/utils'
import AdministrationCarDialog from '@/components/Popup/AdministrationCarPopup.vue'

export default {
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
  components: { AdministrationCarDialog },
  data() {
    let validatestarttime = (rule, value, callback) => {
      if (this.form.variables.starttime && this.form.variables.endtime) {
        if (this.form.variables.starttime >= this.form.variables.endtime) {
          callback(new Error('借用时间不能大于归还时间'))
        } else {
          callback()
        }
      } else {
        callback()
      }
    }
    return {
      isChoose: false,//项目选择框，默认false隐藏
      fujiandata: {
        fieldName: 'fujian',
        tableName: 'pms_oa_carbook'
      },
      fileList: [],
      car_use_type: [],
      car_belong_area: [],
      formUserName: '',
      formDeptName: '',
      form: {
        variables: {
          dept: '',
          username: '',
          reson: '',
          means: '',
          printing: '',
          company: '',
          meanscompany: '',
          beizhu: '',
          fujian: '',
          times: '',
          yingxiaono: '',
          toubiaono: '',
          shengchanno: '',
          carno: '',
          carname: ''
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
        shenqingshiyou: [{ required: true, message: '请输入申请事由', trigger: 'blur' }],
        carname: [{ required: true, message: '请输入申请车辆', trigger: 'blur' }],
        yongtuleixing: [{ required: true, message: '请输入用途类型', trigger: 'blur' }],
        destinations: [{ required: true, message: '请输入目的地', trigger: 'blur' }],
        travelscope: [{ required: true, message: '请选择所属区域', trigger: 'blur' }],
        starttime: [{ required: true, message: '请输入借用时间', trigger: 'blur' }
          , { validator: validatestarttime, trigger: 'blur' }],
        endtime: [{ required: true, message: '请输入归还时间', trigger: 'blur' }
          , { validator: validatestarttime, trigger: 'blur' }]
      }
    }
  },
  created() {
    this.getDicts('car_use_type').then((response) => {
      this.car_use_type = response.data
    })
    this.getDicts('car_belong_area').then((response) => {
      this.car_belong_area = response.data
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
    //接收子组件传过来的被选择的项目
    choosedProect(data) {
      if (data) {
        this.form.variables.carno = data.carno
        this.form.variables.carname = data.carno
      }
      this.isChoose = false
    },
    //选择项目
    chooseProjectData() {
      this.isChoose = true
    },
    downloadFile({ url }) {
      window.open(url)
    },
    handleAvatarSuccess({ data }, file, fileList) {
      this.form.variables.fujian =
        this.form.variables.fujian == null ? '' : this.form.variables.fujian
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
            const updateSealmsg = await updateCarApply({
              id: this.form.id,
              ...this.form.variables
            })
            this.completeData = this.form.variables.travelscope == 2 ? 'wai' : 'nei'
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
            const { code, data } = await addCarApply({
              ...this.form.variables
            })
            if (code == 200) {
              this.form.id = data
              this.form.selected = this.form.variables.travelscope == 2 ? 'wai' : 'nei'
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
          if (item.tableName == 'pms_oa_carbook') {
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
      this.form.variables.fujian = idArr.join(';')
    }
  },
  watch: {
    proData: {
      handler(val) {
        console.log(val)
        if (val) {
          let dataArr = JSON.parse(val)
          this.form.variables = {
            ...dataArr[0]
          }
          // 请求附件详情
          this.getFileDetail(this.form.variables.fujian)
          this.formUserName = this.form.variables.createUserName
          this.formDeptName = this.form.variables.createDeptName
        } else {
          this.form.variables.time = formatDate(new Date().getTime())
          const currentUser = this.$store.getters.user
          this.formUserName = currentUser.nickName
          this.form.variables.users = currentUser.userId
          this.formDeptName = currentUser.dept.deptName
          this.form.variables.costdept = currentUser.deptId
        }
        this.uploadHeaders.Authorization = 'Bearer ' + this.$store.getters.token
      },
      immediate: true
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
