<!--
 * @Author: chad
 * @Date: 2021-10-26 09:02:48
 * @LastEditTime: 2021-11-11 09:56:44
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
        <el-form-item label="申请事由" prop="purpose">
          <el-input
            v-model="form.variables.purpose"
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
        <el-form-item label="申请人" prop="username">
          <el-input v-model="formUserName" disabled placeholder="请输入申请人" style="width:100%;"/>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="4" style="padding:0 10px;">
      <el-col :span="12">
        <el-form-item label="申请时间" prop="time">
          <el-date-picker
            v-model="form.variables.time"
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
        <el-form-item label="资质接收单位" prop="receivedcompany">
          <el-input
            v-model="form.variables.receivedcompany"
            :disabled="!isformdisabled"
            placeholder="请输入资质接收单位"
            style="width:100%;"
          />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="4" style="padding:0 10px;">
      <el-col :span="12">
        <el-form-item label="公司名称" prop="company">
          <el-select
            v-model="form.variables.company"
            :disabled="!isformdisabled"
            clearable
            placeholder="请选择公司名称"
            style="width:100%;"
            @change="companyChange"
            @keyup.enter.native="handleQuery"
          >
            <el-option
              v-for="item in formCompanyNameList"
              :key="item.dictValue"
              :label="item.dictLabel"
              :value="item.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="公司资质" prop="qiyezizhi">
          <el-select
            v-model="form.variables.qiyezizhi"
            :disabled="!isformdisabled"
            clearable
            multiple
            placeholder="请选择公司资质"
            style="width:100%;"
          >
            <el-option
              v-for="item in CompanySelectList"
              :key="item.id"
              :label="item.name"
              :value="item.name"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="4" style="padding:0 10px;">
      <el-col :span="12">
        <el-form-item label="个人资质" prop="gerenzizhi">
          <el-select
            v-model="form.variables.gerenzizhi"
            :disabled="!isformdisabled"
            clearable
            multiple
            placeholder="请选择个人资质"
            style="width:100%;"
          >
            <el-option
              v-for="item in personalSelectList"
              :key="item.id"
              :label="item.name"
              :value="item.name"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="12"></el-col>
    </el-row>

    <el-row :gutter="4" style="padding:0 10px;">
      <el-col :span="12">
        <el-form-item label="用途类型" prop="zzlx">
          <el-select
            v-model="form.variables.zzlx"
            :disabled="!isformdisabled"
            clearable
            placeholder="请选择用途类型"
            style="width:100%;"
          >
            <el-option
              v-for="item in formDataTypeList"
              :key="item.dictValue"
              :label="item.dictLabel"
              :value="item.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="是否需要原件" prop="original">
          <el-select
            v-model="form.variables.original"
            :disabled="!isformdisabled"
            clearable
            placeholder="请选择是否需要原件"
            style="width:100%;"
          >
            <el-option
              v-for="item in sysYesNoList"
              :key="item.dictValue"
              :label="item.dictLabel"
              :value="item.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="4" style="padding:0 10px;" v-if="form.variables.original == 'Y'" >
      <el-col :span="12">
        <el-form-item label="原件使用时间" prop="begintime">
          <el-date-picker
            v-model="form.variables.begintime"
            :disabled="!isformdisabled"
            placeholder="选择日期"
            style="width:100%;"
            type="date"
          ></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="原件归还时间" prop="endtime">
          <el-date-picker
            v-model="form.variables.endtime"
            :disabled="!isformdisabled"
            placeholder="选择日期"
            style="width:100%;"
            type="date"
          ></el-date-picker>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row v-if="[1,2,3].indexOf( form.variables.zzlx )" :gutter="4" style="padding:0 10px;">
      <el-col v-if="form.variables.zzlx == 1" :span="12">
        <el-form-item label="营销立项编号" prop="yxprojectno">
          <el-input
            v-model="form.variables.yxprojectno"
            disabled
            placeholder="请输入营销立项编号"
            style="width:100%;"
          >
            <el-button
              slot="append"
              icon="el-icon-third-guide"
              v-on:click.native="isformdisabled && chooseTrackProject()"
            ></el-button>
          </el-input>
        </el-form-item>
      </el-col>
      <el-col v-else-if="form.variables.zzlx == 2" :span="12">
        <el-form-item label="投标立项编号" prop="tbprojectno">
          <el-input
            v-model="form.variables.tbprojectno"
            disabled
            placeholder="请输入投标立项编号"
            style="width:100%;"
          >
            <el-button
              slot="append"
              icon="el-icon-third-guide"
              v-on:click.native="isformdisabled && chooseBidProject()"
            ></el-button>
          </el-input>
        </el-form-item>
      </el-col>
      <el-col v-else-if="form.variables.zzlx == 3" :span="12">
        <el-form-item label="生产立项编号" prop="scprojectno">
          <el-input
            v-model="form.variables.scprojectno"
            disabled
            placeholder="请输入生产立项编号"
            style="width:100%;"
          >
            <el-button
              slot="append"
              icon="el-icon-third-guide"
              v-on:click.native="isformdisabled && chooseProductionProject()"
            ></el-button>
          </el-input>
        </el-form-item>
      </el-col>
      <el-col v-if="form.variables.zzlx == 3 || form.variables.zzlx == 2 || form.variables.zzlx == 1" :span="12">
        <el-form-item label="项目名称" prop="projectname">
          <el-input
            v-model="form.variables.projectname"
            disabled
            placeholder="请输入项目名称"
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
    <!--营销立项-->
    <TrackProjectPopup
      v-if="isChooseTrackProject"
      req-url="/system/trackproject/list"
      @transferTrackProjectData="getTrackProject"
    />
    <!--投标立项-->
    <BidProjectPopup
      v-if="isChooseBidProject"
      req-url="/system/bidproject/list"
      @choosedProect="getBidProject"
    />
    <!--生产立项-->
    <ProductionProjectPopup
      v-if="ischooseProductionProjectPopup"
      req-url="/system/productionproject/my"
      @choosedProect="getProductionProject"
    />

  </el-form>
</template>

<script>
import { addQualification, updateQualification } from '@/api/biz/qualification'
import { definitionStart } from '@/api/flowable/definition'
import { complete } from '@/api/flowable/process'
import { getFileDetail } from '@/api/system/file'
import { formatDate } from '@/utils'
import { getCompanyListByCompanyId } from '@/api/biz/qyzizhixiangqing'
import { getGrzizhiByCompanyId } from '@/api/biz/grzizhixiangqing'
import TrackProjectPopup from '@/components/Popup/TrackProjectPopup'
import BidProjectPopup from '@/components/Popup/BidProjectPopup'
import ProductionProjectPopup from '@/components/Popup/ProductionProjectPopup'

export default {
  components: { TrackProjectPopup, BidProjectPopup, ProductionProjectPopup },
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
      ischooseProductionProjectPopup: false,
      isChooseBidProject: false,
      isChooseTrackProject: false,
      // 部门树选项
      deptOptions: '',
      fileList: [],
      formUserName: '',
      formDeptName: '',
      Editorneirong: '',
      CompanySelectList: [],
      personalSelectList: [],
      form: {
        variables: {
          purpose: '',
          dept: '',
          username: '',
          time: '',
          receivedcompany: '',
          company: '',
          qiyezizhi: [],
          gerenzizhi: [],
          zzlx: '',
          original: '',
          begintime: '',
          endtime: '',
          yxprojectno: '',
          tbprojectno: '',
          scprojectno: '',
          beizhu: '',
          fujian: ''
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
      sysYesNoList: [],
      uploadHeaders: {
        Authorization: ''
      },
      uploadUrl: process.env.VUE_APP_BASE_API + '/common/batchUpload',
      rules: {
        purpose: [
          { required: true, message: '请输入申请事由', trigger: 'blur' }
        ],
        receivedcompany: [
          { required: true, message: '请输入资质接收单位', trigger: 'blur' }
        ],
        company: [
          { required: true, message: '请选择公司名称', trigger: 'change' }
        ],
        zzlx: [
          { required: true, message: '请选择用途类型', trigger: 'change' }
        ],
        original: [
          { required: true, message: '请选择是否需要原件', trigger: 'change' }
        ],
        begintime: [
          { required: true, message: '请选择原件使用时间', trigger: 'change' },
          { validator: this.validatestarttime, trigger: 'blur' }
        ],
        endtime: [
          { required: true, message: '请选择原件归还时间', trigger: 'change' },
          { validator: this.validatestarttime, trigger: 'blur' }
        ],
        yxprojectno: [
          { required: true, message: '请输入营销立项编号', trigger: 'blur' }
        ],
        tbprojectno: [
          { required: true, message: '请输入投标立项编号', trigger: 'blur' }
        ],
        scprojectno: [
          { required: true, message: '请输入生产立项编号', trigger: 'blur' }
        ],
        beizhu: [{ required: true, message: '请输入备注', trigger: 'blur' }]
      },
      fujiandata: {
        fieldName: 'fujian',
        tableName: 'pms_qualification'
      }
    }
  },
  created() {
    // 公司名称
    this.getDicts('form_company_name').then((res) => {
      this.formCompanyNameList = res.data
    })
    // 资料类型、
    this.getDicts('form_data_type').then((res) => {
      this.formDataTypeList = res.data
    })
    // 是否
    this.getDicts('sys_yes_no').then((res) => {
      this.sysYesNoList = res.data
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
    validatestarttime(rule, value, callback) {
      let begintime = new Date(this.form.variables.begintime).getTime()
      let endtime = new Date(this.form.variables.endtime).getTime()
      if (begintime != null && endtime != null) {
        if (endtime < begintime) {
          callback(new Error('原件归还时间不能小于原件使用时间'))
        } else {
          callback()
        }
      } else {
        callback()
      }
    },
    //生产立项
    chooseProductionProject() {
      this.ischooseProductionProjectPopup = true
    },
    getProductionProject(row) {
      console.log(row)
      if (row) {
        this.form.variables.scprojectno = row.projectCode
        this.form.variables.projectname = row.projectName
      }
      this.ischooseProductionProjectPopup = false
    },
    //投标立项
    chooseBidProject() {
      this.isChooseBidProject = true
    },
    getBidProject(row) {
      if (row) {
        this.form.variables.tbprojectno = row.num
        this.form.variables.projectname = row.projectname
      }
      this.isChooseBidProject = false
    },
    //营销立项弹框
    chooseTrackProject() {
      this.isChooseTrackProject = true
    },
    getTrackProject(row) {
      if (row) {
        this.form.variables.yxprojectno = row.numbers
        this.form.variables.projectname = row.projectName
      }
      this.isChooseTrackProject = false
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
            const updateSealmsg = await updateQualification({
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
            const { code, data } = await addQualification(this.form.variables)
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
    },
    async companyChange(companyid) {
      const CompanyList = await getCompanyListByCompanyId(companyid)
      this.CompanySelectList = CompanyList.data
      const GrzizhiList = await getGrzizhiByCompanyId(companyid)
      this.personalSelectList = GrzizhiList.data
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
          this.getFileDetail(this.form.variables.fujian)
          this.formUserName = this.form.variables.createUserName
          this.formDeptName = this.form.variables.createDeptName
          console.log('this.form.variables', this.form.variables)
          this.form.variables.gerenzizhi =
            this.form.variables.gerenzizhi.split(';')
          this.form.variables.qiyezizhi =
            this.form.variables.qiyezizhi.split(';')
          this.companyChange(this.form.variables.company)
        } else {
          this.form.variables.time = formatDate(new Date().getTime())
          const currentUser = this.$store.getters.user
          this.formUserName = currentUser.nickName
          this.form.variables.username = currentUser.userId
          this.formDeptName = currentUser.dept.deptName
          this.form.variables.dept = currentUser.deptId
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
