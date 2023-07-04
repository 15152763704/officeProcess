<!--
 * @Author: chad
 * @Date: 2021-10-26 09:02:48
 * @LastEditTime: 2021-11-20 14:56:29
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
          <el-form-item label="出差申请" class="title_class">
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
          <el-form-item label="时间" prop="time">
            <el-date-picker
              v-model="form.variables.time"
              type="datetime"
              placeholder="选择时间"
              align="right"
              value-format="yyyy-MM-dd HH:mm:ss"
              disabled
              style="width:100%;"
              :picker-options="pickerOptions"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="出差编号" prop="nums">
            <el-input disabled style="width:100%;" value="自动生成"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="4" style="padding:0 10px;">
        <el-col :span="24">
          <el-form-item label="出差事由" prop="argument">
            <el-input
              v-model="form.variables.argument"
              type="textarea"
              :disabled="!isformdisabled"
              :rows="3"
              style="width:100%;"
              placeholder="请输入出差事由"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="4" style="padding:0 10px;">
        <el-col :span="12">
          <el-form-item label="出差类型" prop="chuchaitype">
            <el-select
              v-model="form.variables.chuchaitype"
              style="width:100%;"
              placeholder="请选择出差类型"
              @change="clearData"
              :disabled="!isformdisabled"
            >
              <el-option
                v-for="dict in chuchaitypeOptions"
                :key="dict.dictValue"
                :label="dict.dictLabel"
                :value="dict.dictValue"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="fixNumLabel+'立项编号'" prop="numbers" v-if="isShowNumDiv">
            <el-input
              v-model="form.variables.numbers"
              disabled
              :placeholder="`点击选择${fixNumLabel}立项编号`"
              style="width:100%;"
            >
              <el-button
                @click="isformdisabled && showSelectLoanBox(form.variables.chuchaitype)"
                slot="append"
                icon="el-icon-third-guide"
              ></el-button>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="4" style="padding:0 10px;" v-if="isShowNumDiv && isShowNameAndJSF">
        <el-col :span="12">
          <el-form-item label="项目名称" prop="projectname">
            <el-input
              v-model="form.variables.projectname"
              style="width:100%;"
              disabled
              placeholder="请输入项目名称"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="建设方" prop="jianshefang">
            <el-input
              v-model="form.variables.jianshefang"
              style="width:100%;"
              disabled
              placeholder="请输入建设方"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="4" style="padding:0 10px;">
        <el-col :span="12">
          <el-form-item label="出差地区" prop="area">
            <el-input
              v-model="form.variables.area"
              style="width:100%;"
              clearable
              :disabled="!isformdisabled"
              placeholder="请输入出差地区"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="交通工具" prop="vehicle">
            <el-select
              v-model="form.variables.vehicle"
              style="width:100%;"
              placeholder="请选择交通工具"
              :disabled="!isformdisabled"
            >
              <el-option
                v-for="dict in vehicleOptions"
                :key="dict.dictValue"
                :label="dict.dictLabel"
                :value="dict.dictValue"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="4" style="padding:0 10px;">
        <el-col :span="12">
          <el-form-item label="开始时间" prop="starttime">
            <el-date-picker
              clearable
              style="width:100%;"
              :disabled="!isformdisabled"
              v-model="form.variables.starttime"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择开始时间"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="结束时间" prop="finishtime">
            <el-date-picker
              clearable
              :disabled="!isformdisabled"
              style="width:100%;"
              v-model="form.variables.finishtime"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择结束时间"
            ></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="4" style="padding:0 10px;">
        <el-col :span="12">
          <el-form-item label="出差天数" prop="days">
            <el-input-number
              v-model="form.variables.days"
              @change="handleChange"
              style="width:100%;"
              :min="1"
              :step="1"
              :disabled="!isformdisabled"
              label="请输入出差天数"
            ></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="12"></el-col>
      </el-row>
      <el-row :gutter="4" style="padding:0 10px;">
        <el-col :span="24">
          <el-form-item label="备注" prop="beizhu">
            <el-input
              v-model="form.variables.beizhu"
              :rows="3"
              :disabled="!isformdisabled"
              style="width:100%;"
              type="textarea"
              placeholder="请输入备注"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="4" style="padding:0 10px;">
        <el-col :span="24">
          <el-form-item label="附件">
            <!-- <FileUpload v-model="form.variables.fujian" style="width:100%;" /> -->
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
    <TrackProjectPopup
      v-if="isChoose == 'TrackProjectPopup'"
      req-url="/system/trackproject/list"
      @transferTrackProjectData="getTrackProject"
    />
    <ProductionProjectPopup
      v-if="isChoose == 'ProductionProjectPopup'"
      @choosedProect="getTrackProject"
      req-url="/system/productionproject/list"
    />
    <BidProjectPopup v-if="isChoose == 'BidProjectPopup'" req-url="/system/bidproject/listForCreator"
                     @choosedProect="getTrackProject"
    />
    <TrainProjectPopup v-if="isChoose == 'TrainProjectPopup'" req-url="/system/trainingapplication/my"
                       @choosedProect="getTrackProject"
    />
  </div>
</template>

<script>
import { addEvection, updateEvection } from '@/api/biz/evection'
import { definitionStart } from '@/api/flowable/definition'
import { complete } from '@/api/flowable/process'
import { getFileDetail } from '@/api/system/file'
import { formatDate } from '@/utils'
import TrackProjectPopup from '@/components/Popup/TrackProjectPopup'
import ProductionProjectPopup from '@/components/Popup/ProductionProjectPopup'
import BidProjectPopup from '@/components/Popup/BidProjectPopup'
import TrainProjectPopup from '@/components/Popup/TrainProjectPopup'

export default {
  components: {
    TrackProjectPopup,
    ProductionProjectPopup,
    BidProjectPopup,
    TrainProjectPopup
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
      isChoose: '',
      regionList: [],
      siteShiArr: [],
      isLoanAmountPopup: false,
      fujiandata: {
        fieldName: 'fujian',
        tableName: 'pms_evection'
      },
      // 部门树选项
      deptOptions: '',
      fileList: [],
      bumennameOptions: [],
      fukuanfangshiOptions: [],
      jkfujianlist: [],
      // 出差地区字典
      // 交通工具字典
      vehicleOptions: [],
      // 出差类型字典
      chuchaitypeOptions: [],
      formUserName: '',
      formDeptName: '',
      Editorneirong: '',
      form: {
        variables: {
          time: '',
          argument: '',
          chuchaitype: '',
          numbers: '',
          projectname: '',
          jianshefang: '',
          area: '',
          vehicle: '',
          starttime: '',
          finishtime: '',
          days: '',
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
      uploadHeaders: {
        Authorization: ''
      },
      uploadUrl: process.env.VUE_APP_BASE_API + '/common/batchUpload',
      rules: {
        argument: [
          {
            required: true,
            message: '请输入出差事由',
            trigger: 'blur'
          }
        ],
        chuchaitype: [
          { required: true, message: '请选择出差类型', trigger: 'change' }
        ],
        numbers: [
          {
            required: true,
            message: `点击选择立项编号`,
            trigger: 'blur'
          }
        ],
        projectname: [
          {
            required: true,
            message: '请输入项目名称',
            trigger: 'blur'
          }
        ],
        jianshefang: [
          {
            required: true,
            message: '请输入项目名称',
            trigger: 'blur'
          }
        ],
        area: [
          { required: true, message: '请选择出差地区', trigger: 'blur' }
        ],
        vehicle: [
          { required: true, message: '请选择交通工具', trigger: 'change' }
        ],
        starttime: [
          { required: true, message: '选择开始时间', trigger: 'change' }
        ],
        finishtime: [
          { required: true, message: '选择结束时间', trigger: 'change' }
        ],
        days: [
          { required: true, message: '请输入出差天数', trigger: 'change' }
        ],
        beizhu: [
          {
            required: true,
            message: '请输入备注',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  created() {
    // this.getDicts('car_belong_area').then((response) => {
    //   this.areaOptions = response.data
    // })
    this.getDicts('traffic_type').then((response) => {
      this.vehicleOptions = response.data
    })
    this.getDicts('evection_type').then((response) => {
      this.chuchaitypeOptions = response.data
    })
    // 项目地点
    this.getRegionTree().then((res) => {
      this.regionList = res.data
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
    handleRegionChange(value) {
      this.form.variables.area = this.siteShiArr.join(',')
    },
    getTrackProject(row) {
      const keymap = new Map([
        [
          '1',
          () => ({
            numbers: row.numbers,
            projectname: row.projectName,
            jianshefang: row.jianshedanwei
          })
        ],
        [
          '2',
          () => ({
            numbers: row.num,
            projectname: row.projectname,
            jianshefang: row.touzifang
          })
        ],
        [
          '3',
          () => ({
            numbers: row.projectCode,
            projectname: row.projectName,
            jianshefang: row.construction
          })
        ],
        [
          '4',
          () => ({
            numbers: row.trainnumber
          })
        ]
      ])
      const result =
        row &&
        keymap.get(this.form.variables.chuchaitype) &&
        keymap.get(this.form.variables.chuchaitype)()
      this.form.variables = {
        ...this.form.variables,
        ...result
      }
      this.isChoose = ''
    },
    showSelectLoanBox(value) {
      const keymap = new Map([
        ['1', () => 'TrackProjectPopup'],
        ['2', () => 'BidProjectPopup'],
        ['3', () => 'ProductionProjectPopup'],
        ['4', () => 'TrainProjectPopup']
      ])
      this.isChoose = keymap.get(value) && keymap.get(value)()
    },
    clearData() {
      this.form.variables.numbers =
        this.form.variables.projectname =
          this.form.variables.jianshefang =
            null
    },
    async getjkFileDetail(ids) {
      const { code, data, msg } = await getFileDetail(ids)
      if (code == 200) {
        this.jkfujianlist = data.map((item) => {
          return { name: item.fileName, url: item.savePath, id: item.id }
        })
      }
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
            const updateSealmsg = await updateEvection({
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
            const { code, data } = await addEvection(this.form.variables)
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
      handler(val) {
        if (val) {
          let dataArr = JSON.parse(val)
          this.form.variables = {
            ...dataArr[0]
          }
          // 请求附件详情
          this.getFileDetail(this.form.variables.fujian)
          // this.getjkFileDetail(this.form.variables.jkfujian)
          this.form.variables.time = this.form.variables.createTime
          this.formUserName = this.form.variables.createUserName
          this.formDeptName = this.form.variables.createDeptName
          this.Editorneirong = this.form.variables.neirong
          // this.form.variables.ccdepartment =
          //   this.form.variables.ccdepartment.split(';')
          this.siteShiArr = this.form.variables.area.split(',')
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
  },
  computed: {
    isShowNumDiv: function() {
      return ['1', '2', '3', '4'].indexOf(this.form.variables.chuchaitype) != -1
    },
    isShowNameAndJSF() {
      return ['1', '2', '3'].indexOf(this.form.variables.chuchaitype) != -1
    },
    fixNumLabel() {
      return this.chuchaitypeOptions.filter(
        (item) => item.dictValue == this.form.variables.chuchaitype
      )[0].dictLabel
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
