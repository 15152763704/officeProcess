<!-- 正式立项选择 -->
<template>
  <div class="zhezhou">
    <div class="mydialog">
      <div style="text-align: left;margin-top: 10px;margin-left: 50px;font-weight: 700">人员选择</div>
      <div class="guanbianniu" @click="handleFlowRecord()" style="cursor:pointer;" >x</div>
      <el-form
        :model="queryParams"
        ref="queryForm"
        :inline="true"
        v-show="showSearch"
        label-width="102px"
        style="margin-top:15px;"
      >
        <el-form-item label="姓名" prop="name">
          <el-input
            v-model="queryParams.name"
            placeholder="请输入姓名"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <el-form-item label="入职部门" prop="dept">
          <el-select v-model="queryParams.dept" placeholder="请选择入职部门" clearable size="small">
            <el-option
              v-for="dict in deptOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" size="mini" @click.stop="handleQuery">搜索</el-button>
          <el-button icon="el-icon-refresh" size="mini" @click.stop="resetQuery">重置</el-button>
        </el-form-item>
      </el-form>
      <el-table v-loading="loading" :data="projectList" class="table">
        <el-table-column align="center" label="姓名" prop="name" sortable/>
        <el-table-column align="center" label="学历" prop="xueli" sortable/>
        <el-table-column align="center" label="毕业院校" prop="biyeyuanxiao" sortable/>
        <el-table-column align="center" label="专业" prop="zhuanye" sortable/>
        <el-table-column align="center" label="入职日期" prop="ruzhishijian" sortable/>
        <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              icon="el-icon-tickets"
              @click.native="handleFlowRecord(scope.row)"
            >选择
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <pagination
        class="pagination"
        v-show="total>0"
        :total="total"
        :page.sync="queryParams.pageNum"
        :limit.sync="queryParams.pageSize"
        @pagination="getList"
      />
    </div>
  </div>
</template>

<script>

export default {
  name: 'PeopleDialog',
  props: {
    reqUrl: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      isdisabled: true,
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
      // 项目合同申请表格数据
      projectList: [],
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        name: null,
        dept: null
      },
      // 表单参数
      form: {},
      companyOptions: [],
      deptOptions: []

    }
  },
  created() {
    this.getList()

    this.getDicts('form_company_name').then((response) => {
      this.companyOptions = response.data
    })
    this.getDicts('company_dept').then((response) => {
      this.deptOptions = response.data
    })
    this.getDicts('identity_relationship').then((res) => {
      this.identityOptions = res.data
    })
    this.getDicts('education').then((res) => {
      this.educationOptions = res.data
    })
  },
  methods: {
    educationFormat(row, column) {
      return this.selectDictLabel(this.education, row.ruzhigongsi)
    },
    // 	入职公司字典翻译
    companyFormat(row, column) {
      return this.selectDictLabel(this.companyOptions, row.ruzhigongsi)
    },
    // 	入职部门字典翻译
    deptFormat(row, column) {
      return this.selectDictLabel(this.deptOptions, row.dept)
    },
    /** 查询项目合同申请列表 */
    getList() {
      console.log('三级页面组件')
      this.loading = true
      this.getReqAction(this.reqUrl, this.queryParams).then((response) => {
        this.projectList = response.rows
        this.total = response.total
        this.loading = false
      })
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1
      this.getList()
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery()
    },
    handleFlowRecord(row) {
      //func: 是父组件指定的传数据绑定的函数，this.msg:子组件给父组件传递的数据
      this.$emit('choosedProect', row)
    }
  }
}
</script>
<style scoped>
.mydialog {
  width: 900px;
  height: 630px;
  position: fixed;
  top: 100px;
  background-color: white;
  z-index: 100;
  left: 450px;
}

.table {
  height: 450px;
  width: 850px;
  margin-left: 25px;
  overflow-y: scroll;
  border: 1px solid #f1f1f1;
}

::-webkit-scrollbar-track-piece {
  /*滚动条凹槽的颜色，还可以设置边框属性*/
  background-color: transparent;
}

::-webkit-scrollbar {
  /*滚动条的宽度*/
  width: 5px;
  height: 5px;
}

::-webkit-scrollbar-thumb {
  /*滚动条的设置*/
  background-color: #dfe6ea;
  background-clip: padding-box;
  min-height: 5px;
  border-radius: 10px;
}

.pagination-container .el-pagination {
  text-align: center;
  position: relative;
}

.zhezhou {
  background-color: #16151582;
  width: 100%;
  height: 100%;
  z-index: 99;
  position: fixed;
  top: 0;
  left: 0;
  text-align: center;
}

.guanbianniu {
  position: absolute;
  top: 10px;
  right: 20px;
}
</style>
