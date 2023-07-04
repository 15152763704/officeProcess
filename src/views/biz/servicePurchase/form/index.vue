<!--
 * @Author: chad
 * @Date: 2021-10-26 09:02:48
 * @LastEditTime: 2021-11-18 10:38:03
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jshxpms-vue\src\views\flowable\formView\test.vue
-->
<template>
  <el-form
    ref="form"
    :model="form.variables"
    :rules="rules"
    label-width="140px"
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
        <el-form-item label="服务采购编号" prop="num">
          <el-input v-model="form.variables.num" disabled placeholder="系统自动生成" style="width:100%;"/>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="4" style="padding:0 10px;">
      <el-col :span="24">
        <el-form-item label="服务采购详情" class="title_class">
          <el-divider></el-divider>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="4" style="padding:0 10px;">
      <el-col :span="12">
        <el-form-item label="请购编号" prop="qinggoubianhao"
                      v-on:click.native="isformdisabled && chooseProjectBuyService()"
        >
          <el-input v-model="form.variables.qinggoubianhao" disabled placeholder="请选择项目请购" style="width:100%;">
            <el-button
              @click="chooseProjectBuyService"
              slot="append"
              icon="el-icon-third-guide"
            ></el-button>
          </el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="请购申请人" prop="qinggouren">
          <el-input v-model="form.variables.qinggouren" disabled placeholder="请购申请人" style="width:100%;"/>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="4" style="padding:0 10px;">
      <el-col :span="12">
        <el-form-item label="请购部门" prop="qinggoubumen">
          <el-input v-model="form.variables.qinggoubumen" disabled placeholder="请购部门" style="width:100%;"/>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="请购单位" prop="qinggoudanwei">
          <el-input :value="formCompanyNameTypeListFormat(form.variables.qinggoudanwei)" disabled placeholder="请购单位"
                    style="width:100%;"
          />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="4" style="padding:0 10px;">
      <el-col :span="12">
        <el-form-item label="项目编号" prop="projectnum">
          <el-input v-model="form.variables.projectnum" disabled placeholder="项目编号" style="width:100%;"/>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="项目名称" prop="projectname">
          <el-input v-model="form.variables.projectname" disabled placeholder="项目名称" style="width:100%;"/>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="4" style="padding:0 10px;">
      <el-col :span="12">
        <el-form-item label="项目经理" prop="projectdirector">
          <el-input v-model="form.variables.projectdirector" disabled placeholder="项目经理" style="width:100%;"/>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="参考施工费(元)" prop="shigongfei">
          <el-input v-model="form.variables.shigongfei" disabled placeholder="参考施工费(元)" style="width:100%;"/>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="4" style="padding:0 10px;">
      <el-col :span="12">
        <el-form-item label="建议施工队名称" prop="jysgdname">
          <el-input v-model="form.variables.jysgdname" disabled placeholder="建议施工队名称" style="width:100%;"/>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="建议施工队负责人" prop="jysgdfzr">
          <el-input v-model="form.variables.jysgdfzr" disabled placeholder="建议施工队负责人" style="width:100%;"/>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="4" style="padding:0 10px;">
      <el-col :span="12">
        <el-form-item label="工期（天）" prop="days">
          <el-input v-model="form.variables.days" disabled placeholder="工期（天）" style="width:100%;"/>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="4" style="padding:0 10px;">
      <el-col :span="24">
        <el-form-item label="施工队信息" class="title_class">
          <el-divider></el-divider>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="10" class="mb8" style="padding:0 10px;" v-if="isformdisabled">
      <el-col :span="1.5">
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="addDomain"
        >添加
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          @click="handleDeleteDomain"
        >删除
        </el-button>
      </el-col>
    </el-row>

    <el-table
      class="material_class"
      :data="form.variables.purchaseList"
      :row-class-name="rowProjectBuyServiceIndex"
      @selection-change="handleProjectBuyServiceSelectionChange"
      tooltip-effect="dark"
      size="small"
      ref="table"
      border
    >
      <template>
        <el-table-column align="center" type="selection"/>
        <el-table-column label="施工队名称" align="center" header-align="center">
          <template slot-scope="scope">
            <el-form-item
              class="noleftform"
              style="width: 100%;margin-bottom:0;"
            >
              <el-input v-model="scope.row.name" :disabled="!isformdisabled" placeholder="请输入施工队名称"/>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column align="center" header-align="center" label="施工队负责人">
          <template slot-scope="scope">
            <el-form-item
              class="noleftform"
              style="width: 100%;margin-bottom:0;"
            >
              <el-input v-model="scope.row.fuzeren" :disabled="!isformdisabled" placeholder="请输入施工队负责人"/>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="承诺工期(天)" align="center" header-align="center">
          <template slot-scope="scope">
            <el-form-item
              class="noleftform"
              style="width: 100%;margin-bottom:0;"
            >
              <el-input-number
                v-model="scope.row.gongzuoliang"
                step-strictly
                :step="1"
                :min="0"
                :max="9999999999.99"
                placeholder="请输入承诺工期"
                style="width:100%;"
                :disabled="!isformdisabled"
              ></el-input-number>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="施工总价(含税)" align="center" header-align="center">
          <template slot-scope="scope">
            <el-form-item
              class="noleftform"
              style="width: 100%;margin-bottom:0;"
            >
              <el-input-number
                v-model="scope.row.danjia"
                :precision="2"
                :step="1"
                :min="0"
                :max="9999999999.99"
                placeholder="请输入施工总价"
                style="width:100%;"
                :disabled="!isformdisabled"
              ></el-input-number>
            </el-form-item>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <el-row :gutter="4" style="padding:0 10px;">
      <el-col :span="24">
        <el-form-item></el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="4" style="padding:0 10px;">
      <el-col :span="12">
        <el-form-item label="建议采购施工队" prop="jyshigongdui">
          <el-input v-model="form.variables.jyshigongdui" :disabled="!isformdisabled" placeholder="请输入建议采购施工队"
                    style="width:100%;"
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="建议采购价格" prop="jycaigoujg">
          <el-input-number
            v-model="form.variables.jycaigoujg"
            :precision="2"
            :step="1"
            :min="0"
            :max="9999999999.99"
            placeholder="请输入建议采购价格"
            style="width:100%;"
            :disabled="!isformdisabled"
          ></el-input-number>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="4" style="padding:0 10px;">
      <el-col :span="12">
        <el-form-item label="利率(%)" prop="bili">
          <el-input v-model="computeRate" disabled placeholder="系统自动计算" style="width:100%;"/>
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
        <el-form-item label="合同附件" prop="fujian">
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

    <!-- 弹窗 -->
    <el-row :gutter="4" style="padding:0 10px;">
      <el-col :span="24">
        <ProjectBuyServicePopup
          :isshow="isChoose"
          req-url="/projectBuy/serviceBuy/list"
          @transferProjectBuyServiceData="getProjectBuyService"
          @onBeforeClose="onBeforeClose"
        />
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
import { getPurchaseDetailInfo, save } from '@/api/biz/servicePurchase'
import { definitionStart } from '@/api/flowable/definition'
import { complete } from '@/api/flowable/process'
import { getFileDetail } from '@/api/system/file'
import { formatDate } from '@/utils'
import ProjectBuyServicePopup from '@/components/Popup/ProjectBuyServicePopup'
import { uuid } from 'vue-uuid'

export default {
  components: { ProjectBuyServicePopup },
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
      fileList: [],
      fileData: {
        fieldName: 'fujian',
        tableName: 'pms_service_purchase'
      },
      checkedProjectBuyService: [],
      isChoose: false,
      isShowTrackProject: false,
      isShowAdvanceCost: false,
      siteShiArr: [],
      formUserName: '',
      formDeptName: '',
      form: {
        variables: {
          fujian: '',
          purchaseList: [
            {
              key: uuid.v1()
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
      uploadHeaders: {
        Authorization: ''
      },
      uploadUrl: process.env.VUE_APP_BASE_API + '/common/batchUpload',
      rules: {
        qinggoubianhao: [
          { required: true, message: '请选择请购编号', trigger: 'blur' }
        ],
        jyshigongdui: [
          { required: true, message: '请输入建议采购施工队', trigger: 'blur' }
        ],
        jycaigoujg: [
          { required: true, message: '请输入建议采购价格', trigger: 'blur' }
        ],
        fujian: [
          { required: true, message: '请上传合同附件', trigger: 'change' }
        ]
      },
      formCompanyNameTypeList: []
    }
  },
  created() {
    // const id = localStorage.getItem('id')
    const id = this.local_val.id
    if (id) {
      this.form.id = id
    }
    // this.form.formId = localStorage.getItem('formId')
    this.form.formId = this.local_val.formId
    this.getDicts('form_company_name').then((res) => {
      this.formCompanyNameTypeList = res.data
    })
  },
  methods: {
    formCompanyNameTypeListFormat(row) {
      return this.selectDictLabel(this.formCompanyNameTypeList, row)
    },
    handleRemove(file, fileList) {
      let idArr
      if (this.form.variables.id) {
        idArr = fileList.map((item) => item.id)
      } else {
        idArr = fileList.map((item) => item.response.data[0].fileId)
      }
      this.form.variables.fujian = idArr.join(';')
      if (idArr.length == 0) {
        this.rules.fujian = [
          { required: true, message: '请上传合同附件', trigger: 'change' }
        ]
      }
    },
    handleAvatarSuccess({ data }, file, fileList) {
      this.form.variables.fujian = this.form.variables.fujian == null ? '' : this.form.variables.fujian
      this.form.variables.fujian += `;${data[0].fileId}`
      this.rules.fileLaborContract = []
      this.$refs.form.clearValidate('fujian')
    },
    getPurchaseDetailInfo(parentId) {
      getPurchaseDetailInfo(parentId).then((res) => {
        this.form.variables.purchaseList = res.data
      })
    },
    onBeforeClose() {
      this.isChoose = false
    },
    addDomain() {
      this.form.variables.purchaseList.push({
        key: uuid.v1()
      })
    },
    handleDeleteDomain() {
      if (this.checkedProjectBuyService.length == 0) {
        this.$alert('请先选择要删除的施工队信息', '提示', {
          confirmButtonText: '确定'
        })
      } else {
        this.checkedProjectBuyService.forEach((item) => {
          this.form.variables.purchaseList.splice(item.index, 1)
        })
        if (this.form.variables.purchaseList.length == 0) {
          this.addDomain()
        }
      }
    },
    handleProjectBuyServiceSelectionChange(selection) {
      this.checkedProjectBuyService = selection.sort(
        (a, b) => b.index - a.index
      )
    },
    rowProjectBuyServiceIndex({ row, rowIndex }) {
      row.index = rowIndex
    },
    chooseProjectBuyService() {
      this.isChoose = true
    },
    getProjectBuyService(row) {
      if (row) {
        this.form.variables.qinggoubianhao = row.qinggoubianhao
        this.form.variables.projectname = row.project
        this.form.variables.projectnum = row.projectnum
        this.form.variables.projectdirector = row.xiangmujingli
        this.form.variables.qinggouren = row.createUserName
        this.form.variables.qinggoubumen = row.createDeptName
        this.form.variables.qinggoudanwei = row.qinggoudanwei
        this.form.variables.shigongfei = row.shigongfei
        this.form.variables.jysgdname = row.jysgdname
        this.form.variables.jysgdfzr = row.jysgdfzr
        this.form.variables.days = row.days
      }
      this.isChoose = false
    },
    downloadFile({ url }) {
      window.open(url)
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
            const updateSealmsg = await save({
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

            const { code, data } = await save({
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
  },
  watch: {
    proData: {
      handler(val) {
        this.uploadHeaders.Authorization = 'Bearer ' + this.$store.getters.token
        if (val) {
          let dataArr = JSON.parse(val)
          this.form.variables = {
            ...dataArr[0]
          }
          this.getPurchaseDetailInfo(this.form.variables.id)
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
      immediate: true
    }
  },
  computed: {
    computeRate: function() {
      if (!this.form.variables.shigongfei) {
        return 0
      } else {
        let constructionCost =
          this.form.variables.shigongfei == null
            ? 1
            : this.form.variables.shigongfei
        let purchaseCost =
          this.form.variables.jycaigoujg == null
            ? 0
            : this.form.variables.jycaigoujg
        let rate = parseFloat((constructionCost - purchaseCost) / constructionCost * 100).toFixed(2)
        this.form.variables.bili = rate
        return rate
      }

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
<style>
.material_class .el-form-item__content {
  margin-left: 0 !important;
}

</style>


