<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryForm"
      :inline="true"
      v-show="showSearch"
      label-width="120px"
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
              <el-form-item label="报销编号" prop="xzbxnums">
                <el-input
                  v-model="queryParams.xzbxnums"
                  placeholder="请输入报销编号"
                  clearable
                  size="small"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
              <el-form-item label="报销事由" prop="baoxiaoshiyou">
                <el-input
                  v-model="queryParams.baoxiaoshiyou"
                  placeholder="请输入报销事由"
                  clearable
                  size="small"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
              <el-form-item label="报支单位" prop="danwei">
                <el-select v-model="queryParams.danwei" placeholder="请选择报支单位" clearable size="small">
                  <el-option
                    v-for="dict in danweiOptions"
                    :key="dict.dictValue"
                    :label="dict.dictLabel"
                    :value="dict.dictValue"
                  />
                </el-select>
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
              <el-form-item label="报销金额(元)" prop="baoxiaojine">
                <el-input
                  v-model="queryParams.baoxiaojine"
                  placeholder="请输入报销金额(元)"
                  clearable
                  size="small"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
              <el-form-item label="是否抵消借款" prop="sfdx">
                <el-select
                  v-model="queryParams.sfdx"
                  placeholder="请选择是否抵消借款金额"
                  clearable
                  size="small"
                >
                  <el-option
                    v-for="dict in sfdxOptions"
                    :key="dict.dictValue"
                    :label="dict.dictLabel"
                    :value="dict.dictValue"
                  />
                </el-select>
              </el-form-item>

              <el-form-item label="申请人" prop="createUserName">
                <el-input
                  v-model="queryParams.createUserName"
                  placeholder="请输入申请人"
                  clearable
                  size="small"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
              <el-form-item label="申请部门" prop="createDeptName">
                <el-input
                  v-model="queryParams.createDeptName"
                  placeholder="请输入申请部门"
                  clearable
                  size="small"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
            </div>
            <div class="my-col">
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
              <el-form-item></el-form-item><el-form-item></el-form-item><el-form-item></el-form-item>
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
          v-hasPermi="['system:xzbaoxiao:add']"
        >新增申请
        </el-button>
      </el-col>

      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>
    <el-table
      border
      v-loading="loading"
      :data="xzbaoxiaoList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column align="center" type="selection" width="55"/>
      <el-table-column align="center" label="报销编号" prop="xzbxnums" sortable/>
      <el-table-column align="center" label="报销事由" prop="baoxiaoshiyou" sortable/>
      <el-table-column
        sortable
        label="报支单位"
        align="center"
        prop="danwei"
        :formatter="danweiFormat"
      />
      <el-table-column align="center" label="报销金额(元)" prop="baoxiaojine" sortable/>
      <el-table-column
        sortable
        label="是否抵消借款金额"
        align="center"
        prop="sfdx"
        :formatter="sfdxFormat"
      />
      <el-table-column align="center" label="冲销金额(元)" prop="offsetjine" sortable/>
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

    <!-- 添加或修改费用报销对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="是否抵消借款金额" prop="sfdx">
          <el-select v-model="form.sfdx" placeholder="请选择是否抵消借款金额">
            <el-option
              v-for="dict in sfdxOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="报销金额(元)" prop="baoxiaojine">
          <el-input v-model="form.baoxiaojine" placeholder="请输入报销金额(元)"/>
        </el-form-item>
        <el-form-item label="报销事由" prop="baoxiaoshiyou">
          <el-input v-model="form.baoxiaoshiyou" placeholder="请输入报销事由"/>
        </el-form-item>
        <el-form-item label="报支单位" prop="danwei">
          <el-select v-model="form.danwei" placeholder="请选择报支单位">
            <el-option
              v-for="dict in danweiOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="报销金额(元)大写" prop="bxjinedx">
          <el-input v-model="form.bxjinedx" placeholder="请输入报销金额(元)大写"/>
        </el-form-item>
        <el-form-item label="备注" prop="beizhu">
          <el-input v-model="form.beizhu" type="textarea" placeholder="请输入内容"/>
        </el-form-item>
        <el-form-item label="附件" prop="fujian">
          <el-input v-model="form.fujian" type="textarea" placeholder="请输入内容"/>
        </el-form-item>
        <el-divider content-position="center">行政办公报销清单信息</el-divider>
        <el-row :gutter="10" class="mb8">
          <el-col :span="1.5">
            <el-button
              type="primary"
              icon="el-icon-plus"
              size="mini"
              @click="handleAddPmsXzbaoxiaoqingdan"
            >添加
            </el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="handleDeletePmsXzbaoxiaoqingdan"
            >删除
            </el-button>
          </el-col>
        </el-row>
        <el-table
          :data="pmsXzbaoxiaoqingdanList"
          :row-class-name="rowPmsXzbaoxiaoqingdanIndex"
          @selection-change="handlePmsXzbaoxiaoqingdanSelectionChange"
          ref="pmsXzbaoxiaoqingdan"
        >
          <el-table-column align="center" type="selection" width="50"/>
          <el-table-column align="center" label="序号" prop="index" width="50"/>
          <el-table-column label="id" prop="id">
            <template slot-scope="scope">
              <el-input v-model="scope.row.id" placeholder="请输入id"/>
            </template>
          </el-table-column>
          <el-table-column label="Title" prop="title">
            <template slot-scope="scope">
              <el-input v-model="scope.row.title" placeholder="请输入Title"/>
            </template>
          </el-table-column>
          <el-table-column label="创建时间" prop="created">
            <template slot-scope="scope">
              <el-input v-model="scope.row.created" placeholder="请输入创建时间"/>
            </template>
          </el-table-column>
          <el-table-column label="最后更新时间" prop="modified">
            <template slot-scope="scope">
              <el-input v-model="scope.row.modified" placeholder="请输入最后更新时间"/>
            </template>
          </el-table-column>
          <el-table-column label="创建者id" prop="creator">
            <template slot-scope="scope">
              <el-input v-model="scope.row.creator" placeholder="请输入创建者id"/>
            </template>
          </el-table-column>
          <el-table-column label="最后更新人id" prop="modificator">
            <template slot-scope="scope">
              <el-input v-model="scope.row.modificator" placeholder="请输入最后更新人id"/>
            </template>
          </el-table-column>
          <el-table-column label="回收站标记" prop="recycle">
            <template slot-scope="scope">
              <el-input v-model="scope.row.recycle" placeholder="请输入回收站标记"/>
            </template>
          </el-table-column>
          <el-table-column label="发票类型" prop="billtype">
            <template slot-scope="scope">
              <el-input v-model="scope.row.billtype" placeholder="请输入发票类型"/>
            </template>
          </el-table-column>
          <el-table-column label="发票金额" prop="billjine">
            <template slot-scope="scope">
              <el-input v-model="scope.row.billjine" placeholder="请输入发票金额"/>
            </template>
          </el-table-column>
          <el-table-column label="发票编号" prop="billnum">
            <template slot-scope="scope">
              <el-input v-model="scope.row.billnum" placeholder="请输入发票编号"/>
            </template>
          </el-table-column>
          <el-table-column label="发票开具时间" prop="billtime">
            <template slot-scope="scope">
              <el-input v-model="scope.row.billtime" placeholder="请输入发票开具时间"/>
            </template>
          </el-table-column>
          <el-table-column label="备注" prop="beizhu">
            <template slot-scope="scope">
              <el-input v-model="scope.row.beizhu" placeholder="请输入备注"/>
            </template>
          </el-table-column>
          <el-table-column label="parentid" prop="parentid">
            <template slot-scope="scope">
              <el-input v-model="scope.row.parentid" placeholder="请输入parentid"/>
            </template>
          </el-table-column>
          <el-table-column label="parentid" prop="bianhao">
            <template slot-scope="scope">
              <el-input v-model="scope.row.bianhao" placeholder="请输入parentid"/>
            </template>
          </el-table-column>
          <el-table-column label="发票号码" prop="haoma">
            <template slot-scope="scope">
              <el-input v-model="scope.row.haoma" placeholder="请输入发票号码"/>
            </template>
          </el-table-column>
          <el-table-column label="流程状态" prop="prostate">
            <template slot-scope="scope">
              <el-input v-model="scope.row.prostate" placeholder="请输入流程状态"/>
            </template>
          </el-table-column>
          <el-table-column label="创建人" prop="createUserName">
            <template slot-scope="scope">
              <el-input v-model="scope.row.createUserName" placeholder="请输入创建人"/>
            </template>
          </el-table-column>
          <el-table-column label="创建人id" prop="createUserId">
            <template slot-scope="scope">
              <el-input v-model="scope.row.createUserId" placeholder="请输入创建人id"/>
            </template>
          </el-table-column>
          <el-table-column label="创建人部门名称" prop="createDeptName">
            <template slot-scope="scope">
              <el-input v-model="scope.row.createDeptName" placeholder="请输入创建人部门名称"/>
            </template>
          </el-table-column>
          <el-table-column label="创建人部门id" prop="createDeptId">
            <template slot-scope="scope">
              <el-input v-model="scope.row.createDeptId" placeholder="请输入创建人部门id"/>
            </template>
          </el-table-column>
          <el-table-column label="修改人名称" prop="updateUserName">
            <template slot-scope="scope">
              <el-input v-model="scope.row.updateUserName" placeholder="请输入修改人名称"/>
            </template>
          </el-table-column>
          <el-table-column label="修改人id" prop="updateUserId">
            <template slot-scope="scope">
              <el-input v-model="scope.row.updateUserId" placeholder="请输入修改人id"/>
            </template>
          </el-table-column>
        </el-table>
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
  addXzbaoxiao,
  delXzbaoxiao,
  exportXzbaoxiao,
  getXzbaoxiao,
  listXzbaoxiao,
  updateXzbaoxiao
} from '@/api/biz/xzbaoxiao'
import { getFlowInfoByFlowId } from '@/api/flowable/definition'

export default {
  name: 'Xzbaoxiao',
  components: {},
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 子表选中数据
      checkedPmsXzbaoxiaoqingdan: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 费用报销表格数据
      xzbaoxiaoList: [],
      // 行政办公报销清单表格数据
      pmsXzbaoxiaoqingdanList: [],
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 是否抵消借款金额字典
      sfdxOptions: [],
      // 报支单位字典
      danweiOptions: [],
      // 流程状态字典
      prostateOptions: [],
      // 创建时间时间范围
      daterangeCreateTime: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        sfdx: null,
        baoxiaojine: null,
        baoxiaoshiyou: null,
        danwei: null,
        xzbxnums: null,
        simpleSearch:'',
        prostate: null,
        createUserName: null,
        createTime: null,
        createDeptName: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {},
      ifCardShow: false
    }
  },
  created() {
    this.getList()
    this.getDicts('sys_yes_no').then((response) => {
      this.sfdxOptions = response.data
    })
    this.getDicts('form_company_name').then((response) => {
      this.danweiOptions = response.data
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
    /** 查询费用报销列表 */
    getList() {
      this.loading = true
      this.queryParams.params = {}
      if (null != this.daterangeCreateTime && '' != this.daterangeCreateTime) {
        this.queryParams.startTime = this.daterangeCreateTime[0]
        this.queryParams.endTime = this.daterangeCreateTime[1]
      } else {
        this.queryParams.startTime = null
        this.queryParams.endTime = null
      }
      listXzbaoxiao(this.queryParams).then((response) => {
        this.xzbaoxiaoList = response.rows
        this.total = response.total
        this.loading = false
      })
    },
    // 是否抵消借款金额字典翻译
    sfdxFormat(row, column) {
      return this.selectDictLabel(this.sfdxOptions, row.sfdx)
    },
    // 报支单位字典翻译
    danweiFormat(row, column) {
      return this.selectDictLabel(this.danweiOptions, row.danwei)
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
        sfdx: null,
        daijine: null,
        baoxiaojine: null,
        parentid: null,
        status: '0',
        billqingdan: null,
        times: null,
        baoxiaoshiyou: null,
        danwei: null,
        bxjinedx: null,
        offsetjine: null,
        beizhu: null,
        fujian: null,
        heji: null,
        sqrqianzi: null,
        bmzgqianzi: null,
        zjlqianzi: null,
        xzbxnums: null,
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
      this.pmsXzbaoxiaoqingdanList = []
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
        flowId: 'process_sgl5ljjj'
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
        path: '/task/record/index/xzbaoxiao',
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
        flowId: 'process_sgl5ljjj'
      })
      this.$router.push({
        path: '/task/record/index/xzbaoxiao',
        query: {
          id: row.id,
          formId: data.formId,
          procInsId: row.procInsId,
          deployId: row.deployId,
          taskId: row.taskId,
          tableName: 'pms_xzbaoxiao'
        }
      })
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset()
      const id = row.id || this.ids
      getXzbaoxiao(id).then((response) => {
        this.form = response.data
        this.pmsXzbaoxiaoqingdanList = response.data.pmsXzbaoxiaoqingdanList
        this.open = true
        this.title = '修改费用报销'
      })
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.form.pmsXzbaoxiaoqingdanList = this.pmsXzbaoxiaoqingdanList
          if (this.form.id != null) {
            updateXzbaoxiao(this.form).then((response) => {
              this.msgSuccess('修改成功')
              this.open = false
              this.getList()
            })
          } else {
            addXzbaoxiao(this.form).then((response) => {
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
        '是否确认删除费用报销编号为"' + ids + '"的数据项?',
        '警告',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      )
        .then(function() {
          return delXzbaoxiao(ids)
        })
        .then(() => {
          this.getList()
          this.msgSuccess('删除成功')
        })
    },
    /** 行政办公报销清单序号 */
    rowPmsXzbaoxiaoqingdanIndex({ row, rowIndex }) {
      row.index = rowIndex + 1
    },
    /** 行政办公报销清单添加按钮操作 */
    handleAddPmsXzbaoxiaoqingdan() {
      let obj = {}
      obj.id = ''
      obj.title = ''
      obj.created = ''
      obj.modified = ''
      obj.creator = ''
      obj.modificator = ''
      obj.recycle = ''
      obj.billtype = ''
      obj.billjine = ''
      obj.billnum = ''
      obj.billtime = ''
      obj.beizhu = ''
      obj.parentid = ''
      obj.bianhao = ''
      obj.haoma = ''
      obj.prostate = ''
      obj.createUserName = ''
      obj.createUserId = ''
      obj.createDeptName = ''
      obj.createDeptId = ''
      obj.updateUserName = ''
      obj.updateUserId = ''
      this.pmsXzbaoxiaoqingdanList.push(obj)
    },
    /** 行政办公报销清单删除按钮操作 */
    handleDeletePmsXzbaoxiaoqingdan() {
      if (this.checkedPmsXzbaoxiaoqingdan.length == 0) {
        this.$alert('请先选择要删除的行政办公报销清单数据', '提示', {
          confirmButtonText: '确定'
        })
      } else {
        this.pmsXzbaoxiaoqingdanList.splice(
          this.checkedPmsXzbaoxiaoqingdan[0].index - 1,
          1
        )
      }
    },
    /** 单选框选中数据 */
    handlePmsXzbaoxiaoqingdanSelectionChange(selection) {
      if (selection.length > 1) {
        this.$refs.pmsXzbaoxiaoqingdan.clearSelection()
        this.$refs.pmsXzbaoxiaoqingdan.toggleRowSelection(selection.pop())
      } else {
        this.checkedPmsXzbaoxiaoqingdan = selection
      }
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams
      this.$confirm('是否确认导出所有费用报销数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(function() {
          return exportXzbaoxiao(queryParams)
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
