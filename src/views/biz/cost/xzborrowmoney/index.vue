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
              <el-form-item label="借款编号" prop="nums">
                <el-input
                  v-model="queryParams.nums"
                  placeholder="请输入借款编号"
                  clearable
                  size="small"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
              <el-form-item label="借款事由" prop="reasons">
                <el-input
                  v-model="queryParams.reasons"
                  placeholder="请输入借款事由"
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
              <el-form-item label="流程状态" prop="prostate">
                <el-select
                  v-model="queryParams.prostate"
                  placeholder="请选择流程状态"
                  clearable
                  size="small"
                >
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
              <el-form-item label="借款金额(元)" prop="money">
                <el-input
                  v-model="queryParams.money"
                  placeholder="请输入借款金额(元)"
                  clearable
                  size="small"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
              <el-form-item label="是否还清" prop="sfhq">
                <el-select v-model="queryParams.sfhq" placeholder="请选择是否还清" clearable size="small">
                  <el-option
                    v-for="dict in sfhqOptions"
                    :key="dict.dictValue"
                    :label="dict.dictLabel"
                    :value="dict.dictValue"
                  />
                </el-select>
              </el-form-item>
              <el-form-item label="待还金额(元)" prop="daijine">
                <el-input
                  v-model="queryParams.daijine"
                  placeholder="请输入待还金额(元)"
                  clearable
                  size="small"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
              <el-form-item label="借款单位" prop="bumenname">
                <el-select v-model="queryParams.bumenname" placeholder="请选择借款单位" clearable size="small">
                  <el-option
                    v-for="dict in bumennameOptions"
                    :key="dict.dictValue"
                    :label="dict.dictLabel"
                    :value="dict.dictValue"
                  />
                </el-select>
              </el-form-item>
            </div>
            <div class="my-col">
              <el-form-item label="申请部门" prop="deptname">
                <el-input
                  v-model="queryParams.deptname"
                  placeholder="请输入申请部门"
                  clearable
                  size="small"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
              <el-form-item label="申请时间">
                <el-date-picker
                  v-model="daterangeCreateTime"
                  size="small"
                  style="width: 240px"
                  value-format="yyyy-MM-dd"
                  type="daterange"
                  range-separator="-"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                ></el-date-picker>
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
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['cost:xzborrowmoney:add']"
        >新增申请
        </el-button>
      </el-col>
      <!-- <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['cost:xzborrowmoney:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['cost:xzborrowmoney:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['cost:xzborrowmoney:export']"
        >导出</el-button>
      </el-col>-->
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table
      v-loading="loading"
      :data="xzborrowmoneyList"
      @selection-change="handleSelectionChange"
      border
    >
      <el-table-column align="center" type="selection" width="55"/>
      <el-table-column align="center" label="借款编号" prop="nums" sortable/>
      <el-table-column align="center" label="借款事由" prop="reasons" sortable/>
      <el-table-column
        sortable
        label="借款单位"
        align="center"
        prop="bumenname"
        :formatter="bumennameFormat"
      />
      <el-table-column align="center" label="借款金额(元)" prop="money" sortable/>
      <el-table-column :formatter="sfhqFormat" align="center" label="是否还清" prop="sfhq" sortable/>
      <el-table-column align="center" label="待还金额(元)" prop="daijine" sortable/>
      <el-table-column align="center" label="申请人" prop="createUserName" sortable/>
      <el-table-column align="center" label="申请部门" prop="createDeptName" sortable/>
      <el-table-column sortable label="申请时间" align="center" prop="createTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column
        sortable
        label="流程状态"
        align="center"
        prop="prostate"
        :formatter="prostateFormat"
      />
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

    <!-- 添加或修改行政管理借款对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="申请人" prop="username">
          <el-input v-model="form.username" placeholder="请输入申请人"/>
        </el-form-item>
        <el-form-item label="申请部门" prop="deptname">
          <el-input v-model="form.deptname" placeholder="请输入申请部门"/>
        </el-form-item>
        <el-form-item label="借款金额(元)" prop="money">
          <el-input v-model="form.money" placeholder="请输入借款金额(元)"/>
        </el-form-item>
        <el-form-item label="借款事由" prop="reasons">
          <el-input v-model="form.reasons" placeholder="请输入内容" type="textarea"/>
        </el-form-item>
        <el-form-item label="借款金额(元)大写" prop="dxjine">
          <el-input v-model="form.dxjine" placeholder="请输入借款金额(元)大写"/>
        </el-form-item>
        <el-form-item label="借款单位" prop="bumenname">
          <el-select v-model="form.bumenname" placeholder="请选择借款单位">
            <el-option
              v-for="dict in bumennameOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注" prop="beizhu">
          <el-input v-model="form.beizhu" placeholder="请输入内容" type="textarea"/>
        </el-form-item>
        <el-form-item label="附件">
          <fileUpload v-model="form.fujian"/>
        </el-form-item>
        <el-form-item label="付款方式" prop="fukuanfangshi">
          <el-select v-model="form.fukuanfangshi" placeholder="请选择付款方式">
            <el-option
              v-for="dict in fukuanfangshiOptions"
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
  addXzborrowmoney,
  delXzborrowmoney,
  exportXzborrowmoney,
  getXzborrowmoney,
  listXzborrowmoney,
  updateXzborrowmoney
} from '@/api/biz/xzborrowmoney'
import FileUpload from '@/components/FileUpload'
import { getFlowInfoByFlowId } from '@/api/flowable/definition'

export default {
  name: 'Xzborrowmoney',
  components: {
    FileUpload
  },
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
      // 行政管理借款表格数据
      xzborrowmoneyList: [],
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 是否还清字典
      sfhqOptions: [],
      // 借款单位字典
      bumennameOptions: [],
      // 付款方式字典
      fukuanfangshiOptions: [],
      // 流程状态字典
      prostateOptions: [],
      // 创建时间时间范围
      daterangeCreateTime: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        username: null,
        deptname: null,
        simpleSearch:'',
        money: null,
        sfhq: null,
        daijine: null,
        reasons: null,
        dxjine: null,
        bumenname: null,
        nums: null,
        prostate: null,
        createTime: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {}
    }
  },
  created() {
    this.getList()
    this.getDicts('sys_yes_no').then((response) => {
      this.sfhqOptions = response.data
    })
    this.getDicts('form_company_name').then((response) => {
      this.bumennameOptions = response.data
    })
    this.getDicts('form_payment_method').then((response) => {
      this.fukuanfangshiOptions = response.data
    })
    this.getDicts('form_process_state').then((response) => {
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
    cardClick() {
      this.ifCardShow = !this.ifCardShow
    },
    /** 查询行政管理借款列表 */
    getList() {
      this.loading = true
      this.queryParams.params = {}
      console.log(this.daterangeCreateTime)
      if (null != this.daterangeCreateTime && '' != this.daterangeCreateTime) {
        this.queryParams.startTime = this.daterangeCreateTime[0]
        this.queryParams.endTime = this.daterangeCreateTime[1]
      } else {
        this.queryParams.startTime = null
        this.queryParams.endTime = null
      }
      listXzborrowmoney(this.queryParams).then((response) => {
        this.xzborrowmoneyList = response.rows
        this.total = response.total
        this.loading = false
      })
    },
    // 是否还清字典翻译
    sfhqFormat(row, column) {
      return this.selectDictLabel(this.sfhqOptions, row.sfhq)
    },
    // 借款单位字典翻译
    bumennameFormat(row, column) {
      return this.selectDictLabel(this.bumennameOptions, row.bumenname)
    },
    // 付款方式字典翻译
    fukuanfangshiFormat(row, column) {
      return this.selectDictLabel(this.fukuanfangshiOptions, row.fukuanfangshi)
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
        money: null,
        lawday: null,
        status: '0',
        sfhq: null,
        daijine: null,
        reasons: null,
        jiekuantime: null,
        dxjine: null,
        bumenname: null,
        beizhu: null,
        fujian: null,
        sqrqianzi: null,
        bmzgqianzi: null,
        zjlqianzi: null,
        fukuanfangshi: null,
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
      this.daterangeCreateTime = []
      this.queryParams.startTime = null
      this.queryParams.endTime = null
      this.resetForm('queryForm')
      this.handleQuery()
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map((item) => item.id)
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    async handleAdd() {
      const { code, data, msg } = await getFlowInfoByFlowId({
        flowId: 'process_sc906lwz'
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
        path: '/task/record/index/xzborrowmoney',
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
        flowId: 'process_sc906lwz'
      })
      this.$router.push({
        path: '/task/record/index/xzborrowmoney',
        query: {
          id: row.id,
          formId: data.formId,
          procInsId: row.procInsId,
          deployId: row.deployId,
          taskId: row.taskId,
          tableName: 'pms_xzborrowmoney'
        }
      })
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset()
      const id = row.id || this.ids
      getXzborrowmoney(id).then((response) => {
        this.form = response.data
        this.open = true
        this.title = '修改行政管理借款'
      })
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          if (this.form.id != null) {
            updateXzborrowmoney(this.form).then((response) => {
              this.msgSuccess('修改成功')
              this.open = false
              this.getList()
            })
          } else {
            addXzborrowmoney(this.form).then((response) => {
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
      this.$confirm(
        '是否确认删除行政管理借款编号为"' + ids + '"的数据项?',
        '警告',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      )
        .then(function() {
          return delXzborrowmoney(ids)
        })
        .then(() => {
          this.getList()
          this.msgSuccess('删除成功')
        })
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams
      this.$confirm('是否确认导出所有行政管理借款数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(function() {
          return exportXzborrowmoney(queryParams)
        })
        .then((response) => {
          this.download(response.msg)
        })
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
