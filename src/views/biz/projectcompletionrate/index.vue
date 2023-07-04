<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryForm"
      :inline="true"
      label-width="120px"
      style="margin-bottom:10px;"
      v-show="showSearch"
    >
      <el-card class="box-card" :body-style="{ padding: '14px 15px 7px' }">
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
            <el-button type="primary" icon="el-icon-search" size="mini" @click.stop="handleQuery">搜索</el-button>
            <el-button icon="el-icon-refresh" size="mini" @click.stop="resetQuery">重置</el-button>
            <el-button
              icon="el-icon-arrow-down"
              type="primary"
              size="mini"
              @click.stop="cardClick"
            >高级搜索
            </el-button>
          </el-form-item>
        </div>
        <el-collapse-transition>
          <div v-show="ifCardShow">

            <div class="my-col">
              <el-form-item label="查询维度" prop="projectCode">
                <el-input
                  v-model="queryParams.projectCode"
                  placeholder="请输入生产立项编号"
                  clearable
                  size="small"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
              <el-form-item label="项目名称" prop="projectName">
                <el-input
                  v-model="queryParams.projectName"
                  clearable
                  placeholder="请输入项目名称"
                  size="small"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
              <el-form-item label="合同金额（元）" prop="projectAmount">
                <el-input
                  v-model="queryParams.projectAmount"
                  clearable
                  placeholder="请输入合同金额"
                  size="small"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
              <el-form-item label="申请部门" prop="createDeptName">
                <el-input
                  v-model="queryParams.createDeptName"
                  clearable
                  placeholder="请输入申请部门"
                  size="small"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
            </div>

            <div class="my-col">
              <el-form-item label="项目类型" prop="projectType1">
                <el-select
                  v-model="queryParams.projectType1"
                  clearable
                  placeholder="请选择项目类型"
                  @keyup.enter.native="handleQuery"
                >
                  <el-option
                    v-for="item in formLeixingList"
                    :key="item.dictValue"
                    :label="item.dictLabel"
                    :value="item.dictValue"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="建设单位" prop="construction">
                <el-input
                  v-model="queryParams.construction"
                  clearable
                  placeholder="请输入建设单位"
                  size="small"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
              <el-form-item label="项目地点" prop="siteShi">
                <el-cascader
                  v-model="siteShiArr"
                  :options="regionList"
                  :props="{ checkStrictly: true }"
                  clearable
                  placeholder="请选择项目地点"
                  @change="handleRegionChange"
                >
                </el-cascader>
              </el-form-item>

              <el-form-item label="项目经理" prop="createUserName">
                <el-input
                  v-model="queryParams.createUserName"
                  clearable
                  placeholder="请输入项目经理"
                  size="small"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
            </div>
            <div class="my-col">
              <el-form-item label="营销人员" prop="yingxiaorenyuan">
                <el-input
                  v-model="queryParams.yingxiaorenyuan"
                  clearable
                  placeholder="请输入营销人员"
                  size="small"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
              <el-form-item label="工程工期（天）" prop="gongchenggongqi">
                <el-input
                  v-model="queryParams.gongchenggongqi"
                  clearable
                  placeholder="请输入工程工期"
                  size="small"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
              <el-form-item label="流程状态" prop="prostate">
                <el-select v-model="queryParams.prostate" clearable placeholder="请选择流程状态">
                  <el-option
                    v-for="item in processStatusList"
                    :key="item.dictValue"
                    :label="item.dictLabel"
                    :value="item.dictValue"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="立项依据" prop="lixiangrenzheng">
                <el-select
                  v-model="queryParams.lixiangrenzheng"
                  clearable
                  placeholder="请选择立项依据"
                  @keyup.enter.native="handleQuery"
                >
                  <el-option
                    v-for="item in formProjectBasisList"
                    :key="item.dictValue"
                    :label="item.dictLabel"
                    :value="item.dictValue"
                  ></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="my-col">
              <el-form-item label="计划开工时间" prop="planStarttime">
                <el-date-picker
                  v-model="showTime"
                  type="daterange"
                  align="right"
                  value-format="yyyy-MM-dd"
                  unlink-panels
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  :picker-options="pickerOptions"
                  @keyup.enter.native="handleQuery"
                  @change="handletimeChange"
                ></el-date-picker>
              </el-form-item>
              <el-form-item></el-form-item> <el-form-item></el-form-item><el-form-item></el-form-item>
            </div>
          </div>
        </el-collapse-transition>
      </el-card>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
        >导出</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExportTrackCost"
        >导出营销统计</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExportProductionCost"
        >导出生产统计</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table
      v-loading="loading"
      :data="modelList"
      @selection-change="handleSelectionChange"
      border
    >
      <el-table-column align="center" type="selection" width="55"/>
      <el-table-column align="center" label="生产立项编号" prop="projectCode" sortable/>
      <el-table-column align="center" label="项目名称" prop="projectName" sortable/>
      <el-table-column align="center" label="合同金额（元）" prop="projectAmount" sortable/>
      <el-table-column
        label="项目类型"
        sortable
        align="center"
        prop="projectType1"
        :formatter="leixingFormat"
      />
      <el-table-column align="center" label="建设单位" prop="construction" sortable/>
      <el-table-column align="center" label="项目经理" prop="createUserName" sortable/>
      <el-table-column :formatter="trackMemberFormat" align="center" label="营销人员" prop="yingxiaorenyuan" sortable/>
      <el-table-column align="center" label="毛利润" prop="profit" sortable/>
      <el-table-column label="申请时间" sortable align="center" prop="createTime">
        <template slot-scope="scope">{{ formatDate(scope.row.createTime) }}</template>
      </el-table-column>
      <el-table-column
        label="流程状态"
        sortable
        align="center"
        prop="prostate"
        :formatter="processStatusFormat"
      />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-tickets"
            @click.native="handleFlowRecord(scope.row)"
          >详情
          </el-button>
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
  </div>
</template>

<script>
import { list, exportOverViewData, exportTrackCost, exportProductionCost } from '@/api/biz/productionProject'
import { getFlowInfoByFlowId } from '@/api/flowable/definition'
import { formatDate } from '@/utils'

export default {
  name: 'Zhibiaokanban',
  components: {},
  data() {
    return {
      formPath: '/task/record/index/productionProject',
      flowId: 'process_3vu469ap',
      usersList: [],
      ifCardShow: false,
      showTime: '',
      flowtitle: '',
      flowopen: false,
      processLoading: true,
      definitionList: [],
      processTotal: 0,
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
      // 【请填写功能名称】表格数据
      modelList: [],
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        simpleSearch:'',
        pageSize: 10
      },
      formatDate,
      // 表单参数
      form: {},
      // 表单校验
      rules: {},
      siteShiArr: [],
      regionList: [],
      formLeixingList: [],
      formProjectBasisList: [],
      processStatusList: [],
      pickerOptions: {
        shortcuts: [
          {
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      }
    }
  },
  created() {
    this.getList()
    // 项目地点
    this.getRegionTree().then((res) => {
      this.regionList = res.data
    })
    // 项目类型
    this.getDicts('project_type').then((res) => {
      this.formLeixingList = res.data
    })
    // 立项依据
    this.getDicts('project_basis').then((res) => {
      this.formProjectBasisList = res.data
    })
    // 流程状态
    this.getDicts('form_process_state').then((res) => {
      this.processStatusList = res.data
    })
    this.getUserAll().then((res) => {
      this.usersList = res
    })
  },
  activated(){
    if(localStorage.getItem("needLoadList") === "yes"){
      this.resetQuery()
      localStorage.setItem("needLoadList",undefined)
    }
  },
  methods: {
    handleRegionChange(value) {
      this.queryParams.shi = this.siteShiArr.join(',')
    },
    // 流程状态翻译
    processStatusFormat(row, column) {
      return this.selectDictLabel(this.processStatusList, row.prostate)
    },
    // 类型翻译
    leixingFormat(row, column) {
      return this.selectDictLabel(this.formLeixingList, row.projectType1)
    },
    // 营销人员翻译
    trackMemberFormat(row, column) {
      return this.selectUserNameByUserId(this.usersList, row.yingxiaorenyuan)
    },
    cardClick() {
      this.ifCardShow = !this.ifCardShow
    },
    handletimeChange(date) {
      if (date == null) {
        this.queryParams.startTimeBeg = null
        this.queryParams.startTimeEnd = null
      }
    },
    /** 流程流转记录 */
    async handleFlowRecord(row) {
      const { data } = await getFlowInfoByFlowId({
        flowId: this.flowId
      })
      this.$router.push({
        name: 'projectcompletionrate',//projectcompletionrate
        query: {
          id: row.id,
          formId: data.formId,
          procInsId: row.procInsId,
          projectCode: row.projectCode,
          deployId: row.deployId,
          taskId: row.taskId,
          tableName: 'pms_production_project'
        }
      })
    },
    handleAgainRecord(row) {
      console.log(row)
      let taskId = localStorage.getItem('taskId')
      this.$router.push({
        path: this.formPath,
        query: {
          id: row.id,
          procInsId: row.procInsId,
          deployId: row.deployId,
          taskId
        }
      })
    },
    /**  发起流程申请 */
    handleStartProcess(row) {
      localStorage.setItem('proData', '')
      localStorage.setItem('procInsId', '')
      this.$router.push({
        path: this.formPath,
        query: {
          deployId: row.deploymentId,
          procDefId: row.id,
          formId: row.formId
        }
      })
    },
    /** 查询【请填写功能名称】列表 */
    getList() {
      this.loading = true
      if (null != this.showTime && '' != this.showTime) {
        this.queryParams.planStarttimeBeg = this.showTime[0]
        this.queryParams.planStarttimeEnd = this.showTime[1]
      }
      list(this.queryParams).then((response) => {
        console.log(response)
        this.modelList = response.rows
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
      this.resetForm('queryForm')
      /*this.showTime = []
      this.siteShiArr = []
      this.queryParams.siteShi = ''
      this.queryParams.planStarttimeBeg = ''
      this.queryParams.planStarttimeEnd = ''*/
      this.queryParams =  {
          pageNum: 1,
          pageSize: 10
      };
      this.siteShiArr = []
      this.handleQuery()
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map((item) => item.id)
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    // async handleAdd() {
    //   const { code, data, msg } = await getFlowInfoByFlowId({
    //     flowId: this.flowId
    //   })
    //   if (code == 200) {
    //     this.handleStartProcess(data)
    //   }
    // }
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有数据项?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(function() {
        return exportOverViewData(queryParams);
      }).then(response => {
        this.download(response.msg);
      })
    },

    /** 导出营销费用按钮操作 */
    handleExportTrackCost() {
      this.$confirm('是否确认导出所有数据项?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(function() {
        return exportTrackCost();
      }).then(response => {
        this.download(response.msg);
      })
    },
    /** 导出生产费用按钮操作 */
    handleExportProductionCost() {
      this.$confirm('是否确认导出所有数据项?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(function() {
        return exportProductionCost();
      }).then(response => {
        this.download(response.msg);
      })
    },
  }
}
</script>
<style lang="scss">
.el-tabs__header .el-tabs__nav-scroll {
  display: unset;
}
.clearfix {
  width: 100%;
  text-align: right;
  .el-input__inner{
    border-radius: 25px;
  }
}

.el-form-item {
  margin-bottom: 10px;
}

.my-col {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0;

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
