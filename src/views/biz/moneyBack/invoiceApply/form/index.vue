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
        <el-form-item label="开票申请" class="title_class">
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
        <el-form-item label="公司名称" prop="gongsiname">
          <el-select
            v-model="form.variables.gongsiname"
            :disabled="!isformdisabled"
            clearable
            placeholder="请选择公司名称"
            style="width:100%;"
          >
            <el-option
              v-for="item in form_company_name"
              :key="item.dictValue"
              :label="item.dictLabel"
              :value="item.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>

    <!-- 项目 -->
    <el-row :gutter="4" style="padding:0 10px;">
      <el-col :span="12">
        <el-form-item label="项目类型" prop="xmtype">
          <el-select
            v-model="form.variables.xmtype"
            :disabled="!isformdisabled"
            clearable
            placeholder="请选择项目类型"
            @change="xmtypeChange"
            style="width:100%;"
          >
            <el-option
              v-for="item in contract_project_type"
              :key="item.dictValue"
              :label="item.dictLabel"
              :value="item.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="项目名称" prop="hetongname">
          <el-input
            v-model="form.variables.hetongname"
            disabled
            placeholder="请输入项目名称"
            style="width:100%;">
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
        <el-form-item label="项目编号" prop="num">
          <el-input
            v-model="form.variables.num"
            disabled
            placeholder="请输入项目编号"
            style="width:100%;"
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="项目金额(元)" prop="projectname">
          <el-input
            v-model="form.variables.projectname"
            disabled
            placeholder="请输入项目金额(元)"
            style="width:100%;"
          />
        </el-form-item>
      </el-col>
    </el-row>
    <!-- 客户 -->
    <el-row :gutter="4" style="padding:0 10px;">
      <el-col :span="12">
        <el-form-item label="客户单位" prop="kehuname">
          <el-input
            v-model="form.variables.kehuname"
            disabled
            placeholder="请输入客户单位"
            style="width:100%;">
            <el-button
              v-on:click.native="isformdisabled && chooseCustumerData()"
              slot="append"
              icon="el-icon-third-guide"
            ></el-button>
          </el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="税务登记号" prop="shuihao">
          <el-input
            v-model="form.variables.shuihao"
            disabled
            placeholder="请输入税务登记号"
            style="width:100%;">
          </el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="4" style="padding:0 10px;">
      <el-col :span="12">
        <el-form-item label="公司地址" prop="site">
          <el-input
            v-model="form.variables.site"
            disabled
            placeholder="请输入公司地址"
            style="width:100%;">
          </el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="银行卡号" prop="yinhang">
          <el-input
            v-model="form.variables.yinhang"
            disabled
            placeholder="请输入银行卡号"
            style="width:100%;"
          >
          </el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="4" style="padding:0 10px;">
      <el-col :span="12">
        <el-form-item label="开户银行" prop="kahao">
          <el-input
            v-model="form.variables.kahao"
            disabled
            placeholder="请输入开户银行"
            style="width:100%;"
          >
          </el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="电话" prop="tel">
          <el-input
            v-model="form.variables.tel"
            disabled
            placeholder="请输入电话"
            style="width:100%;">
          </el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <!-- 输入表单 -->
    <el-row :gutter="4" style="padding:0 10px;">
      <el-col :span="12">
        <el-form-item label="开票金额(元)" prop="hejijine">
          <el-input-number v-model="form.variables.hejijine" :disabled="!isformdisabled"  placeholder="请输入开票金额(元)" style="width:100%;"
            @change="refreshDaxiejine" :precision=2 :min=0 />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="大写金额" prop="daxiejine">
          <el-input v-model="form.variables.daxiejine" disabled    placeholder="请输入大写金额" style="width:100%;"/>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="4" style="padding:0 10px;">
      <el-col :span="12">
        <el-form-item label="开票种类" prop="zhonglei">
          <el-select
            v-model="form.variables.zhonglei"
            :disabled="!isformdisabled"
            clearable
            placeholder="请选择开票种类"
            style="width:100%;"
          >
            <el-option
              v-for="item in invoicing_type"
              :key="item.dictValue"
              :label="item.dictLabel"
              :value="item.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="开票税率(%)" prop="kaipiaoname">
          <el-select
            v-model="form.variables.kaipiaoname"
            :disabled="!isformdisabled"
            clearable
            placeholder="请选择开票税率(%)"
            style="width:100%;"
          >
            <el-option
              v-for="item in tax_point"
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
        <el-form-item label="开票时间" prop="time">
          <el-date-picker
            v-model="form.variables.time"
            type="date"
            placeholder="选择开票时间"
            align="right"
            value-format="yyyy-MM-dd"
            :disabled="!isformdisabled"
            style="width:100%;"
            :picker-options="pickerOptions"
          ></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="12">
      </el-col>
    </el-row>

    <el-row :gutter="4" style="padding:0 10px;">
      <el-col :span="24">
        <el-form-item label="备注" prop="neirong">
          <el-input
            v-model="form.variables.neirong"
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
        <el-form-item label="附件" prop="fujian">
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

    <el-row :gutter="4" style="padding:0 10px;" v-if="isChoose">
      <el-col :span="24">
        <ProjectDialog @choosedProect="choosedProect" req-url="/system/productionproject/my" />
      </el-col>
    </el-row>

    <el-row :gutter="4" style="padding:0 10px;" v-if="isChooseGuakao">
      <el-col :span="24">
        <AffiliatedProject req-url="/system/affiliatedproject/mylist" @choosedProectGuakao="choosedProectGuakao"/>
      </el-col>
    </el-row>

    <el-row :gutter="4" style="padding:0 10px;" v-if="isChooseCustumer">
      <el-col :span="24">
        <CustumerPopup req-url="/system/customer/mylist" @choosedCustumer="choosedCustumer"/>
      </el-col>
    </el-row>


  </el-form>
</template>

<script>
import { addInvoiceApply, updateInvoiceApply } from '@/api/biz/moneyBack/invoiceApply'
import { definitionStart } from '@/api/flowable/definition'
import { complete } from '@/api/flowable/process'
import { getFileDetail } from '@/api/system/file'
import { treeselect } from '@/api/system/dept'
import Treeselect from '@riophae/vue-treeselect'
import ProjectDialog from '@/components/Popup/ProductionProjectPopup.vue'
import AffiliatedProject from '@/components/Popup/AffiliatedProjectPopup.vue'
import CustumerPopup from '@/components/Popup/CustumerPopup.vue'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'

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
  components: { Treeselect, ProjectDialog ,AffiliatedProject,CustumerPopup},
  data() {
    return {
      contract_project_type:[],//项目类型
      tax_point:[],//开票税率
      form_company_name:[],//公司名称
      isChoose: false,//正式项目选择框，默认false隐藏
      isChooseGuakao:false,//挂靠项目选择框，默认false隐藏
      isChooseCustumer:false,//客户选择框，默认false隐藏
      //工作经验
      experience: [],
      invoicing_type:[],
      //性别
      sex_m_w_n: [],
      //学历
      education: [],
      // 子表选中数据
      checkedPmsCailiaoxiangqing: [],
      // 耗材采购子表表格数据
      tzOaOfficeNewsList: [],
      admini_material_usetype: [],
      deptOptions: undefined,
      fujiandata: {
        fieldName: 'fujian',
        tableName: 'pms_kaipiaoshenqing'
      },
      fileList: [],
      car_use_type: [],
      car_belong_area: [],
      formUserName: '',
      formDeptName: '',
      form: {
        variables: {
          id: '',
          title: '',
          created: '',
          modified: '',
          creator: '',
          modificator: '',
          recycle: '',
          name: '',
          dept: '',
          projectname: '',
          time: '',
          fuzeren: '',
          num: '',
          gongyingshang: '',
          cailiao: '',
          jine: '',
          fujian: '',
          caigounum: '',
          agree: '',
          leixing: '',
          xuqiudanwei: '',
          xuqiubumen: undefined,
          shuoming: '',
          projectleixing: '',
          cast: '',
          shenqingtime: '',
          cailiaoleixing: '',
          jianyizonge: '',
          shijizonge: '',
          jieshengbi: '',
          beizhu: '',
          gysname: '',
          gsname: '',
          yusuan: '',
          qinggoubianhao: '',
          qinggouren: '',
          qinggoubumen: '',
          qinggoudanwei: '',
          xiangmujingli: '',
          qinggougys: '',
          gysmingxi: '',
          qinggoubeizhu: '',
          qinggoufujian: '',
          jsonData: '',
          parentid: '',
          tzOaOfficeNewsList: [
            {
              name: '',
              xinghao: '',
              leixing: '',
              code: '',
              num: '',
              danwei: ''
            }
          ]
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
        xmtype: [{ required: true, message: '请选择项目类型', trigger: 'blur' }],
        hetongname: [{ required: true, message: '请选择项目名称', trigger: 'blur' }],
        kehuname: [{ required: true, message: '请选择客户单位', trigger: 'blur' }],
        hejijine: [{ type:'number', required: true, message: '请输入开票金额', trigger: 'blur' }],
        zhonglei: [{ required: true, message: '请选择开票种类', trigger: 'blur' }],
        kaipiaoname: [{ required: true, message: '请选择开票税率', trigger: 'blur' }],
        time: [{ required: true, message: '请选择开票时间', trigger: 'blur' }],
        gongsiname: [{ required: true, message: '请选择公司名称', trigger: 'blur' }],
      }
    }
  },
  created() {
    //项目类型
    this.getDicts('contract_project_type').then((response) => {
      this.contract_project_type = response.data
    })
    //开票税率
    this.getDicts('tax_point').then((response) => {
      this.tax_point = response.data
    })
    //开票种类
    this.getDicts('invoicing_type').then((response) => {
      this.invoicing_type = response.data
    })
    //公司名称
    this.getDicts('form_company_name').then((response) => {
      this.form_company_name = response.data
    })


    this.getTreeselect()

    // const id = localStorage.getItem('id')
    const id = this.local_val.id
    if (id) {
      this.form.id = id
    }

    // this.form.formId = localStorage.getItem('formId')
    this.form.formId = this.local_val.formId
    console.log(this)
  },
  methods: {
    refreshDaxiejine(number,oldVal){
      let ret = "";
      if (number != "" && number != null && number != "0") {
        let unit = "仟佰拾亿仟佰拾万仟佰拾元角分",
          str = "";
        number += "00";
        let point = number.indexOf(".");
        if (point >= 0) {
          number = number.substring(0, point) + number.substr(point + 1, 2);
        }
        unit = unit.substr(unit.length - number.length);
        for (var i = 0; i < number.length; i++) {
          str +=
            "零壹贰叁肆伍陆柒捌玖".charAt(number.charAt(i)) + unit.charAt(i);
        }
        ret =
          str
            .replace(/零(仟|佰|拾|角)/g, "零")
            .replace(/(零)+/g, "零")
            .replace(/零(万|亿|元)/g, "$1")
            .replace(/(亿)万|(拾)/g, "$1$2")
            .replace(/^元零?|零分/g, "")
            .replace(/元$/g, "元") + "整";
      }
      this.form.variables.daxiejine = ret;
    },
    //选择项目类型
    xmtypeChange() {
      this.form.variables.projectname = null
      this.form.variables.projectnum = null
    },
    //接收子组件传过来的被选择的项目
    choosedProect(data) {
      console.log(data)
      if (data) {
        this.form.variables.hetongname = data.projectName
        this.form.variables.num = data.projectCode
        this.form.variables.projectname = data.projectAmount
      }
      this.isChoose = false
    },
    choosedProectGuakao(data) {
      if (data) {
        this.form.variables.hetongname = data.projectname
        this.form.variables.num = data.num
        this.form.variables.projectname = data.hetongjine
      }
      this.isChooseGuakao = false
    },
    choosedCustumer(data){
      if (data) {
        this.form.variables.kehuname = data.cname
        this.form.variables.shuihao = data.openingBank
        this.form.variables.site = data.address
        this.form.variables.kahao = data.identification
        this.form.variables.yinhang = data.taxid
        this.form.variables.tel = data.phone
        this.$refs.form.clearValidate('kehuname')
      }
      this.isChooseCustumer = false
    },
    /** 单选框选中数据 */
    handlePmsCailiaoxiangqingSelectionChange(selection) {
      /*if (selection.length > 1) {
        this.$refs.pmsCailiaoxiangqing.clearSelection();
        this.$refs.pmsCailiaoxiangqing.toggleRowSelection(selection.pop());
      } else {
        this.checkedPmsCailiaoxiangqing = selection;
      }*/
      this.checkedPmsCailiaoxiangqing = selection.sort(
        (a, b) => b.index - a.index
      )
    },
    /** 耗材采购子表序号 */
    rowPmsCailiaoxiangqingIndex({ row, rowIndex }) {
      row.index = rowIndex + 1
    },
    /** 耗材采购子表添加按钮操作 */
    handleAddPmsCailiaoxiangqing() {
      let obj = {}
      obj.name = ''
      obj.xinghao = ''
      obj.leixing = ''
      obj.code = ''
      obj.num = ''
      obj.danwei = ''
      this.form.variables.tzOaOfficeNewsList.push(obj)
    },
    /** 耗材采购子表删除按钮操作 */
    handleDeletePmsCailiaoxiangqing() {
      if (this.checkedPmsCailiaoxiangqing.length == 0) {
        this.$alert('请先选择要删除的耗材采购子表数据', '提示', { confirmButtonText: '确定' })
      } else {
        debugger
        this.checkedPmsCailiaoxiangqing.forEach((item) => {
          this.form.variables.tzOaOfficeNewsList.splice(item.index - 1, 1)
        })
        if (this.form.variables.tzOaOfficeNewsList.length == 0) {
          this.handleAddPmsCailiaoxiangqing()
        }
      }
    },
    /** 查询部门下拉树结构 */
    getTreeselect() {
      treeselect().then(response => {
        this.deptOptions = response.data
      })
    },
    //选择客户
    chooseCustumerData(){
      this.isChooseCustumer = !this.isChooseCustumer;
    },
    //选择项目
    chooseProjectData() {
      if (this.form.variables.xmtype == 1) {
        this.isChoose = true
      } else if (this.form.variables.xmtype == 2) {
        this.isChooseGuakao = true
      }else{
        this.$message({
          message: '请先选择一个项目类型',
          type: 'warning'
        });
      }
    },
    downloadFile({ url }) {
      window.open(url)
    },
    handleAvatarSuccess({ data }, file, fileList) {
      this.form.variables.fujian =
        this.form.variables.fujian == null ? '' : this.form.variables.fujian
 this.form.variables.fujian += `;${data[0].fileId}`
      console.log(this.form.variables.fujian)
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
            const updateSealmsg = await updateInvoiceApply({
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
            const { code, data } = await addInvoiceApply({
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
          if (item.tableName == 'pms_kaipiaoshenqing') {
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
      let arr = this.form.variables.fujian.split(';')
      arr.splice(arr.indexOf(file.id), 1)
      this.form.variables.fujian = arr.join(';')
      console.log(this.form.variables.fujian)
    }
  },
  watch: {
    proData: {
      async handler(val) {
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
          const currentUser = this.$store.getters.user
          this.formUserName = currentUser.nickName
          this.form.variables.createUserId = currentUser.userId
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
