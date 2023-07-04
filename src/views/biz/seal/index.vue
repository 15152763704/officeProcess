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
              <el-form-item label="申请事由" prop="reson">
                <el-input
                  v-model="queryParams.reson"
                  placeholder="请输入申请事由"
                  clearable
                  size="small"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
              <el-form-item label="申请人" prop="username">
                <el-input
                  v-model="queryParams.username"
                  placeholder="请输入申请人"
                  clearable
                  size="small"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
              <el-form-item label="印章类型" prop="printing">
                <el-select
                  v-model="queryParams.printing"
                  clearable
                  placeholder="请选择公司名称"
                  @keyup.enter.native="handleQuery"
                >
                  <el-option
                    v-for="item in formSealTypeList"
                    :key="item.dictValue"
                    :label="item.dictLabel"
                    :value="item.dictValue"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="流程状态" prop="prostate">
                <el-select v-model="queryParams.prostate" clearable placeholder="请选择资料类型">
                  <el-option
                    v-for="item in formProcessState"
                    :key="item.dictValue"
                    :label="item.dictLabel"
                    :value="item.dictValue"
                  ></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="my-col">
              <el-form-item label="接收单位" prop="meanscompany">
                <el-input
                  v-model="queryParams.meanscompany"
                  placeholder="请输入接收单位"
                  clearable
                  size="small"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
              <el-form-item label="申请部门" prop="dept">
                <el-input
                  v-model="queryParams.dept"
                  placeholder="请输入申请部门"
                  clearable
                  size="small"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
              <el-form-item label="公司名称" prop="company">
                <el-select
                  v-model="queryParams.company"
                  clearable
                  placeholder="请选择公司名称"
                  @keyup.enter.native="handleQuery"
                >
                  <el-option
                    v-for="item in formCompanyNameList"
                    :key="item.dictValue"
                    :label="item.dictLabel"
                    :value="item.dictValue"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="资料类型" prop="means">
                <el-select v-model="queryParams.means" clearable placeholder="请选择资料类型">
                  <el-option
                    v-for="item in formDataTypeList"
                    :key="item.dictValue"
                    :label="item.dictLabel"
                    :value="item.dictValue"
                  ></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="my-col">
              <el-form-item label="申请时间" prop="times">
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
              <!-- 站位div -->
              <el-form-item></el-form-item>
              <el-form-item></el-form-item>
            </div>
          </div>
        </el-collapse-transition>
      </el-card>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['system:seal:add']"
        >新增申请
        </el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="sealList" @selection-change="handleSelectionChange" border>
      <el-table-column align="center" type="selection" width="55"/>
      <el-table-column align="center" label="申请事由" prop="reson" sortable/>
      <el-table-column label="公司名称" sortable align="center" prop="COMPANY" :formatter="companyFormat"/>
      <el-table-column align="center" label="印章类型" prop="printingname" sortable/>
      <el-table-column align="center" label="资料接受单位" prop="meanscompany" sortable/>
      <el-table-column label="资料类型" sortable align="center" prop="means" :formatter="meansnameFormat"/>
      <el-table-column align="center" label="申请人" prop="createUserName" sortable/>
      <el-table-column label="申请时间" sortable align="center" prop="times">
        <template slot-scope="scope">{{ formatDate(scope.row.times) }}</template>
      </el-table-column>
      <!-- <el-table-column label="是否同意" sortable align="center" prop="agree" /> -->
      <el-table-column label="流程状态" sortable align="center" prop="prostate" :formatter="prostateFormat"/>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button v-if="(scope.row.prostate == '0' || scope.row.prostate == '2' || scope.row.prostate == '4') && $store.getters.user.userId == scope.row.createUserId"
                     size="mini"
                     type="text"
                     icon="el-icon-delete"
                     @click.native="handleDelete(scope.row)"
          >删除
          </el-button>
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
import { listSeal,delSeal } from '@/api/biz/seal'
import { getFlowInfoByFlowId } from '@/api/flowable/definition'
import { formatDate } from '@/utils'

export default {
  name: 'Apply',
  components: {},
  data() {
    return {
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
      sealList: [],
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        simpleSearch:'',
        dept: null,
        username: null,
        projectname: null,
        projectno: null,
        reson: null,
        means: null,
        printing: null,
        company: null,
        meanscompany: null,
        agree: null,
        userid: null,
        beizhu: null,
        fujian: null,
        cast: null,
        yingxiaono: null,
        toubiaono: null,
        shengchanno: null,
        timesStart: null,
        timesEnd: null,
        state: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {},
      formDataTypeList: [],
      formCompanyNameList: [],
      formSealTypeList: [],
      formProcessState: [],
      formatDate,
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
    // 资料类型、
    this.getDicts('form_data_type').then((res) => {
      this.formDataTypeList = res.data
    })
    // 公司名称
    this.getDicts('form_company_name').then((res) => {
      this.formCompanyNameList = res.data
    })
    // 印章类型
    this.getDicts('form_seal_type').then((res) => {
      this.formSealTypeList = res.data
    })
    // 流程状态
    this.getDicts('form_process_state').then((res) => {
      this.formProcessState = res.data
    })
  },
  activated(){
    if(localStorage.getItem("needLoadList") === "yes"){
      this.resetQuery()
      localStorage.setItem("needLoadList",undefined)
    }
  },
  // destroyed() {
  //   localStorage.setItem('taskId', '')
  // },
  methods: {
    prostateFormat(row, column) {
      return this.selectDictLabel(this.formProcessState, row.prostate)
    },
    meansnameFormat(row, column) {
      return this.selectDictLabel(this.formDataTypeList, row.means)
    },
    companyFormat(row, column) {
      return this.selectDictLabel(this.formCompanyNameList, row.company)
    },
    cardClick() {
      this.ifCardShow = !this.ifCardShow
    },
    handletimeChange(dataarr) {
      this.queryParams.timesStart = dataarr[0]
      this.queryParams.timesEnd = dataarr[1]
      console.log(this.queryParams)
    },
    /** 流程流转记录 */
    async handleFlowRecord(row) {
      const { data } = await getFlowInfoByFlowId({
        flowId: 'process_gbfntkif'
      })
      this.$router.push({
        path: '/task/record/index/seal',
        query: {
          id: row.id,
          formId: data.formId,
          procInsId: row.procInsId,
          deployId: row.deployId,
          taskId: row.taskId,
          tableName: 'pms_printing_management'
        }
      })
    },
    /**  发起流程申请 */
    handleStartProcess(row) {
      localStorage.setItem('proData', '')
      localStorage.setItem('procInsId', '')
      this.$router.push({
        path: '/task/record/index/seal',
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
      listSeal(this.queryParams).then((response) => {
        console.log(response)
        this.sealList = response.data.rows
        this.total = response.data.total
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
      this.showTime = []
      this.queryParams.timesStart = ''
      this.queryParams.timesEnd = ''
      this.handleQuery()
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map((item) => item.id)
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids
      this.$confirm('是否确认删除borrow编号为"' + ids + '"的数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function() {
        return delSeal(ids)
      }).then(() => {
        this.getList()
        this.msgSuccess('删除成功')
      })
    },
    /** 新增按钮操作 */
    async handleAdd() {
      const { code, data, msg } = await getFlowInfoByFlowId({
        flowId: 'process_gbfntkif'
      })
      if (code == 200) {
        this.handleStartProcess(data)
      }
    }
  }
}
</script>
<style  lang="scss">
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
