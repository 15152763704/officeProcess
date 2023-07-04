<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="102px">
      <el-form-item label="上传人" prop="usernames">
        <el-input
          v-model="queryParams.usernames"
          placeholder="请输入上传人"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="上传人部门" prop="deptname">
        <el-input
          v-model="queryParams.deptname"
          placeholder="请输入上传人部门"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="项目编号" prop="projectnum">
        <el-input
          v-model="queryParams.projectnum"
          placeholder="请输入项目编号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="合同名称" prop="contractname">
        <el-input
          v-model="queryParams.contractname"
          placeholder="请输入合同名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="合同编号" prop="contractnum">
        <el-input
          v-model="queryParams.contractnum"
          placeholder="请输入合同编号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="合同类型" prop="contracttype">
        <el-select v-model="queryParams.contracttype" placeholder="请选择合同类型" clearable size="small">
          <el-option label="请选择字典生成" value="" />
        </el-select>
      </el-form-item>
      <el-form-item label="上传合同类型" prop="schetonglx">
        <el-input
          v-model="queryParams.schetonglx"
          placeholder="请输入上传合同类型"
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
          v-hasPermi="['contract:contract:add']"
        >新增申请</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['contract:contract:edit']"
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
          v-hasPermi="['contract:contract:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['contract:contract:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="contractList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="合同名称" align="center" prop="contractname"   sortable />
      <el-table-column label="合同编号" align="center" prop="contractnum"   sortable />
      <el-table-column label="合同类型" align="center" prop="contracttype"   sortable />
      <el-table-column label="上传合同类型" align="center" prop="schetonglx"   sortable />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['contract:contract:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['contract:contract:remove']"
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

    <!-- 添加或修改合同查询对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="标题" prop="title">
          <el-input v-model="form.title" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="创建时间" prop="created">
          <el-input v-model="form.created" placeholder="请输入创建时间" />
        </el-form-item>
        <el-form-item label="最后更新时间" prop="modified">
          <el-input v-model="form.modified" placeholder="请输入最后更新时间" />
        </el-form-item>
        <el-form-item label="创建者id" prop="creator">
          <el-input v-model="form.creator" placeholder="请输入创建者id" />
        </el-form-item>
        <el-form-item label="最后更新人id" prop="modificator">
          <el-input v-model="form.modificator" placeholder="请输入最后更新人id" />
        </el-form-item>
        <el-form-item label="回收站标记" prop="recycle">
          <el-input v-model="form.recycle" placeholder="请输入回收站标记" />
        </el-form-item>
        <el-form-item label="上传人" prop="usernames">
          <el-input v-model="form.usernames" placeholder="请输入上传人" />
        </el-form-item>
        <el-form-item label="上传人部门" prop="deptname">
          <el-input v-model="form.deptname" placeholder="请输入上传人部门" />
        </el-form-item>
        <el-form-item label="上传时间" prop="times">
          <el-input v-model="form.times" placeholder="请输入上传时间" />
        </el-form-item>
        <el-form-item label="项目编号" prop="projectnum">
          <el-input v-model="form.projectnum" placeholder="请输入项目编号" />
        </el-form-item>
        <el-form-item label="项目名称" prop="projectname">
          <el-input v-model="form.projectname" placeholder="请输入项目名称" />
        </el-form-item>
        <el-form-item label="合同名称" prop="contractname">
          <el-input v-model="form.contractname" placeholder="请输入合同名称" />
        </el-form-item>
        <el-form-item label="合同编号" prop="contractnum">
          <el-input v-model="form.contractnum" placeholder="请输入合同编号" />
        </el-form-item>
        <el-form-item label="合同附件" prop="contractfujian">
          <el-input v-model="form.contractfujian" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="项目id" prop="projectid">
          <el-input v-model="form.projectid" placeholder="请输入项目id" />
        </el-form-item>
        <el-form-item label="合同类型" prop="contracttype">
          <el-select v-model="form.contracttype" placeholder="请选择合同类型">
            <el-option label="请选择字典生成" value="" />
          </el-select>
        </el-form-item>
        <el-form-item label="上传合同类型" prop="schetonglx">
          <el-input v-model="form.schetonglx" placeholder="请输入上传合同类型" />
        </el-form-item>
        <el-form-item label="合同申请人" prop="shenqingren">
          <el-input v-model="form.shenqingren" placeholder="请输入合同申请人" />
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
import { listContract, getContract, delContract, addContract, updateContract, exportContract } from "@/api/biz/contract/contract";

export default {
  name: "Contract",
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
      // 合同查询表格数据
      contractList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        title: null,
        created: null,
        modified: null,
        creator: null,
        modificator: null,
        recycle: null,
        usernames: null,
        deptname: null,
        times: null,
        projectnum: null,
        projectname: null,
        contractname: null,
        contractnum: null,
        contractfujian: null,
        projectid: null,
        contracttype: null,
        schetonglx: null,
        shenqingren: null
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
    /** 查询合同查询列表 */
    getList() {
      this.loading = true;
      listContract(this.queryParams).then(response => {
        this.contractList = response.rows;
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
        title: null,
        created: null,
        modified: null,
        creator: null,
        modificator: null,
        recycle: null,
        usernames: null,
        deptname: null,
        times: null,
        projectnum: null,
        projectname: null,
        contractname: null,
        contractnum: null,
        contractfujian: null,
        projectid: null,
        contracttype: null,
        schetonglx: null,
        shenqingren: null
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
      this.title = "添加合同查询";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getContract(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改合同查询";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateContract(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addContract(this.form).then(response => {
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
      this.$confirm('是否确认删除合同查询编号为"' + ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delContract(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        })
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有合同查询数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return exportContract(queryParams);
        }).then(response => {
          this.download(response.msg);
        })
    }
  }
};
</script>
