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
        <el-form-item label="申请事由" prop="reson">
          <el-input
            v-model="form.variables.reson"
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
        <el-form-item label="申请时间" prop="times">
          <el-date-picker
            v-model="form.variables.times"
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
        <el-form-item label="资料类型" prop="means">
          <el-select
            v-model="form.variables.means"
            :disabled="!isformdisabled"
            clearable
            placeholder="请选择资料类型"
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
        <el-form-item label="印章类型" prop="printing">
          <el-checkbox-group
            v-model="printingShowList"
            :disabled="!isformdisabled"
            style="width:100%;"
            @change="printingChange"
            ref="printingCheck"
          >
            <el-checkbox
              v-for="item in formSealTypeList"
              :key="item.dictValue"
              :label="item.dictValue"
            >{{ item.dictLabel }}
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="4" style="padding:0 10px;">
      <el-col :span="12">
        <el-form-item label="营销立项编号" prop="yingxiaono" v-if="form.variables.means == 1">
          <el-input
            v-model="form.variables.yingxiaono"
            disabled
            placeholder="请输入营销立项编号"
            style="width:100%;"
          >
            <el-button
              v-on:click.native="isformdisabled && chooseTrackProject()"
              slot="append"
              icon="el-icon-third-guide"
            ></el-button>
          </el-input>
        </el-form-item>
        <el-form-item label="投标立项编号" prop="toubiaono" v-if="form.variables.means == 2">
          <el-input
            v-model="form.variables.toubiaono"
            disabled
            placeholder="请输入投标立项编号"
            style="width:100%;"
          >
            <el-button
              v-on:click.native="isformdisabled && chooseBidProject()"
              slot="append"
              icon="el-icon-third-guide"
            ></el-button>
          </el-input>
        </el-form-item>
        <el-form-item label="生产立项编号" prop="shengchanno" v-if="form.variables.means == 3">
          <el-input
            v-model="form.variables.shengchanno"
            disabled
            placeholder="请输入生产立项编号"
            style="width:100%;"
          >
            <el-button
              v-on:click.native="isformdisabled && chooseProductionProject()"
              slot="append"
              icon="el-icon-third-guide"
            ></el-button>
          </el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item v-if="form.variables.means == 3 || form.variables.means == 2 || form.variables.means == 1"
                      label="项目名称"
                      prop="projectname"
        >
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
        <el-form-item label="资料接受单位" prop="meanscompany">
          <el-input
            v-model="form.variables.meanscompany"
            :disabled="!isformdisabled"
            placeholder="请输入资料接受单位"
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
        <el-form-item label="附件" prop="fujian" >
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
            :data="fujiandata"
            style="width:100%;"
            multiple
          >
            <el-button size="small" type="primary" v-if="isformdisabled">点击上传</el-button>
          </el-upload>
        </el-form-item>
      </el-col>
    </el-row>

    <!--营销立项-->
    <TrackProjectPopup
      v-if="isChooseTrackProject"
      @transferTrackProjectData="getTrackProject"
      req-url="/system/trackproject/list"
    />
    <!--投标立项-->
    <BidProjectPopup
      v-if="isChooseBidProject"
      @choosedProect="getBidProject"
      req-url="/system/bidproject/list"
    />
    <!--生产立项-->
    <ProductionProjectPopup
      v-if="ischooseProductionProjectPopup"
      @choosedProect="getProductionProject"
      req-url="/system/productionproject/my"
    />

  </el-form>
</template>

<script>
import { addSeal, updateSeal } from '@/api/biz/seal'
import { definitionStart } from '@/api/flowable/definition'
import { complete } from '@/api/flowable/process'
import { getFileDetail } from '@/api/system/file'
import { formatDate } from '@/utils'
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
      fujiandata: {
        fieldName: 'fujian',
        tableName: 'pms_printing_management'
      },
      fileList: [],
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
          projectname: ''
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
        reson: [{ required: true, message: '请输入申请事由', trigger: 'blur' }],
        means: [
          { required: true, message: '请选择资料类型', trigger: 'change' }
        ],
        company: [
          { required: true, message: '请选择公司名称', trigger: 'change' }
        ],
        printing: [
          {
            required: true,
            message: '请至少选择一个印章类型',
            trigger: 'blur'
          }
        ],
        meanscompany: [
          { required: true, message: '请输入资料接受单位', trigger: 'blur' }
        ],
        beizhu: [{ required: true, message: '请输入备注', trigger: 'blur' }],
        yingxiaono: [{ required: true, message: '请输入营销立项编号', trigger: 'change' }],
        toubiaono: [{ required: true, message: '请输入投标立项编号', trigger: 'change' }],
        shengchanno: [{ required: true, message: '请输入生产立项编号', trigger: 'change' }],
        projectname: [{ required: true, message: '请输入项目名称', trigger: 'blur' }]
      }
    }
  },
  created() {
    // const proData = localStorage.getItem('proData')
    // 资料类型、
    this.getDicts('form_data_type').then((res) => {
      this.formDataTypeList = res.data
    })
    // 公司名称
    this.getDicts('form_company_name').then((res) => {
      this.formCompanyNameList = res.data
    })
    // 印章类型
    this.getDicts('form_seal_type').then((res) => {
      this.formSealTypeList = res.data
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
    //生产立项
    chooseProductionProject() {
      this.ischooseProductionProjectPopup = true
    },
    getProductionProject(row) {
      if (row) {
        this.form.variables.shengchanno = row.projectCode
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
        this.form.variables.toubiaono = row.num
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
        this.form.variables.yingxiaono = row.numbers
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
            const updateSealmsg = await updateSeal({
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
            const { code, data } = await addSeal({
              ...this.form.variables
            })
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
          this.printingShowList = this.form.variables.printing.split(';')
          // 请求附件详情
          this.getFileDetail(this.form.variables.fujian)
          this.formUserName = this.form.variables.createUserName
          this.formDeptName = this.form.variables.createDeptName
        } else {
          this.form.variables.times = formatDate(new Date().getTime())
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
<style scoped lang="scss">
.but-form {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
