<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="预警类型" prop="warnType">
        <el-select v-model="queryParams.warnType" placeholder="请选择预警类型" clearable size="small">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="报警天数" prop="days">
        <el-input-number style="width: 100%"
          v-model="queryParams.days"
          placeholder="请输入报警天数"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>

      <el-form-item label="状态" prop="status">
        <el-select v-model="queryParams.status" placeholder="请选择状态" clearable size="small">
          <el-option
            v-for="item in warning_status"
            :key="item.dictValue"
            :label="item.dictLabel"
            :value="item.dictValue"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-table v-loading="loading" :data="indexWarningList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="标题" align="center" prop="title"   sortable />
      <el-table-column label="内容" align="center" prop="content"   sortable />
      <el-table-column label="预警类型" align="center" prop="warnType"   sortable />
      <el-table-column label="业务表名" align="center" prop="objectTable"   sortable />
      <!--<el-table-column label="业务id" align="center" prop="objectId" />-->
      <el-table-column label="报警天数/成本比例" align="center" prop="days"   sortable >
        <template slot-scope="scope">
          <el-tag type="warning" v-if="scope.row.days<warningDaysForm.hetongred&&scope.row.warnType == '合同签订预警'" size="mini">即将预警{{scope.row.days}}</el-tag>
          <el-tag type="danger"  v-if="scope.row.days>=warningDaysForm.hetongred&&scope.row.warnType == '合同签订预警'" size="mini">预警{{scope.row.days}}</el-tag>

          <el-tag type="warning" v-if="scope.row.days<warningDaysForm.moneyred&&scope.row.warnType == '资金回笼预警'" size="mini">即将预警{{scope.row.days}}</el-tag>
          <el-tag type="danger"  v-if="scope.row.days>=warningDaysForm.moneyred&&scope.row.warnType == '资金回笼预警'" size="mini">预警{{scope.row.days}}</el-tag>

          <el-tag type="warning" v-if="scope.row.dhlzj*100<warningDaysForm.chenbenred&&scope.row.warnType == '成本预警'" size="mini">即将超标{{scope.row.dhlzj*100}}%</el-tag>
          <el-tag type="danger"  v-if="scope.row.dhlzj*100>=warningDaysForm.chenbenred&&scope.row.warnType == '成本预警'" size="mini">超标{{scope.row.dhlzj*100}}%</el-tag>

        </template>
      </el-table-column>
      <el-table-column label="状态" align="center" prop="status"  :formatter="warningStatusFormat"  sortable  />
      <el-table-column label="业务时间" align="center" prop="objectTime" width="180"  sortable >
        <template slot-scope="scope">{{formatDate(scope.row.objectTime)}}</template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="goDetail(scope.row)"
            v-hasPermi="['indexWarning:indexWarning:edit']"
          >详情</el-button>
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

    <!-- 添加或修改预警提醒对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="标题" prop="title">
          <el-input v-model="form.title" placeholder="请输入标题" />
        </el-form-item>
        <el-form-item label="内容">
          <editor v-model="form.content" :min-height="192"/>
        </el-form-item>
        <el-form-item label="预警类型" prop="warnType">
          <el-select v-model="form.warnType" placeholder="请选择预警类型">
            <el-option label="请选择字典生成" value="" />
          </el-select>
        </el-form-item>
        <el-form-item label="业务表名" prop="objectTable">
          <el-input v-model="form.objectTable" placeholder="请输入业务表名" />
        </el-form-item>
        <el-form-item label="报警天数" prop="days">
          <el-input v-model="form.days" placeholder="请输入报警天数" />
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model="form.status">
            <el-radio label="1">请选择字典生成</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="状态" prop="id">
          <el-input v-model="form.id" placeholder="请输入状态" />
        </el-form-item>
        <el-form-item label="业务时间" prop="objectTime">
          <el-date-picker clearable size="small"
            v-model="form.objectTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择业务时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="创建人id" prop="createUserId">
          <el-input v-model="form.createUserId" placeholder="请输入创建人id" />
        </el-form-item>
        <el-form-item label="创建人部门id" prop="createDeptId">
          <el-input v-model="form.createDeptId" placeholder="请输入创建人部门id" />
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
import { listIndexWarning } from "@/api/biz/indexWarning/indexWarning";
import Editor from '@/components/Editor';
import { formatDate } from '@/utils'
import request from '@/utils/request'

export default {
  name: "IndexWarning",
  components: {
    Editor,
  },
  data() {
    return {
      warning_status:[],
      options: [{
        value: '资金回笼预警',
        label: '资金回笼预警'
      }, {
        value: '合同签订预警',
        label: '合同签订预警'
      }, {
        value: '成本预警',
        label: '成本预警'
      }],
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
      // 预警提醒表格数据
      indexWarningList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        title: null,
        content: null,
        warnType: null,
        objectTable: null,
        days: undefined,
        status: "1",
        objectTime: null,
        createUserId: null,
        createDeptId: null
      },
      form:{},
      // 表单参数
      warningDaysForm: {
        id:'',
        hetongyellow:'',
        hetongred:'',
        invoiceyellow:'',
        invoicered:'',
        moneyyellow:'',
        moneyred:'',
        chenbenred:'',
        chenbenyellow:''
      },
      // 表单校验
      rules: {
      }
    };
  },
  created() {
    this.getList();

    // 预警状态、
    this.getDicts('warning_status').then((res) => {
      this.warning_status = res.data
    })

    this.getWarningSet();
  },
  methods: {
    //查询预警配置数据
    getWarningSet(){
      request({
        url: '/warningset/find',
        method: 'get'
      }).then(response => {
        if(response.data.length > 0){
          this.warningDaysForm = response.data[0]
        }
      });
    },
    //预警点击详情
    goDetail(item){
      console.log(item)
      let path = "";
      let id = "";
      switch (item.warnType) {
        case "资金回笼预警" :
          path = '/task/record/index/projectContract'
          id = item.objectParentId
          break;
        case "合同签订预警" :
        case "成本预警" :
          path = '/task/record/index/productionProject'
          id = item.objectId
          break;
        case "开票预警" :
          path = '/task/record/index/projectContract'
          id = item.objectId
          break;
      }
      this.$router.push({
        path: path,
        query: {
          id: id,
          tableName: item.objectTable,
        },
      })
    },
    // 流程状态翻译
    warningStatusFormat(row, column) {
      return this.selectDictLabel(this.warning_status, row.status)
    },
    /** 查询预警提醒列表 */
    getList() {
      this.loading = true;
      listIndexWarning(this.queryParams).then(response => {
        this.indexWarningList = response.rows;
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
        title: null,
        content: null,
        warnType: null,
        objectTable: null,
        objectId: null,
        days: null,
        status: "0",
        id: null,
        objectTime: null,
        createUserId: null,
        createTime: null,
        createDeptId: null
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
      this.ids = selection.map(item => item.objectId)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加预警提醒";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const objectId = row.objectId || this.ids
      getIndexWarning(objectId).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改预警提醒";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.objectId != null) {
            updateIndexWarning(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addIndexWarning(this.form).then(response => {
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
      const objectIds = row.objectId || this.ids;
      this.$confirm('是否确认删除预警提醒编号为"' + objectIds + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delIndexWarning(objectIds);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        })
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有预警提醒数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return exportIndexWarning(queryParams);
        }).then(response => {
          this.download(response.msg);
        })
    }
  }
};
</script>
