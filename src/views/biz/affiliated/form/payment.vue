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
      label-width="150px"
      style="overflow: hidden;"
    >
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
          <el-form-item label="施工付款编号" prop="dept">
            <el-input v-model="form.variables.shifongfukuanNum" disabled placeholder="施工付款编号后台自动计算"
                      style="width:100%;"
            />
          </el-form-item>
        </el-col>
      </el-row>


      <el-row :gutter="4" style="padding:0 10px;">
        <el-col :span="12">
          <el-form-item label="挂靠立项编号" prop="productionProjectNul">
            <el-input
              v-model="form.variables.productionProjectNul"
              disabled
              placeholder="点击选择挂靠立项编号"
              style="width:100%;"
            >
              <el-button
                slot="append"
                icon="el-icon-third-guide"
                @click="isformdisabled && (isChoose = 'ProductionProjectPopup')"
              ></el-button>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="项目名称" prop="entryName">
            <el-input
              v-model="form.variables.entryName"
              disabled
              placeholder="请输入项目名称"
              style="width:100%;"
            />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="4" style="padding:0 10px;">

        <el-col :span="12">
          <el-form-item label="项目类型" prop="projectType">
            <el-input
              :value="sfdxFormat(form.variables.projectType)"
              disabled
              style="width:100%;"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="建设单位" prop="constructionUnit">
            <el-select v-model="form.variables.constructionUnit" disabled placeholder="请选择建设单位"
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
          <el-form-item label="合同金额(元)" prop="contractAmount">
            <el-input-number
              v-model="form.variables.contractAmount"
              :min="0"
              :precision="2"
              :step="1"
              disabled
              placeholder="请输入合同金额"
              style="width:100%;"
            ></el-input-number>
          </el-form-item>

        </el-col>
        <el-col :span="12">
          <!--<el-form-item label="施工成本预算(元)" prop="constructionCostBudget">-->
            <!--<el-input-number-->
              <!--v-model="form.variables.constructionCostBudget"-->
              <!--disabled-->
              <!--placeholder="请输入施工成本预算"-->
              <!--style="width:100%;"-->
            <!--&gt;</el-input-number>-->
          <!--</el-form-item>-->
        </el-col>
      </el-row>

      <el-row :gutter="4" style="padding:0 10px;">
        <el-col :span="12">
          <el-form-item label="付款对象" prop="paymentObject">
            <el-input
              v-model="form.variables.paymentObject"
              :disabled="!isformdisabled"
              placeholder="请输入付款对象"
              style="width:100%;"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="付款金额(元)" prop="paymentAmount">
            <el-input-number
              v-model="form.variables.paymentAmount"
              :disabled="!isformdisabled"
              placeholder="请输入付款金额"
              style="width:100%;"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">

        </el-col>
      </el-row>
      <el-row :gutter="4" style="padding:0 10px;">
        <el-col :span="12">
          <el-form-item label="已累计付款金额(元)" prop="accumulatedPaymentAmount">
            <el-input-number
              v-model="form.variables.accumulatedPaymentAmount"
              disabled
              placeholder="请输入已累计付款金额"
              style="width:100%;"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="付款时间" prop="paymentTime">
            <el-date-picker
              v-model="form.variables.paymentTime"
              :disabled="!isformdisabled"
              placeholder="选择付款时间"
              style="width:100%;"
              type="date"
              value-format="yyyy-MM-dd"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <AffiliatedProject v-if="isChoose === 'ProductionProjectPopup'" req-url="/system/affiliatedproject/mylist"
                            @choosedProectGuakao="choosedProectGuakao"
    />
  </div>
</template>

<script>
import { addPayment, updatePayment } from '@/api/biz/affiliatedPay.js'
import { definitionStart } from '@/api/flowable/definition'
import { complete } from '@/api/flowable/process'
import { getFileDetail } from '@/api/system/file'
import { formatDate } from '@/utils'
import AffiliatedProject from '@/components/Popup/AffiliatedProjectPopup.vue'

export default {
  components: {
    AffiliatedProject
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
        tableName: 'pms_construction_payment'
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
      prostateOptions: [],
      // 出差类型字典
      chuchaitypeOptions: [],
      formUserName: '',
      formDeptName: '',
      Editorneirong: '',
      form: {
        variables: {
          time: '',
          productionProjectNul: '',
          entryName: '',
          projectType: '',
          constructionUnit: '',
          contractAmount: '',
          constructionCostBudget: '',
          paymentObject: '',
          paymentAmount: '',
          accumulatedPaymentAmount: '',
          paymentTime: ''
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
        productionProjectNul: [
          {
            required: true,
            message: '点击选择生产立项编号',
            trigger: 'blur'
          }
        ],
        entryName: [
          { required: true, message: '请输入项目名称', trigger: 'blur' }
        ],
        projectType: [
          { required: true, message: '请输入项目类型', trigger: 'blur' }
        ],
        constructionUnit: [
          {
            required: true,
            message: `请选择建设单位`,
            trigger: 'change'
          }
        ],
        contractAmount: [
          {
            required: true,
            message: `请输入合同金额`,
            trigger: 'change'
          }
        ],
        constructionCostBudget: [
          {
            required: true,
            message: `请输入施工成本预算`,
            trigger: 'change'
          }
        ],
        paymentObject: [
          {
            required: true,
            message: `请输入付款对象`,
            trigger: 'blur'
          }
        ],
        paymentAmount: [
          { required: true, message: '请输入付款金额', trigger: 'change' }
          // {
          //   validator: this.maxpaymentAmount,
          //   message: '累计付款已超出施工成本预算',
          //   trigger: 'change'
          // }
        ],
        accumulatedPaymentAmount: [
          { required: true, message: '请输入已累计付款金额', trigger: 'change' }
        ],
        paymentTime: [
          {
            required: true,
            message: '选择付款时间',
            trigger: 'change'
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
    //project_type
    this.getDicts('project_type').then(response => {
      this.typeOptions = response.data
    })

    // this.getDicts('form_payment_method').then(response => {
    //   this.formPaymentMethod = response.data
    // })
    // this.getDicts('form_company_name').then(response => {
    //   this.formCompanyName = response.data
    // })
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
    maxpaymentAmount(rule, value, callback) {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.form.variables.accumulatedPaymentAmount + this.form.variables.paymentAmount > this.form.variables.constructionCostBudget
        ) {
          callback(new Error('累计付款已超出施工成本预算'))
        }
        callback()
      }
    },
    sfdxFormat(row) {
      return this.selectDictLabel(this.typeOptions, row)
    }
    ,
    clearNum() {
      this.form.variables.projectnum = null
      this.form.variables.toubiaoproject = null
    }
    ,
    onBeforeClose() {
      this.isChoose = ''
    }
    ,
    changejiekuanjineToUpperCase(data) {
      this.form.variables.daxiejine = this.amountConvertToUpperCase(data)
    }
    ,
    getTrackProject(row) {
      console.log(row)
      //projectCode  projectName  projectType1  construction  projectAmount  zongchengben accumulatedPayment
      if (row) {
        this.form.variables.productionProjectNul = row.projectCode
        this.form.variables.entryName = row.projectName
        this.form.variables.projectType = row.projectType1
        this.form.variables.constructionUnit = row.construction
        this.form.variables.contractAmount = row.projectAmount
        this.form.variables.constructionCostBudget = row.shigongfei
        this.form.variables.accumulatedPaymentAmount = row.accumulatedPayment
      }
      this.isChoose = ''
    },
    choosedProectGuakao(row) {
      console.log(row)
      if (row) {
        this.form.variables.productionProjectNul = row.num
        this.form.variables.entryName = row.projectname
        this.form.variables.projectType = row.leixing
        this.form.variables.constructionUnit = row.jianshedanwei
        this.form.variables.contractAmount = row.hetongjine
        // this.form.variables.constructionCostBudget = row.shigongfei
        this.form.variables.accumulatedPaymentAmount = row.accumulatedPayment
      }
      this.isChoose = false
    }
    ,
    showSelectLoanBox(value) {
      const keymap = new Map([
        ['1', () => 'TrackProjectPopup'],
        ['2', () => 'BidProjectPopup'],
        ['3', () => 'BidProjectPopup'],
        ['4', () => 'BidProjectPopup']
      ])
      this.isChoose = keymap.get(value) && keymap.get(value)()
    }
    ,
    clearData() {
      this.form.variables.numbers =
        this.form.variables.projectname =
          this.form.variables.jianshefang =
            null
    }
    ,
    async getjkFileDetail(ids) {
      const { code, data, msg } = await getFileDetail(ids)
      if (code == 200) {
        this.jkfujianlist = data.map((item) => {
          return { name: item.fileName, url: item.savePath, id: item.id }
        })
      }
    }
    ,
    downloadFile({ url }) {
      window.open(url)
    }
    ,
    handleAvatarSuccess({ data }, file, fileList) {
      this.form.variables.fujian = this.form.variables.fujian == null ? '' : this.form.variables.fujian
 this.form.variables.fujian += `;${data[0].fileId}`
    }
    ,
    printingChange(arr) {
      console.log(arr, arr.length)
      this.form.variables.printing = arr.join(';')
      if (arr.length > 0) {
        this.$refs.printingCheck.clearValidate()
      } else {
        this.$refs.form.validateField('printing')
      }
    }
    ,
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
            const updateSealmsg = await updatePayment({
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
            const { code, data } = await addPayment(this.form.variables)
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
          this.form.variables.paymentAmount = 0
          console.log('error submit!!')
          return false
        }
      })
    }
    ,
    goBack() {
      // 关闭当前标签页并返回上个页面
      this.$store.dispatch('tagsView/delView', this.$route)
      this.$router.go(-1)
      localStorage.setItem("needLoadList","yes")
    }
    ,
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
    }
    ,
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
          // this.getFileDetail(this.form.variables.fujian)
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
      }
      ,
      immediate: true
    }
  }
  ,
  computed: {
    isShowNumDiv: function() {
      return ['1', '2', '3', '4'].indexOf(this.form.variables.leixing) !== -1
    }
    ,
    isShowNameAndJSF() {
      return ['1', '2', '3', '4'].indexOf(this.form.variables.leixing) !== -1
    }
    ,
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
