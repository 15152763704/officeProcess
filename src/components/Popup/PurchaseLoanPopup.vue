<template>
  <el-dialog :before-close="onBeforeClose" :visible.sync="isshow" title="借款选择">
    <el-form ref="queryForm" :inline="true" :model="queryParams" label-width="120px">
      <div class="my-col">
        <el-form-item label="借款事由" prop="borrowingreason">
          <el-input
            v-model="queryParams.borrowingreason"
            clearable
            placeholder="请输入借款事由"
            style="width:100%;"
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <el-form-item label="借款单位" prop="jiekuandanwei">
          <el-select v-model="queryParams.jiekuandanwei" placeholder="请选择借款单位"
          >
            <el-option
              v-for="dict in formCompanyName"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button icon="el-icon-search" size="mini" type="primary" @click.stop="handleQuery">搜索</el-button>
          <el-button icon="el-icon-refresh" size="mini" @click.stop="resetQuery">重置</el-button>
        </el-form-item>
      </div>
      <div class="my-col">
        <el-form-item label="借款金额" prop="jinex">
          <el-input-number
            v-model="queryParams.jinex"
            :min="0"
            :precision="2"
            :step="1"
            clearable
            placeholder="请输入借款金额"
            style="width:100%;"
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <el-form-item label="待还金额" prop="daijine">
          <el-input-number
            v-model="queryParams.daijine"
            :min="0"
            :precision="2"
            :step="1"
            clearable
            placeholder="请输入待还金额"
            style="width:100%;"
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <el-form-item></el-form-item>
      </div>
    </el-form>
    <el-table v-loading="loading" :data="projectList" class="table">
      <el-table-column align="center" label="借款事由" prop="borrowingreason"/>
      <el-table-column :formatter="formCompanyNameFormat" align="center" label="借款单位" prop="jiekuandanwei"/>
      <el-table-column align="center" label="借款金额" prop="jinex"/>
      <el-table-column align="center" label="待还金额" prop="daijine"/>
      <el-table-column align="center" class-name="small-padding fixed-width" label="操作">
        <template slot-scope="scope">
          <el-button
            icon="el-icon-tickets"
            size="mini"
            type="text"
            @click.native="handleFlowRecord(scope.row)"
          >选择
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="total>0"
      slot="footer"
      :limit.sync="queryParams.pageSize"
      :page.sync="queryParams.pageNum"
      :total="total"
      class="pagination dialog-footer"
      @pagination="getList"
    />
  </el-dialog>
</template>

<script>

export default {
  name: 'PurchaseLoanPopup',
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
        jinex:undefined,
        pageNum: 1,
        pageSize: 10,
        beginCreateTime: null,
        endCreateTime: null,
        nums: null,
        money: null,
        jiekuandanwei:null,
        borrowingreason:null,
        daijine: undefined
      },
      // 表单参数
      form: {},
      // 创建时间时间范围
      daterangeCreateTime: [],
      formCompanyName: []
    }
  },
  created() {
    this.getDicts('form_company_name').then(response => {
      this.formCompanyName = response.data
    })
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
      this.queryParams.beginCreateTime = selectDate[0]
      this.queryParams.endCreateTime = selectDate[1]
    },
    formCompanyNameFormat(row, column) {
      return this.selectDictLabel(this.formCompanyName, row.jiekuandanwei)
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
        beginCreateTime: null,
        endCreateTime: null,
        nums: null,
        money: null,
        daijine: undefined
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
<style lang="scss" scoped>
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
