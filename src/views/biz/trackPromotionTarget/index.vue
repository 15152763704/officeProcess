<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryForm"
      :inline="true"
      v-show="showSearch"
      label-width="120px"
    >
      <el-form-item label="姓名" prop="userName">
        <el-input
          v-model="queryParams.userName"
          placeholder="请输入姓名"
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
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="sequenceList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="姓名" align="center" prop="userName" />
      <el-table-column label="年份" align="center" prop="year" />
      <el-table-column label="年度指标(万元)" align="center" prop="target" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
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
        <el-row>
          <el-col :span="12">
            <el-form-item label="人员姓名" prop="userId">
              <el-select v-model="form.userId" clearable placeholder="请选择人员" @change="handleSelectUser">
                <el-option v-for="dict in userList" :key="dict.userId" :label="dict.nickName" :value="dict.userId"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="年度指标(万元)" prop="target">
              <el-input-number v-model="form.target" placeholder="请输入年度指标" :min="1" :controls="false" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="年份" prop="year">
              <el-select v-model="form.year" clearable placeholder="请选择年份">
                <el-option v-for="dict in yearList" :key="dict.id" :label="dict.label" :value="dict.value"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
          </el-col>
        </el-row>
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
  listTarget,
  getTarget,
  delTarget,
  addTarget,
  updateTarget,
} from '@/api/biz/trackPromotionTarget'
import {
  listAllPromotionUsers,
} from '@/api/system/user'
import {
  getYearDict,
} from '@/api/system/dict/data'

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
        userId: null,
        userName: null,
        target: null,
        year: null,
        prostate: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {},
      // 人员字典
      userList: [],
      // 年份字典
      yearList: [],
    }
  },
  created() {
    this.getList()
    this.getUserList()
    this.getYearDictList()
  },
  methods: {
    /** 查询serially列表 */
    getList() {
      this.loading = true
      listTarget(this.queryParams).then((response) => {
        this.sequenceList = response.rows
        this.total = response.total
        this.loading = false
      })
    },
    /** 查询人员字典 */
    getUserList() {
      listAllPromotionUsers().then((response) => {
        this.userList = response
      })
    },
    /** 查询年份字典 */
    getYearDictList() {
      getYearDict().then((response) => {
        this.yearList = response
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
        userId: null,
        userName: null,
        target: null,
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
      this.title = '添加指标'
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset()
      const id = row.id || this.ids
      getTarget(id).then((response) => {
        this.form = response.data
        this.open = true
        this.title = '修改指标'
      })
    },
    /** 人员选择操作 */
    handleSelectUser(val) {
      let obj = this.userList.find((item)=>{//数据源
        return item.userId === val;
      });
      this.form.userName = obj.nickName
      console.log(this.form.userName)
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          if (this.form.id != null) {
            updateTarget(this.form).then((response) => {
              this.msgSuccess('修改成功')
              this.open = false
              this.getList()
            })
          } else {
            addTarget(this.form).then((response) => {
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
        '是否确认删除?',
        '警告',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }
      )
        .then(function () {
          return delTarget(ids)
        })
        .then(() => {
          this.getList()
          this.msgSuccess('删除成功')
        })
    },
  },
}
</script>
