<template>
  <div class="app-container">
    <el-form v-show="showSearch" ref="queryForm" :inline="true" :model="queryParams" label-width="120px"
             style="margin-bottom:10px;"
    >
      <el-card :body-style="{ padding: '14px 15px 7px' }" class="box-card">
        <div slot="header" class="clearfix">
          <el-form-item label="还款人" prop="createUserName">
            <el-input
              v-model="queryParams.createUserName"
              clearable
              placeholder="请输入创建人"
              size="small"
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
          <el-form-item label="还款部门" prop="createDeptName">
            <el-input
              v-model="queryParams.createDeptName"
              clearable
              placeholder="请输入创建部门"
              size="small"
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
          <el-form-item label="还款金额(元)" prop="huankuanjine">
            <el-input
              v-model="queryParams.huankuanjine"
              clearable
              placeholder="请输入还款金额(元)"
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
              <el-form-item></el-form-item>
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
          v-hasPermi="['repayment:travelreimbursement:add']"
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

    <el-table v-loading="loading" :data="travelreimbursementList" @selection-change="handleSelectionChange">
      <el-table-column align="center" type="selection" width="55"/>
      <el-table-column align="center" label="还款人" prop="createUserName" sortable/>
      <el-table-column align="center" label="还款部门" prop="createDeptName" sortable/>
      <el-table-column align="center" label="本次还款金额(元)" prop="huankuanjine" sortable/>
      <el-table-column align="center" label="剩余还款金额(元)" prop="smoney" sortable/>
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

    <!-- 添加或修改还款申请对话框 -->
    <el-dialog :title="title" :visible.sync="open" append-to-body width="500px">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="借款总金额" prop="zmoney">
          <el-input v-model="form.zmoney" placeholder="请输入借款总金额"/>
        </el-form-item>
        <el-form-item label="本次还款金额(元)" prop="hmoney">
          <el-input v-model="form.hmoney" placeholder="请输入本次还款金额(元)"/>
        </el-form-item>
        <el-form-item label="剩余还款金额(元)" prop="smoney">
          <el-input v-model="form.smoney" placeholder="请输入剩余还款金额(元)"/>
        </el-form-item>
        <el-form-item label="借款事由" prop="jkshiyou">
          <el-input v-model="form.jkshiyou" placeholder="请输入内容" type="textarea"/>
        </el-form-item>
        <el-form-item label="借款单位" prop="jkdanwei">
          <el-input v-model="form.jkdanwei" placeholder="请输入借款单位"/>
        </el-form-item>
        <el-form-item label="借款金额大写" prop="jkjinedx">
          <el-input v-model="form.jkjinedx" placeholder="请输入借款金额大写"/>
        </el-form-item>
        <el-form-item label="借款备注" prop="beizhu">
          <el-input v-model="form.beizhu" placeholder="请输入内容" type="textarea"/>
        </el-form-item>
        <el-form-item label="借款附件" prop="fujian">
          <el-input v-model="form.fujian" placeholder="请输入内容" type="textarea"/>
        </el-form-item>
        <el-form-item label="还款金额(元)大写" prop="hkjinedx">
          <el-input v-model="form.hkjinedx" placeholder="请输入还款金额(元)大写"/>
        </el-form-item>
        <el-form-item label="未还款金额(元)大写" prop="whkjinedx">
          <el-input v-model="form.whkjinedx" placeholder="请输入未还款金额(元)大写"/>
        </el-form-item>
        <el-form-item label="还款备注" prop="hkbeizhu">
          <el-input v-model="form.hkbeizhu" placeholder="请输入还款备注"/>
        </el-form-item>
        <el-form-item label="还款附件" prop="hkfujian">
          <el-input v-model="form.hkfujian" placeholder="请输入内容" type="textarea"/>
        </el-form-item>
        <el-form-item label="还款单位" prop="hkdanwei">
          <el-select v-model="form.hkdanwei" placeholder="请选择还款单位">
            <el-option
              v-for="dict in hkdanweiOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="待还款金额(元)" prop="daihuankuan">
          <el-input v-model="form.daihuankuan" placeholder="请输入待还款金额(元)"/>
        </el-form-item>
        <el-form-item label="付款方式" prop="fukuangfangshi">
          <el-select v-model="form.fukuangfangshi" placeholder="请选择付款方式">
            <el-option
              v-for="dict in fukuangfangshiOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="借款编号" prop="nums">
          <el-input v-model="form.nums" placeholder="请输入借款编号"/>
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
  addProjectshuankuan,
  delProjectshuankuan,
  exportProjectshuankuan,
  getProjectshuankuan,
  listProjectshuankuan,
  updateProjectshuankuan
} from '@/api/biz/projectshuankuan'
import { getFlowInfoByFlowId } from '@/api/flowable/definition'

export default {
  name: 'Projectshuankuan',
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
      // 还款申请表格数据
      travelreimbursementList: [],
      bumennameOptions: [],
      MarketOptions: [],
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 还款单位字典
      hkdanweiOptions: [],
      // 付款方式字典
      fukuangfangshiOptions: [],
      // 流程状态字典
      prostateOptions: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        prostate: null,
        createUserName: null,
        createDeptName: null,
        huankuanjine: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {}
    }
  },
  created() {
    this.getList()
    this.getDicts('form_company_name').then(response => {
      this.hkdanweiOptions = response.data
    })
    this.getDicts('form_payment_method').then(response => {
      this.fukuangfangshiOptions = response.data
    })
    this.getDicts('form_process_state').then(response => {
      this.prostateOptions = response.data
    })
    this.getDicts('Market_loan_type').then(response => {
      this.MarketOptions = response.data
    })
    this.getDicts('form_company_name').then((response) => {
      this.bumennameOptions = response.data
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
    /** 查询还款申请列表 */
    getList() {
      this.loading = true
      listProjectshuankuan(this.queryParams).then(response => {
        this.travelreimbursementList = response.rows
        this.total = response.total
        this.loading = false
      })
    },
    // 还款单位字典翻译
    hkdanweiFormat(row, column) {
      return this.selectDictLabel(this.hkdanweiOptions, row.hkdanwei)
    },
    // 付款方式字典翻译
    fukuangfangshiFormat(row, column) {
      return this.selectDictLabel(this.fukuangfangshiOptions, row.fukuangfangshi)
    },
    // 流程状态字典翻译
    prostateFormat(row, column) {
      return this.selectDictLabel(this.prostateOptions, row.prostate)
    },
    marketFormat(row, column) {
      return this.selectDictLabel(this.MarketOptions, row.leixing)
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
        zmoney: null,
        hmoney: null,
        smoney: null,
        parentid: null,
        status: '0',
        jkshiyou: null,
        jkdanwei: null,
        jkjinedx: null,
        beizhu: null,
        fujian: null,
        hkjinedx: null,
        whkjinedx: null,
        hkbeizhu: null,
        hkfujian: null,
        times: null,
        hkdanwei: null,
        daihuankuan: null,
        fukuangfangshi: null,
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
        flowId: 'process_eargca1i'
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
        path: '/task/record/index/projectshuankuan',
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
        flowId: 'process_eargca1i'
      })
      this.$router.push({
        path: '/task/record/index/projectshuankuan',
        query: {
          id: row.id,
          formId: data.formId,
          procInsId: row.procInsId,
          deployId: row.deployId,
          taskId: row.taskId,
          tableName: 'pms_projectshuankuan'
        }
      })
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset()
      const id = row.id || this.ids
      getProjectshuankuan(id).then(response => {
        this.form = response.data
        this.open = true
        this.title = '修改还款申请'
      })
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateProjectshuankuan(this.form).then(response => {
              this.msgSuccess('修改成功')
              this.open = false
              this.getList()
            })
          } else {
            addProjectshuankuan(this.form).then(response => {
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
      this.$confirm('是否确认删除还款申请编号为"' + ids + '"的数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function() {
        return delProjectshuankuan(ids)
      }).then(() => {
        this.getList()
        this.msgSuccess('删除成功')
      })
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams
      this.$confirm('是否确认导出所有还款申请数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function() {
        return exportProjectshuankuan(queryParams)
      }).then(response => {
        this.download(response.msg)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.clearfix {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .el-form-item {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
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
