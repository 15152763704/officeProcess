<template>
  <el-dialog :before-close="onBeforeClose" :visible.sync="isshow" title="借款选择">
    <el-form ref="queryForm" :inline="true" :model="queryParams" label-width="120px">
      <div class="my-col">
        <el-form-item label="出差编号" prop="chuchainum">
          <el-input
            v-model="queryParams.chuchainum"
            clearable
            placeholder="请输入出差编号"
            size="small"
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <el-form-item label="申请人" prop="createUserName">
          <el-input
            v-model="queryParams.createUserName"
            clearable
            placeholder="请输入申请人"
            size="small"
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>

        <el-form-item>
          <el-button icon="el-icon-search" size="mini" type="primary" @click.stop="handleQuery">搜索</el-button>
          <el-button icon="el-icon-refresh" size="mini" @click.stop="resetQuery">重置</el-button>
        </el-form-item>
      </div>
      <div class="my-col">
        <el-form-item label="申请人部门" prop="createDeptName">
          <el-input
            v-model="queryParams.createDeptName"
            clearable
            placeholder="请输入申请人部门"
            size="small"
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <el-form-item label="申请时间">
          <el-date-picker
            v-model="daterangeCreateTime"
            end-placeholder="结束日期"
            range-separator="-"
            size="small"
            start-placeholder="开始日期"
            style="width: 240px"
            type="daterange"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="出差类型" prop="chuchaitype">
          <el-select
            v-model="queryParams.chuchaitype"
            clearable
            placeholder="请选择出差类型"
            size="small"
          >
            <el-option
              v-for="dict in chuchaitypeOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            />
          </el-select>
        </el-form-item>
      </div>
      <div class="my-col">

        <el-form-item label="出差事由" prop="argument">
          <el-input
            v-model="queryParams.argument"
            clearable
            placeholder="请输入出差编号"
            size="small"
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <el-form-item label="出差天数" prop="days">
          <el-input
            v-model="queryParams.days"
            clearable
            placeholder="请输入出差天数"
            size="small"
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <el-form-item label="出差地区" prop="area">
          <el-cascader
            v-model="siteShiArr"
            :options="regionList"
            :props="{ checkStrictly: true }"
            clearable
            placeholder="请选择出差地区"
            style="width:100%;"
            @change="handleRegionChange"
          ></el-cascader>
        </el-form-item>
      </div>
    </el-form>
    <el-table v-loading="loading" :data="projectList" class="table">
      <el-table-column align="center" label="出差编号" prop="chuchainum" sortable/>
      <el-table-column align="center" label="申请人" prop="createUserName" sortable/>
      <el-table-column align="center" label="申请人部门" prop="createDeptName" sortable/>
      <el-table-column align="center" label="出差日期" prop="starttime" sortable width="180">
        <template slot-scope="scope">
          <span>{{
              parseTime(scope.row.starttime, '{y}-{m}-{d}')
            }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :formatter="chuchaitypeFormat"
        align="center"
        label="出差类型"
        prop="chuchaitype"
        sortable
      />
      <el-table-column align="center" label="出差事由" prop="argument" sortable/>
      <el-table-column align="center" label="出差天数" prop="days" sortable/>
      <el-table-column :formatter="regionFormat" align="center" label="出差地区" prop="area" sortable/>
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
  name: 'EvectionPopup',
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
      // 出差类型字典
      chuchaitypeOptions: [],
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        createStartTime: null,
        createEndTime: null,
        chuchainum: null,
        createUserName: null,
        createDeptName: null,
        chuchaitype: null,
        argument: null,
        days: null,
        area: null
      },
      // 表单参数
      form: {},
      // 创建时间时间范围
      daterangeCreateTime: [],
      regionAllList: [],
      siteShiArr: [],
      regionList: []
    }
  },
  created() {
    this.getList()
    this.getDicts('evection_type').then((response) => {
      this.chuchaitypeOptions = response.data
    })
    // 所有省市区
    this.getRegionAll().then((res) => {
      this.regionAllList = res.data
    })
    this.getRegionTree().then((res) => {
      this.regionList = res.data
    })
  },
  methods: {
    // 省市区翻译
    regionFormat(row, column) {
      if (row.area) {
        return this.selectRegionName(this.regionAllList, row.area)
      }
    },
    // 出差类型字典翻译
    chuchaitypeFormat(row, column) {
      return this.selectDictLabel(this.chuchaitypeOptions, row.chuchaitype)
    },
    handleRegionChange(value) {
      this.queryParams.area = this.siteShiArr.join(',')
    },
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
      this.siteShiArr = []
      this.queryParams = {
        pageNum: 1,
        pageSize: 10,
        createStartTime: null,
        createEndTime: null,
        chuchainum: null,
        createUserName: null,
        createDeptName: null,
        chuchaitype: null,
        argument: null,
        days: null,
        area: null
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
