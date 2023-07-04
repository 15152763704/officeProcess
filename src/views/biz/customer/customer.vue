<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
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
          </el-form-item>
        </div>
      </el-card>
    </el-form>

    <el-table v-loading="loading" :data="customerList" @selection-change="handleSelectionChange">
      <el-table-column label="客户名称" align="center" prop="customName" />
      <el-table-column label="客户联系电话" align="center" prop="customTel" />
      <el-table-column label="客户职位" align="center" prop="customPost" />
      <el-table-column label="客户单位" align="center" prop="customUnit" />
      <el-table-column label="创建人" align="center" prop="createUserName" />
      <el-table-column label="创建部门" align="center" prop="createDeptName" />
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改customer对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="修改时间" prop="customName">
          <el-input v-model="form.customName" placeholder="请输入修改时间" />
        </el-form-item>
        <el-form-item label="修改时间" prop="customTel">
          <el-input v-model="form.customTel" placeholder="请输入修改时间" />
        </el-form-item>
        <el-form-item label="修改时间" prop="customPost">
          <el-input v-model="form.customPost" placeholder="请输入修改时间" />
        </el-form-item>
        <el-form-item label="修改时间" prop="customUnit">
          <el-input v-model="form.customUnit" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="创建人" prop="createUserName">
          <el-input v-model="form.createUserName" placeholder="请输入创建人" />
        </el-form-item>
        <el-form-item label="创建人id" prop="createUserId">
          <el-input v-model="form.createUserId" placeholder="请输入创建人id" />
        </el-form-item>
        <el-form-item label="创建人部门名称" prop="createDeptName">
          <el-input v-model="form.createDeptName" placeholder="请输入创建人部门名称" />
        </el-form-item>
        <el-form-item label="创建人部门id" prop="createDeptId">
          <el-input v-model="form.createDeptId" placeholder="请输入创建人部门id" />
        </el-form-item>
        <el-form-item label="修改人名称" prop="updateUserName">
          <el-input v-model="form.updateUserName" placeholder="请输入修改人名称" />
        </el-form-item>
        <el-form-item label="修改人id" prop="updateUserId">
          <el-input v-model="form.updateUserId" placeholder="请输入修改人id" />
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
import { listCustomer, getCustomer, delCustomer, addCustomer, updateCustomer, exportCustomer } from "@/api/biz/customer/customer";

export default {
  name: "Customer",
  components: {
  },
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
      // customer表格数据
      customerList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        customName: null,
        customTel: null,
        customPost: null,
        customUnit: null,
        createUserName: null,
        createUserId: null,
        createDeptName: null,
        createDeptId: null,
        updateUserName: null,
        updateUserId: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询customer列表 */
    getList() {
      this.loading = true;
      listCustomer(this.queryParams).then(response => {
        this.customerList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        id: null,
        customName: null,
        customTel: null,
        customPost: null,
        customUnit: null,
        createUserName: null,
        createUserId: null,
        createTime: null,
        createDeptName: null,
        createDeptId: null,
        updateUserName: null,
        updateUserId: null,
        updateTime: null
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.queryParams.simpleSearch = ''
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加customer";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getCustomer(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改customer";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateCustomer(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addCustomer(this.form).then(response => {
              this.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$confirm('是否确认删除customer编号为"' + ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delCustomer(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        })
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有customer数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return exportCustomer(queryParams);
        }).then(response => {
          this.download(response.msg);
        })
    }
  }
};
</script>
<style lang="scss" >
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
