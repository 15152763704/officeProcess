<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryForm"
      :inline="true"
      label-width="120px"
      style="margin-bottom:10px;"
      v-show="showSearch"
    >
      <el-card class="box-card" :body-style="{ padding: '14px 15px 7px' }">
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
            <el-button type="primary" icon="el-icon-search" size="mini" @click.stop="handleQuery">搜索</el-button>
            <el-button icon="el-icon-refresh" size="mini" @click.stop="resetQuery">重置</el-button>
            <el-button
              icon="el-icon-arrow-down"
              type="primary"
              size="mini"
              @click.stop="cardClick"
            >高级搜索
            </el-button>
          </el-form-item>
        </div>
        <el-collapse-transition>
          <div v-show="ifCardShow">
            <div class="my-col">
              <el-form-item label="申请事由" prop="id">
                <el-input
                  v-model="queryParams.purpose"
                  placeholder="请输入申请事由"
                  clearable
                  size="small"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
              <el-form-item label="申请人" prop="createUserName">
                <el-input
                  v-model="queryParams.createUserName"
                  clearable
                  placeholder="请输入申请人"
                  size="small"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
              <el-form-item label="用途类型" prop="zzlx">
                <el-select v-model="queryParams.zzlx" clearable placeholder="请选择用途类型">
                  <el-option
                    v-for="item in formDataTypeList"
                    :key="item.dictValue"
                    :label="item.dictLabel"
                    :value="item.dictValue"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="流程状态" prop="prostate">
                <el-select v-model="queryParams.prostate" clearable placeholder="请选择流程状态">
                  <el-option
                    v-for="item in processStatusList"
                    :key="item.dictValue"
                    :label="item.dictLabel"
                    :value="item.dictValue"
                  ></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="my-col">
              <el-form-item label="公司名称" prop="company">
                <el-select v-model="queryParams.company" clearable placeholder="请选择公司名称">
                  <el-option
                    v-for="item in formCompanyNameList"
                    :key="item.dictValue"
                    :label="item.dictLabel"
                    :value="item.dictValue"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="申请部门" prop="createDeptName">
                <el-input
                  v-model="queryParams.createDeptName"
                  placeholder="请输入申请部门"
                  clearable
                  size="small"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
              <el-form-item label="申请时间" prop="time">
                <el-date-picker
                  v-model="ApplicationTime"
                  type="daterange"
                  range-separator="至"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  @change="dateChange"
                ></el-date-picker>
              </el-form-item>
              <el-form-item></el-form-item>
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
          v-hasPermi="['system:qualification:add']"
        >新增申请
        </el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="resetQuery"></right-toolbar>
    </el-row>

    <el-table
      v-loading="loading"
      :data="qualificationList"
      @selection-change="handleSelectionChange"
      border
    >
      <el-table-column align="center" type="selection" width="55"/>
      <el-table-column align="center" label="申请事由" prop="purpose" sortable/>
      <el-table-column
        label="公司名称"
        sortable
        align="center"
        prop="company"
        :formatter="companyFormat"
      />
      <el-table-column align="center" label="企业资质" prop="qiyezizhi" sortable/>
      <el-table-column align="center" label="个人资质" prop="gerenzizhi" sortable/>
      <el-table-column align="center" label="接收单位" prop="receivedcompany" sortable/>
      <el-table-column :formatter="zzlxFormat" align="center" label="用途类型" prop="zzlx" sortable/>
      <el-table-column align="center" label="申请人" prop="createUserName" sortable/>
      <el-table-column align="center" label="申请时间" prop="createTime" sortable/>
      <el-table-column
        label="流程状态"
        sortable
        align="center"
        prop="prostate"
        :formatter="prostateFormat"
      />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button v-if="(scope.row.prostate == '0' || scope.row.prostate == '2' || scope.row.prostate == '4') && $store.getters.user.userId == scope.row.createUserId"
                     size="mini"
                     type="text"
                     icon="el-icon-delete"
                     @click.native="handleDelete(scope.row)"
          >删除
          </el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-tickets"
            @click.native="handleFlowRecord(scope.row)"
          >详情
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
  </div>
</template>

<script>
import {
  addQualification,
  delQualification,
  exportQualification,
  getQualification,
  listQualification,
  updateQualification
} from '@/api/biz/qualification'
import { getFlowInfoByFlowId } from '@/api/flowable/definition'
import { formatDate } from '@/utils'

export default {
  name: 'Qualification',
  components: {},
  data() {
    return {
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
      // 资质申请表格数据
      qualificationList: [],
      ApplicationTime: [],
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        startTime: null,
        simpleSearch:'',
        endTime: null,
        createDeptName: null,
        createUserName: null,
        zzlx: null,
        company: null,
        purpose: null,
        prostate: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {},
      ifCardShow: false
    }
  },
  created() {
    // 公司名称
    this.getDicts('form_company_name').then((res) => {
      this.formCompanyNameList = res.data
    })
    // 资料类型、
    this.getDicts('form_data_type').then((res) => {
      this.formDataTypeList = res.data
    })
    // 是否
    this.getDicts('form_process_state').then((res) => {
      this.sysYesNoList = res.data
    })
    // 流程状态
    this.getDicts('form_process_state').then((res) => {
      this.processStatusList = res.data
    })
    this.getList()
  },
  activated(){
    if(localStorage.getItem("needLoadList") === "yes"){
      this.resetQuery()
      localStorage.setItem("needLoadList",undefined)
    }
  },
  methods: {
    dateChange(date) {
      this.queryParams.startTime = date[0]
      this.queryParams.endTime = date[1]
    },
    // 公司名称翻译
    companyFormat(row, column) {
      return this.selectDictLabel(this.formCompanyNameList, row.company)
    },
    // 用途类型翻译
    zzlxFormat(row, column) {
      return this.selectDictLabel(this.formDataTypeList, row.zzlx)
    },
    // 流程状态翻译
    prostateFormat(row, column) {
      return this.selectDictLabel(this.sysYesNoList, row.prostate)
    },
    cardClick() {
      this.ifCardShow = !this.ifCardShow
    },
    /** 查询资质申请列表 */
    getList() {
      this.loading = true
      listQualification(this.queryParams).then((response) => {
        this.qualificationList = response.rows
        this.total = response.total
        this.loading = false
      })
    },
    // 取消按钮
    cancel() {
      this.open = false
      this.reset()
    },
    // 表单重置
    reset() {
      this.form = {
        id: null,
        username: null,
        dept: null,
        purpose: null,
        company: null,
        receivedcompany: null,
        qiyezizhi: null,
        gerenzizhi: null,
        original: null,
        begintime: null,
        endtime: null,
        zzlx: null,
        yxprojectno: null,
        tbprojectno: null,
        scprojectno: null,
        agree: null,
        userid: null,
        qyzzid: null,
        grzzid: null,
        beizhu: null,
        qiyename: null,
        gerenname: null,
        cast: null,
        time: null,
        fujian: null,
        prostate: null,
        createUserName: null,
        createUserId: null,
        createTime: null,
        createDeptName: null,
        createDeptId: null,
        updateUserName: null,
        updateUserId: null,
        updateTime: null
      }
      this.resetForm('form')
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1
      this.getList()
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.queryParams = {
        pageNum: 1,
        pageSize: 10,
        startTime: null,
        endTime: null,
        createDeptName: null,
        createUserName: null,
        zzlx: null,
        company: null,
        purpose: null,
        prostate: null
      }
      this.handleQuery()
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map((item) => item.id)
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    /** 流程流转记录 */
    async handleFlowRecord(row) {
      const { data } = await getFlowInfoByFlowId({
        flowId: 'process_ivrzip5m'
      })
      this.$router.push({
        path: '/task/record/index/qualification',
        query: {
          id: row.id,
          formId: data.formId,
          tableName: 'pms_qualification'
        }
      })
    },
    /**  发起流程申请 */
    handleStartProcess(row) {
      localStorage.setItem('proData', '')
      localStorage.setItem('procInsId', '')
      this.$router.push({
        path: '/task/record/index/qualification',
        query: {
          deployId: row.deploymentId,
          procDefId: row.id,
          formId: row.formId
        }
      })
    },
    /** 新增按钮操作 */
    async handleAdd() {
      const { code, data, msg } = await getFlowInfoByFlowId({
        flowId: 'process_ivrzip5m'
      })
      if (code == 200) {
        this.handleStartProcess(data)
      }
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset()
      const id = row.id || this.ids
      getQualification(id).then((response) => {
        this.form = response.data
        this.open = true
        this.title = '修改资质申请'
      })
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          if (this.form.id != null) {
            updateQualification(this.form).then((response) => {
              this.msgSuccess('修改成功')
              this.open = false
              this.getList()
            })
          } else {
            addQualification(this.form).then((response) => {
              this.msgSuccess('新增成功')
              this.open = false
              this.getList()
            })
          }
        }
      })
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids
      this.$confirm(
        '是否确认删除资质申请编号为"' + ids + '"的数据项?',
        '警告',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      )
        .then(function() {
          return delQualification(ids)
        })
        .then(() => {
          this.getList()
          this.msgSuccess('删除成功')
        })
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams
      this.$confirm('是否确认导出所有资质申请数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(function() {
          return exportQualification(queryParams)
        })
        .then((response) => {
          this.download(response.msg)
        })
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

.el-form-item {
  margin-bottom: 10px;
}

.my-col {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0;

  &:last-child {
    margin-bottom: 0;
  }

  .el-form-item {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
