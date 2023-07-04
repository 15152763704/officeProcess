<template>
  <div class="app-container">
    <el-form v-show="showSearch" ref="queryForm" :inline="true" :model="queryParams" label-width="130px"
             style="margin-bottom: 10px;"
    >
      <el-card :body-style="{ padding: '14px 15px 7px' }" class="box-card">
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
            <el-button icon="el-icon-search" size="mini" type="primary" @click.stop="handleQuery">搜索</el-button>
            <el-button icon="el-icon-refresh" size="mini" @click.stop="resetQuery">重置</el-button>
            <el-button
              icon="el-icon-arrow-down"
              size="mini"
              type="primary"
              @click.stop="cardClick"
            >高级搜索
            </el-button>
          </el-form-item>
        </div>
        <el-collapse-transition>
          <div v-show="ifCardShow">
            <div class="my-col">
              <el-form-item label="生产立项编号" prop="productionProjectNul">
                <el-input
                  v-model="queryParams.productionProjectNul"
                  clearable
                  placeholder="请输入生产立项编号"
                  size="small"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
              <el-form-item label="项目名称" prop="entryName">
                <el-input
                  v-model="queryParams.entryName"
                  clearable
                  placeholder="请输入项目名称"
                  size="small"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
              <el-form-item label="项目类型" prop="projectType">
                <el-select v-model="queryParams.projectType" clearable placeholder="请选择项目类型" size="small">
                  <el-option
                    v-for="dict in typeOptions"
                    :key="dict.dictValue"
                    :label="dict.dictLabel"
                    :value="dict.dictValue"
                  />
                </el-select>
              </el-form-item>
              <el-form-item label="流程状态" prop="prostate">
                <el-select v-model="queryParams.prostate" clearable placeholder="请选择流程状态" size="small">
                  <el-option
                    v-for="dict in prostateOptions"
                    :key="dict.dictValue"
                    :label="dict.dictLabel"
                    :value="dict.dictValue"
                  />
                </el-select>
              </el-form-item>
            </div>
            <div class="my-col">
              <el-form-item label="付款对象" prop="paymentObject">
                <el-input
                  v-model="queryParams.paymentObject"
                  clearable
                  placeholder="请输入付款对象"
                  size="small"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
              <el-form-item label="创建人" prop="createUserName">
                <el-input
                  v-model="queryParams.createUserName"
                  clearable
                  placeholder="请输入创建人"
                  size="small"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
              <el-form-item label="付款时间" prop="paymentTime">
                <el-date-picker
                  v-model="paymentTime"
                  end-placeholder="结束日期"
                  range-separator="至"
                  start-placeholder="开始日期"
                  type="daterange"
                  value-format="yyyy-MM-dd"
                >
                </el-date-picker>
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
          v-hasPermi="['system:payment:add']"
          icon="el-icon-plus"
          plain
          size="mini"
          type="primary"
          @click="handleAdd"
        >新增申请
        </el-button>
      </el-col>

      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="paymentList" @selection-change="handleSelectionChange">
      <el-table-column align="center" type="selection" width="55"/>
      <el-table-column align="center" label="生产立项编号" prop="productionProjectNul" sortable/>
      <el-table-column align="center" label="项目名称" prop="entryName" sortable/>
      <el-table-column :formatter="sfdxFormat" align="center" label="项目类型" prop="projectType" sortable/>
      <el-table-column align="center" label="合同金额(元)" prop="contractAmount" sortable/>
      <el-table-column align="center" label="施工成本预算(元)" prop="constructionCostBudget" sortable/>
      <el-table-column align="center" label="付款对象" prop="paymentObject" sortable/>
      <el-table-column align="center" label="付款金额(元)" prop="paymentAmount" sortable/>
      <el-table-column align="center" label="已累计付款金额(元)" prop="accumulatedPaymentAmount" sortable/>
      <el-table-column align="center" label="付款时间" prop="paymentTime" sortable/>
      <el-table-column :formatter="prostateFormat" align="center" label="流程状态" prop="prostate" sortable/>
      <el-table-column align="center" label="创建人" prop="createUserName"/>
      <el-table-column align="center" class-name="small-padding fixed-width" label="操作">
        <template slot-scope="scope">
          <el-button v-if="(scope.row.prostate == '0' || scope.row.prostate == '2' || scope.row.prostate == '4') && $store.getters.user.userId == scope.row.createUserId"
                     size="mini"
                     type="text"
                     icon="el-icon-delete"
                     @click.native="handleDelete(scope.row)"
          >删除
          </el-button>
          <el-button
            icon="el-icon-tickets"
            size="mini"
            type="text"
            @click.native="handleFlowRecord(scope.row)"
          >详情
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :limit.sync="queryParams.pageSize"
      :page.sync="queryParams.pageNum"
      :total="total"
      @pagination="getList"
    />

    <!-- 添加或修改付款申请对话框 -->
    <el-dialog :title="title" :visible.sync="open" append-to-body width="500px">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="生产立项编号" prop="productionProjectNul">
          <el-input v-model="form.productionProjectNul" placeholder="请输入生产立项编号"/>
        </el-form-item>
        <el-form-item label="项目名称" prop="entryName">
          <el-input v-model="form.entryName" placeholder="请输入项目名称"/>
        </el-form-item>
        <el-form-item label="项目类型" prop="projectType">
          <el-select v-model="form.projectType" placeholder="请选择项目类型">
            <el-option label="请选择字典生成" value=""/>
          </el-select>
        </el-form-item>
        <el-form-item label="建设单位" prop="constructionUnit">
          <el-input v-model="form.constructionUnit" placeholder="请输入建设单位"/>
        </el-form-item>
        <el-form-item label="合同金额" prop="contractAmount">
          <el-input v-model="form.contractAmount" placeholder="请输入合同金额"/>
        </el-form-item>
        <el-form-item label="施工成本预算" prop="constructionCostBudget">
          <el-input v-model="form.constructionCostBudget" placeholder="请输入施工成本预算"/>
        </el-form-item>
        <el-form-item label="付款对象" prop="paymentObject">
          <el-input v-model="form.paymentObject" placeholder="请输入付款对象"/>
        </el-form-item>
        <el-form-item label="付款金额" prop="paymentAmount">
          <el-input v-model="form.paymentAmount" placeholder="请输入付款金额"/>
        </el-form-item>
        <el-form-item label="已累计付款金额" prop="accumulatedPaymentAmount">
          <el-input v-model="form.accumulatedPaymentAmount" placeholder="请输入已累计付款金额"/>
        </el-form-item>
        <el-form-item label="付款时间" prop="paymentTime">
          <el-input v-model="form.paymentTime" placeholder="请输入付款时间"/>
        </el-form-item>
        <el-form-item label="流程状态" prop="prostate">
          <el-input v-model="form.prostate" placeholder="请输入流程状态"/>
        </el-form-item>
        <el-form-item label="创建人" prop="createUserName">
          <el-input v-model="form.createUserName" placeholder="请输入创建人"/>
        </el-form-item>
        <el-form-item label="创建人id" prop="createUserId">
          <el-input v-model="form.createUserId" placeholder="请输入创建人id"/>
        </el-form-item>
        <el-form-item label="创建人部门名称" prop="createDeptName">
          <el-input v-model="form.createDeptName" placeholder="请输入创建人部门名称"/>
        </el-form-item>
        <el-form-item label="创建人部门id" prop="createDeptId">
          <el-input v-model="form.createDeptId" placeholder="请输入创建人部门id"/>
        </el-form-item>
        <el-form-item label="修改人名称" prop="updateUserName">
          <el-input v-model="form.updateUserName" placeholder="请输入修改人名称"/>
        </el-form-item>
        <el-form-item label="修改人id" prop="updateUserId">
          <el-input v-model="form.updateUserId" placeholder="请输入修改人id"/>
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
import { addPayment, delPayment, exportPayment, getPayment, listPayment, updatePayment } from '@/api/biz/payment.js'
import { getFlowInfoByFlowId } from '@/api/flowable/definition'

export default {
  name: 'Payment',
  components: {},
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
      // 付款申请表格数据
      paymentList: [],
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        productionProjectNul: null,
        entryName: null,
        projectType: null,
        paymentObject: null,
        prostate: null,
        simpleSearch:'',
        createUserName: null,
        startCreateTime: null,
        endCreateTime: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {},
      ifCardShow: false,
      typeOptions: [],
      prostateOptions: [],
      paymentTime: []
    }
  },
  created() {
    this.getList()
    this.getDicts('project_type').then(response => {
      this.typeOptions = response.data
    })
    this.getDicts('form_process_state').then(response => {
      this.prostateOptions = response.data
    })
  },
  activated(){
    if(localStorage.getItem("needLoadList") === "yes"){
      this.resetQuery()
      localStorage.setItem("needLoadList",undefined)
    }
  },
  methods: {
    sfdxFormat(row) {
      return this.selectDictLabel(this.typeOptions, row.projectType)
    },
    prostateFormat(row) {
      return this.selectDictLabel(this.prostateOptions, row.prostate)
    },
    /** 新增按钮操作 */
    async handleAdd() {
      const { code, data, msg } = await getFlowInfoByFlowId({
        flowId: 'process_s9ipp2ma'
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
        path: '/task/record/index/payment',
        query: {
          deployId: row.deploymentId,
          procDefId: row.id,
          formId: row.formId
        }
      })
    },
    /** 流程流转记录 */
    async handleFlowRecord(row) {
      const { data } = await getFlowInfoByFlowId({
        flowId: 'process_s9ipp2ma'
      })
      this.$router.push({
        path: '/task/record/index/payment',
        query: {
          id: row.id,
          formId: data.formId,
          procInsId: row.procInsId,
          deployId: row.deployId,
          taskId: row.taskId,
          tableName: 'pms_construction_payment'
        }
      })
    },
    cardClick() {
      this.ifCardShow = !this.ifCardShow
    },
    /** 查询付款申请列表 */
    getList() {
      this.loading = true
      console.log(this.paymentTime)
      this.queryParams.startCreateTime = this.paymentTime[0]
      this.queryParams.endCreateTime = this.paymentTime[1]
      listPayment(this.queryParams).then(response => {
        this.paymentList = response.rows
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
      this.paymentTime = []
      this.form = {
        pageNum: 1,
        pageSize: 10,
        productionProjectNul: null,
        entryName: null,
        projectType: null,
        paymentObject: null,
        prostate: null,
        createUserName: null,
        startCreateTime: null,
        endCreateTime: null
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
      this.reset()
      this.resetForm('queryForm')
      this.handleQuery()
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset()
      const id = row.id || this.ids
      getPayment(id).then(response => {
        this.form = response.data
        this.open = true
        this.title = '修改付款申请'
      })
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updatePayment(this.form).then(response => {
              this.msgSuccess('修改成功')
              this.open = false
              this.getList()
            })
          } else {
            addPayment(this.form).then(response => {
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
      this.$confirm('是否确认删除付款申请编号为"' + ids + '"的数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function() {
        return delPayment(ids)
      }).then(() => {
        this.getList()
        this.msgSuccess('删除成功')
      })
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams
      this.$confirm('是否确认导出所有付款申请数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function() {
        return exportPayment(queryParams)
      }).then(response => {
        this.download(response.msg)
      })
    }
  }
}
</script>
<style lang="scss">
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

