<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryForm"
      :inline="true"
      v-show="showSearch"
      label-width="120px"
      style="margin-bottom:10px;"
    >
      <el-card class="box-card" :body-style="{ padding: '14px 15px 7px' }">
        <div slot="header" class="clearfix">
          <el-form-item label="借款事由" prop="jkshiyou">
            <el-input
              v-model="queryParams.jkshiyou"
              placeholder="请输入本次还款金额(元)"
              clearable
              size="small"
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
          <el-form-item label="借款总金额(元)" prop="daihuankuan">
            <el-input
              v-model="queryParams.daihuankuan"
              placeholder="请输入借款总金额(元)"
              clearable
              size="small"
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
          <el-form-item label="借款时间">
            <el-date-picker
              v-model="daterangeCreateTime"
              size="small"
              style="width: 240px"
              value-format="yyyy-MM-dd"
              type="daterange"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
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
              <el-form-item label="本次还款金额(元)" prop="huankuanjine">
                <el-input
                  v-model="queryParams.huankuanjine"
                  placeholder="请输入本次还款金额(元)"
                  clearable
                  size="small"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
              <el-form-item label="剩余还款金额(元)" prop="daijine">
                <el-input
                  v-model="queryParams.daijine"
                  placeholder="请输入剩余还款金额(元)"
                  clearable
                  size="small"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
              <el-form-item label="申请人" prop="createUserName">
                <el-input
                  v-model="queryParams.createUserName"
                  placeholder="请输入申请人"
                  clearable
                  size="small"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
              <el-form-item label="申请人部门" prop="createDeptName">
                <el-input
                  v-model="queryParams.createDeptName"
                  placeholder="请输入申请人部门"
                  clearable
                  size="small"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
            </div>
            <div class="my-col">
              <el-form-item label="流程状态" prop="prostate">
                <el-select
                  v-model="queryParams.prostate"
                  placeholder="请选择流程状态"
                  clearable
                  size="small"
                >
                  <el-option
                    v-for="dict in prostateOptions"
                    :key="dict.dictValue"
                    :label="dict.dictLabel"
                    :value="dict.dictValue"
                  />
                </el-select>
              </el-form-item>
              <el-form-item></el-form-item>
              <el-form-item></el-form-item>
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
          v-hasPermi="['system:xzrepayment:add']"
        >新增申请
        </el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table
      border
      v-loading="loading"
      :data="xzrepaymentList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column align="center" type="selection" width="55"/>
      <el-table-column align="center" label="借款事由" prop="jkshiyou" sortable/>
      <el-table-column align="center" label="借款总金额" prop="daihuankuan" sortable/>
      <el-table-column sortable label="借款时间" align="center" prop="createTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="本次还款金额(元)" prop="huankuanjine" sortable/>
      <el-table-column align="center" label="剩余还款金额(元)" prop="daijine" sortable/>
      <el-table-column align="center" label="申请人" prop="createUserName" sortable/>
      <el-table-column align="center" label="申请人部门" prop="createDeptName" sortable/>
      <el-table-column
        sortable
        label="流程状态"
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
  addXzrepayment,
  delXzrepayment,
  exportXzrepayment,
  getXzrepayment,
  listXzrepayment,
  updateXzrepayment
} from '@/api/biz/xzrepayment'
import { getFlowInfoByFlowId } from '@/api/flowable/definition'

export default {
  name: 'Xzrepayment',
  components: {},
  data() {
    return {
      ifCardShow: false,
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
      // 行政办公还款表格数据
      xzrepaymentList: [],
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 流程状态字典
      prostateOptions: [],
      // 创建时间时间范围
      daterangeCreateTime: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        id: null,
        huankuanjine: null,
        daijine: null,
        jkshiyou: null,
        daihuankuan: null,
        prostate: null,
        createUserName: null,
        createTime: null,
        createDeptName: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        id: [{ required: true, message: 'id不能为空', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.getList()
    this.getDicts('form_process_state').then((response) => {
      this.prostateOptions = response.data
    })
  },
  activated(){
    if(localStorage.getItem("needLoadList") === "yes"){
      this.resetQuery()
      localStorage.setItem("needLoadList",undefined)
    }
  },
  methods: {
    cardClick() {
      this.ifCardShow = !this.ifCardShow
    },
    /** 查询行政办公还款列表 */
    getList() {
      this.loading = true
      this.queryParams.params = {}
      if (null != this.daterangeCreateTime && '' != this.daterangeCreateTime) {
        this.queryParams.startTime = this.daterangeCreateTime[0]
        this.queryParams.endTime = this.daterangeCreateTime[1]
      }
      listXzrepayment(this.queryParams).then((response) => {
        this.xzrepaymentList = response.rows
        this.total = response.total
        this.loading = false
      })
    },
    // 流程状态字典翻译
    prostateFormat(row, column) {
      return this.selectDictLabel(this.prostateOptions, row.prostate)
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
        title: null,
        created: null,
        modified: null,
        creator: null,
        modificator: null,
        recycle: null,
        username: null,
        deptname: null,
        jiemongy: null,
        huankuanjine: null,
        daijine: null,
        status: '0',
        parentid: null,
        jiekuantime: null,
        jiejinedx: null,
        jkshiyou: null,
        jkdept: null,
        jkbeizhu: null,
        jkfujian: null,
        hkjinedx: null,
        hkdept: null,
        whkjinedx: null,
        hkbeizhu: null,
        hkfujian: null,
        daihuankuan: null,
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
      this.daterangeCreateTime = []
      this.queryParams.startTime = null
      this.queryParams.endTime = null
      this.resetForm('queryForm')
      this.handleQuery()
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map((item) => item.id)
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    async handleAdd() {
      const { code, data, msg } = await getFlowInfoByFlowId({
        flowId: 'process_wy1ygxy2'
      })
      if (code == 200) {
        this.handleStartProcess(data)
      }
    },
    /**  发起流程申请 */
    handleStartProcess(row) {
      localStorage.setItem('proData', '')
      localStorage.setItem('procInsId', '')
      this.$router.push({
        path: '/task/record/index/xzrepayment',
        query: {
          deployId: row.deploymentId,
          procDefId: row.id,
          formId: row.formId
        }
      })
    },
    /** 流程流转记录 */
    async handleFlowRecord(row) {
      const { data } = await getFlowInfoByFlowId({
        flowId: 'process_wy1ygxy2'
      })
      this.$router.push({
        path: '/task/record/index/xzrepayment',
        query: {
          id: row.id,
          formId: data.formId,
          procInsId: row.procInsId,
          deployId: row.deployId,
          taskId: row.taskId,
          tableName: 'pms_xzrepayment'
        }
      })
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset()
      const id = row.id || this.ids
      getXzrepayment(id).then((response) => {
        this.form = response.data
        this.open = true
        this.title = '修改行政办公还款'
      })
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          if (this.form.id != null) {
            updateXzrepayment(this.form).then((response) => {
              this.msgSuccess('修改成功')
              this.open = false
              this.getList()
            })
          } else {
            addXzrepayment(this.form).then((response) => {
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
        '是否确认删除行政办公还款编号为"' + ids + '"的数据项?',
        '警告',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      )
        .then(function() {
          return delXzrepayment(ids)
        })
        .then(() => {
          this.getList()
          this.msgSuccess('删除成功')
        })
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams
      this.$confirm('是否确认导出所有行政办公还款数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(function() {
          return exportXzrepayment(queryParams)
        })
        .then((response) => {
          this.download(response.msg)
        })
    }
  }
}
</script>
<style scoped lang="scss">
.clearfix {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .el-form-item {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
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
