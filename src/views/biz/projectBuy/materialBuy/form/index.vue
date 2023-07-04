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
        <el-form-item label="基本信息" class="title_class">
          <el-divider></el-divider>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="4" style="padding:0 10px;">
      <el-col :span="12">
        <el-form-item label="申请部门" prop="dept">
          <el-input v-model="formDeptName" disabled placeholder="请输入申请部门" style="width:100%;" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="申请时间" prop="createTime">
          <el-date-picker
            v-model="form.variables.createTime"
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
          <el-input v-model="formUserName" disabled placeholder="请输入申请人" style="width:100%;" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="请购编号" prop="qinggoubianhao">
          <el-input v-model="form.variables.qinggoubianhao" disabled placeholder="系统自动生成请购编号" style="width:100%;" />
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="4" style="padding:0 10px;">
      <el-col :span="12">
        <el-form-item label="项目名称" prop="xmmc">
          <el-input v-model="form.variables.xmmc" placeholder="请输入项目名称" style="width:100%;" disabled   >
            <el-button
              v-on:click.native="isformdisabled && chooseProjectData()"
              slot="append"
              icon="el-icon-third-guide"
            ></el-button>
          </el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="项目编号" prop="num">
          <el-input v-model="form.variables.num" placeholder="请输入项目编号" style="width:100%;" disabled   />
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="4" style="padding:0 10px;">
      <el-col :span="12">
        <el-form-item label="供应商名称" prop="gongyingshang">
          <el-input v-model="form.variables.gongyingshang" placeholder="请输入供应商名称" style="width:100%;" :disabled="!isformdisabled" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="请购单位" prop="qinggoudanwei">
          <el-select
            v-model="form.variables.qinggoudanwei"
            :disabled="!isformdisabled"
            clearable
            placeholder="请选择请购单位"
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
    <el-row :gutter="4" style="padding:0 10px;">
      <el-col :span="12">
        <el-form-item label="到货日期" prop="dhtime">
          <el-date-picker
            v-model="form.variables.dhtime" style="width: 100%;" :disabled="!isformdisabled"
            type="date"
            placeholder="选择到货日期">
          </el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="收货地址" prop="projectdirector">
          <el-input v-model="form.variables.projectdirector" placeholder="请输入收货地址" style="width:100%;" :disabled="!isformdisabled" />
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="4" style="padding:0 10px;">
      <el-col :span="24">
        <el-form-item label="备注" prop="beizhu">
          <el-input
            v-model="form.variables.beizhu"
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
            multiple>
            <el-button size="small" type="primary" v-if="isformdisabled">点击上传</el-button>
          </el-upload>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="4" style="padding:0 10px;" v-if="isChoose">
      <el-col :span="24">
        <ProjectDialog @choosedProect="choosedProect" req-url="/system/productionproject/my"/>
      </el-col>
    </el-row>

    <el-row :gutter="4" style="padding:0 10px;">
      <el-col :span="24">
        <el-form-item label="采购明细" class="title_class">
          <el-divider></el-divider>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="10" class="mb8" v-if="isformdisabled">
      <el-col :span="1.5">
        <el-button type="primary" icon="el-icon-plus" size="mini" @click="handleAddPmsClflDetail">添加</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="danger" icon="el-icon-delete" size="mini" @click="handleDeletePmsClflDetail">删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExportChildTemplate"
        >导出模板</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-upload
          :disabled="!isformdisabled"
          :headers="uploadHeaders"
          :action="importuploadUrl"
          :on-success="handleImportSuccess"
          :before-upload="beforeUpload"
          :show-file-list= false
          size="mini">
          <el-button icon="el-icon-upload2" size="mini" type="success" v-if="isformdisabled">导入</el-button>
        </el-upload>
      </el-col>
    </el-row>

    <el-row :gutter="4" style="padding:0 10px;">
      <el-col :span="24">
        <el-table border :data="form.variables.pmsClflList" :row-class-name="rowPmsClflDetailIndex" @selection-change="handlePmsClflDetailSelectionChange" ref="pmsCailiaoxiangqing">
          <el-table-column type="selection" width="50" align="center" />
          <el-table-column label="材料名称" prop="cailiaoname">
            <template slot-scope="scope">
              <el-input v-model="scope.row.cailiaoname" placeholder="请输入材料名称" :disabled="!isformdisabled"/>
            </template>
          </el-table-column>
          <el-table-column label="规格型号" prop="guige">
            <template slot-scope="scope">
              <el-input v-model="scope.row.guige" placeholder="请输入规格型号" :disabled="!isformdisabled"/>
            </template>
          </el-table-column>
          <el-table-column label="品牌" prop="pinpai">
            <template slot-scope="scope">
              <el-input v-model="scope.row.pinpai" placeholder="请输入品牌" :disabled="!isformdisabled"/>
            </template>
          </el-table-column>
          <el-table-column label="单位" prop="danwei">
            <template slot-scope="scope">
              <el-input v-model="scope.row.danwei" placeholder="请输入单位" :disabled="!isformdisabled"/>
            </template>
          </el-table-column>
          <el-table-column label="数量" prop="num">
            <template slot-scope="scope">
              <el-input-number size="mini" :min=0 :step=1 :step-strictly=true v-model="scope.row.num" placeholder="请输入数量" :disabled="!isformdisabled"/>
            </template>
          </el-table-column>
          <el-table-column label="备注" prop="beizhu">
            <template slot-scope="scope">
              <el-input v-model="scope.row.beizhu" placeholder="请输入备注" :disabled="!isformdisabled"/>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>

    <el-row :gutter="4" style="padding:0 10px; margin-top:10px;">
    </el-row>

  </el-form>
</template>

<script>
import {
  addMaterialBuy,
  exportMaterialBuyChildTemplate,
  getMaterialBuy,
  updateMaterialBuy
} from '@/api/biz/projectBuy/materialBuy'
import { definitionStart } from '@/api/flowable/definition'
import { complete } from '@/api/flowable/process'
import { getFileDetail } from '@/api/system/file'
import { formatDate } from '@/utils'
import { treeselect } from '@/api/system/dept'
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import ProjectDialog from '@/components/Popup/ProductionProjectPopup.vue'

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
      default: true,
    },
  },
  components: { Treeselect ,ProjectDialog},
  data() {
    return {
      isChoose:false,//项目弹框默认隐藏
      // 子表选中数据
      checkedPmsClflDetail: [],
      // 耗材采购子表表格数据
      pmsClflList: [],
      material_type:[],
      deptOptions: undefined,
      isChoose:false,//项目选择框，默认false隐藏
      fujiandata: {
        fieldName: 'fujian',
        tableName: 'pms_materialcost',
      },
      fileList: [],
      car_use_type:[],
      car_belong_area:[],
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
          pmsClflList:[
            {
              cailiaoname: '',
              guige: '',
              pinpai: '',
              danwei: '',
              num: '',
              beizhu: '',
            }
          ],
        },
        // 必传值
        formTableName: '',
        formType: '',
        id: 0,
        formId: 0,
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
        vars: '',
      },
      pickerOptions: {
        shortcuts: [
          {
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date())
            },
          },
          {
            text: '昨天',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24)
              picker.$emit('pick', date)
            },
          },
          {
            text: '一周前',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', date)
            },
          },
        ],
      },
      meansList: [],
      formDataTypeList: [],
      formCompanyNameList: [],
      formSealTypeList: [],
      formProcessState: [],
      printingShowList: [],
      uploadHeaders: {
        Authorization: '',
      },
      importuploadUrl: process.env.VUE_APP_BASE_API + '/projectBuy/materialBuy/importChildTemplate',
      uploadUrl: process.env.VUE_APP_BASE_API + '/common/batchUpload',
      rules: {
        xmmc: [{ required: true, message: '请选择项目名称', trigger: 'blur' }],
        qinggoudanwei: [{ required: true, message: '请选择请购单位', trigger: 'blur' }],
        dhtime: [{ required: true, message: '请选择到货日期', trigger: 'blur' }],
        projectdirector: [{ required: true, message: '请收货地址', trigger: 'blur' }],
      },
      form_company_name:[],
    }
  },
  created() {
    this.getDicts('form_company_name').then((response) => {
      this.form_company_name = response.data
    })
    this.getTreeselect();

    console.log(this.local_val)
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
    //导入清单之前判断文件格式
    beforeUpload(file) {
      console.log(file)
      let testmsg=file.name.substring(file.name.lastIndexOf('.')+1)
      const extension = testmsg === 'xls'
      const extension2 = testmsg === 'xlsx'
      // const isLt2M = file.size / 1024 / 1024 < 10
      if(!extension && !extension2) {
        this.$message({
          message: '上传文件只能是 xls、xlsx格式!',
          type: 'warning'
        });
      }
      // if(!isLt2M) {
      //     this.$message({
      //         message: '上传文件大小不能超过 10MB!',
      //         type: 'warning'
      //     });
      // }
      // return (extension || extension2) && isLt2M
      return extension || extension2
    },
    //导出子表清单模板excel
    handleExportChildTemplate(){
      exportMaterialBuyChildTemplate().then(response => {
        this.download(response.msg);
      });
    },
    //选择项目
    chooseProjectData(){
      this.isChoose = !this.isChoose
    },
    //接收子组件传过来的被选择的待转正人员
    choosedProect(data){
      if(data){
        console.log(data)
        this.form.variables.xmmc = data.projectName;
        this.form.variables.num = data.projectCode;
        this.form.variables.xmtype = data.projectType1;
      }
      this.isChoose = false;
    },
    /** 单选框选中数据 */
    handlePmsClflDetailSelectionChange(selection) {
      /*if (selection.length > 1) {
        this.$refs.pmsCailiaoxiangqing.clearSelection();
        this.$refs.pmsCailiaoxiangqing.toggleRowSelection(selection.pop());
      } else {
        this.checkedPmsClflDetail = selection;
      }*/
      this.checkedPmsClflDetail = selection.sort(
        (a, b) => b.index - a.index
      )
    },
    /** 耗材采购子表序号 */
    rowPmsClflDetailIndex({ row, rowIndex }) {
      row.index = rowIndex;
    },
    /** 耗材采购子表添加按钮操作 */
    handleAddPmsClflDetail() {
      let obj = {};
      obj.cailiaoname = "";
      obj.guige = "";
      obj.pinpai = "";
      obj.danwei = "";
      obj.num = "";
      obj.beizhu = "";
      this.form.variables.pmsClflList.push(obj);
    },
    /** 耗材采购子表删除按钮操作 */
    handleDeletePmsClflDetail() {
      if (this.checkedPmsClflDetail.length == 0) {
        this.$alert("请先选择要删除的耗材采购子表数据", "提示", { confirmButtonText: "确定", });
      } else {
        this.checkedPmsClflDetail.forEach((item) => {
          this.form.variables.pmsClflList.splice(item.index, 1);
        })
        if (this.form.variables.pmsClflList.length == 0) {
          this.handleAddPmsClflDetail()
        }
      }
    },
    /** 查询部门下拉树结构 */
    getTreeselect() {
      treeselect().then(response => {
        this.deptOptions = response.data;
      });
    },
    downloadFile({ url }) {
      window.open(url)
    },
    handleAvatarSuccess({ data }, file, fileList) {
      console.log(data);
      this.form.variables.fujian =
        this.form.variables.fujian == null ? '' : this.form.variables.fujian
 this.form.variables.fujian += `;${data[0].fileId}`
      console.log(this.form.variables.fujian);
    },
    handleImportSuccess({ data }){
      if( data.length > 0 ){
        this.form.variables.pmsClflList = []
        for(let i = 0 ; i < data.length ; i++ ){
          let obj = {};
          obj.cailiaoname = data[i].cailiaoname;
          obj.guige = data[i].guige;
          obj.pinpai = data[i].pinpai;
          obj.danwei = data[i].danwei;
          obj.num = data[i].num;
          obj.beizhu = data[i].beizhu;
          this.form.variables.pmsClflList.push(obj);
        }
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
    onSubmit() {
      this.$refs['form'].validate(async (valid) => {
        if (valid) {
          // const procInsId = localStorage.getItem('procInsId')
          const procInsId = this.local_val.procInsId
          if (procInsId != '' && typeof (procInsId) != 'undefined' && procInsId != 'undefined') {
            this.completeData.instanceId = procInsId
            this.completeData.procInsId = procInsId
            // const taskId = localStorage.getItem('taskId')
            const taskId = this.local_val.taskId
            if (taskId) {
              this.completeData.taskId = taskId
            }
            console.log('审批更新逻辑', this.form)
            const updateSealmsg = await updateMaterialBuy({
              id: this.form.id,
              ...this.form.variables,
            })
            this.completeData.selected = this.form.variables.xmtype == 1 || this.form.variables.xmtype ==2 ? 'zhu':'fan';
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
            const { code, data } = await addMaterialBuy({
              ...this.form.variables,
            })
            this.form.selected = this.form.variables.xmtype == 1 || this.form.variables.xmtype ==2 ? 'zhu':'fan';
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
          if( item.tableName == 'pms_materialcost' ){
            this.fileList.push({
              name: item.fileName,
              url: item.savePath,
              id: item.id,
            })
          }
        })
      }
    },
    handleRemove(file, fileList) {
      // let idArr
      // if (this.form.variables.id) {
      //   idArr = fileList.map((item) => item.id)
      // } else {
      //   idArr = fileList.map((item) => item.response.data[0].fileId)
      // }
      // this.form.variables.fujian = idArr.join(';')
      let arr = this.form.variables.fujian.split(";");
      arr.splice(arr.indexOf(file.id),1);
      this.form.variables.fujian = arr.join(';')
    },
  },
  watch: {
    proData: {
      async handler(val) {
        console.log(val)
        if (val) {
          let dataArr = JSON.parse(val)
          const { data } = await getMaterialBuy(dataArr[0].id)
          this.form.variables = {
            ...data,
          }
          // 请求附件详情
          this.getFileDetail(this.form.variables.fujian)
          this.formUserName = this.form.variables.createUserName
          this.formDeptName = this.form.variables.createDeptName
        } else {
          this.form.variables.createTime = formatDate(new Date().getTime())
          const currentUser = this.$store.getters.user
          this.formUserName = currentUser.nickName
          this.form.variables.createUserId = currentUser.userId
          this.formDeptName = currentUser.dept.deptName
          this.form.variables.createDeptId = currentUser.deptId
          // initHtbh({sequnceCode: "projectBuyMaterialBuy"}).then( (res) => {
          //   this.$set(this.form.variables, 'qinggoubianhao', res.data)
          // })

        }
        this.uploadHeaders.Authorization = 'Bearer ' + this.$store.getters.token
        console.log(this)
      },
      immediate: true,
    },
  },
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
