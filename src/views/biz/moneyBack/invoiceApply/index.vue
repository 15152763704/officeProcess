<template>
  <div class="app-container">
    <el-form v-show="showSearch" ref="queryForm" :inline="true" :model="queryParams" label-width="102px"
             style="margin-bottom:10px;"
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
              <el-form-item label="合同编号" prop="hetongnum">
                <el-input
                  v-model="queryParams.hetongnum"
                  placeholder="请输入合同编号"
                  clearable
                  size="small"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
              <el-form-item label="项目名称" prop="hetongname">
                <el-input
                  v-model="queryParams.hetongname"
                  placeholder="请输入项目名称"
                  clearable
                  size="small"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
              <el-form-item label="客户单位" prop="kehuname">
                <el-input
                  v-model="queryParams.kehuname"
                  placeholder="请输入客户单位"
                  clearable
                  size="small"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
              <el-form-item label="项目金额" prop="projectname">
                <el-input style="width: 100%;"
                          v-model="queryParams.projectname"
                          clearable
                          placeholder="请输入项目金额"
                          size="small"
                          @keyup.enter.native="handleQuery"
                />
              </el-form-item>
            </div>
            <div class="my-col">
              <el-form-item label="开票金额" prop="hejijine">
                <el-input style="width: 100%;"
                          v-model="queryParams.hejijine"
                          clearable
                          placeholder="请输入开票金额"
                          size="small"
                          @keyup.enter.native="handleQuery"
                />
              </el-form-item>
              <el-form-item label="开票申请人" prop="createUserName">
                <el-input
                  v-model="queryParams.createUserName"
                  placeholder="请输入开票申请人"
                  clearable
                  size="small"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
              <el-form-item label="项目编号" prop="num">
                <el-input
                  v-model="queryParams.num"
                  placeholder="请输入项目编号"
                  clearable
                  size="small"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
              <el-form-item label="开票号码" prop="kaipiaonum">
                <el-input
                  v-model="queryParams.kaipiaonum"
                  placeholder="请输入开票号码"
                  clearable
                  size="small"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
            </div>
            <div class="my-col">
              <el-form-item label="开票种类" prop="zhonglei">
                <el-select
                  v-model="queryParams.zhonglei"
                  clearable
                  placeholder="请选择开票种类"
                  @keyup.enter.native="handleQuery"
                >
                  <el-option
                    v-for="dict in invoicing_type"
                    :key="dict.dictValue"
                    :label="dict.dictLabel"
                    :value="dict.dictValue"
                  />
                </el-select>
              </el-form-item>
              <el-form-item label="流程状态" prop="prostate">
                <el-select
                  v-model="queryParams.prostate"
                  clearable
                  placeholder="请选择流程状态"
                  @keyup.enter.native="handleQuery"
                >
                  <el-option
                    v-for="dict in form_process_state"
                    :key="dict.dictValue"
                    :label="dict.dictLabel"
                    :value="dict.dictValue"
                  />
                </el-select>
              </el-form-item>
              <el-form-item label="开票时间" prop="time">
                <el-date-picker
                  v-model="showTimetime"
                  type="daterange"
                  align="right"
                  value-format="yyyy-MM-dd"
                  unlink-panels
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  :picker-options="pickerOptions"
                  @keyup.enter.native="handleQuery"
                  @change="handletimeChangetime"
                ></el-date-picker>
              </el-form-item>
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
          v-hasPermi="['moneyBack:invoiceApply:add']"
        >新增申请
        </el-button>
        <el-button
          type="primary"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['moneyBack:invoiceApply:add']"
        >导出
        </el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="invoiceApplyList" @selection-change="handleSelectionChange">
      <el-table-column align="center" type="selection" width="55"/>
      <el-table-column align="center" label="项目名称" prop="hetongname" sortable/>
      <el-table-column align="center" label="项目金额" prop="projectname" sortable/>
      <el-table-column align="center" label="开票金额" prop="hejijine" sortable/>
      <el-table-column align="center" label="客户单位" prop="kehuname" sortable/>
      <el-table-column align="center" label="项目编号" prop="num" sortable/>
      <el-table-column align="center" label="开票申请人" prop="createUserName" sortable/>
      <el-table-column align="center" label="开票时间" prop="time" sortable/>
      <el-table-column :formatter="invoiciongTypeFormat" align="center" label="开票种类" prop="zhonglei" sortable/>
      <el-table-column :formatter="prostateFormat" align="center" label="流程状态" prop="prostate" sortable/>
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
            icon="el-icon-edit"
            @click="handleFlowRecord(scope.row)"
            v-hasPermi="['peopleChange:neetApply:edit']"
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
import {
  addInvoiceApply,
  delInvoiceApply,
  exportInvoiceApply,
  getInvoiceApply,
  listInvoiceApply,
  updateInvoiceApply
} from '@/api/biz/moneyBack/invoiceApply'
import { getFlowInfoByFlowId } from '@/api/flowable/definition'

export default {
  name: 'InvoiceApply',
  components: {},
  data() {
    return {
      ifCardShow: false,//高级搜索默认隐藏false
      showTimetime: [],//开票时间
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
      // 开票申请表格数据
      invoiceApplyList: [],
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        simpleSearch:'',
        title: null,
        created: null,
        modified: null,
        creator: null,
        modificator: null,
        recycle: null,
        shenqingren: null,
        agree: null,
        kaipiaonum: null,
        time: null,
        zhonglei: null,
        num: null,
        hetongname: null,
        hetongnum: null,
        projectname: undefined,
        neirong: null,
        kehuname: null,
        shuihao: null,
        site: null,
        yinhang: null,
        kahao: null,
        tel: null,
        xiangqing: null,
        hejishuliang: null,
        prostate: null,
        hejijine: undefined,
        createUserName: null,
        createUserId: null,
        daxiejine: null,
        kaipiaoname: null,
        projectid: null,
        createDeptName: null,
        xmtype: null,
        createDeptId: null,
        gongsiname: null,
        updateUserName: null,
        attachment: null,
        updateUserId: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {},
      invoicing_type: [],//开票种类
      form_process_state: [],//流程状态
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

    this.getDicts('form_process_state').then((response) => {
      this.form_process_state = response.data
    })

    this.getDicts('invoicing_type').then((response) => {
      this.invoicing_type = response.data
    })
  },
  activated(){
    if(localStorage.getItem("needLoadList") === "yes"){
      this.resetQuery()
      localStorage.setItem("needLoadList",undefined)
    }
  },
  methods: {
    prostateFormat(row, column) {
      return this.selectDictLabel(this.form_process_state, row.prostate)
    },
    invoiciongTypeFormat(row, column) {
      return this.selectDictLabel(this.invoicing_type, row.zhonglei)
    },
    //高级搜索
    cardClick() {
      this.ifCardShow = !this.ifCardShow
    },
    //开票时间区间 变化事件
    handletimeChangetime(dataarr) {
      this.queryParams.timeStart = dataarr[0]
      this.queryParams.timeEnd = dataarr[1]
    },
    /** 查询开票申请列表 */
    getList() {
      this.loading = true
      listInvoiceApply(this.queryParams).then(response => {
        this.invoiceApplyList = response.rows
        this.total = response.total
        this.loading = false
      })
    },
    // 取消按钮
    cancel() {
      this.open = false
      this.reset()
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
        shenqingren: null,
        agree: null,
        kaipiaonum: null,
        time: null,
        zhonglei: null,
        num: null,
        hetongname: null,
        hetongnum: null,
        projectname: null,
        neirong: null,
        kehuname: null,
        shuihao: null,
        site: null,
        yinhang: null,
        kahao: null,
        tel: null,
        xiangqing: null,
        hejishuliang: null,
        prostate: null,
        hejijine: null,
        createUserName: null,
        createUserId: null,
        daxiejine: null,
        kaipiaoname: null,
        createTime: null,
        projectid: null,
        createDeptName: null,
        xmtype: null,
        createDeptId: null,
        gongsiname: null,
        updateUserName: null,
        attachment: null,
        updateUserId: null,
        updateTime: null
      }
      this.resetForm('form')
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1
      this.getList()
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.queryParams.timeStart = ''
      this.queryParams.timeEnd = ''
      this.showTimetime = []
      this.resetForm('queryForm')
      this.handleQuery()
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    /** 详情 流程流转记录 */
    async handleFlowRecord(row) {
      const { data } = await getFlowInfoByFlowId({
        flowId: 'process_g1l28ruk'
      })
      this.$router.push({
        path: '/task/record/index/moneyBackInvoiceApply',
        query: {
          id: row.id,
          formId: data.formId,
          procInsId: row.procInsId,
          deployId: row.deployId,
          taskId: row.taskId,
          tableName: 'pms_kaipiaoshenqing'
        }
      })
    },
    /** 新增流程 */
    async handleAdd() {
      const { code, data, msg } = await getFlowInfoByFlowId({
        flowId: 'process_g1l28ruk'
      })
      if (code == 200) {
        this.handleStartProcess(data)
      }
    },
    /**  发起流程申请 */
    handleStartProcess(row) {
      localStorage.setItem('proData', '')
      localStorage.setItem('procInsId', '')
      this.$router.push({
        path: '/task/record/index/moneyBackInvoiceApply',
        query: {
          deployId: row.deploymentId,
          procDefId: row.id,
          formId: row.formId
        }
      })
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset()
      const id = row.id || this.ids
      getInvoiceApply(id).then(response => {
        this.form = response.data
        this.open = true
        this.title = '修改开票申请'
      })
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateInvoiceApply(this.form).then(response => {
              this.msgSuccess('修改成功')
              this.open = false
              this.getList()
            })
          } else {
            addInvoiceApply(this.form).then(response => {
              this.msgSuccess('新增成功')
              this.open = false
              this.getList()
            })
          }
        }
      })
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids
      this.$confirm('是否确认删除开票申请编号为"' + ids + '"的数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function() {
        return delInvoiceApply(ids)
      }).then(() => {
        this.getList()
        this.msgSuccess('删除成功')
      })
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams
      this.$confirm('是否确认导出所有开票申请数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function() {
        return exportInvoiceApply(queryParams)
      }).then(response => {
        this.download(response.msg)
      })
    }
  }
}
</script>
<style scoped lang="scss">
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
  justify-content: flex-start;
  align-items: center;
  margin: 10px 0;

  &:last-child {
    margin-bottom: 0;
  }

  .el-form-item {
    flex: 1;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
}
</style>
