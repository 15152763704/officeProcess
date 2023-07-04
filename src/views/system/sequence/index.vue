<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryForm"
      :inline="true"
      v-show="showSearch"
      label-width="120px"
    >
      <el-form-item label="编号code" prop="sequenceCode">
        <el-input
          v-model="queryParams.sequenceCode"
          placeholder="请输入编号code"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="编号名称" prop="sequenceName">
        <el-input
          v-model="queryParams.sequenceName"
          placeholder="请输入编号名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['system:sequence:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['system:sequence:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['system:sequence:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['system:sequence:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="sequenceList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="编号名称" align="center" prop="sequenceName" />
      <el-table-column label="编号code" align="center" prop="sequenceCode" />
      <el-table-column label="编号格式" align="center" prop="sequenceFormat" />
      <el-table-column label="当前值" align="center" prop="currentValue" />
      <el-table-column label="步进值" align="center" prop="steppingValue" />
      <el-table-column label="最小值" align="center" prop="minValue" />
      <el-table-column label="最大值" align="center" prop="maxValue" />
      <el-table-column label="重置周期" align="center" prop="resetFlag" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['system:sequence:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['system:sequence:remove']"
          >删除</el-button>
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

    <!-- 添加或修改serially对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="40%" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-form-item label="编号名称" prop="sequenceName">
          <el-input v-model="form.sequenceName" placeholder="请输入编号名称" />
        </el-form-item>
        <el-form-item label="编号code" prop="sequenceCode">
          <el-input v-model="form.sequenceCode" placeholder="请输入编号code" />
        </el-form-item>
        <el-form-item label="编号格式" prop="sequenceFormat">
          <el-input v-model="form.sequenceFormat" placeholder="请输入编号格式" />
        </el-form-item>
        <el-form-item label="当前值" prop="currentValue">
          <el-input v-model="form.currentValue" placeholder="请输入当前值" />
        </el-form-item>
        <el-form-item label="步进值" prop="steppingValue">
          <el-input v-model="form.steppingValue" placeholder="请输入步进值" />
        </el-form-item>
        <el-form-item label="最小值" prop="minValue">
          <el-input v-model="form.minValue" placeholder="请输入最小值" />
        </el-form-item>
        <el-form-item label="最大值" prop="maxValue">
          <el-input v-model="form.maxValue" placeholder="请输入最大值" />
        </el-form-item>
        <el-form-item label="重置周期" prop="resetFlag">
          <el-input v-model="form.resetFlag" placeholder="请输入重置周期，0:不重置，Y:年，M:月，D:日" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  listSequence,
  getSequence,
  delSequence,
  addSequence,
  updateSequence,
  exportSequence,
} from '@/api/system/sequence'

export default {
  name: 'Sequence',
  components: {},
  data() {
    return {
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
      // serially表格数据
      sequenceList: [],
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        createUserId: null,
        createUserName: null,
        createDeptName: null,
        createDeptId: null,
        updateUserName: null,
        updateUserId: null,
        currentValue: null,
        isCycle: null,
        maxValue: null,
        minValue: null,
        resetFlag: null,
        sequenceCode: null,
        sequenceFormat: null,
        sequenceName: null,
        steppingValue: null,
        prostate: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {},
    }
  },
  created() {
    this.getList()
  },
  methods: {
    /** 查询serially列表 */
    getList() {
      this.loading = true
      listSequence(this.queryParams).then((response) => {
        this.sequenceList = response.rows
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
        createUserId: null,
        createUserName: null,
        createTime: null,
        createDeptName: null,
        createDeptId: null,
        updateUserName: null,
        updateUserId: null,
        updateTime: null,
        currentValue: null,
        isCycle: null,
        maxValue: null,
        minValue: null,
        resetFlag: null,
        sequenceCode: null,
        sequenceFormat: null,
        sequenceName: null,
        steppingValue: null,
        prostate: null,
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
      this.title = '添加编码'
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset()
      const id = row.id || this.ids
      getSequence(id).then((response) => {
        this.form = response.data
        this.open = true
        this.title = '修改编码'
      })
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          if (this.form.id != null) {
            updateSequence(this.form).then((response) => {
              this.msgSuccess('修改成功')
              this.open = false
              this.getList()
            })
          } else {
            addSequence(this.form).then((response) => {
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
        '是否确认删除serially编号为"' + ids + '"的数据项?',
        '警告',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }
      )
        .then(function () {
          return delSequence(ids)
        })
        .then(() => {
          this.getList()
          this.msgSuccess('删除成功')
        })
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams
      this.$confirm('是否确认导出所有serially数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(function () {
          return exportSequence(queryParams)
        })
        .then((response) => {
          this.download(response.msg)
        })
    },
  },
}
</script>
