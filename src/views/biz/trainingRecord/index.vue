<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryForm"
      :inline="true"
      v-show="showSearch"
      label-width="68px"
      style="margin-bottom:10px;">
      <el-card :body-style="{ padding: '14px 15px 7px' }" class="box-card">
        <div slot="header" class="clearfix">
          <el-form-item label="简单搜索" prop="simpleSearch">
            <el-input style="width: 280px;"
              v-model="queryParams.simpleSearch"
              placeholder="简单搜索"
              clearable
              size="small"
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
            <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
            <el-button
              icon="el-icon-arrow-down"
              size="mini"
              type="primary"
              @click.stop="cardClick"
            >高级搜索
            </el-button>
          </el-form-item>
        </div>
        <el-collapse-transition>
          <div v-show="ifCardShow">
            <div class="my-col">
              <el-form-item label="培训编号" prop="trainnum">
                <el-input
                  v-model="queryParams.trainnum"
                  placeholder="请输入培训编号"
                  clearable
                  size="small"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
              <el-form-item label="记录部门" prop="createDeptName">
                <el-input
                  v-model="queryParams.createDeptName"
                  placeholder="请输入记录部门"
                  clearable
                  size="small"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
              <el-form-item label="培训内容" prop="context">
                <el-input
                  v-model="queryParams.context"
                  placeholder="请输入培训内容"
                  clearable
                  size="small"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
              <el-form-item label="考核方式" prop="kaohefangshi">
                <el-select v-model="queryParams.kaohefangshi" placeholder="请选择考核方式" clearable size="small">
                  <el-option
                    v-for="dict in assessmentMethodOptions"
                    :key="dict.dictValue"
                    :label="dict.dictLabel"
                    :value="dict.dictValue"
                  />
                </el-select>
              </el-form-item>
              <el-form-item label="培训效果" prop="peixunxiaoguo">
                <el-select v-model="queryParams.peixunxiaoguo" placeholder="请选择培训效果" clearable size="small">
                  <el-option
                    v-for="dict in trainingEffectOptions"
                    :key="dict.dictValue"
                    :label="dict.dictLabel"
                    :value="dict.dictValue"
                  />
                </el-select>
              </el-form-item>
            </div>
          </div>
        </el-collapse-transition>
      </el-card>

    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
        >新增
        </el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="resetQuery"></right-toolbar>
    </el-row>

    <el-table
      v-loading="loading"
      :data="modelList"
      @selection-change="handleSelectionChange"
      border
    >
      <el-table-column align="center" type="selection" width="55"/>
      <el-table-column align="center" label="培训编号" prop="trainnum" sortable/>
      <el-table-column align="center" label="记录部门" prop="createDeptName" sortable/>
      <el-table-column align="center" label="培训内容" prop="context" sortable/>
      <el-table-column
        label="考核方式"
        sortable
        align="center"
        prop="kaohefangshi"
        :formatter="assessmentMethodFormat"
      />
      <el-table-column
        label="培训效果"
        sortable
        align="center"
        prop="peixunxiaoguo"
        :formatter="trainingEffectFormat"
      />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
          >修改
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改企业资质详情对话框 -->
    <el-dialog :title="title" :visible.sync="open" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <div class="my-col" style="padding-right:40px;">
          <el-form-item label="培训详情" class="title_class">
            <el-divider></el-divider>
          </el-form-item>
        </div>
        <div class="my-col" style="padding-right:40px;">
          <el-form-item label="培训编号" prop="trainnum" style="width: 100%;" v-on:click.native="chooseTrainingApplication">
            <el-input v-model="form.trainnum" disabled placeholder="请选择培训编号" style="width: 100%;">
              <el-button
                @click="chooseTrainingApplication"
                slot="append"
                icon="el-icon-third-guide"
              ></el-button>
            </el-input>
          </el-form-item>
          <el-form-item label="培训内容" prop="context" style="width: 100%;">
            <el-input v-model="form.context" disabled placeholder="系统自动带入" style="width: 100%;"/>
          </el-form-item>
        </div>
        <div class="my-col" style="padding-right:40px;">
          <el-form-item label="培训方式" prop="peixunfangshi" style="width: 100%;">
            <el-input v-model="form.peixunfangshi" disabled placeholder="系统自动带入" style="width: 100%;"/>
          </el-form-item>
          <el-form-item label="培训类型" prop="peixunleixing" style="width: 100%;">
            <el-input v-model="form.peixunleixing" disabled placeholder="系统自动带入" style="width: 100%;"/>
          </el-form-item>
        </div>
        <div class="my-col" style="padding-right:40px;">
          <el-form-item label="培训时间" prop="times" style="width: 100%;">
            <el-input v-model="form.times" disabled placeholder="系统自动带入" style="width: 100%;"/>
          </el-form-item>
          <el-form-item label="培训地点" prop="peixundidian" style="width: 100%;">
            <el-input v-model="form.peixundidian" disabled placeholder="系统自动带入" style="width: 100%;"/>
          </el-form-item>
        </div>
        <div class="my-col" style="padding-right:40px;">
          <el-form-item label="培训讲师" prop="peixunjiangshi" style="width: 100%;">
            <el-input v-model="form.peixunjiangshi" disabled placeholder="系统自动带入" style="width: 100%;"/>
          </el-form-item>
          <el-form-item label="培训课时" prop="peixunkeshi" style="width: 100%;">
            <el-input v-model="form.peixunkeshi" disabled placeholder="系统自动带入" style="width: 100%;"/>
          </el-form-item>
        </div>
        <div class="my-col" style="padding-right:40px;">
          <el-form-item label="参与人员" prop="people" style="width: 100%;">
            <el-input v-model="form.people" disabled placeholder="系统自动带入" style="width: 100%;"/>
          </el-form-item>
        </div>
        <div class="my-col" style="padding-right:40px;">
          <el-form-item label="备注" prop="beizhu" style="width: 100%;">
            <el-input
              v-model="form.beizhu"
              type="textarea"
              :rows="2"
              disabled
              placeholder="系统自动带入"
              style="width:100%;"
            />
          </el-form-item>
        </div>
        <div class="my-col" style="padding-right:40px;">
          <el-form-item label="记录详情" class="title_class">
            <el-divider></el-divider>
          </el-form-item>
        </div>
        <div class="my-col" style="padding-right:40px;">
          <el-form-item label="记录人" prop="createUserName" style="width: 100%;">
            <el-input v-model="createUserName" disabled placeholder="系统自动带入" style="width: 100%;"/>
          </el-form-item>
          <el-form-item label="记录部门" prop="context" style="width: 100%;">
            <el-input v-model="formDeptName" disabled placeholder="系统自动带入" style="width: 100%;"/>
          </el-form-item>
        </div>
        <div class="my-col" style="padding-right:40px;">
          <el-form-item label="记录时间" prop="createUserId" style="width: 100%;">
            <el-date-picker
              v-model="form.createTime"
              align="right"
              type="date"
              disabled
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              placeholder="系统自动生成"
              style="width: 100%;"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="考核方式" prop="context" style="width: 100%;">
            <el-select
              v-model="form.kaohefangshi"
              clearable
              placeholder="请选择考核方式"
              style="width:100%;"
            >
              <el-option
                v-for="item in assessmentMethodOptions"
                :key="item.dictValue"
                :label="item.dictLabel"
                :value="item.dictValue"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="my-col" style="padding-right:40px">
          <el-form-item label="培训效果" prop="context" style="width: 100%;">
            <el-select
              v-model="form.peixunxiaoguo"
              clearable
              placeholder="请选择培训效果"
              style="width:100%;"
            >
              <el-option
                v-for="item in trainingEffectOptions"
                :key="item.dictValue"
                :label="item.dictLabel"
                :value="item.dictValue"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item style="width: 100%;"></el-form-item>
        </div>
        <div class="my-col" style="padding-right:40px">
          <el-form-item label="培训签到表" prop="fileSignIn">
            <el-upload
              :before-upload="checkMyFileSize"
              class="upload-demo"
              :headers="uploadHeaders"
              :action="uploadUrl"
              :on-success="handleAvatarSuccessForSignIn"
              :file-list="fileSignInList"
              :on-remove="handleRemoveForSignIn"
              :on-preview="downloadFile"
              :data="fileSignInParam"
              style="width:100%;"
              multiple
            >
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-form-item>
        </div>
        <div class="my-col" style="padding-right:40px">
          <el-form-item label="培训考核表" prop="fileCheck">
            <el-upload
              :before-upload="checkMyFileSize"
              class="upload-demo"
              :headers="uploadHeaders"
              :action="uploadUrl"
              :on-success="handleAvatarSuccessForCheck"
              :file-list="fileCheckList"
              :on-remove="handleRemoveForCheck"
              :on-preview="downloadFile"
              :data="fileCheckParam"
              style="width:100%;"
              multiple
            >
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-form-item>
        </div>
        <div class="my-col" style="padding-right:40px;">
          <el-form-item label="备注" prop="jilubeizhu" style="width: 100%;">
            <el-input
              v-model="form.jilubeizhu"
              type="textarea"
              :rows="2"
              placeholder="请输入备注"
              style="width:100%;"
            />
          </el-form-item>
        </div>
        <div class="my-col" style="padding-right:40px">
          <el-form-item label="附件" prop="fileOther">
            <el-upload
              :before-upload="checkMyFileSize"
              class="upload-demo"
              :headers="uploadHeaders"
              :action="uploadUrl"
              :on-success="handleAvatarSuccessForOther"
              :file-list="fileOtherList"
              :on-remove="handleRemoveForOther"
              :on-preview="downloadFile"
              :data="fileOtherParam"
              style="width:100%;"
              multiple
            >
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-form-item>
        </div>


      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>


    </el-dialog>
    <!-- 弹窗 -->
    <TrainingApplicationPopup
      :isshow="isChoose"
      @transferTrainingApplicationData="getTrainingApplication"
      @onBeforeClose="onBeforeClose"
      req-url="/system/trainingapplication/listAll"
    />
  </div>
</template>

<script>
import { getInfo, list, save } from '@/api/biz/trainingRecord'
import TrainingApplicationPopup from '@/components/Popup/TrainingApplicationPopup'
import { getFileDetailByServiceId } from '@/api/system/file'
import { formatDate } from '@/utils'

export default {
  name: 'TrainingRecord',
  components: { TrainingApplicationPopup },
  data() {
    return {
      ifCardShow:false,
      formatDate,
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 考核方式字典
      assessmentMethodOptions: [],
      // 培训效果字典
      trainingEffectOptions: [],
      formTrainMethodList: [],
      formTrainTypeList: [],
      userList: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        simpleSearch:'',
        created: null,
        company: null,
        name: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        trainnum: [
          { required: true, message: '请选择培训编号', trigger: 'blur' }
        ],
        kaohefangshi: [
          { required: true, message: '请选择考核方式', trigger: 'blur' }
        ],
        peixunxiaoguo: [
          { required: true, message: '请选择培训效果', trigger: 'blur' }
        ],
        fileSignIn: [
          { required: true, message: '请上传培训签到表', trigger: 'change' }
        ],
        fileCheck: [
          { required: true, message: '请上传培训考核表', trigger: 'change' }
        ]
      },
      createUserName: '',
      formDeptName: '',
      modelList: [],
      isChoose: false,
      uploadHeaders: {
        Authorization: ''
      },
      uploadUrl: process.env.VUE_APP_BASE_API + '/common/batchUpload',
      fileSignInIds: '',
      fileSignInList: [],
      fileSignInParam: {
        fieldName: 'signIn',
        tableName: 'pms_training_record'
      },
      fileCheckIds: '',
      fileCheckList: [],
      fileCheckParam: {
        fieldName: 'check',
        tableName: 'pms_training_record'
      },
      fileOtherIds: '',
      fileOtherList: [],
      fileOtherParam: {
        fieldName: 'other',
        tableName: 'pms_training_record'
      }
    }
  },
  created() {
    this.uploadHeaders.Authorization = 'Bearer ' + this.$store.getters.token
    this.getList()
    this.getDicts('assessment_method').then((response) => {
      this.assessmentMethodOptions = response.data
    })
    this.getDicts('training_effect').then((response) => {
      this.trainingEffectOptions = response.data
    })
    // 培训方式
    this.getDicts('train_method').then((res) => {
      this.formTrainMethodList = res.data
    })
    // 培训类型
    this.getDicts('train_type').then((res) => {
      this.formTrainTypeList = res.data
    })
    // 用户列表
    this.getUserAll().then((res) => {
      this.userList = res
    })
  },
  methods: {
    cardClick() {
      this.ifCardShow = !this.ifCardShow
    },
    onBeforeClose() {
      this.isChoose = false
    },
    getTrainingApplication(row) {
      if (row) {
        this.form.trainnum = row.trainnumber
        this.form.context = row.neirong
        this.form.peixunfangshi = this.selectDictLabel(this.formTrainMethodList, row.sfwc)
        this.form.peixunleixing = this.selectDictLabel(this.formTrainTypeList, row.leixing)
        this.form.times = row.trainingtime
        this.form.peixundidian = row.trainingplace
        this.form.peixunjiangshi = row.traininginstructors
        this.form.peixunkeshi = row.keshi
        this.form.people = this.selectUserNameByUserId(this.userList, row.traininguser)
        this.form.beizhu = row.remark
      }
      this.isChoose = false
    },
    chooseTrainingApplication() {
      this.isChoose = true
    },
    downloadFile({ url }) {
      window.open(url)
    },
    handleAvatarSuccessForSignIn({ data }, file, fileList) {
      this.fileSignInIds = this.fileSignInIds == null ? '' : this.fileSignInIds
 this.fileSignInIds += `;${data[0].fileId}`
      this.rules.fileSignIn = []
      this.$refs.form.clearValidate('fileSignIn')
    },
    handleAvatarSuccessForCheck({ data }, file, fileList) {
      this.fileCheckIds = this.fileCheckIds == null ? '' : this.fileCheckIds
 this.fileCheckIds += `;${data[0].fileId}`
      this.rules.fileCheck = []
      this.$refs.form.clearValidate('fileCheck')
    },
    handleAvatarSuccessForOther({ data }, file, fileList) {
      this.fileOtherIds = this.fileOtherIds == null ? '' : this.fileOtherIds
 this.fileOtherIds += `;${data[0].fileId}`
    },
    handleRemoveForSignIn(file, fileList) {
      let idArr
      if (this.form.id) {
        idArr = fileList.map((item) => item.id)
      } else {
        idArr = fileList.map((item) => item.response.data[0].fileId)
      }
      this.fileSignInIds = idArr.join(';')
      if (idArr.length == 0) {
        this.rules.fileSignIn = [
          { required: true, message: '请上传培训签到表', trigger: 'change' }
        ]
      }
    },
    handleRemoveForCheck(file, fileList) {
      let idArr
      if (this.form.id) {
        idArr = fileList.map((item) => item.id)
      } else {
        idArr = fileList.map((item) => item.response.data[0].fileId)
      }
      this.fileCheckIds = idArr.join(';')
      if (idArr.length == 0) {
        this.rules.fileCheck = [
          { required: true, message: '请上传培训考核表', trigger: 'change' }
        ]
      }
    },
    handleRemoveForOther(file, fileList) {
      let idArr
      if (this.form.id) {
        idArr = fileList.map((item) => item.id)
      } else {
        idArr = fileList.map((item) => item.response.data[0].fileId)
      }
      this.fileOtherIds = idArr.join(';')
    },
    /** 查询企业资质详情列表 */
    getList() {
      this.loading = true
      this.queryParams.params = {}
      if (null != this.daterangeCreated && '' != this.daterangeCreated) {
        this.queryParams.startTime = this.daterangeCreated[0]
        this.queryParams.endTime = this.daterangeCreated[1]
      }
      list(this.queryParams).then((data) => {
        this.modelList = data.rows
        this.total = data.total
        this.loading = false
      })
    },
    // 	考核方式字典翻译
    assessmentMethodFormat(row, column) {
      return this.selectDictLabel(this.assessmentMethodOptions, row.kaohefangshi)
    },
    // 	培训效果字典翻译
    trainingEffectFormat(row, column) {
      return this.selectDictLabel(this.trainingEffectOptions, row.peixunxiaoguo)
    },
    // 取消按钮
    cancel() {
      this.open = false
      this.reset()
    },
    // 表单重置
    reset() {
      this.form = {
        createUserId: null,
        createTime: null,
        domains: [
          {
            company: '',
            name: ''
          }
        ]
      }
      this.fileSignInIds = ''
      this.fileSignInList = []
      this.fileCheckIds = ''
      this.fileCheckList = []
      this.fileOtherIds = ''
      this.fileOtherList = []
      this.resetForm('form')
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1
      this.getList()
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.daterangeCreated = []
      this.queryParams.startTime = null
      this.queryParams.endTime = null
      this.resetForm('queryForm')
      this.handleQuery()
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      console.log('selection', selection)
      this.ids = selection.map((item) => {
        return {
          id: item.id,
          parentid: item.parentid
        }
      })
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset()
      this.open = true
      this.title = '添加培训记录'
      const currentUser = this.$store.getters.user
      this.createUserName = this.$store.getters.name
      this.formDeptName = currentUser.dept.deptName
      this.form.createUserId = this.$store.getters.userId
      this.form.createTime = formatDate(new Date().getTime())
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset()
      const id = row.id
      getInfo(id).then((response) => {
        this.form = response.data
        this.open = true
        this.title = '修改培训记录'
        this.createUserName = response.data.createUserName
        this.formDeptName = response.data.createDeptName
        this.getFileDetailByServiceId(id)
      })
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          let msg = ''
          if (this.form.id != null) {
            msg = '修改成功'
          } else {
            msg = '新增成功'
          }
          this.form.fujian = this.fileSignInIds + this.fileCheckIds + this.fileOtherIds
          save(this.form).then((response) => {
            this.msgSuccess(msg)
            this.open = false
            this.getList()
          })
        }
      })
    },
    async getFileDetailByServiceId(id) {
      const { code, data, msg } = await getFileDetailByServiceId(id)
      if (code == 200) {
        data.map((item) => {
          if (item.fieldName == 'signIn') {
            this.fileSignInList.push({
              name: item.fileName,
              url: item.savePath,
              id: item.id
            })
          } else if (item.fieldName == 'check') {
            this.fileCheckList.push({
              name: item.fileName,
              url: item.savePath,
              id: item.id
            })
          } else if (item.fieldName == 'other') {
            this.fileOtherList.push({
              name: item.fileName,
              url: item.savePath,
              id: item.id
            })
          }
        })
      }
    }
  }
}
</script>
<style lang="scss">
  .clearfix {
    width: 100%;
    text-align: right;
    .el-input__inner{
      border-radius: 25px;
    }
  }


.my-col {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;

  .el-form-item {
    flex: 1;
    margin-bottom: 0;
  }
}
</style>
<style lang="scss">
.noleftform {
  div {
    margin-left: 0 !important;
  }
}
</style>
