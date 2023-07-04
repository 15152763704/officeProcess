<!--
 * @Author: chad
 * @Date: 2021-10-26 09:02:48
 * @LastEditTime: 2021-11-10 14:19:08
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
          <el-form-item label="基本信息" class="title_class">
            <el-divider></el-divider>
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
          <el-form-item label="合同类型" prop="heitongleixing">
            <el-select
              v-model="form.variables.heitongleixing"
              :disabled="!isformdisabled"
              clearable
              placeholder="请选择合同类型"
              style="width:100%;"
            >
              <el-option
                v-for="item in project_type"
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
          <el-form-item label="项目名称" prop="projectname">
            <el-input
                      v-model="form.variables.projectname"
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
          <el-form-item label="项目编号" prop="projectnum">
            <el-input
              v-model="form.variables.projectnum"
              disabled
              placeholder="请输入项目编号"
              style="width:100%;"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="合同名称" prop="hetongname">
            <el-input
              v-model="form.variables.hetongname"
              :disabled="!isformdisabled"
              placeholder="请输入合同名称"
              style="width:100%;"
            />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="4" style="padding:0 10px;">
        <el-col :span="12">
          <el-form-item label="合同编号" prop="hetongnum">
            <el-input
              v-model="form.variables.hetongnum"
              disabled
              placeholder="系统自动生成合同编号"
              style="width:100%;"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="甲方" prop="kehu">
            <el-input
              v-model="form.variables.kehu"
              :disabled="!isformdisabled"
              placeholder="请输入甲方"
              style="width:100%;"
            />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="4" style="padding:0 10px;">
        <el-col :span="12">
          <el-form-item label="乙方" prop="company">
            <el-select
              v-model="form.variables.company"
              :disabled="!isformdisabled"
              clearable
              placeholder="请选择乙方"
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
        <el-col :span="12">
          <el-form-item label="合同金额(元)" prop="hetongmoney">
            <el-input-number
              :step=100
              :precision=2
              :min=0
              v-model="form.variables.hetongmoney"
              :disabled="!isformdisabled"
              placeholder="请输入合同金额"
              style="width:100%;"
            />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="4" style="padding:0 10px;">
        <el-col :span="12">
          <el-form-item label="合同签订时间(开工时间)" prop="hetongStartTime">
            <el-date-picker
              v-model="form.variables.hetongStartTime"
              type="date"
              placeholder="选择合同签订时间"
              align="right"
              value-format="yyyy-MM-dd"
              :disabled="!isformdisabled"
              style="width:100%;"
              :picker-options="pickerOptions"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="合同工期(天)" prop="gongqi">
            <el-input-number
              :step=10 :precision=0
              :min=0
              v-model="form.variables.gongqi"
              :disabled="!isformdisabled"
              placeholder="请输入合同工期(天)"
              style="width:100%;"
            />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="4" style="padding:0 10px;">
        <el-col :span="12">
          <el-form-item label="结算方式" prop="jiesuan">
            <el-select
              v-model="form.variables.jiesuan"
              :disabled="!isformdisabled"
              clearable
              placeholder="请选择结算方式"
              style="width:100%;"
            >
              <el-option
                v-for="item in project_jiesuan_type"
                :key="item.dictValue"
                :label="item.dictLabel"
                :value="item.dictValue"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="质保时间(年)" prop="zbkaishidate">
            <el-input-number
              :step=1
              :min=0
              v-model="form.variables.zbkaishidate"
              :disabled="!isformdisabled"
              placeholder="请输入质保时间(年)"
              style="width:100%;"
            />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="4" style="padding:0 10px;">
        <el-col :span="12">
          <el-form-item label="履约保证金(元)" prop="zhibaomoney">
            <el-input-number
              :step=100
              :precision=2
              :min=0
              v-model="form.variables.zhibaomoney"
              :disabled="!isformdisabled"
              placeholder="请输入履约保证金(元)"
              style="width:100%;"
            />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="4" style="padding:0 10px;">
        <el-col :span="24">
          <el-form-item label="付款方式" prop="fukuanfangshi">
            <el-input
              v-model="form.variables.fukuanfangshi"
              type="textarea"
              :rows="2"
              :disabled="!isformdisabled"
              placeholder="请输入付款方式"
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
              :rows="3"
              :disabled="!isformdisabled"
              placeholder="请输入备注"
              style="width:100%;"
            />
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
              style="width:100%;"
              :data="fujiandata"
              multiple
            >
              <el-button size="small" type="primary" v-if="isformdisabled">点击上传</el-button>
            </el-upload>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="4" style="padding:0 10px;">
        <el-col :span="24">
          <el-form-item label="付款节点" class="title_class">
            <el-divider></el-divider>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="10" class="mb8" v-if="isformdisabled">
        <el-col :span="1.5">
          <el-button type="primary" icon="el-icon-plus" size="mini" @click="handleAddFkjd">添加</el-button>
        </el-col>
        <el-col :span="1.5">
          <el-button type="danger" icon="el-icon-delete" size="mini" @click="handleDeleteFkjd">删除</el-button>
        </el-col>
      </el-row>

      <el-row :gutter="4" style="padding:0 10px;">
        <el-col :span="24">
          <el-table :cell-class-name="cell_class_name"  class="projectMoneyname" border :data="form.variables.fkjd" :row-class-name="rowFkjdIndex" @selection-change="handleFkjdSelectionChange" >
            <el-table-column type="selection" width="50" align="center" />
            <el-table-column label="节点名称" prop="moneyname"  align="center">
              <template slot-scope="scope">
                <el-form-item :prop="'fkjd.' + scope.$index + '.moneyname'" :rules='rules.moneyname'>
                  <el-select
                    v-model="scope.row.moneyname"
                    :disabled="!isformdisabled"
                    clearable
                    placeholder="请选择节点名称"
                    style="width:100%;"
                  >
                    <el-option
                      v-for="item in project_hetong_money_back_name"
                      :key="item.dictValue"
                      :label="item.dictLabel"
                      :value="item.dictValue"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="回款时间" prop="backTime" align="center">
              <template slot-scope="scope">
                <el-form-item :prop="'fkjd.' + scope.$index + '.backTime'" :rules='rules.backTime'>
                  <el-date-picker
                    v-model="scope.row.backTime"
                    type="date"
                    placeholder="请选择回款时间"
                    align="right"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    :disabled="!isformdisabled"
                    style="width:100%;"
                    :picker-options="pickerOptions"
                  ></el-date-picker>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="回款金额(元)" prop="backMoney" align="center">
              <template slot-scope="scope">
                <el-form-item :prop="'fkjd.' + scope.$index + '.backMoney'" :rules='rules.backMoney'>
                  <el-input-number :precision=2 v-model="scope.row.backMoney" placeholder="请输入回款金额" :disabled="!isformdisabled" style="width: 100%;"/>
                </el-form-item>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>

      <el-row :gutter="4" style="padding:0 10px; margin-top:10px;">
      </el-row>

    </el-form>
  </div>
</template>

<script>
import { addProject, getProject, updateProject } from '@/api/biz/contract/project'
import { definitionStart } from '@/api/flowable/definition'
import { complete } from '@/api/flowable/process'
import { getFileDetail } from '@/api/system/file'
import { formatDate } from '@/utils'
import ProjectDialog from '@/components/Popup/ProductionProjectPopup.vue'
import AffiliatedProject from '@/components/Popup/AffiliatedProjectPopup.vue'
import { initHtbh } from '@/api/biz/publicRequest'
import { getInfo } from '@/api/biz/productionProject'

export default {
  components: { ProjectDialog, AffiliatedProject },
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
      warningObjectId:'',//报警合同id，从报警入口进入
      //项目合同回款节点名称
      project_hetong_money_back_name:[],
      // 子表选中数据
      checkedfkjd: [],
      fileList: [],
      formUserName: '',
      formDeptName: '',
      form: {
        variables: {
          id:'',
          title: '',
          created: '',
          modified: '',
          creator: '',
          modificator: '',
          recycle: '',
          shenqingren: '',
          dept: '',
          time: '',
          hetongnum: '',
          hetongname: '',
          heitongleixing: '',
          kehu: '',
          company: '',
          hetongmoney: '',
          gongqi: '',
          jiesuan: '',
          zhibaomoney: '',
          fukuanfangshi: '',
          zbkaishidate: '',
          beizhu: '',
          hetongfujian: '',
          agree: '',
          projectname: '',
          projectnum: '',
          projectid: '',
          xmtype: '',
          fujian: '',
          hetongStartTime:'',
          fkjd:[
            {
              backMoney:'',
              backTime:'',
              moneyname:'',
            }
          ],
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
      project_type: [],
      contract_project_type: [],
      project_jiesuan_type: [],
      form_company_name: [],
      formProcessState: [],
      uploadHeaders: {
        Authorization: ''
      },
      uploadUrl: process.env.VUE_APP_BASE_API + '/common/batchUpload',
      rules: {
        heitongleixing: [{ required: true, message: '请选择合同类型', trigger: 'blur' }],
        xmtype: [{ required: true, message: '请选择项目类型', trigger: 'blur' }],
        projectname: [{ required: true, message: '请选择项目名称', trigger: 'blur' }],
        hetongname: [{ required: true, message: '请输入合同名称', trigger: 'blur' }],
        kehu: [{ required: true, message: '请输入甲方', trigger: 'blur' }],
        company: [{ required: true, message: '请选择乙方', trigger: 'blur' }],
        hetongmoney: [{ type:'number', required: true, message: '请输入合同金额', trigger: 'blur' }],
        gongqi: [{ type:'integer', required: true, message: '请输入合同工期', trigger: 'blur' }],
        zhibaomoney: [{ type:'number', required: true, message: '请输入履约保证金', trigger: 'blur' }],
        jiesuan: [{ required: true, message: '请选择结算方式', trigger: 'blur' }],
        zbkaishidate: [{  type:'number', required: true, message: '请输入质保时间', trigger: 'blur' }],
        fukuanfangshi: [{ required: true, message: '请输入付款方式', trigger: 'blur' }],
        hetongStartTime: [{  required: true, message: '请输入合同签订时间', trigger: 'blur' }],

        moneyname: [{  required: true, message: '请选择付款节点', trigger: 'blur' }],
        backMoney: [{  required: true, message: '请选择回款金额', trigger: 'blur' }],
        backTime: [{  required: true, message: '请选择回款时间', trigger: 'blur' }],
      },
      fujiandata: { fieldName: 'HETONGFUJIAN', tableName: 'pms_hetongguanli' },
      isChoose: false,//项目选择框，默认false隐藏
      isChooseGuakao: false//挂靠立项选择
    }
  },
  created() {
    // 回款节点名称
    this.getDicts('project_hetong_money_back_name').then((res) => {
      this.project_hetong_money_back_name = res.data
    })
    // 合同类型
    this.getDicts('project_type').then((res) => {
      this.project_type = res.data
    })
    //项目类型
    this.getDicts('contract_project_type').then((response) => {
      this.contract_project_type = response.data
    })
    //乙方
    this.getDicts('form_company_name').then((response) => {
      this.form_company_name = response.data
    })
    //结算方式
    this.getDicts('project_jiesuan_type').then((response) => {
      this.project_jiesuan_type = response.data
    })
    console.log(this.local_val)
    // const id = localStorage.getItem('id')
    const id = this.local_val.id
    if (id) {
      this.form.id = id
    }

    // this.form.formId = localStorage.getItem('formId')
    this.form.formId = this.local_val.formId

    this.loadWarning();
  },
  methods: {
    // 合同预警入口进入--默认新增合同表单，自动带入预警项目
    loadWarning(){
      this.warningObjectId = this.$route.query && this.$route.query.warningObjectId
      if( this.warningObjectId != null && this.warningObjectId != '' ){//表示从预警入口新增进入
        getInfo(this.warningObjectId).then((res) => {
          console.log(res)
          this.form.variables.xmtype = "1" // 项目类型 -- 预警过来都是正式立项（正式、挂靠）
          this.form.variables.heitongleixing = res.data.projectType1 // 项目类型-集成、通信、市政。。。
          this.form.variables.projectname = res.data.projectName // 项目名称
          this.form.variables.projectnum = res.data.projectCode // 项目编号
        })
      }
    },
    cell_class_name(){
      return "my_project_hetong_cell_class_name";
    },
    /** 单选框选中数据 */
    handleFkjdSelectionChange(selection) {
      this.checkedfkjd = selection.sort(
        (a, b) => b.index - a.index
      )
    },
    /** 子表付款节点序号 */
    rowFkjdIndex({ row, rowIndex }) {
      row.index = rowIndex;
    },
    /** 子表付款节点【删除】按钮  */
    handleDeleteFkjd() {
      if (this.checkedfkjd.length == 0) {
        this.$alert("请先选择要删除的付款节点数据", "提示", { confirmButtonText: "确定", });
      } else {
        this.checkedfkjd.forEach((item) => {
          this.form.variables.fkjd.splice(item.index, 1);
        })
        if (this.form.variables.fkjd.length == 0) {
          this.handleAddFkjd()
        }
      }
    },
    /** 子表付款节点【添加】按钮 */
    handleAddFkjd() {
      let obj = {};
      obj.backMoney="";
      obj.backTime="";
      obj.moneyname="";
      this.form.variables.fkjd.push(obj);
    },
    //获取合同编号
    getinitHtbh() {
      let data = {
        sequnceCode: 'xmhtsqhtbh'
      }
      initHtbh(data).then((res) => {
        this.form.variables.hetongnum = res.data
      })
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
    //校验合同金额是否等于 节点回款总额之和
    checkHetongMoney(){
      let hetongTotal = 0
      for (let i = 0; i < this.form.variables.fkjd.length ; i++) {
        hetongTotal+= this.form.variables.fkjd[i].backMoney
      }
      if( this.form.variables.hetongmoney == hetongTotal ){
        return true
      }else{
        this.$message({
          message: '请确认合同金额是否等于累计回款金额',
          type: 'warning'
        });
      }
      return false
    },
    onSubmit() {
      if( this.checkHetongMoney() ){
        this.$refs['form'].validate(async(valid) => {
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
              const updateSealmsg = await updateProject({
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
              const { code, data } = await addProject({
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
      }
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
    //接收子组件传过来的被选择的项目
    choosedProect(data) {
      if (data) {
        this.form.variables.projectname = data.projectName
        this.form.variables.projectnum = data.projectCode
      }
      this.isChoose = false
    },
    choosedProectGuakao(data) {
      if (data) {
        this.form.variables.projectname = data.projectname
        this.form.variables.projectnum = data.num
      }
      this.isChooseGuakao = false
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
    xmtypeChange() {
      this.form.variables.projectname = null
      this.form.variables.projectnum = null
    }
  },
  watch: {
    proData: {
      async handler(val) {
        if (val && val != 'null') {
          let dataArr = JSON.parse(val)
          const { data } = await getProject(dataArr[0].id)
          this.form.variables = {
            ...data
          }
          console.log(dataArr)
          // 请求附件详情
          this.getFileDetail(this.form.variables.fujian)
          this.formUserName = this.form.variables.createUserName
          this.formDeptName = this.form.variables.createDeptName
        } else {
          this.form.variables.time = formatDate(new Date().getTime())
          const currentUser = this.$store.getters.user
          this.formUserName = currentUser.nickName
          this.form.variables.shenqingren = currentUser.userId
          this.formDeptName = currentUser.dept.deptName
          this.form.variables.dept = currentUser.deptId
          // this.getinitHtbh()
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
.cell{
  .el-form-item {
    margin-bottom: 16px;
  }
}



</style>
<style>
  .projectMoneyname .el-form-item__content{
    margin-left: 0!important;
  }
  .my_project_hetong_cell_class_name{
    padding: 10px 0 0 0 !important;
  }
</style>
