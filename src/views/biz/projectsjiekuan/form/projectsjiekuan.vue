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
      label-width="140px"
      style="overflow: hidden;"
    >
      <el-row :gutter="4" style="padding:0 10px;">
        <el-col :span="24">
          <el-form-item label="借款事由" prop="ly">
            <el-input
              v-model="form.variables.ly"
              :disabled="!isformdisabled"
              :rows="3"
              placeholder="请输入借款事由"
              style="width:100%;"
              type="textarea"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="4" style="padding:0 10px;">

        <el-col :span="12">
          <el-form-item label="借款人" prop="username">
            <el-input v-model="formUserName" disabled placeholder="请输入申请人" style="width:100%;"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="借款部门" prop="dept">
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
          <el-form-item label="借款单位" prop="jiekuandanwei">
            <el-select v-model="form.variables.jiekuandanwei" :disabled="!isformdisabled" placeholder="请选择借款单位"
                       style="width:100%;"
            >
              <el-option
                v-for="dict in formCompanyName"
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
          <el-form-item label="借款类型" prop="leixing">
            <el-select v-model="form.variables.leixing" :disabled="!isformdisabled" placeholder="请选择借款类型"
                       style="width:100%;"
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
        <!--        <el-col :span="12">-->
        <!--          <el-form-item v-if="isShowNumDiv" :label="fixNumLabel+'编号'" prop="projectnum">-->
        <!--            <el-input-->
        <!--              v-model="form.variables.projectnum"-->
        <!--              :placeholder="`点击选择${fixNumLabel}编号`"-->
        <!--              disabled-->
        <!--              style="width:100%;"-->
        <!--            >-->
        <!--              <el-button-->
        <!--                slot="append"-->
        <!--                icon="el-icon-third-guide"-->
        <!--                @click="isformdisabled && showSelectLoanBox(form.variables.leixing)"-->
        <!--              ></el-button>-->
        <!--            </el-input>-->
        <!--          </el-form-item>-->
        <!--        </el-col>-->
      </el-row>

      <el-row :gutter="4" style="padding:0 10px;">
        <el-col :span="12">
          <el-form-item label="正式立项编号" prop="projectnum">
            <el-input
              v-model="form.variables.projectnum"
              disabled
              placeholder="点击选择投标立项编号"
              style="width:100%;"
            >
              <el-button
                slot="append"
                icon="el-icon-third-guide"
                @click="isformdisabled && (isChoose = 'ProjectJiekuanPopup')"
              ></el-button>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="项目名称" prop="projectname">
            <el-input
              v-model="form.variables.projectname"
              disabled
              placeholder="请输入项目名称"
              style="width:100%;"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <!--      <el-row v-if="isShowNumDiv && isShowNameAndJSF" :gutter="4" style="padding:0 10px;">-->
      <!--        <el-col :span="24">-->
      <!--          <el-form-item label="立项名称" prop="toubiaoproject">-->
      <!--            <el-input-->
      <!--              v-model="form.variables.toubiaoproject"-->
      <!--              disabled-->
      <!--              style="width:100%;"-->
      <!--            />-->
      <!--          </el-form-item>-->
      <!--        </el-col>-->
      <!--      </el-row>-->

      <el-row v-if="form.variables.leixing==1" :gutter="4" style="padding:0 10px;">
        <el-col :span="12">
          <el-form-item label="协调费上限(元)" prop="xtfsx">
            <el-input
              v-model="form.variables.xtfsx"
              disabled
              style="width:100%;"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="已推进成本(元)" prop="promotionCost">
            <el-input
              v-model="form.variables.promotionCost"
              disabled
              style="width:100%;"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="form.variables.leixing==1" :gutter="4" style="padding:0 10px;">
        <el-col :span="12">
          <el-form-item label="剩余推进额度(元)" prop="promotionLeft">
            <el-input
              v-model="form.variables.promotionLeft"
              disabled
              style="width:100%;"
            />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="4" style="padding:0 10px;">
        <el-col :span="12">
          <el-form-item label="借款金额(元)" prop="jiekuanjine">
            <el-input-number
              v-model="form.variables.jiekuanjine"
              :disabled="!isformdisabled"
              :min="0"
              :precision="2"
              :step="1"
              placeholder="请输入借款金额(元)"
              style="width:100%;"
              @change="changejiekuanjineToUpperCase"
            ></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="借款金额(大写)" prop="daxiejine">
            <el-input
              v-model="form.variables.daxiejine"
              disabled
              style="width:100%;"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="4" style="padding:0 10px;">
        <el-col :span="12">
          <el-form-item label="付款方式" prop="fukuanfangshi">
            <el-select v-model="form.variables.fukuanfangshi" :disabled="!isformdisabled" placeholder="请选择付款方式"
                       style="width:100%;"
            >
              <el-option
                v-for="dict in formPaymentMethod"
                :key="dict.dictValue"
                :label="dict.dictLabel"
                :value="dict.dictValue"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="项目借款编号" prop="nums">
            <el-input
              v-model="form.variables.nums"
              disabled
              placeholder="后台自动生成"
              style="width:100%;"
            ></el-input>
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
          <el-form-item label="附件">
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
    </el-form>

    <ProjectJiekuanPopup v-if="isChoose === 'ProjectJiekuanPopup'" req-url="/system/productionproject/myAndTrackMan"
                         @choosedProect="getTrackProject"
    />
  </div>
</template>

<script>
  import { getHisCostByProjectNo } from '@/api/biz/productionProjectPromotion'
import { addProjectsjiekuan, updateProjectsjiekuan } from '@/api/biz/projectsjiekuan'
import { definitionStart } from '@/api/flowable/definition'
import { complete } from '@/api/flowable/process'
import { getFileDetail } from '@/api/system/file'
import { formatDate } from '@/utils'
import ProjectJiekuanPopup from '@/components/Popup/ProjectJiekuanPopup'

export default {
  components: {
    ProjectJiekuanPopup
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
      fileLists: [],
      siteShiArr: [],
      isLoanAmountPopup: false,
      fujiandata: {
        fieldName: 'fujian',
        tableName: 'pms_projectsjiekuan'
      },
      // 部门树选项
      deptOptions: '',
      fileList: [],
      bumennameOptions: [],
      fukuanfangshiOptions: [],
      // 借款单位字典
      jkdanweiOptions: [],
      jkfujianlist: [],
      // 出差地区字典
      // 交通工具字典
      vehicleOptions: [],
      // 用途类型字典
      typeOptions: [],
      // 出差类型字典
      chuchaitypeOptions: [],
      formUserName: '',
      formDeptName: '',
      Editorneirong: '',
      form: {
        variables: {
          time: '',
          ly: '',
          leixing: '',
          jkdanwei: '',
          projectnum: '',
          toubiaoproject: '',
          jiekuanjine: '',
          daxiejine: '',
          fukuanfangshi: '',
          jiekuandanwei: '',
          beizhu: '',
          fujian: '',
          projectname:'',
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
      formPaymentMethod: [],
      formCompanyName: [],
      formSealTypeList: [],
      formProcessState: [],
      printingShowList: [],
      uploadHeaders: {
        Authorization: ''
      },
      uploadUrl: process.env.VUE_APP_BASE_API + '/common/batchUpload',
      rules: {
        ly: [
          {
            required: true,
            message: '请输入借款事由',
            trigger: 'blur'
          }
        ],
        jiekuandanwei: [
          { required: true, message: '请选择借款单位', trigger: 'change' }
        ],
        leixing: [
          { required: true, message: '请选择借款类型', trigger: 'change' }
        ],
        projectnum: [
          {
            required: true,
            message: `点击选择投标立项编号`,
            trigger: 'blur'
          }
        ],
        projectname: [
          {
            required: true,
            message: `请输入项目名称`,
            trigger: 'blur'
          }
        ],
        jiekuanjine: [
          {
            required: true,
            message: `请输入借款金额(元)`,
            trigger: 'blur'
          }
        ],
        daxiejine: [
          {
            required: true,
            message: `请输入借款金额(元)`,
            trigger: 'blur'
          }
        ],
        fukuanfangshi: [
          { required: true, message: '请选择付款方式', trigger: 'change' }
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

    // this.getDicts('evection_type').then((response) => {
    //   this.chuchaitypeOptions = response.data
    // })
    this.getDicts('project_loan_type').then(response => {
      this.typeOptions = response.data
    })
    this.getDicts('form_payment_method').then(response => {
      this.formPaymentMethod = response.data
    })
    this.getDicts('form_company_name').then(response => {
      this.formCompanyName = response.data
    })
    // 项目地点
    // this.getRegionTree().then((res) => {
    //   this.regionList = res.data
    // })
    // const id = localStorage.getItem('id')
    const id = this.local_val.id
    if (id) {
      this.form.id = id
    }
    // this.form.formId = localStorage.getItem('formId')
    this.form.formId = this.local_val.formId
  },
  methods: {
    fillCostByProjectNo(projectNo,total){
      getHisCostByProjectNo(projectNo).then((res) => {
        let hisCost = res.data.hisCost
        let reimbursement = res.data.reimbursement
        this.$set(this.form.variables, 'promotionCost', (parseFloat(reimbursement) + parseFloat(hisCost)).toFixed(2))
        this.$set(this.form.variables, 'promotionLeft', parseFloat(total - reimbursement - hisCost).toFixed(2))
      })
    },
    clearNum() {
      this.form.variables.projectnum = null
      this.form.variables.toubiaoproject = null
    },
    onBeforeClose() {
      this.isChoose = ''
    },
    changejiekuanjineToUpperCase(data) {
      this.form.variables.daxiejine = this.amountConvertToUpperCase(data)
    },
    getTrackProject(row) {
      if (row) {
        this.form.variables.projectnum = row.projectCode
        this.form.variables.projectname = row.projectName
        this.form.variables.xtfsx = row.guanlifei
        this.fillCostByProjectNo(this.form.variables.projectnum,row.guanlifei)
      }
      this.isChoose = ''
    },
    showSelectLoanBox(value) {
      const keymap = new Map([
        ['1', () => 'TrackProjectPopup'],
        ['2', () => 'BidProjectPopup'],
        ['3', () => 'BidProjectPopup'],
        ['4', () => 'BidProjectPopup']
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
      this.$refs.form.validate(async(valid) => {
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
            const updateSealmsg = await updateProjectsjiekuan({
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
            let leixing = this.form.variables.leixing
            let promotionLeft = this.form.variables.promotionLeft
            let jiekuanjine = this.form.variables.jiekuanjine
            if(leixing == '1' && parseFloat(jiekuanjine) > parseFloat(promotionLeft)){
              this.msgError('借款金额已超出剩余推进额度')
            }else{
              const { code, data } = await addProjectsjiekuan(this.form.variables)
              if (code == 200) {
                this.form.id = data
                const { code, msg } = await definitionStart(procDefId, this.form)
                if (code == 200) {
                  this.msgSuccess(msg)
                  this.goBack()
                }
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
          // this.siteShiArr = this.form.variables.area.split(',')
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
  },
  computed: {
    isShowNumDiv: function() {
      return ['1', '2', '3', '4'].indexOf(this.form.variables.leixing) !== -1
    },
    isShowNameAndJSF() {
      return ['1', '2', '3', '4'].indexOf(this.form.variables.leixing) !== -1
    },
    fixNumLabel() {
      return this.typeOptions.filter(
        (item) => item.dictValue === this.form.variables.leixing
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
