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
              <el-form-item label="申请人" prop="people">
                <el-input
                  v-model="queryParams.people"
                  placeholder="请输入申请人"
                  clearable
                  size="small"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
              <el-form-item label="合同名称" prop="contractname">
                <el-input
                  v-model="queryParams.contractname"
                  placeholder="请输入合同名称"
                  clearable
                  size="small"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
              <el-form-item label="乙方" prop="yifang">
                <el-input
                  v-model="queryParams.yifang"
                  placeholder="请输入乙方"
                  clearable
                  size="small"
                  @keyup.enter.native="handleQuery"
                />
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
            </div>
            <div class="my-col">
              <el-form-item label="合同金额" prop="contractjine">
                <el-input-number style="width: 100%"
                                 v-model="queryParams.contractjine"
                                 clearable
                                 placeholder="请输入合同金额"
                                 size="small"
                                 @keyup.enter.native="handleQuery"
                />
              </el-form-item>
              <el-form-item label="合同编号" prop="contractnumber">
                <el-input
                  v-model="queryParams.contractnumber"
                  placeholder="请输入合同编号"
                  clearable
                  size="small"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
              <el-form-item label="甲方" prop="jiafang">
                <el-input
                  v-model="queryParams.jiafang"
                  placeholder="请输入甲方"
                  clearable
                  size="small"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
              <el-form-item label="申请时间" prop="dates">
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
          v-hasPermi="['contract:administration:add']"
        >新增申请
        </el-button>
      </el-col>
      <!--<el-col :span="1.5">-->
      <!--<el-button-->
      <!--type="success"-->
      <!--plain-->
      <!--icon="el-icon-edit"-->
      <!--size="mini"-->
      <!--:disabled="single"-->
      <!--@click="handleUpdate"-->
      <!--v-hasPermi="['contract:administration:edit']"-->
      <!--&gt;修改</el-button>-->
      <!--</el-col>-->
      <!--<el-col :span="1.5">-->
      <!--<el-button-->
      <!--type="danger"-->
      <!--plain-->
      <!--icon="el-icon-delete"-->
      <!--size="mini"-->
      <!--:disabled="multiple"-->
      <!--@click="handleDelete"-->
      <!--v-hasPermi="['contract:administration:remove']"-->
      <!--&gt;删除</el-button>-->
      <!--</el-col>-->
      <!--<el-col :span="1.5">-->
      <!--<el-button-->
      <!--type="warning"-->
      <!--plain-->
      <!--icon="el-icon-download"-->
      <!--size="mini"-->
      <!--@click="handleExport"-->
      <!--v-hasPermi="['contract:administration:export']"-->
      <!--&gt;导出</el-button>-->
      <!--</el-col>-->
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="administrationList" @selection-change="handleSelectionChange">
      <el-table-column align="center" type="selection" width="55"/>
      <el-table-column align="center" label="申请人" prop="createUserName" sortable/>
      <el-table-column align="center" label="申请时间" prop="dates" sortable/>
      <el-table-column align="center" label="合同名称" prop="contractname" sortable/>
      <el-table-column align="center" label="合同编号" prop="contractnumber" sortable/>
      <el-table-column align="center" label="合同金额" prop="contractjine" sortable/>
      <el-table-column align="center" label="甲方" prop="jiafang" sortable/>
      <el-table-column align="center" label="乙方" prop="yifang" sortable/>
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

    <!-- 添加或修改行政合同申请对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="标题" prop="title">
          <el-input v-model="form.title" placeholder="请输入内容" type="textarea"/>
        </el-form-item>
        <el-form-item label="创建时间" prop="created">
          <el-input v-model="form.created" placeholder="请输入创建时间"/>
        </el-form-item>
        <el-form-item label="最后更新时间" prop="modified">
          <el-input v-model="form.modified" placeholder="请输入最后更新时间"/>
        </el-form-item>
        <el-form-item label="创建者id" prop="creator">
          <el-input v-model="form.creator" placeholder="请输入创建者id"/>
        </el-form-item>
        <el-form-item label="最后更新人id" prop="modificator">
          <el-input v-model="form.modificator" placeholder="请输入最后更新人id"/>
        </el-form-item>
        <el-form-item label="回收站标记" prop="recycle">
          <el-input v-model="form.recycle" placeholder="请输入回收站标记"/>
        </el-form-item>
        <el-form-item label="申请人" prop="people">
          <el-input v-model="form.people" placeholder="请输入申请人"/>
        </el-form-item>
        <el-form-item label="申请人部门" prop="deptname">
          <el-input v-model="form.deptname" placeholder="请输入申请人部门"/>
        </el-form-item>
        <el-form-item label="申请时间" prop="dates">
          <el-input v-model="form.dates" placeholder="请输入申请时间"/>
        </el-form-item>
        <el-form-item label="合同名称" prop="contractname">
          <el-input v-model="form.contractname" placeholder="请输入合同名称"/>
        </el-form-item>
        <el-form-item label="合同编号" prop="contractnumber">
          <el-input v-model="form.contractnumber" placeholder="请输入合同编号"/>
        </el-form-item>
        <el-form-item label="合同金额" prop="contractjine">
          <el-input v-model="form.contractjine" placeholder="请输入内容" type="textarea"/>
        </el-form-item>
        <el-form-item label="备注" prop="contractnote">
          <el-input v-model="form.contractnote" placeholder="请输入内容" type="textarea"/>
        </el-form-item>
        <el-form-item label="合同附件" prop="contractfujian">
          <el-input v-model="form.contractfujian" placeholder="请输入内容" type="textarea"/>
        </el-form-item>
        <el-form-item label="status">
          <el-radio-group v-model="form.status">
            <el-radio label="1">请选择字典生成</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="甲方" prop="jiafang">
          <el-input v-model="form.jiafang" placeholder="请输入甲方"/>
        </el-form-item>
        <el-form-item label="乙方" prop="yifang">
          <el-input v-model="form.yifang" placeholder="请输入乙方"/>
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
  addAdministration,
  delAdministration,
  exportAdministration,
  getAdministration,
  listAdministration,
  updateAdministration
} from '@/api/biz/contract/administration'
import { getFlowInfoByFlowId } from '@/api/flowable/definition'

export default {
  name: 'Administration',
  components: {},
  data() {
    return {
      form_process_state: [],
      //高级搜索
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
      // 行政合同申请表格数据
      administrationList: [],
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
        people: null,
        deptname: null,
        dates: null,
        contractname: null,
        contractnumber: null,
        contractjine: undefined,
        contractnote: null,
        contractfujian: null,
        status: null,
        jiafang: null,
        yifang: null,
        timesStart: null,
        prostate: null,
        timeEnd: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {},
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
      },
      showTime: ''
    }
  },
  created() {
    this.getList()
    this.getDicts('form_process_state').then((response) => {
      this.form_process_state = response.data
    })
  },
  activated(){
    if(localStorage.getItem("needLoadList") === "yes"){
      this.resetQuery()
      localStorage.setItem("needLoadList",undefined)
    }
  },
  methods: {
    //查询条件时间
    handletimeChange(dataarr) {
      this.queryParams.timesStart = dataarr[0]
      this.queryParams.timesEnd = dataarr[1]
      console.log(this.queryParams)
    },
    prostateFormat(row, column) {
      return this.selectDictLabel(this.form_process_state, row.prostate)
    },
    //高级搜索
    cardClick() {
      this.ifCardShow = !this.ifCardShow
    },
    /** 查询行政合同申请列表 */
    getList() {
      this.loading = true
      listAdministration(this.queryParams).then(response => {
        this.administrationList = response.rows
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
        people: null,
        deptname: null,
        dates: null,
        contractname: null,
        contractnumber: null,
        contractjine: null,
        contractnote: null,
        contractfujian: null,
        status: '0',
        jiafang: null,
        yifang: null
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
      this.showTime = []
      this.queryParams.timesStart = ''
      this.queryParams.timesEnd = ''
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
        flowId: 'process_1ee2xvpx'
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
        path: '/task/record/index/administration',
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
      getAdministration(id).then(response => {
        this.form = response.data
        this.open = true
        this.title = '修改行政合同申请'
      })
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateAdministration(this.form).then(response => {
              this.msgSuccess('修改成功')
              this.open = false
              this.getList()
            })
          } else {
            addAdministration(this.form).then(response => {
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
      this.$confirm('是否确认删除行政合同申请编号为"' + ids + '"的数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function() {
        return delAdministration(ids)
      }).then(() => {
        this.getList()
        this.msgSuccess('删除成功')
      })
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams
      this.$confirm('是否确认导出所有行政合同申请数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function() {
        return exportAdministration(queryParams)
      }).then(response => {
        this.download(response.msg)
      })
    },
    /** 流程流转记录 */
    async handleFlowRecord(row) {
      const { data } = await getFlowInfoByFlowId({
        flowId: 'process_1ee2xvpx'
      })
      this.$router.push({
        path: '/task/record/index/administration',
        query: {
          id: row.id,
          formId: data.formId,
          procInsId: row.procInsId,
          deployId: row.deployId,
          taskId: row.taskId,
          tableName: 'pms_other_contract'
        }
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
