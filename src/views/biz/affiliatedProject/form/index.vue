<!--
 * @Author: chad
 * @Date: 2021-10-26 09:02:48
 * @LastEditTime: 2021-11-03 10:18:38
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
          <el-input v-model="formUserName" disabled placeholder="请输入申请人" style="width:100%;" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="申请部门" prop="dept">
          <el-input v-model="formDeptName" disabled placeholder="请输入申请部门" style="width:100%;" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="4" style="padding:0 10px;">
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
      <el-col :span="12">
        <el-form-item label="挂靠立项编号" prop="num">
          <el-input
            v-model="form.variables.num"
            disabled
            placeholder="系统自动生成"
            style="width:100%;"
          />
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="4" style="padding:0 10px;">
      <el-col :span="24">
        <el-form-item label="项目概况" class="title_class">
          <el-divider></el-divider>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="4" style="padding:0 10px;">
      <el-col :span="12">
        <el-form-item label="项目名称" prop="projectname">
          <el-input
            v-model="form.variables.projectname"
            :disabled="!isformdisabled"
            placeholder="请输入项目名称"
            style="width:100%;"
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="项目类型" prop="leixing">
          <el-select
            v-model="form.variables.leixing"
            :disabled="!isformdisabled"
            clearable
            placeholder="请选择项目类型"
            style="width:100%;"
          >
            <el-option
              v-for="item in formProjectTypeList"
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
        <el-form-item label="建设单位" prop="jianshedanwei">
          <el-input
            v-model="form.variables.jianshedanwei"
            :disabled="!isformdisabled"
            placeholder="请输入建设单位"
            style="width:100%;"
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="合作单位" prop="hezuodanweihezuodanwei">
          <el-input
            v-model="form.variables.hezuodanwei"
            :disabled="!isformdisabled"
            placeholder="请输入合作单位"
            style="width:100%;"
          />
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="4" style="padding:0 10px;">
      <el-col :span="12">
        <el-form-item label="合同金额（元）" prop="hetongjine">
          <template>
            <el-input-number
              v-model="form.variables.hetongjine"
              :min="0"
              :precision="2"
              :step="1"
              :max="9999999999.99"
              placeholder="请输入合同金额"
              style="width:100%;"
              :disabled="!isformdisabled"
            ></el-input-number>
          </template>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="税点" prop="kaipiaoshuidian">
          <el-select
            v-model="form.variables.kaipiaoshuidian"
            :disabled="!isformdisabled"
            clearable
            placeholder="请选择税点"
            style="width:100%;"
          >
            <el-option
              v-for="item in formTaxPointList"
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
        <el-form-item label="项目地点" prop="suozaishi">
          <el-cascader
            v-model="siteShiArr"
            :options="formRegionList"
            :props="{ checkStrictly: true }"
            clearable
            style="width:100%;"
            placeholder="请选择项目地点"
            @change="handleRegionChange"
            :disabled="!isformdisabled"
          ></el-cascader>
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
            :data="fileData"
            style="width:100%;"
            multiple
          >
            <el-button size="small" type="primary" v-if="isformdisabled">点击上传</el-button>
          </el-upload>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="4" style="padding:0 10px;">
      <el-col :span="24">
        <el-form-item label="项目利润" class="title_class">
          <el-divider></el-divider>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="4" style="padding:0 10px;">
      <el-col :span="12">
        <el-form-item label="管理费比例(%)" prop="guanlifeibili">
          <template>
            <el-input-number
              v-model="form.variables.guanlifeibili"
              :min="0"
              :precision="2"
              :step="1"
              :max="100"
              placeholder="请输入管理费比例"
              style="width:100%;"
              :disabled="!isformdisabled"
            ></el-input-number>
          </template>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="管理费(元)" prop="hezuodanwei">
          <el-input v-model="computeManageCost" disabled placeholder="系统自动计算" style="width:100%;"/>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="4" style="padding:0 10px;">
      <el-col :span="12">
        <el-form-item label="预计净利(元)" prop="yujijingli">
          <el-input v-model="computeProfit" disabled placeholder="系统自动计算" style="width:100%;"/>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="净利润率(%)" prop="jinglirunlv">
          <el-input v-model="computeProfitPercent" disabled placeholder="系统自动计算" style="width:100%;"/>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="4" style="padding:0 10px;">
      <el-col :span="24">
        <el-form-item label="备注" prop="lirunbeizhu">
          <el-input
            v-model="form.variables.lirunbeizhu"
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
        <el-form-item label="附件" prop="fileProfit">
          <el-upload
            :before-upload="checkMyFileSize"
            class="upload-demo"
            :disabled="!isformdisabled"
            :headers="uploadHeaders"
            :action="uploadUrl"
            :on-success="handleAvatarSuccessForProfit"
            :file-list="fileProfitList"
            :on-remove="handleRemoveForProfit"
            :on-preview="downloadFile"
            :data="fileProfitParam"
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
import { save } from '../../../../api/biz/affiliatedProject'
import { definitionStart } from '@/api/flowable/definition'
import { complete } from '@/api/flowable/process'
import { getFileDetail } from '@/api/system/file'
import { formatDate } from '@/utils'

export default {
  props: {
    proData: {
      type: String,
      default: () => {
        return ''
      },
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
  data() {
    return {
      siteShiArr: [],
      fileIds: '',
      fileList: [],
      fileData: {
        fieldName: 'fujian',
        tableName: 'pms_affiliated_project',
      },
      fileProfitIds: '',
      fileProfitList: [],
      fileProfitParam: {
        fieldName: 'fileProfit',
        tableName: 'pms_affiliated_project',
      },
      formUserName: '',
      formDeptName: '',
      form: {
        variables: {
          fujian: '',
          hetongjine: 0,
          guanlifeibili: 0,
          guanlifei: 0,
          yujijingli: 0,
          jinglirunlv: 0,
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
      formProjectTypeList: [],
      formTaxPointList: [],
      formRegionList: [],
      uploadHeaders: {
        Authorization: '',
      },
      uploadUrl: process.env.VUE_APP_BASE_API + '/common/batchUpload',
      rules: {
        projectname: [
          { required: true, message: '请输入项目名称', trigger: 'blur' },
        ],
        leixing: [
          { required: true, message: '请选择项目类型', trigger: 'blur' },
        ],
        jianshedanwei: [
          { required: true, message: '请输入建设单位', trigger: 'blur' },
        ],
        hezuodanwei: [
          { required: true, message: '请输入合作单位', trigger: 'blur' },
        ],
        hetongjine: [
          { required: true, message: '请输入合同金额', trigger: 'blur' },
        ],
        kaipiaoshuidian: [
          { required: true, message: '请选择开票税点', trigger: 'blur' },
        ],
        suozaishi: [
          { required: true, message: '请选择项目地点', trigger: 'blur' },
        ],
        guanlifeibili: [
          { required: true, message: '请输入管理费比例', trigger: 'blur' },
        ],

      },
    }
  },
  created() {
    // 项目类型
    this.getDicts('project_type').then((res) => {
      this.formProjectTypeList = res.data
    })
    // 项目地点
    this.getRegionTree().then((res) => {
      this.formRegionList = res.data
    })
    // 税点
    this.getDicts('tax_point').then((res) => {
      this.formTaxPointList = res.data
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
      this.form.variables.suozaishi = this.siteShiArr.join(',')
    },
    downloadFile({ url }) {
      window.open(url)
    },
    handleAvatarSuccess({ data }, file, fileList) {
      this.fileIds = this.fileIds == null ? '' : this.fileIds
 this.fileIds += `;${data[0].fileId}`
    },
    handleAvatarSuccessForProfit({ data }, file, fileList) {
      this.fileProfitIds = this.fileProfitIds == null ? '' : this.fileProfitIds
 this.fileProfitIds += `;${data[0].fileId}`
    },
    onSubmit() {
      this.$refs['form'].validate(async (valid) => {
        if (valid) {
          // const procInsId = localStorage.getItem('procInsId')
          this.form.variables.fujian = this.fileIds + this.fileProfitIds
          let procInsId = this.local_val.procInsId
          console.log('procInsId', procInsId)
          if (procInsId != '' && typeof (procInsId) != 'undefined' && procInsId != 'undefined') {
            this.completeData.instanceId = procInsId
            this.completeData.procInsId = procInsId
            // const taskId = localStorage.getItem('taskId')
            const taskId = this.local_val.taskId
            if (taskId) {
              this.completeData.taskId = taskId
            }
            console.log('审批更新逻辑', this.form)
            const updateSealmsg = await save({
              id: this.form.id,
              ...this.form.variables,
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
            const { code, data } = await save({
              ...this.form.variables,
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
      console.log('id = ' + id)
      const { code, data, msg } = await getFileDetail(id)
      console.log({ code, data, msg })
      if (code == 200) {
        data.map((item) => {
          if(item.fieldName == "fujian"){
            this.fileList.push({
              name: item.fileName,
              url: item.savePath,
              id: item.id
            })
          }else if(item.fieldName == "fileProfit"){
            this.fileProfitList.push({
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
    },
    handleRemoveForProfit(file, fileList) {
      let idArr
      if (this.form.variables.id) {
        idArr = fileList.map((item) => item.id)
      } else {
        idArr = fileList.map((item) => item.response.data[0].fileId)
      }
      this.fileProfitIds = idArr.join(';')
    },
  },
  watch: {
    proData: {
      handler(val) {
        this.uploadHeaders.Authorization = 'Bearer ' + this.$store.getters.token
        if (val) {
          let dataArr = JSON.parse(val)
          this.form.variables = {
            ...dataArr[0],
          }
          this.siteShiArr = this.form.variables.suozaishi.split(',')
          // 请求附件详情
          this.getFileDetail(this.form.variables.fujian)
          this.formUserName = this.form.variables.createUserName
          this.formDeptName = this.form.variables.createDeptName
        } else {
          const currentUser = this.$store.getters.user
          this.formUserName = currentUser.nickName
          this.formDeptName = currentUser.dept.deptName
          this.form.variables.createTime = formatDate(new Date().getTime())

        }
      },
      immediate: true,
    },
  },
  computed: {
    computeManageCost: function() {
      let contractCost = this.form.variables.hetongjine == null ? 0 : this.form.variables.hetongjine
      let managePercent = this.form.variables.guanlifeibili == null ? 0 : this.form.variables.guanlifeibili
      let manageCost = parseFloat(contractCost*managePercent/100).toFixed(2);
      this.form.variables.guanlifei = manageCost;
      return manageCost
    },
    computeProfit: function() {
      // let contractCost = this.form.variables.hetongjine == null ? 0 : this.form.variables.hetongjine
      let manageCost = this.form.variables.guanlifei == null ? 0 : this.form.variables.guanlifei
      // let profit = parseFloat(contractCost - manageCost).toFixed(2);
      let profit = parseFloat(manageCost).toFixed(2);
      this.form.variables.yujijingli = profit;
      return profit
    },
    computeProfitPercent: function() {
      // let contractCost = this.form.variables.hetongjine == null ? 1 : this.form.variables.hetongjine
      // if(contractCost == 0){
      //   return 0;
      // }else{
      //   let profit = this.form.variables.yujijingli == null ? 0 : this.form.variables.yujijingli
      //   let profitPercent = parseFloat(profit/contractCost*100).toFixed(2);
      //   this.form.variables.jinglirunlv = profitPercent;
      //   return profitPercent
      // }
      let managePercent = this.form.variables.guanlifeibili == null ? 0 : this.form.variables.guanlifeibili
      this.form.variables.jinglirunlv = managePercent;
      return managePercent

    },

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

