<template>
  <div class="app-container">
    <el-form
      v-show="showSearch"
      ref="queryForm"
      :inline="true"
      :model="queryParams"
      label-width="130px"
      style="margin-bottom:10px;"
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
              <el-form-item label="营销借款编号" prop="nums">
                <el-input
                  v-model="queryParams.nums"
                  clearable
                  placeholder="请输入借款编号"
                  size="small"
                  style="width: 100%;"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
              <el-form-item label="借款事由" prop="liyou">
                <el-input
                  v-model="queryParams.liyou"
                  clearable
                  placeholder="请输入借款事由"
                  size="small"
                  style="width: 100%;"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
              <el-form-item label="借款单位" prop="createDeptName">
                <el-input
                  v-model="queryParams.createDeptName"
                  clearable
                  placeholder="请输入借款单位"
                  size="small"
                  style="width: 100%;"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
              <el-form-item label="项目名称" prop="toubiaoproject">
                <el-input
                  v-model="queryParams.toubiaoproject"
                  clearable
                  placeholder="请输入项目名称"
                  size="small"
                  style="width: 100%;"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
            </div>
            <div class="my-col">
              <el-form-item label="借款类型" prop="leixing">
                <el-select v-model="queryParams.leixing" clearable placeholder="请选择借款类型" size="small"
                           style="width: 100%;"
                >
                  <el-option
                    v-for="dict in MarketOptions"
                    :key="dict.dictValue"
                    :label="dict.dictLabel"
                    :value="dict.dictValue"
                  />
                </el-select>
              </el-form-item>
              <el-form-item label="借款金额(元)" prop="jiekuanjine">
                <el-input
                  v-model="queryParams.jiekuanjine"
                  clearable
                  placeholder="请输入借款金额(元)"
                  size="small"
                  style="width: 100%;"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
              <el-form-item label="借款人" prop="createUserName">
                <el-input
                  v-model="queryParams.createUserName"
                  clearable
                  placeholder="请输入借款人"
                  size="small"
                  style="width: 100%;"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
              <el-form-item label="收款单位" prop="receiveMoneyCompany">
                <el-input
                  v-model="queryParams.receiveMoneyCompany"
                  clearable
                  placeholder="请输入收款单位"
                  size="small"
                  style="width: 100%;"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
            </div>
            <div class="my-col">
              <el-form-item label="流程状态" prop="prostate">
                <el-select
                  v-model="queryParams.prostate"
                  clearable
                  placeholder="请选择流程状态"
                  size="small"
                  style="width: 100%;"
                >
                  <el-option
                    v-for="dict in prostateOptions"
                    :key="dict.dictValue"
                    :label="dict.dictLabel"
                    :value="dict.dictValue"
                  />
                </el-select>
              </el-form-item>
              <el-form-item></el-form-item><el-form-item></el-form-item><el-form-item></el-form-item>
            </div>
          </div>
        </el-collapse-transition>
      </el-card>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          v-hasPermi="['system:traveladvance:add']"
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

    <el-table v-loading="loading" :data="traveladvanceList" @selection-change="handleSelectionChange">
      <el-table-column align="center" type="selection" width="55"/>
      <el-table-column align="center" label="借款编号" prop="nums" sortable/>
      <el-table-column align="center" label="项目名称" prop="toubiaoproject" sortable/>
      <el-table-column align="center" label="借款事由" prop="liyou" sortable/>
      <el-table-column align="center" label="借款单位" prop="createDeptName" sortable/>
      <el-table-column align="center" label="收款单位" prop="receiveMoneyCompany" sortable/>
      <el-table-column :formatter="typeFormat" align="center" label="借款类型" prop="leixing" sortable/>
      <el-table-column align="center" label="借款金额(元)" prop="jiekuanjine" sortable/>
      <el-table-column align="center" label="申请人" prop="createUserName" sortable/>
      <el-table-column :formatter="sfhwFormat" align="center" label="是否还清" prop="sfhq" sortable/>
      <el-table-column :formatter="prostateFormat" align="center" label="流程状态" prop="prostate" sortable/>
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

    <!-- 添加或修改borrow对话框 -->
    <el-dialog :title="title" :visible.sync="open" append-to-body width="500px">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="借款事由" prop="liyou">
          <el-input v-model="form.liyou" placeholder="请输入内容" type="textarea"/>
        </el-form-item>
        <el-form-item label="用途类型" prop="type">
          <el-select v-model="form.type" placeholder="请选择用途类型">
            <el-option
              v-for="dict in typeOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="借款单位" prop="createDeptName">
          <el-select v-model="form.createDeptName" placeholder="请选择借款单位">
            <el-option
              v-for="dict in createDeptNameOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            ></el-option>
          </el-select>
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
import {
  addYxjiekuan,
  delYxjiekuan,
  exportYxjiekuan,
  getYxjiekuan,
  listYxjiekuan,
  updateYxjiekuan
} from '@/api/biz/yxjiekuan'
import { getFlowInfoByFlowId } from '@/api/flowable/definition'

export default {
  name: 'Yxjiekuan',
  components: {},
  data() {
    return {
      ifCardShow: false,
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
      // borrow表格数据
      traveladvanceList: [],
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 是否还清字典
      sfhwOptions: [],
      // 用途类型字典
      typeOptions: [],
      // 借款单位字典
      createDeptNameOptions: [],
      MarketOptions: [],
      // 流程状态字典
      prostateOptions: [],
      // 创建时间时间范围
      daterangeCreateTime: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        toubiaonum: null,
        simpleSearch:'',
        liyou: null,
        createDeptName: null,
        leixing: null,
        jiekuanjine: null,
        receiveMoneyCompany:null,
        createUserName: null,
        prostate: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {}
    }
  },
  created() {
    this.getList()
    this.getDicts('sys_yes_no').then(response => {
      this.sfhwOptions = response.data
    })
    // this.getDicts('Market_loan_type').then(response => {
    //   this.typeOptions = response.data
    // })
    // this.getDicts('form_company_name').then(response => {
    //   this.createDeptNameOptions = response.data
    // })
    this.getDicts('form_process_state').then(response => {
      this.prostateOptions = response.data
    })
    this.getDicts('Market_loan_type').then(response => {
      this.MarketOptions = response.data
    })
  },
  activated(){
    if(localStorage.getItem("needLoadList") === "yes"){
      this.resetQuery()
      localStorage.setItem("needLoadList",undefined)
    }
  },
  methods: {
    cardClick() {
      this.ifCardShow = !this.ifCardShow
    },
    /** 查询borrow列表 */
    getList() {
      this.loading = true
      this.queryParams.params = {}
      // if (null != this.daterangeCreateTime && '' != this.daterangeCreateTime) {
      //   this.queryParams.beginCreateTime = this.daterangeCreateTime[0]
      //   this.queryParams.endCreateTime = this.daterangeCreateTime[1]
      // }
      listYxjiekuan(this.queryParams).then(response => {
        this.traveladvanceList = response.rows
        this.total = response.total
        this.loading = false
      })
    },
    // 是否还清字典翻译
    sfhwFormat(row, column) {
      return this.selectDictLabel(this.sfhwOptions, row.sfhq)
    },
    // 用途类型字典翻译
    typeFormat(row, column) {
      return this.selectDictLabel(this.MarketOptions, row.leixing)
    },
    // 借款单位字典翻译
    createDeptNameFormat(row, column) {
      return this.selectDictLabel(this.createDeptNameOptions, row.createDeptName)
    },
    // 流程状态字典翻译
    prostateFormat(row, column) {
      return this.selectDictLabel(this.prostateOptions, row.prostate)
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
        username: null,
        deptname: null,
        jiekuanjine: null,
        times: null,
        status: '0',
        sfhw: null,
        daijine: null,
        liyou: null,
        type: null,
        toubiaonum: null,
        jkjinedx: null,
        beizhu: null,
        fujian: null,
        sqrqianzi: null,
        bmqianzi: null,
        zjlqianzi: null,
        fukuanfanghsi: null,
        nums: null,
        remake: null,
        prostate: null,
        createUserName: null,
        createUserId: null,
        createTime: null,
        createDeptName: null,
        createDeptId: null,
        updateUserName: null,
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
      // this.daterangeCreateTime = []
      // this.queryParams.beginCreateTime = null
      // this.queryParams.endCreateTime = null
      this.resetForm('queryForm')
      this.handleQuery()
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    async handleAdd() {
      const { code, data, msg } = await getFlowInfoByFlowId({
        flowId: 'process_tyo061oa'
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
        path: '/task/record/index/yxjiekuan',
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
        flowId: 'process_tyo061oa'
      })
      this.$router.push({
        path: '/task/record/index/yxjiekuan',
        query: {
          id: row.id,
          formId: data.formId,
          procInsId: row.procInsId,
          deployId: row.deployId,
          taskId: row.taskId,
          tableName: 'pms_yxjiekuan'
        }
      })
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset()
      const id = row.id || this.ids
      getYxjiekuan(id).then(response => {
        this.form = response.data
        this.open = true
        this.title = '修改borrow'
      })
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateYxjiekuan(this.form).then(response => {
              this.msgSuccess('修改成功')
              this.open = false
              this.getList()
            })
          } else {
            addYxjiekuan(this.form).then(response => {
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
      this.$confirm('是否确认删除borrow编号为"' + ids + '"的数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function() {
        return delYxjiekuan(ids)
      }).then(() => {
        this.getList()
        this.msgSuccess('删除成功')
      })
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams
      this.$confirm('是否确认导出所有borrow数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function() {
        return exportYxjiekuan(queryParams)
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
