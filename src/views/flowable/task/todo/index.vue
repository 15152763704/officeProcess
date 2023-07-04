<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryForm"
      :inline="true"
      v-show="showSearch"
      label-width="68px"
    >
      <el-form-item label="申请人名称" prop="keyWord" label-width="100px">
        <el-input
          v-model="queryParams.keyWord"
          placeholder="请输入申请人名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="流程名称" prop="name">
        <el-input
          v-model="queryParams.name"
          placeholder="请输入名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="开始时间" prop="deployTime">
        <el-date-picker
          v-model="showTimetime"
          type="daterange"
          align="right"
          value-format="yyyy-MM-dd"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions"
          @keyup.enter.native="handleQuery"
          @change="handletimeChangetime"
        ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <!--<el-row :gutter="10" class="mb8">-->
    <!--<el-col :span="1.5">-->
    <!-- <el-button
      type="danger"
      plain
      icon="el-icon-delete"
      size="mini"
      :disabled="multiple"
      @click="handleDelete"
      v-hasPermi="['system:deployment:remove']"
    >删除</el-button> -->
    <!--</el-col>-->
    <!--<right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>-->
    <!--</el-row>-->

    <el-table v-loading="loading" :data="todoList" border @selection-change="handleSelectionChange">
      <el-table-column align="center" type="selection" width="55"/>
      <!--      <el-table-column label="任务编号" align="center" prop="taskId" :show-overflow-tooltip="true" />-->
      <!--<el-table-column label="流程标题" align="center" prop="flowTitle" />-->
      <el-table-column align="center" label="流程名称" prop="procDefName"/>
      <el-table-column align="center" label="任务节点" prop="taskName"/>
      <!--      <el-table-column label="流程版本" align="center">-->
      <!--        <template slot-scope="scope">-->
      <!--          <el-tag size="medium">v{{scope.row.procDefVersion}}</el-tag>-->
      <!--        </template>-->
      <!--      </el-table-column>-->
      <el-table-column label="流程发起人" align="center">
        <template slot-scope="scope">
          <label>
            {{ scope.row.startUserName }}
            <el-tag size="mini" type="info">{{ scope.row.startDeptName }}</el-tag>
          </label>
        </template>
      </el-table-column>
      <el-table-column align="center" label="流程创建时间" prop="createTime" width="180"/>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit-outline"
            @click="handleProcess(scope.row)"
          >处理
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
import { delDeployment, exportDeployment, getDeployment, todoList } from '@/api/flowable/todo'

import { getReqAction } from '@/utils/global'

export default {
  name: 'Deploy',
  components: {},
  data() {
    return {
      showTimetime: [],
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
      // 流程待办任务表格数据
      todoList: [],
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        name: null,
        category: null,
        keyWord: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {}
    }
  },
  created() {
    this.getList()
  },
  methods: {
    //条件申请时间
    handletimeChangetime(dataarr) {
      this.queryParams.createTimeBeg = dataarr[0]
      this.queryParams.createTimeEnd = dataarr[1]
    },
    /** 查询流程定义列表 */
    getList() {
      this.loading = true
      todoList(this.queryParams).then((response) => {
        this.todoList = response.data.records
        this.total = response.data.total
        this.loading = false
      })
    },
    // 跳转到处理页面
    handleProcess(row) {
      getReqAction('/flowable/form/getFormInfoByDeployId', {
        deployId: row.deployId
      }).then((response) => {
        this.$router.push({
          path: response.data.formRouterPath,
          query: {
            procInsId: row.procInsId,
            deployId: row.deployId,
            taskId: row.taskId,
            formId: response.data.formId,
            procDefId: row.procDefId
          }
        })
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
        name: null,
        category: null,
        key: null,
        tenantId: null,
        deployTime: null,
        derivedFrom: null,
        derivedFromRoot: null,
        parentDeploymentId: null,
        engineVersion: null
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
      this.showTimetime = []
      this.queryParams.createTimeBeg = ''
      this.queryParams.createTimeEnd = ''
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
    handleAdd() {
      this.reset()
      this.open = true
      this.title = '添加流程定义'
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset()
      const id = row.id || this.ids
      getDeployment(id).then((response) => {
        this.form = response.data
        this.open = true
        this.title = '修改流程定义'
      })
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids
      this.$confirm(
        '是否确认删除流程定义编号为"' + ids + '"的数据项?',
        '警告',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      )
        .then(function() {
          return delDeployment(ids)
        })
        .then(() => {
          this.getList()
          this.msgSuccess('删除成功')
        })
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams
      this.$confirm('是否确认导出所有流程定义数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(function() {
          return exportDeployment(queryParams)
        })
        .then((response) => {
          this.download(response.msg)
        })
    }
  }
}
</script>

