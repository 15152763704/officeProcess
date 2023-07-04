<template>
  <div class="app-container">
    <el-form v-show="showSearch" ref="queryForm" :inline="true" :model="queryParams" label-width="120px"
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
              <el-form-item label="借款编号" prop="nums">
                <el-input
                  v-model="queryParams.nums"
                  clearable
                  placeholder="请输入采购借款编号"
                  size="small"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>

              <el-form-item label="项目编号" prop="projectnum">
                <el-input
                  v-model="queryParams.projectnum"
                  clearable
                  placeholder="请输入项目编号"
                  size="small"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
              <el-form-item label="采购编号" prop="huowudingdan">
                <el-input
                  v-model="queryParams.huowudingdan"
                  clearable
                  placeholder="请输入采购借款编号"
                  size="small"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
              <el-form-item label="流程状态" prop="prostate">
                <el-select
                  v-model="queryParams.prostate"
                  clearable
                  placeholder="请选择流程状态"
                  size="small"
                  style="width: 100%;"
                >
                  <el-option
                    v-for="dict in formProcessState"
                    :key="dict.dictValue"
                    :label="dict.dictLabel"
                    :value="dict.dictValue"
                  />
                </el-select>
              </el-form-item>
            </div>
            <div class="my-col">
              <el-form-item label="项目名称" prop="projectname">
                <el-input
                  v-model="queryParams.projectname"
                  clearable
                  placeholder="请输入项目名称"
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
              <el-form-item label="借款事由" prop="borrowingreason">
                <el-input
                  v-model="queryParams.borrowingreason"
                  clearable
                  placeholder="请输入借款事由"
                  size="small"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
              <el-form-item label="借款金额(元)" prop="jinex">
                <el-input
                  v-model="queryParams.jinex"
                  clearable
                  placeholder="请输入借款金额(元)"
                  size="small"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>

            </div>
            <div class="my-col">
              <el-form-item label="待还金额(元)" prop="daijine">
                <el-input
                  v-model="queryParams.daijine"
                  clearable
                  placeholder="请输入待还金额(元)"
                  size="small"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
              <el-form-item label="是否还清" prop="sfhq">
                <el-select
                  v-model="queryParams.sfhq"
                  clearable
                  placeholder="请选择是否还完"
                  size="small"
                  style="width: 100%;"
                >
                  <el-option
                    v-for="dict in sfhwOptions"
                    :key="dict.dictValue"
                    :label="dict.dictLabel"
                    :value="dict.dictValue"
                  />
                </el-select>
              </el-form-item>
              <el-form-item></el-form-item><el-form-item></el-form-item>
            </div>
          </div>
        </el-collapse-transition>
      </el-card>


    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          v-hasPermi="['system:caigouloan:add']"
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

    <el-table v-loading="loading" :data="caigouloanList" border @selection-change="handleSelectionChange">
      <el-table-column align="center" type="selection" width="55"/>
      <el-table-column align="center" label="借款编号" prop="nums" sortable/>
      <el-table-column align="center" label="项目编号" prop="projectnum" sortable/>
      <el-table-column align="center" label="采购编号" prop="huowudingdan" sortable/>
      <el-table-column align="center" label="项目名称" prop="projectname" sortable/>
      <el-table-column align="center" label="创建人" prop="createUserName" sortable/>
      <el-table-column align="center" label="借款事由" prop="borrowingreason" sortable/>
      <el-table-column align="center" label="借款金额(元)" prop="jinex" sortable/>
      <el-table-column align="center" label="待还金额(元)" prop="daijine" sortable/>
      <el-table-column :formatter="sfhwFormat" align="center" label="是否还清" prop="sfhq" sortable/>
      <el-table-column :formatter="formProcessFormat" align="center" label="流程状态" prop="prostate" sortable/>
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

  </div>
</template>

<script>
import {
  addCaigouloan,
  delCaigouloan,
  exportCaigouloan,
  getCaigouloan,
  listCaigouloan,
  updateCaigouloan
} from '@/api/biz/caigouloan'
import { getFlowInfoByFlowId } from '@/api/flowable/definition'

export default {
  name: 'Caigouloan',
  components: {},
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 子表选中数据
      checkedPmsBorrowingdetail: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // purchaseCost表格数据
      caigouloanList: [],
      // ${subTable.functionName}表格数据
      pmsBorrowingdetailList: [],
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        nums: null,
        projectnum: null,
        huowudingdan: null,
        projectname: null,
        createUserName: null,
        borrowingreason: null,
        jinex: null,
        daijine: null,
        simpleSearch:'',
        sfhq: null,
        prostate: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {},
      ifCardShow: false,
      // 是否还清字典
      sfhwOptions: [],
      formProcessState: []
    }
  },
  created() {
    this.getDicts('sys_yes_no').then(response => {
      this.sfhwOptions = response.data
    })
    this.getDicts('form_process_state').then(response => {
      this.formProcessState = response.data
    })
    this.getList()
  },
  activated(){
    if(localStorage.getItem("needLoadList") === "yes"){
      this.resetQuery()
      localStorage.setItem("needLoadList",undefined)
    }
  },
  methods: {
    sfhwFormat(row, column) {
      return this.selectDictLabel(this.sfhwOptions, row.sfhq)
    },
    formProcessFormat(row, column) {
      return this.selectDictLabel(this.formProcessState, row.prostate)
    },
    cardClick() {
      this.ifCardShow = !this.ifCardShow
    },
    /** 查询purchaseCost列表 */
    getList() {
      this.loading = true
      listCaigouloan(this.queryParams).then(response => {
        this.caigouloanList = response.rows
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
        usernames: null,
        deptname: null,
        times: null,
        borrowingreason: null,
        huowudingdan: null,
        projectnum: null,
        projectname: null,
        pm: null,
        fukuanfangshi: null,
        jiekuandanwei: null,
        jinex: null,
        jined: null,
        beizhu: null,
        fujian: null,
        cailiaomingxi: null,
        sfhq: null,
        daijine: null,
        sqrqianzi: null,
        bmzgqianzi: null,
        zjlqianzi: null,
        nums: null,
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
      this.pmsBorrowingdetailList = []
      this.resetForm('form')
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1
      this.getList()
    },
    /** 重置按钮操作 */
    resetQuery() {
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
        flowId: 'process_4fwgpprp'
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
        path: '/task/record/index/caigouloan',
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
        flowId: 'process_4fwgpprp'
      })
      this.$router.push({
        path: '/task/record/index/caigouloan',
        query: {
          id: row.id,
          formId: data.formId,
          procInsId: row.procInsId,
          deployId: row.deployId,
          taskId: row.taskId,
          tableName: 'pms_caigouloan'
        }
      })
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset()
      const id = row.id || this.ids
      getCaigouloan(id).then(response => {
        this.form = response.data
        this.pmsBorrowingdetailList = response.data.pmsBorrowingdetailList
        this.open = true
        this.title = '修改purchaseCost'
      })
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          this.form.pmsBorrowingdetailList = this.pmsBorrowingdetailList
          if (this.form.id != null) {
            updateCaigouloan(this.form).then(response => {
              this.msgSuccess('修改成功')
              this.open = false
              this.getList()
            })
          } else {
            addCaigouloan(this.form).then(response => {
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
      this.$confirm('是否确认删除purchaseCost编号为"' + ids + '"的数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function() {
        return delCaigouloan(ids)
      }).then(() => {
        this.getList()
        this.msgSuccess('删除成功')
      })
    },
    /** ${subTable.functionName}序号 */
    rowPmsBorrowingdetailIndex({ row, rowIndex }) {
      row.index = rowIndex + 1
    },
    /** ${subTable.functionName}添加按钮操作 */
    handleAddPmsBorrowingdetail() {
      let obj = {}
      obj.id = ''
      obj.title = ''
      obj.created = ''
      obj.modified = ''
      obj.creator = ''
      obj.modificator = ''
      obj.recycle = ''
      obj.name = ''
      obj.xinghao = ''
      obj.danwei = ''
      obj.num = ''
      obj.parentid = ''
      obj.prostate = ''
      obj.createUserName = ''
      obj.createUserId = ''
      obj.createDeptName = ''
      obj.createDeptId = ''
      obj.updateUserName = ''
      obj.updateUserId = ''
      this.pmsBorrowingdetailList.push(obj)
    },
    /** ${subTable.functionName}删除按钮操作 */
    handleDeletePmsBorrowingdetail() {
      if (this.checkedPmsBorrowingdetail.length == 0) {
        this.$alert('请先选择要删除的${subTable.functionName}数据', '提示', { confirmButtonText: '确定' })
      } else {
        this.pmsBorrowingdetailList.splice(this.checkedPmsBorrowingdetail[0].index - 1, 1)
      }
    },
    /** 单选框选中数据 */
    handlePmsBorrowingdetailSelectionChange(selection) {
      if (selection.length > 1) {
        this.$refs.pmsBorrowingdetail.clearSelection()
        this.$refs.pmsBorrowingdetail.toggleRowSelection(selection.pop())
      } else {
        this.checkedPmsBorrowingdetail = selection
      }
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams
      this.$confirm('是否确认导出所有purchaseCost数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function() {
        return exportCaigouloan(queryParams)
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
