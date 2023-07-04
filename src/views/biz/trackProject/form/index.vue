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
        <el-form-item label="立项编号" prop="numbers">
          <el-input
            v-model="form.variables.numbers"
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
        <el-form-item label="项目类型" prop="leixing">
          <el-select
            v-model="form.variables.leixing"
            :disabled="!isformdisabled"
            clearable
            placeholder="请选择项目类型"
            style="width:100%;"
            @change="clearSourceOption"
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
      <el-col :span="12">
        <el-form-item label="项目来源" prop="xiangmulaiyuan" v-if="form.variables.leixing == '1'">
          <el-select
            v-model="form.variables.xiangmulaiyuan"
            :disabled="!isformdisabled"
            clearable
            ref="xiangmulaiyuan"
            placeholder="请选择项目来源"
            style="width:100%;"
          >
            <el-option
              v-for="item in formSourceCommunicationList"
              :key="item.dictValue"
              :label="item.dictLabel"
              :value="item.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="项目来源" prop="xiangmulaiyuanList" v-else-if="form.variables.leixing == '2'">
          <el-select
            v-model="form.variables.xiangmulaiyuanList"
            :disabled="!isformdisabled"
            clearable
            multiple
            placeholder="请选择项目来源"
            style="width:100%;"
            @change="handleChangeSource"
          >
            <el-option
              v-for="item in formSourceAdministrationList"
              :key="item.dictValue"
              :label="item.dictLabel"
              :value="item.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="项目来源" prop="xiangmulaiyuanList" v-else-if="form.variables.leixing == '3'">
          <el-select
            v-model="form.variables.xiangmulaiyuanList"
            :disabled="!isformdisabled"
            clearable
            multiple
            placeholder="请选择项目来源"
            style="width:100%;"
            @change="handleChangeSource"
          >
            <el-option
              v-for="item in formSourceIntegrationList"
              :key="item.dictValue"
              :label="item.dictLabel"
              :value="item.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="项目来源" prop="xiangmulaiyuan" v-else>
          <el-select
            v-model="form.variables.xiangmulaiyuan"
            :disabled="!isformdisabled"
            clearable
            placeholder="请选择项目来源"
            style="width:100%;"
            @change="handleChangeSource"
          >
            <el-option
              v-for="item in formSourceList"
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
        <el-form-item label="项目名称" prop="projectName">
          <el-input
            v-model="form.variables.projectName"
            :disabled="!isformdisabled"
            placeholder="请输入项目名称"
            style="width:100%;"
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="建设(投资)方" prop="jianshedanwei">
          <el-input
            v-model="form.variables.jianshedanwei"
            :disabled="!isformdisabled"
            placeholder="请输入建设(投资)方"
            style="width:100%;"
          />
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="4" style="padding:0 10px;">
      <el-col :span="12">
        <el-form-item label="投资性质" prop="touzixingzhi">
          <el-select
            v-model="form.variables.touzixingzhi"
            :disabled="!isformdisabled"
            clearable
            placeholder="请选择投资性质"
            style="width:100%;"
          >
            <el-option
              v-for="item in formInvestmentList"
              :key="item.dictValue"
              :label="item.dictLabel"
              :value="item.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="投资规模(元)" prop="guimo">
          <template>
            <el-input-number
              v-model="form.variables.guimo"
              :precision="2"
              :step="1"
              :min="0"
              :max="9999999999.99"
              placeholder="请输入投资规模"
              style="width:100%;"
              @change="handleScaleChange"
              :disabled="!isformdisabled"
            ></el-input-number>
          </template>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="4" style="padding:0 10px;">
      <el-col :span="12">
        <el-form-item label="项目地点" prop="siteShi">
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
      <el-col :span="12">
        <el-form-item label="项目状态" prop="dongtai">
          <el-select
            v-model="form.variables.dongtai"
            :disabled="!isformdisabled"
            clearable
            placeholder="请选择项目状态"
            style="width:100%;"
          >
            <el-option
              v-for="item in formStateList"
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
        <el-form-item label="预计动工时间" prop="startTime">
          <el-date-picker
            v-model="form.variables.startTime"
            type="date"
            placeholder="选择预计动工时间"
            align="right"
            value-format="yyyy-MM-dd"
            style="width:100%;"
            :picker-options="pickerOptions"
            :disabled="!isformdisabled"
          ></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="协调费上限(元)" prop="xtfsx">
          <el-input-number
            v-model="computeCoordinationCost"
            disabled
            :precision="2"
            placeholder="系统自动生成"
            style="width:100%;"
          />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="4" style="padding:0 10px;">
      <el-col :span="12">
        <el-form-item label="售前人员" prop="presaleManName">
          <el-input
            v-model="form.variables.presaleManName"
            placeholder="请选择售前人员"
            style="width:100%;"
            :disabled="!isformdisabled"
            @focus="dialogName = 'participantsDialog'"
          />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="4" style="padding:0 10px;">
      <el-col :span="24">
        <el-form-item label="项目概况" prop="beizhu">
          <el-input
            v-model="form.variables.beizhu"
            type="textarea"
            :rows="2"
            :disabled="!isformdisabled"
            placeholder="请输入超过100字的项目概况"
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

    <el-row :gutter="4" style="padding:0 10px;" v-if="this.$store.getters.roles.includes('dept_leader') || this.$store.getters.roles.includes('general_manager') || this.$store.getters.userId == this.form.variables.createUserId|| this.form.variables.id == undefined">
      <el-col :span="24">
        <el-form-item label="客户信息" class="title_class">
          <el-divider></el-divider>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="4" style="padding:0 10px;" v-if="this.$store.getters.roles.includes('dept_leader') || this.$store.getters.roles.includes('general_manager') || this.$store.getters.userId == this.form.variables.createUserId|| this.form.variables.id == undefined">
      <el-col :span="12">
        <el-form-item label="客户姓名" prop="customName">
          <el-input
            v-model="form.variables.customName"
            :disabled="!isformdisabled"
            placeholder="请输入客户姓名"
            style="width:100%;"
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="客户单位" prop="customUnit">
          <el-input
            v-model="form.variables.customUnit"
            :disabled="!isformdisabled"
            placeholder="请输入客户单位"
            style="width:100%;"
          />
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="4" style="padding:0 10px;" v-if="this.$store.getters.roles.includes('dept_leader') || this.$store.getters.roles.includes('general_manager') || this.$store.getters.userId == this.form.variables.createUserId|| this.form.variables.id == undefined">
      <el-col :span="12">
        <el-form-item label="客户职位" prop="customPost">
          <el-input
            v-model="form.variables.customPost"
            :disabled="!isformdisabled"
            placeholder="请输入客户职位"
            style="width:100%;"
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="联系电话" prop="customTel">
          <el-input
            v-model="form.variables.customTel"
            :disabled="!isformdisabled"
            placeholder="请输入联系电话"
            style="width:100%;"
          />
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="4" style="padding:0 10px;" >
      <el-col :span="24">
        <el-form-item label="补充信息" class="title_class">
          <el-divider></el-divider>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="4" style="padding:0 10px;">
      <el-col :span="12">
        <el-form-item label="管理公司" prop="guanligongsi">
          <el-input
            v-model="form.variables.guanligongsi"
            :disabled="!isformdisabled"
            placeholder="请输入管理公司"
            style="width:100%;"
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="总包单位" prop="kehudanwei">
          <el-input
            v-model="form.variables.kehudanwei"
            :disabled="!isformdisabled"
            placeholder="请输入总包单位"
            style="width:100%;"
          />
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="4" style="padding:0 10px;">
      <el-col :span="12">
        <el-form-item label="设计单位" prop="shejidanwei">
          <el-input
            v-model="form.variables.shejidanwei"
            :disabled="!isformdisabled"
            placeholder="请输入设计单位"
            style="width:100%;"
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="监理单位" prop="jianlidanwei">
          <el-input
            v-model="form.variables.jianlidanwei"
            :disabled="!isformdisabled"
            placeholder="请输入监理单位"
            style="width:100%;"
          />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="4" style="padding:0 10px;">
      <el-col :span="24">
        <el-form-item label="主要竞争对手" prop="jingzhengduishou">
          <el-input
            v-model="form.variables.jingzhengduishou"
            :disabled="!isformdisabled"
            placeholder="请输入主要竞争对手"
            style="width:100%;"
          />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="4" style="padding:0 10px;">
      <el-col :span="24">
        <el-form-item label="备注" prop="beizhuBuchong">
          <el-input
            v-model="form.variables.beizhuBuchong"
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
        <el-form-item label="风险评估" class="title_class">
          <el-divider></el-divider>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="4" style="padding:0 10px;">
      <el-col :span="12">
        <el-form-item label="投资方信誉" prop="xinyu">
          <el-select
            v-model="form.variables.xinyu"
            :disabled="!isformdisabled"
            clearable
            placeholder="请选择投资方信誉"
            style="width:100%;"
          >
            <el-option
              v-for="item in formCreditList"
              :key="item.dictValue"
              :label="item.dictLabel"
              :value="item.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="技术支撑评估" prop="jishupinggu">
          <el-select
            v-model="form.variables.jishupinggu"
            :disabled="!isformdisabled"
            clearable
            placeholder="请选择技术支撑评估"
            style="width:100%;"
          >
            <el-option
              v-for="item in formTechList"
              :key="item.dictValue"
              :label="item.dictLabel"
              :value="item.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="4" style="padding:0 10px;">
      <el-col :span="24">
        <el-form-item label="备注" prop="beizhuPinggu">
          <el-input
            v-model="form.variables.beizhuPinggu"
            type="textarea"
            :rows="2"
            :disabled="!isformdisabled"
            placeholder="请输入备注"
            style="width:100%;"
          />
        </el-form-item>
      </el-col>
    </el-row>
    <!-- 弹窗 -->
    <singleCascader
      v-if="dialogName === 'participantsDialog'"
      @close="finishParticipants"
      :list="treeselectData"
    />
  </el-form>
</template>

<script>
import { save } from '../../../../api/biz/trackProject'
import { definitionStart } from '@/api/flowable/definition'
import { complete } from '@/api/flowable/process'
import { getFileDetail } from '@/api/system/file'
import { formatDate } from '@/utils'
import { treeselect } from '@/api/system/dept'
import singleCascader from '@/components/Process/components/nodePanel/property/singleCascader'


export default {
  components: { singleCascader },
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
      treeselectData: [],
      dialogName: '',
      siteShiArr: [],
      fileList: [],
      fileData: {
        fieldName: 'fujian',
        tableName: 'pms_track_project'
      },
      formUserName: '',
      formDeptName: '',
      form: {
        variables: {
          fujian: '',
          xiangmulaiyuanList: [],
          xiangmulaiyuan: '',
          guimo: 0,
          leixing: '',
          presaleManName: '',
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
      formSourceList: [],
      formSourceCommunicationList: [],
      formSourceIntegrationList: [],
      formSourceAdministrationList: [],
      formProjectTypeList: [],
      formInvestmentList: [],
      formRegionList: [],
      formStateList: [],
      formCreditList: [],
      formTechList: [],
      uploadHeaders: {
        Authorization: ''
      },
      uploadUrl: process.env.VUE_APP_BASE_API + '/common/batchUpload',
      rules: {
        xiangmulaiyuan: [
          { required: true, message: '请选择项目来源', trigger: 'blur' }
        ],
        xiangmulaiyuanList: [
          { required: true, message: '请选择项目来源', trigger: 'blur' }
        ],
        projectName: [
          { required: true, message: '请输入项目名称', trigger: 'blur' }
        ],
        leixing: [
          { required: true, message: '请选择项目类型', trigger: 'blur' }
        ],
        jianshedanwei: [
          { required: true, message: '请输入建设(投资)方', trigger: 'blur' }
        ],
        touzixingzhi: [
          { required: true, message: '请选择投资性质', trigger: 'blur' }
        ],
        guimo: [{ required: true, message: '请输入投资规模', trigger: 'blur' }],
        siteShi: [
          { required: true, message: '请选择项目地点', trigger: 'blur' }
        ],
        dongtai: [
          { required: true, message: '请选择项目状态', trigger: 'blur' }
        ],
        startTime: [
          { required: true, message: '请选择预计动工时间', trigger: 'blur' }
        ],
        xinyu: [
          { required: true, message: '请选择投资方信誉', trigger: 'blur' }
        ],
        jishupinggu: [
          { required: true, message: '请选择技术支撑评估', trigger: 'blur' }
        ],
        presaleManName: [
          { required: true, message: '请选择技术支撑评估', trigger: 'blur' }
        ],
        beizhu: [
          { required: true, message: '请输入超过100字的项目概况', trigger: 'blur',min:100 }
        ],

        customName:[{ required: true, message: '请输入客户名称', trigger: 'blur' }],
        customTel: [{pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/, message: "请输入正确的手机号码", trigger: "blur",required:true}],
        customPost:[{ required: true, message: '请输入客户职位', trigger: 'blur' }],
        customUnit:[{ required: true, message: '请输入客户单位名称', trigger: 'blur' }],
      }
    }
  },
  created() {
    console.log(this.$store.getters.roles.includes("admin"))
    // const proData = localStorage.getItem('proData')
    // 项目来源
    this.getDicts('project_source').then((res) => {
      this.formSourceList = res.data
    })
    // 项目来源 - 通信
    this.getDicts('project_source_communication').then((res) => {
      this.formSourceCommunicationList = res.data
    })
    // 项目来源 - 集成
    this.getDicts('project_source_integration').then((res) => {
      this.formSourceIntegrationList = res.data
    })
    // 项目来源 - 市政
    this.getDicts('project_source_administration').then((res) => {
      this.formSourceAdministrationList = res.data
    })
    // 项目类型
    this.getDicts('project_type').then((res) => {
      this.formProjectTypeList = res.data
    })
    // 投资性质
    this.getDicts('investment_property').then((res) => {
      this.formInvestmentList = res.data
    })
    // 项目地点
    this.getRegionTree().then((res) => {
      this.formRegionList = res.data
    })
    // 项目状态
    this.getDicts('project_status').then((res) => {
      this.formStateList = res.data
    })
    // 投资方信誉
    this.getDicts('investor_reputation').then((res) => {
      this.formCreditList = res.data
    })
    // 技术支撑评估
    this.getDicts('tech_assessment').then((res) => {
      this.formTechList = res.data
    })

    // const id = localStorage.getItem('id')
    const id = this.local_val.id
    if (id) {
      this.form.id = id
    }

    // this.form.formId = localStorage.getItem('formId')
    this.form.formId = this.local_val.formId
    this.gettreeselect()
  },
  methods: {
    gettreeselect() {
      treeselect().then((res) => {
        this.treeselectData = res.data.map((item) => {
          item.value = item.id
          return item
        })
      })
    },
    finishParticipants(check) {
      this.dialogName = ''
      this.form.variables.presaleMan = check.userId
      this.form.variables.presaleManName = check.nickName
      // this.form.formColVar = check.userId
      this.$refs.form.clearValidate('presaleManName')
    },
    handleChangeSource(value){
      this.form.variables.xiangmulaiyuan = value.join(";")
    },
    clearSourceOption() {
      this.form.variables.xiangmulaiyuan = ''
      this.form.variables.xiangmulaiyuanList = []
      this.$refs.xiangmulaiyuan && (this.$refs.xiangmulaiyuan.selectedLabel = '')
    },
    handleScaleChange() {
      const scale = this.form.variables.guimo
      const limit = scale * 0.02
      if (limit < 5000) {
        this.form.variables.xtfsx = 5000
      } else if (limit > 30000) {
        this.form.variables.xtfsx = 30000
      } else {
        this.form.variables.xtfsx = limit.toFixed(2)
      }
    },
    handleRegionChange(value) {
      console.log(value)
      this.form.variables.siteShi = this.siteShiArr.join(',')
    },
    downloadFile({ url }) {
      window.open(url)
    },
    handleAvatarSuccess({ data }, file, fileList) {
      this.form.variables.fujian = this.form.variables.fujian == null ? '' : this.form.variables.fujian
      this.form.variables.fujian += `;${data[0].fileId}`
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

            console.log('submit!', this.form)
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
      console.log('id = ' + id)
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
      async handler(val) {
        this.uploadHeaders.Authorization = 'Bearer ' + this.$store.getters.token
        if (val) {
          let dataArr = JSON.parse(val)
          this.form.variables = {
            ...dataArr[0]
          }
          this.siteShiArr = this.form.variables.siteShi.split(',')
          this.form.variables.xiangmulaiyuanList = this.form.variables.xiangmulaiyuan.split(";")
          const res = await this.getUserAll()
          this.form.variables.presaleManName = this.selectUserNameByUserId(res, this.form.variables.presaleMan)

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
  computed:{
    computeCoordinationCost: function (){
      let contractMoney =
        this.form.variables.guimo == null
          ? 0
          : this.form.variables.guimo
      let projectType = this.form.variables.leixing
      let percent = 0
      if(projectType == '1'){
        //通信
        let source = this.form.variables.xiangmulaiyuan
        percent = source.split("-")[1]
      }else if (projectType == '2'){
        //市政
        let sourceArr = this.form.variables.xiangmulaiyuan.split(";")
        for(let i=0;i<sourceArr.length;i++){
          percent += parseFloat(sourceArr[i].split("-")[1])
        }
      }else if (projectType == '3'){
        //集成
        let sourceArr = this.form.variables.xiangmulaiyuan.split(";")
        for(let i=0;i<sourceArr.length;i++){
          percent += parseFloat(sourceArr[i].split("-")[1])
        }
      }else{
        percent = 100
      }
      let coordinationCost = contractMoney*0.02
      if(coordinationCost > 30000){
        coordinationCost = 30000
      }
      coordinationCost = coordinationCost*percent/100
      this.form.variables.xtfsx = coordinationCost
      return coordinationCost

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

