<!--
 * @Author: chad
 * @Date: 2021-10-26 09:02:48
 * @LastEditTime: 2021-11-18 14:38:36
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
        label-width="130px"
        style="overflow: hidden;"
    >
      <el-row :gutter="4" style="padding:0 10px;">
        <el-col :span="24">
          <el-form-item class="title_class" label="报销申请">
            <el-divider></el-divider>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="4" style="padding:0 10px;">
        <el-col :span="12">
          <el-form-item label="报销人" prop="username">
            <el-input v-model="formUserName" disabled placeholder="请输入报销人" style="width:100%;"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="报销部门" prop="dept">
            <el-input v-model="formDeptName" disabled placeholder="请输入报销部门" style="width:100%;"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="4" style="padding:0 10px;">
        <el-col :span="12">
          <el-form-item label="报销时间" prop="time">
            <el-date-picker
                v-model="form.variables.time"
                disabled
                placeholder="选择日期时间"
                style="width:100%;"
                type="datetime"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="4" style="padding:0 10px;">
        <el-col :span="24">
          <el-form-item class="title_class" label="报销概况">
            <el-divider></el-divider>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="4" style="padding:0 10px;">
        <el-col :span="24">
          <el-form-item label="报销事由" prop="xmbxshiyou">
            <el-input
                v-model="form.variables.xmbxshiyou"
                :disabled="!isformdisabled"
                :rows="3"
                placeholder="请输入报销事由"
                style="width:100%;"
                type="textarea"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="4" style="padding:0 10px;">
        <el-col :span="12">
          <el-form-item label="报支单位" prop="xmbaozhidanwei">
            <el-select
                v-model="form.variables.xmbaozhidanwei"
                :disabled="!isformdisabled"
                placeholder="请选择报支单位"
                style="width:100%;"
            >
              <el-option
                  v-for="dict in formCompanyNameTypeList"
                  :key="dict.dictValue"
                  :label="dict.dictLabel"
                  :value="dict.dictValue"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="报销金额(元)" prop="baoxiaojine">
            <el-input-number
                v-model="form.variables.baoxiaojine"
                :disabled="!isformdisabled"
                :min="0"
                :precision="2"
                :step="1"
                placeholder="请输入报销金额(元)"
                style="width:100%;"
                @input="baoxiaojineChange"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="4" style="padding:0 10px;">
        <el-col :span="12">
          <el-form-item label="报销金额大写" prop="bxjinedx">
            <el-input
                v-model="form.variables.bxjinedx"
                disabled
                placeholder="请输入报销金额大写"
                style="width:100%;"
            />
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="是否抵消借款" prop="sfdx">
            <el-select
                v-model="form.variables.sfdx"
                :disabled="!isformdisabled"
                placeholder="请选择是否抵消借款金额(元)"
                style="width:100%;"
            >
              <el-option
                  v-for="dict in sysYesNoList"
                  :key="dict.dictValue"
                  :label="dict.dictLabel"
                  :value="dict.dictValue"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 增加选择 借款信息  借款金额(元) 本次冲销金额 -->
      <el-row v-if="form.variables.sfdx == 'Y'" :gutter="4" style="padding:0 10px;">
        <el-col :span="12">
          <el-form-item label="借款金额(元)" prop="daijine">
            <el-input
                v-model="form.variables.daijine"
                disabled
                placeholder="点击选择借款信息"
                style="width:100%;"
            >
              <el-button
                  slot="append"
                  icon="el-icon-third-guide"
                  @click="isformdisabled && showSelectLoanBox()"
              ></el-button>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="本次冲销金额" prop="offsetjine">
            <el-input-number
                v-model="form.variables.offsetjine"
                :disabled="!isformdisabled"
                :min="0"
                :precision="2"
                :step="1"
                placeholder="请输入本次冲销金额"
                style="width:100%;"
                @change="offsetjineChange"
            />
          </el-form-item>
        </el-col>
      </el-row>


      <el-row :gutter="4" style="padding:0 10px;">
        <el-col :span="12">
          <el-form-item label="项目名称" prop="projectname">
            <el-input
                v-model="form.variables.projectname"
                disabled
                placeholder="点击选择项目名称"
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
          <el-form-item label="项目编号" prop="projectnum">
            <el-input
                v-model="form.variables.projectnum"
                disabled
                placeholder="请输入项目编号"
                style="width:100%;"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="4" style="padding:0 10px;">
        <el-col :span="12">
          <el-form-item label="项目报销编号" prop="xmbxnums">
            <el-input
                v-model="form.variables.xmbxnums"
                disabled
                placeholder="自动生成编号"
                style="width:100%;"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="报销类型" prop="baoxiaoType">
            <el-select
              v-model="form.variables.baoxiaoType"
              :disabled="!isformdisabled"
              clearable
              placeholder="请选择报销类型"
              style="width:100%;"
            >
              <el-option
                v-for="item in formBaoxiaoTypeList"
                :key="item.dictValue"
                :label="item.dictLabel"
                :value="item.dictValue"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="4" style="padding:0 10px;" v-if="form.variables.baoxiaoType == '1'">
        <el-col :span="12">
          <el-form-item label="项目推进编号" prop="promotionNo">
            <el-input
              v-model="form.variables.promotionNo"
              disabled
              placeholder="点击选择项目推进编号"
              style="width:100%;"
            >
              <el-button
                slot="append"
                icon="el-icon-third-guide"
                @click="isformdisabled && ( isChoose = 'ProductionProjectPromotionPopup')"
              ></el-button>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="推进预算上限(元)" prop="zongyusuan">
            <el-input
              v-model="form.variables.zongyusuan"
              disabled
              placeholder="请输入项目推进预算"
              style="width:100%;"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="4" style="padding:0 10px;"  v-if="form.variables.baoxiaoType == '1'">
        <el-col :span="12">
          <el-form-item label="已累计报销金额(元)" prop="zbaoxiaojine">
            <el-input
              v-model="form.variables.zbaoxiaojine"
              disabled
              placeholder="请输入已累计报销金额"
              style="width:100%;"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="推进金额(元)" prop="promotionMoney">
            <el-input
              v-model="form.variables.promotionMoney"
              disabled
              placeholder="请输入推进金额"
              style="width:100%;"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="4" style="padding:0 10px;"  v-if="form.variables.baoxiaoType == '1'">
        <el-col :span="12">
          <el-form-item label="材料种类" prop="jiushuitype">
            <el-select
              v-model="form.variables.jiushuitype"
              clearable
              disabled
              placeholder="请选择材料种类"
              style="width:100%;"
            >
              <el-option
                v-for="item in formMaterialList"
                :key="item.dictValue"
                :label="item.dictLabel"
                :value="item.dictValue"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="材料数量" prop="nums">
            <el-input
              v-model="form.variables.nums"
              disabled
              placeholder="请输入材料数量"
              style="width:100%;"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="4" style="padding:0 10px;"  v-if="form.variables.baoxiaoType == '1'">
        <el-form-item label="其他费用(元)" prop="qitafeiyong">
          <el-input
            v-model="form.variables.qitafeiyong"
            disabled
            placeholder="请输入其他费用"
            style="width:100%;"
          />
        </el-form-item>
      </el-row>
      <el-row :gutter="4" style="padding:0 10px;" v-show="form.variables.baoxiaoType != '1'">
        <el-col :span="12">
          <el-form-item label="历史报销金额(元)" prop="zheji">
            <el-input
              v-model="form.variables.zheji"
              disabled
              placeholder="请输入历史报销金额(元)"
              style="width:100%;"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="协调费上限(元)" prop="xmxtjine">
            <el-input
              v-model="form.variables.xmxtjine"
              disabled
              placeholder="请输入协调费上限"
              style="width:100%;"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <!--      正式立项选择 -->
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
          <el-form-item label="附件" prop="fujian">
            <el-upload
                :action="uploadUrl"
                :before-upload="checkMyFileSize"
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

      <el-row :gutter="4" style="padding:0 10px;">
        <el-col :span="24">
          <el-form-item class="title_class" label="发票清单">
            <el-divider></el-divider>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row v-if="isformdisabled" :gutter="10" class="mb8" style="padding:0 10px;">
        <el-col :span="1.5">
          <el-button
              icon="el-icon-plus"
              size="mini"
              type="primary"
              @click="handleAddPmsXzbaoxiaoqingdan"
          >添加
          </el-button>
        </el-col>
        <el-col :span="1.5">
          <el-button
              icon="el-icon-delete"
              size="mini"
              type="danger"
              @click="handleDeletePmsXzbaoxiaoqingdan"
          >删除
          </el-button>
        </el-col>
      </el-row>

      <el-row :gutter="4" style="padding:0 10px;">
        <el-col :span="24">
          <el-table
              ref="pmsXzbaoxiaoqingdan"
              :data="form.variables.pmsXmbxqingdanList"
              :row-class-name="rowPmsXzbaoxiaoqingdanIndex"
              border
              @selection-change="handlePmsXzbaoxiaoqingdanSelectionChange"
          >
            <el-table-column align="center" type="selection"/>
            <el-table-column label="发票类型" prop="fplx">
              <template slot-scope="scope">
                <el-select
                    v-model="scope.row.fplx"
                    :disabled="!isformdisabled"
                    placeholder="请选择发票类型"
                    style="width:100%;"
                >
                  <el-option
                      v-for="dict in InvoiceTypeOptions"
                      :key="dict.dictValue"
                      :label="dict.dictLabel"
                      :value="dict.dictValue"
                  ></el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column label="发票金额(元)" prop="fpjine">
              <template slot-scope="scope">
                <el-input-number
                    v-model="scope.row.fpjine"
                    :controls="false"
                    :disabled="!isformdisabled"
                    :min="0"
                    :precision="2"
                    :step="1"
                    placeholder="请输入发票金额(元)"
                    size="large"
                    style="width:100%;"
                />
              </template>
            </el-table-column>
            <el-table-column label="发票编号" prop="fpnum">
              <template slot-scope="scope">
                <el-input
                    v-model="scope.row.fpnum"
                    :disabled="!isformdisabled"
                    placeholder="请输入发票编号"
                    style="width:100%;"
                />
              </template>
            </el-table-column>
            <el-table-column label="发票号码" prop="haoma">
              <template slot-scope="scope">
                <el-input
                    v-model="scope.row.haoma"
                    :disabled="!isformdisabled"
                    placeholder="请输入发票号码"
                    style="width:100%;"
                />
              </template>
            </el-table-column>
            <el-table-column label="发票开具时间" prop="fptime">
              <template slot-scope="scope">
                <el-date-picker
                    v-model="scope.row.fptime"
                    :disabled="!isformdisabled"
                    placeholder="选择发票开具时间"
                    style="width:100%;"
                    type="date"
                    value-format="yyyy-MM-dd"
                ></el-date-picker>
              </template>
            </el-table-column>
            <el-table-column label="备注" prop="beizhu">
              <template slot-scope="scope">
                <el-input
                    v-model="scope.row.beizhu"
                    :disabled="!isformdisabled"
                    placeholder="请输入备注"
                    style="width:100%;"
                />
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <el-row :gutter="4" style="padding:0 10px; margin-top:10px;">
        <el-col :span="24">
          <el-form-item label="合计" prop="heji">
            <el-input v-model="totalnum" disabled placeholder="请输入合计" style="width:100%;"/>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <ProjectLoanPopup
        :isshow="isLoanAmountPopup"
        req-url="/ProjectLoan/projectsjiekuan/my"
        @choosedProect="choosedProect"
        @onBeforeClose="onBeforeClose"
    />
    <ProductionProjectPopup v-if="isChoose === 'ProductionProjectPopup'" req-url="/system/productionproject/myAndTrackMan"
                            @choosedProect="getProject"
    />
    <ProductionProjectPromotionPopup v-if="isChoose === 'ProductionProjectPromotionPopup'" req-url="/system/productionprojectpromotion/listAll"
                           @choosedProect="getProjectPromotion"
    />
  </div>
</template>

<script>
import {
  addProjectbaoxiao,
  getProjectbaoxiao,
  getReimbursementByProjectNum,
  updateProjectbaoxiao
} from '@/api/biz/projectbaoxiao'
import { definitionStart } from '@/api/flowable/definition'
import { complete } from '@/api/flowable/process'
import { getFileDetail } from '@/api/system/file'
import { formatDate } from '@/utils'
import ProjectLoanPopup from '@/components/Popup/ProjectLoanPopup'
import ProductionProjectPopup from '@/components/Popup/ProductionProjectPopup'
import ProductionProjectPromotionPopup from '@/components/Popup/ProductionProjectPromotionPopup'
// 通过跟踪立项编号获取已使用推进成本
import { getHisCostByTrackNo } from '@/api/biz/projectPromotion'
import { getHisCostByProjectNo } from '@/api/biz/productionProjectPromotion'

export default {
  components: {
    ProjectLoanPopup,
    ProductionProjectPopup,
    ProductionProjectPromotionPopup
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
      isLoanAmountPopup: false,
      isChoose: '',
      fujiandata: {
        fieldName: 'fujian',
        tableName: 'pms_projectbaoxiao'
      },
      // 行政办公报销清单表格数据
      pmsXmbxqingdanList: [],
      formBaoxiaoTypeList: [],
      formMaterialList: [],
      // 部门树选项
      deptOptions: '',
      fileList: [],
      bumennameOptions: [],
      fukuanfangshiOptions: [],
      formUserName: '',
      formDeptName: '',
      Editorneirong: '',
      form: {
        variables: {
          time: '',
          xmbxshiyou: '',
          xmbaozhidanwei: '',
          baoxiaojine: '',
          bxjinedx: '',
          sfdx: '',
          daijine: '',
          offsetjine: '',
          projectname: '',
          projectnum: '',
          zheji: '',
          xmxtjine: '',
          xmbxnums: '',
          beizhu: '',
          fujian: '',
          parentid: '',
          baoxiaoType: '',
          zbaoxiaojine: '',
          promotionNo: '',
          zongyusuan: '',
          pmsXmbxqingdanList: [
            {
              fplx: '',
              fpjine: '',
              fpnum: '',
              haoma: '',
              fptime: '',
              beizhu: ''
            }
          ]
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
      sysYesNoList: [],
      InvoiceTypeOptions: [],
      formCompanyNameTypeList: [],
      checkedPmsXzbaoxiaoqingdan: [],
      // 用途类型字典
      typeOptions: [],
      printingShowList: [],
      uploadHeaders: {
        Authorization: ''
      },
      uploadUrl: process.env.VUE_APP_BASE_API + '/common/batchUpload',
      rules: {
        xmbxshiyou: [
          { required: true, message: '请输入报销事由', trigger: 'blur' }
        ],
        xmbaozhidanwei: [
          { required: true, message: '请选择报支单位', trigger: 'change' }
        ],
        baoxiaojine: [
          { required: true, message: '请输入报销金额(元)', trigger: 'change' }
        ],
        bxjinedx: [
          { required: true, message: '请输入报销金额(元)大写', trigger: 'blur' }
        ],
        sfdx: [
          { required: true, message: '请选择是否抵消借款金额(元)', trigger: 'change' }
        ],
        daijine: [
          { required: true, message: '点击选择借款信息', trigger: 'blur' }
        ],
        offsetjine: [
          { required: true, message: '请输入本次冲销金额', trigger: 'change' }
        ],
        projectname: [
          { required: true, message: '点击选择项目名称', trigger: 'blur' }
        ],
        baoxiaoType: [
          { required: true, message: '请选择报销类型', trigger: 'blur' }
        ],
        projectnum: [{ required: true, message: '请输入项目编号', trigger: 'blur' }],
        zheji: [{ required: true, message: '请输入历史报销金额(元)', trigger: 'blur' }],
        xmxtjine: [{ required: true, message: '请输入协调费上限', trigger: 'blur' }],
        beizhu: [{ required: true, message: '请输入备注', trigger: 'blur' }],
        promotionNo: [
          { required: true, message: '请选择项目推进', trigger: 'blur' },
        ],
      }
    }
  },
  computed: {
    totalnum: function() {
      let num = 0.0
      this.form.variables.pmsXmbxqingdanList.forEach((item) => {
        num += item.fpjine * 1
      })
      this.form.variables.heji = num.toFixed(2)
      return num.toFixed(2)
    },
    isShowNumDiv: function() {
      return ['1', '2'].indexOf(this.form.variables.leixing) !== -1
    },
    isShowNameAndJSF() {
      return ['3', '4'].indexOf(this.form.variables.leixing) !== -1
    },
    fixNumLabel() {
      return this.typeOptions.filter(
          (item) => item.dictValue === this.form.variables.leixing
      )[0].dictLabel
    }
  },
  created() {
    this.getDicts('Market_loan_type').then(response => {
      this.typeOptions = response.data
    })
    // const proData = localStorage.getItem('proData')
    this.getDicts('form_company_name').then((res) => {
      this.formCompanyNameTypeList = res.data
    })
    this.getDicts('production_project_baoxiao_type').then((res) => {
      this.formBaoxiaoTypeList = res.data
    })
    // 材料种类
    this.getDicts('project_promotion_material_type').then((res) => {
      this.formMaterialList = res.data
    })
    // const id = localStorage.getItem('id')
    const id = this.local_val.id
    if (id) {
      this.form.id = id
    }
    this.getDicts('sys_yes_no').then((response) => {
      this.sysYesNoList = response.data
    })
    this.getDicts('project_reimbursement_invoice').then((response) => {
      this.InvoiceTypeOptions = response.data
    })
    // this.form.formId = localStorage.getItem('formId')
    this.form.formId = this.local_val.formId
  },
  methods: {
    clearNum() {
      this.form.variables.yxnum = ''
      this.form.variables.yxname = ''
      this.form.variables.xtfsx = ''
      this.form.variables.zbaoxiao = ''
      this.form.variables.gongguannum = ''
      this.form.variables.gongguanname = ''
      this.form.variables.gongguanyusuan = ''
      this.form.variables.toubiaonum = ''
      this.form.variables.toubiaoname = ''
    },
    onBeforeClose() {
      this.isLoanAmountPopup = false
    },
    offsetjineChange(data) {
      if (data > this.form.variables.daidixiaojine * 1) {
        this.form.variables.offsetjine = ''
        this.msgError('冲销金额不能大于借款待还款金额')
      } else if (data > this.form.variables.baoxiaojine * 1) {
        this.form.variables.offsetjine = ''
        this.msgError('冲销金额不能大于报销金额(元)')
      }
    },
    /** 单选框选中数据 */
    handlePmsXzbaoxiaoqingdanSelectionChange(selection) {
      this.checkedPmsXzbaoxiaoqingdan = selection.sort(
          (a, b) => b.index - a.index
      )
    },
    async getProject(row) {
      if (row) {
        this.form.variables.projectnum = row.projectCode
        this.form.variables.projectname = row.projectName
        this.form.variables.xmxtjine = row.guanlifei
        const { data } = await getReimbursementByProjectNum(row.projectCode)
        this.form.variables.zheji = data
      }
      this.isChoose = ''
    },
    getProjectPromotion(row) {
      if (row) {
        this.form.variables.promotionNo = row.num
        this.form.variables.zongyusuan = row.zongyusuan
        this.form.variables.promotionMoney = row.qitafeiyong
        this.form.variables.jiushuitype = row.jiushuitype
        this.form.variables.nums = row.nums
        this.form.variables.qitafeiyong = row.qitafeiyong
        this.fillCostByProjectNo(row.projectnum,row.zongyusuan)
      }
      this.isChoose = ''
    },
    fillCostByProjectNo(projectNo,total){
      getHisCostByProjectNo(projectNo).then((res) => {
        let reimbursement = res.data.reimbursement
        this.form.variables.zbaoxiaojine = reimbursement
      })
    },

    /** 行政办公报销清单序号 */
    rowPmsXzbaoxiaoqingdanIndex({ row, rowIndex }) {
      row.index = rowIndex
    },
    showSelectLoanBox(value) {
      this.isLoanAmountPopup = true
    },
    showSelectLoanBoxs(value) {
      const keymap = new Map([
        ['1', () => 'TrackProjectPopup'],
        ['2', () => 'TrackProjectPopup'],
        ['3', () => 'BidProjectPopup'],
        ['4', () => 'BidProjectPopup']
      ])
      this.isChoose = keymap.get(value) && keymap.get(value)()
    },
    async getHisCostByTrackNum(numbers) {
      const { data } = await getHisCostByTrackNo(numbers)
      return data.reimbursement
    },
    async getTrackProject(row) {
      const keymap = new Map([
        [
          '1',
          async() => ({
            projectid: row.id,
            yxnum: row.numbers,
            yxname: row.projectName,
            xtfsx: row.xtfsx,
            zbaoxiao: await this.getHisCostByTrackNum(row.numbers)
          })
        ],
        [
          '2',
          async() => ({
            projectid: row.id,
            yxnum: row.numbers,
            yxname: row.projectName,
            xtfsx: row.xtfsx,
            zbaoxiao: await this.getHisCostByTrackNum(row.numbers)
          })
        ],
        [
          '3',
          () => ({
            toubiaonum: row.num,
            toubiaoname: row.projectname
          })
        ],
        [
          '4',
          () => ({
            toubiaonum: row.num,
            toubiaoname: row.projectname
          })
        ]
      ])
      const result =
          row &&
          await keymap.get(this.form.variables.leixing) &&
          await keymap.get(this.form.variables.leixing)()
      console.log('result', result)
      this.form.variables = {
        ...this.form.variables,
        ...result
      }
      this.isChoose = ''
    },
    choosedProect(row) {
      this.isLoanAmountPopup = false
      if (row) {
        console.log(row)
        this.form.variables.parentid = row.id
        this.form.variables.daijine = row.jiekuanjine
        this.form.variables.daidixiaojine = row.daijine
      }
    },
    /** 行政办公报销清单添加按钮操作 */
    handleAddPmsXzbaoxiaoqingdan() {
      let obj = {
        leixing: '',
        jine: '',
        num: '',
        nums: '',
        time: '',
        beizhu: ''
      }
      this.form.variables.pmsXmbxqingdanList.push(obj)
    },
    /** 行政办公报销清单删除按钮操作 */
    handleDeletePmsXzbaoxiaoqingdan() {
      if (this.checkedPmsXzbaoxiaoqingdan.length == 0) {
        this.$alert('请先选择要删除的发票清单数据', '提示', {
          confirmButtonText: '确定'
        })
      } else {
        this.checkedPmsXzbaoxiaoqingdan.forEach((item) => {
          this.form.variables.pmsXmbxqingdanList.splice(item.index, 1)
        })
        if (this.form.variables.pmsXmbxqingdanList.length == 0) {
          this.handleAddPmsXzbaoxiaoqingdan()
        }
      }
    },
    baoxiaojineChange(data) {
      this.form.variables.bxjinedx = this.amountConvertToUpperCase(data)
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
    checkMoney(){
      console.log(this.form.variables.heji,this.form.variables.baoxiaojine,this.form.variables.pmsXmbxqingdanList)
      if(this.form.variables.heji != this.form.variables.baoxiaojine){
        this.msgError('请确认发票金额和报销金额一致')
        return false
      }
      return true
    },
    onSubmit() {
      this.$refs['form'].validate(async(valid) => {
        if (valid && this.checkMoney()) {
          // const procInsId = localStorage.getItem('procInsId')
          let procInsId = this.local_val.procInsId
          let submitFlag = true
          let baoxiaoType = this.form.variables.baoxiaoType
          if(baoxiaoType == '1'){//项目推进
            let zongyusuan = this.form.variables.zongyusuan
            let zbaoxiaojine = this.form.variables.zbaoxiaojine
            let baoxiaojine = this.form.variables.baoxiaojine
            let promotionMoney = this.form.variables.promotionMoney
            if(parseFloat(baoxiaojine) + parseFloat(zbaoxiaojine) > parseFloat(zongyusuan)){
              submitFlag = false
              this.msgError('累计报销金额超出协调费上限')
            }else if(parseFloat(baoxiaojine) > (parseFloat(promotionMoney) * 1.2)){
              submitFlag = false
              this.msgError('报销金额超出推进金额的120%')
            }
          }
          if(submitFlag){
            if (procInsId != '' && typeof (procInsId) != 'undefined' && procInsId != 'undefined') {
              this.completeData.instanceId = procInsId
              this.completeData.procInsId = procInsId
              // const taskId = localStorage.getItem('taskId')
              const taskId = this.local_val.taskId
              if (taskId) {
                this.completeData.taskId = taskId
              }
              console.log('审批更新逻辑', this.form)
              const updateSealmsg = await updateProjectbaoxiao({
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
              const { code, data } = await addProjectbaoxiao(this.form.variables)
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
      async handler(val) {
        if (val) {
          let dataArr = JSON.parse(val)
          const { data } = await getProjectbaoxiao(dataArr[0].id)
          console.log('getProjectbaoxiao', data)
          this.form.variables = {
            ...data
          }
          // 请求附件详情
          this.getFileDetail(this.form.variables.fujian)
          this.form.variables.time = this.form.variables.createTime
          this.formUserName = this.form.variables.createUserName
          this.formDeptName = this.form.variables.createDeptName
          // this.Editorneirong = this.form.variables.neirong
          // this.form.variables.ccdepartment =
          //   this.form.variables.ccdepartment.split(';')
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
