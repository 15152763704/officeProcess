<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="信访编号" prop="dictName">
        <el-input
          v-model="queryParams.dictName"
          placeholder="请输入信访编号"
          clearable
          size="small"
          style="width: 240px"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="信访类型" prop="status">
        <el-select
          v-model="queryParams.status"
          placeholder="信访类型"
          clearable
          size="small"
          style="width: 240px"
        >
          <el-option
            v-for="dict in statusOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="信访地区" prop="status">
        <el-select
          v-model="queryParams.status"
          placeholder="信访地区"
          clearable
          size="small"
          style="width: 240px"
        >
          <el-option
            v-for="dict in statusOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="上访人" prop="dictName">
        <el-input
          v-model="queryParams.dictName"
          placeholder="请输入上访人姓名"
          clearable
          size="small"
          style="width: 240px"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>

      <el-form-item label="上访时间" prop="dictName">
        <el-input
          v-model="queryParams.dictName"
          placeholder="请输入上访时间"
          clearable
          size="small"
          style="width: 240px"
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
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['system:dict:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="typeList" >
      <el-table-column label="信访编号" align="center" prop="v1" />
      <el-table-column label="信访类型" align="center" prop="v2" />
      <el-table-column label="信访地区" align="center" prop="v3" />
      <el-table-column label="上访人姓名" align="center" prop="v4" />
      <el-table-column label="上访人身份证号" align="center" prop="v5" />
      <el-table-column label="上访人联系电话" align="center" prop="v6" />
      <el-table-column label="上访时间" align="center" prop="v7" />
      <el-table-column label="处理时长(天)" align="center" prop="v8" />
      <el-table-column label="处理状态" align="center" prop="v9" />
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改参数配置对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="字典名称" prop="dictName">
          <el-input v-model="form.dictName" placeholder="请输入字典名称" />
        </el-form-item>
        <el-form-item label="字典类型" prop="dictType">
          <el-input v-model="form.dictType" placeholder="请输入字典类型" />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="form.status">
            <el-radio
              v-for="dict in statusOptions"
              :key="dict.dictValue"
              :label="dict.dictValue"
            >{{dict.dictLabel}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" type="textarea" placeholder="请输入内容"></el-input>
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
import { listType, getType, delType, addType, updateType, exportType, clearCache } from "@/api/system/dict/type";

export default {
  name: "Dict",
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
      // 字典表格数据
      typeList: [
        {
          v1: "321002202208220001",
          v2: "农村农业",
          v3: "广陵区",
          v4: "刘丽红",
          v5: "321002198408032116",
          v6: "13775030143",
          v7: "2022-08-22 09:43:40",
          v8: "2",
          v9: "已受理",
        },
        {
          v1: "321003202208220001",
          v2: "城市建设",
          v3: "邗江区",
          v4: "曹丽霞",
          v5: "321002198012104213",
          v6: "13775339981",
          v7: "2022-08-22 10:01:23",
          v8: "3",
          v9: "已受理",
        },
        {
          v1: "321084202208220003",
          v2: "劳动和社会保障",
          v3: "高邮市",
          v4: "王国强",
          v5: "321002198012104213",
          v6: "19905155473",
          v7: "2022-08-22 10:01:23",
          v8: "2",
          v9: "已受理",
        },
        {
          v1: "321088202208220010",
          v2: "卫生健康",
          v3: "江都区",
          v4: "李再文",
          v5: "321088199003116133",
          v6: "15151210010",
          v7: "2022-08-22 15:41:37",
          v8: "3",
          v9: "已办结",
        },
        {
          v1: "321081202208220011",
          v2: "教育",
          v3: "仪征市",
          v4: "何永祥",
          v5: "32108119780520306X",
          v6: "15054352332",
          v7: "2022-08-22 15:50:47",
          v8: "4",
          v9: "已办结",
        },
        {
          v1: "321002202208220012",
          v2: "交通运输",
          v3: "广陵区",
          v4: "张力",
          v5: "321002198107164552",
          v6: "15799871135",
          v7: "2022-08-22 16:13:31",
          v8: "2",
          v9: "已受理",
        },

      ],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 状态数据字典
      statusOptions: [
        {
          dictValue: 1,
          dictLabel: "1月"
        },
        {
          dictValue: 2,
          dictLabel: "2月"
        },
        {
          dictValue: 8,
          dictLabel: "8月"
        },
      ],
      // 日期范围
      dateRange: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        dictName: undefined,
        dictType: undefined,
        status: undefined
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        dictName: [
          { required: true, message: "字典名称不能为空", trigger: "blur" }
        ],
        dictType: [
          { required: true, message: "字典类型不能为空", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getList();
    // this.getDicts("sys_normal_disable").then(response => {
    //   this.statusOptions = response.data;
    // });
  },
  methods: {
    /** 查询字典类型列表 */
    getList() {
      this.loading = false;
      // this.loading = true;
      // listType(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
      //     this.typeList = response.rows;
      //     this.total = response.total;
      //     this.loading = false;
      //   }
      // );
    },
    // 字典状态字典翻译
    statusFormat(row, column) {
      return this.selectDictLabel(this.statusOptions, row.status);
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        dictId: undefined,
        dictName: undefined,
        dictType: undefined,
        status: "0",
        remark: undefined
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
      this.dateRange = [];
      this.resetForm("queryForm");
      this.handleQuery();
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加字典类型";
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.dictId)
      this.single = selection.length!=1
      this.multiple = !selection.length
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const dictId = row.dictId || this.ids
      getType(dictId).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改字典类型";
      });
    },
    /** 提交按钮 */
    submitForm: function() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.dictId != undefined) {
            updateType(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addType(this.form).then(response => {
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
      const dictIds = row.dictId || this.ids;
      this.$confirm('是否确认删除字典编号为"' + dictIds + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delType(dictIds);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        })
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有类型数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return exportType(queryParams);
        }).then(response => {
          this.download(response.msg);
        })
    },
    /** 清理缓存按钮操作 */
    handleClearCache() {
      clearCache().then(response => {
        this.msgSuccess("清理成功");
      });
    }
  }
};
</script>
