<template>
  <el-dialog title="借款选择" :visible.sync="isshow" :before-close="onBeforeClose">
    <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="120px">
      <div class="my-col">
        <el-form-item label="借款编号" prop="nums">
          <el-input
            v-model="queryParams.nums"
            placeholder="请输入借款编号"
            clearable
            style="width:100%;"
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <el-form-item label="借款时间" prop="time">
          <el-date-picker
            v-model="daterangeCreateTime"
            style="width: 220px"
            value-format="yyyy-MM-dd"
            type="daterange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="timeChange"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" size="mini" @click.stop="handleQuery">搜索</el-button>
          <el-button icon="el-icon-refresh" size="mini" @click.stop="resetQuery">重置</el-button>
        </el-form-item>
      </div>
      <div class="my-col">
        <el-form-item label="借款金额" prop="money">
          <el-input-number
            v-model="queryParams.money"
            placeholder="请输入借款金额"
            clearable
            style="width:100%;"
            :min="0"
            :precision="2"
            :step="1"
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <el-form-item>

        </el-form-item>
        <el-form-item></el-form-item>
      </div>
    </el-form>
    <el-table v-loading="loading" :data="projectList" class="table">
      <el-table-column align="center" label="借款事由" prop="reasons"/>
      <el-table-column align="center" label="借款金额" prop="money"/>
      <el-table-column align="center" label="借款人" prop="createUserName"/>
      <el-table-column align="center" label="借款人部门" prop="createDeptName"/>
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
      slot="footer"
      class="pagination dialog-footer"
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />
  </el-dialog>
</template>

<script>

export default {
  name: 'LoanAmountPopup',
  props: {
    isshow: {
      type: Boolean,
      default: false
    },
    reqUrl: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      form_company_name: [],
      car_type: [],
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
      showSearch: false,
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
        startTime: null,
        endTime: null,
        nums: null,
        money: null,
        daijine: null
      },
      // 表单参数
      form: {},
      // 创建时间时间范围
      daterangeCreateTime: []
    }
  },
  created() {
    this.getList()
    // this.getDicts('car_type').then((response) => {
    //   this.car_type = response.data
    // })
    // this.getDicts('form_company_name').then((response) => {
    //   this.form_company_name = response.data
    // })
  },
  methods: {
    onBeforeClose() {
      this.$emit('onBeforeClose')
    },
    timeChange(selectDate) {
      this.queryParams.startTime = selectDate[0]
      this.queryParams.endTime = selectDate[1]
    },
    formCompanyNameFormat(row, column) {
      return this.selectDictLabel(this.form_company_name, row.company)
    },
    carTypeFormat(row, column) {
      return this.selectDictLabel(this.car_type, row.type)
    },
    /** 查询项目合同申请列表 */
    getList() {
      this.loading = true
      this.queryParams.money <= 0 ? (this.queryParams.money = null) : null
      this.queryParams.daijine <= 0 ? (this.queryParams.daijine = null) : null
      this.getReqAction(this.reqUrl, this.queryParams).then((response) => {
        this.projectList = response.rows
        this.total = response.total
        this.loading = false
      })
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.getList()
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.daterangeCreateTime = []
      this.queryParams = {
        pageNum: 1,
        pageSize: 10,
        startTime: null,
        endTime: null,
        nums: null,
        money: null,
        daijine: null
      }
      this.handleQuery()
    },
    handleFlowRecord(row) {
      //func: 是父组件指定的传数据绑定的函数，this.msg:子组件给父组件传递的数据
      this.$emit('choosedProect', row)
    }
  }
}
</script>
<style scoped lang="scss">
.my-col {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;

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
