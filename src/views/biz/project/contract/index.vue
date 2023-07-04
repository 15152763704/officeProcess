<template>
  <div class="app-container">
    <el-form v-show="showSearch" ref="queryForm" :inline="true" :model="queryParams" label-width="102px"
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
              <el-form-item label="申请人" prop="shenqingren">
                <el-input
                  v-model="queryParams.shenqingren"
                  clearable
                  placeholder="请输入申请人"
                  size="small"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
              <el-form-item label="申请人部门" prop="dept">
                <el-input
                  v-model="queryParams.dept"
                  clearable
                  placeholder="请输入申请人部门"
                  size="small"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
              <el-form-item label="项目名称" prop="projectname">
                <el-input
                  v-model="queryParams.projectname"
                  clearable
                  placeholder="请输入项目名称"
                  size="small"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
              <el-form-item label="合同编号" prop="hetongnum">
                <el-input
                  v-model="queryParams.hetongnum"
                  clearable
                  placeholder="请输入合同编号"
                  size="small"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
            </div>
            <div class="my-col">
              <el-form-item label="合同类型" prop="heitongleixing">
                <el-select
                  v-model="queryParams.heitongleixing"
                  clearable
                  placeholder="请选择合同类型"
                  @keyup.enter.native="handleQuery"
                >
                  <el-option
                    v-for="dict in project_type"
                    :key="dict.dictValue"
                    :label="dict.dictLabel"
                    :value="dict.dictValue"
                  />
                </el-select>
              </el-form-item>
              <el-form-item label="甲方" prop="kehu">
                <el-input
                  v-model="queryParams.kehu"
                  clearable
                  placeholder="请输入甲方"
                  size="small"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
              <el-form-item label="乙方" prop="company">
                <el-select
                  v-model="queryParams.company"
                  clearable
                  placeholder="请选择乙方"
                  @keyup.enter.native="handleQuery"
                >
                  <el-option
                    v-for="dict in form_company_name"
                    :key="dict.dictValue"
                    :label="dict.dictLabel"
                    :value="dict.dictValue"
                  />
                </el-select>
              </el-form-item>
              <el-form-item label="合同名称" prop="hetongname">
                <el-input
                  v-model="queryParams.hetongname"
                  clearable
                  placeholder="请输入合同名称"
                  size="small"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
            </div>
            <div class="my-col">
              <el-form-item label="申请时间" prop="createTime">
                <el-date-picker
                  v-model="showTime"
                  :picker-options="pickerOptions"
                  align="right"
                  end-placeholder="结束日期"
                  range-separator="至"
                  start-placeholder="开始日期"
                  type="daterange"
                  unlink-panels
                  value-format="yyyy-MM-dd"
                  @change="handletimeChange"
                  @keyup.enter.native="handleQuery"
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
      <!--v-hasPermi="['contract:project:edit']"-->
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
      <!--v-hasPermi="['contract:project:remove']"-->
      <!--&gt;删除</el-button>-->
      <!--</el-col>-->
      <!--<el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['contract:project:export']"
        >导出</el-button>
      </el-col>-->
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="projectList" @selection-change="handleSelectionChange">
      <el-table-column align="center" type="selection" width="55"/>
      <el-table-column align="center" label="申请人" prop="createUserName" sortable/>
      <el-table-column align="center" label="申请时间" prop="createTime" sortable width="150" >
        <template slot-scope="scope">{{ formatDate(scope.row.createTime)}}</template>
      </el-table-column>
      <el-table-column align="center" label="合同编号" prop="hetongnum" sortable/>
      <el-table-column align="center" label="合同名称" prop="hetongname" sortable/>
      <el-table-column :formatter="projectTypeFormat" align="center" label="合同类型" prop="heitongleixing" sortable/>
      <el-table-column align="center" label="项目名称" prop="projectname" sortable/>
      <el-table-column align="center" label="甲方" prop="kehu" sortable/>
      <el-table-column :formatter="formCompanyNameFormat" align="center" label="乙方" prop="company" sortable/>
      <el-table-column align="center" label="合同金额" prop="hetongmoney" sortable/>
      <el-table-column :formatter="xmTypeFormat" align="center" label="项目类型" prop="xmtype" sortable/>
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

    <!-- 添加或修改项目合同申请对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="1000px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
        <el-row>
          <el-col span="12">
            <el-form-item label="标题" prop="title">
              <el-input v-model="form.title" type="textarea" placeholder="请输入内容" :disabled="isdisabled"/>
            </el-form-item>
          </el-col>
          <el-col span="12">
            <el-form-item label="创建时间" prop="created">
              <el-input v-model="form.created" placeholder="请输入创建时间" :disabled="isdisabled"/>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col span="12">
            <el-form-item label="最后更新时间" prop="modified">
              <el-input v-model="form.modified" placeholder="请输入最后更新时间" :disabled="isdisabled"/>
            </el-form-item>
          </el-col>
          <el-col span="12">
            <el-form-item label="申请人" prop="shenqingren">
              <el-input v-model="form.createUserName" placeholder="请输入申请人" :disabled="isdisabled"/>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col span="12">
            <el-form-item label="申请人部门" prop="dept">
              <el-input v-model="form.createDeptName" placeholder="请输入申请人部门" :disabled="isdisabled"/>
            </el-form-item>
          </el-col>
          <el-col span="12">
            <el-form-item label="申请时间" prop="time">
              <el-input v-model="form.time" placeholder="请输入申请时间" :disabled="isdisabled"/>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col span="12">
            <el-form-item label="合同编号" prop="hetongnum">
              <el-input v-model="form.hetongnum" placeholder="请输入合同编号" :disabled="isdisabled"/>
            </el-form-item>
          </el-col>
          <el-col span="12">
            <el-form-item label="合同名称" prop="hetongname">
              <el-input v-model="form.hetongname" type="textarea" placeholder="请输入内容" :disabled="isdisabled"/>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col span="12">
            <el-form-item label="合同类型" prop="heitongleixing">
              <el-select v-model="form.heitongleixing" :disabled="isdisabled">
                <el-option
                  v-for="dict in project_type"
                  :key="dict.dictValue"
                  :label="dict.dictLabel"
                  :value="dict.dictValue"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col span="12">
            <el-form-item label="甲方" prop="kehu">
              <el-input v-model="form.kehu" placeholder="请输入甲方" :disabled="isdisabled"/>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col span="12">
            <el-form-item label="乙方" prop="company">
              <el-select v-model="form.company" :disabled="isdisabled">
                <el-option
                  v-for="dict in form_company_name"
                  :key="dict.dictValue"
                  :label="dict.dictLabel"
                  :value="dict.dictValue"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col span="12">
            <el-form-item label="合同金额" prop="hetongmoney">
              <el-input v-model="form.hetongmoney" type="textarea" placeholder="请输入内容" :disabled="isdisabled"/>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col span="12">
            <el-form-item label="合同工期" prop="gongqi">
              <el-input v-model="form.gongqi" placeholder="请输入合同工期" :disabled="isdisabled"/>
            </el-form-item>
          </el-col>
          <el-col span="12">
            <el-form-item label="结算方式" prop="jiesuan">
              <el-select v-model="form.jiesuan" :disabled="isdisabled">
                <el-option
                  v-for="dict in project_jiesuan_type"
                  :key="dict.dictValue"
                  :label="dict.dictLabel"
                  :value="dict.dictValue"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col span="12">
            <el-form-item label="履约保证经" prop="zhibaomoney">
              <el-input v-model="form.zhibaomoney" type="textarea" placeholder="请输入内容" :disabled="isdisabled"/>
            </el-form-item>
          </el-col>
          <el-col span="12">
            <el-form-item label="付款方式" prop="fukuanfangshi">
              <el-input v-model="form.fukuanfangshi" type="textarea" placeholder="请输入内容" :disabled="isdisabled"/>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col span="12">
            <el-form-item label="质保时间" prop="zbkaishidate">
              <el-input v-model="form.zbkaishidate" placeholder="请输入质保时间" :disabled="isdisabled"/>
            </el-form-item>
          </el-col>
          <el-col span="12">
            <el-form-item label="备注" prop="beizhu">
              <el-input v-model="form.beizhu" placeholder="请输入备注" :disabled="isdisabled"/>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col span="12">
            <el-form-item label="附件" prop="hetongfujian">
              <el-input v-model="form.hetongfujian" type="textarea" placeholder="请输入内容" :disabled="isdisabled"/>
            </el-form-item>
          </el-col>
          <el-col span="12">
            <el-form-item label="是否同意" prop="agree">
              <el-input v-model="form.agree" placeholder="请输入是否同意" :disabled="isdisabled"/>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col span="12">
            <el-form-item label="项目名称" prop="projectname">
              <el-input v-model="form.projectname" placeholder="请输入项目名称" :disabled="isdisabled"/>
            </el-form-item>
          </el-col>
          <el-col span="12">
            <el-form-item label="项目编号" prop="projectnum">
              <el-input v-model="form.projectnum" placeholder="请输入项目编号" :disabled="isdisabled"/>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col span="12">
            <el-form-item label="项目类型" prop="xmtype">
              <el-select v-model="form.xmtype" :disabled="isdisabled">
                <el-option
                  v-for="dict in contract_project_type"
                  :key="dict.dictValue"
                  :label="dict.dictLabel"
                  :value="dict.dictValue"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col span="12">
          </el-col>
        </el-row>
      </el-form>
      <!--<div slot="footer" class="dialog-footer">-->
      <!--<el-button type="primary" @click="submitForm">确 定</el-button>-->
      <!--<el-button @click="cancel">取 消</el-button>-->
      <!--</div>-->
    </el-dialog>
  </div>
</template>

<script>
import { formatDate } from '@/utils'
import {
  addProject,
  delProject,
  exportProject,
  getProject,
  listProject,
  updateProject
} from '@/api/biz/contract/project'
import { getFlowInfoByFlowId } from '@/api/flowable/definition'



export default {
  name: 'ProjectContract',
  components: {},
  data() {
    return {
      formatDate,
      //高级搜索
      ifCardShow: false,
      // 合同类型字典
      project_type: [],
      form_company_name: [],
      contract_project_type: [],
      project_jiesuan_type: [],
      form_process_state: [],
      isdisabled: true,
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
      // 项目合同申请表格数据
      projectList: [],
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        title: null,
        simpleSearch:'',
        created: null,
        modified: null,
        creator: null,
        modificator: null,
        recycle: null,
        shenqingren: null,
        dept: null,
        time: null,
        hetongnum: null,
        hetongname: null,
        heitongleixing: null,
        kehu: null,
        company: null,
        hetongmoney: null,
        gongqi: null,
        jiesuan: null,
        zhibaomoney: null,
        fukuanfangshi: null,
        zbkaishidate: null,
        beizhu: null,
        hetongfujian: null,
        agree: null,
        projectname: null,
        projectnum: null,
        projectid: null,
        xmtype: null,
        timesStart: null,
        timeEnd: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        hetongnum: [
          { required: true, message: '合同编号不能为空', trigger: 'blur' }
        ]
      },
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
    this.getDicts('project_type').then((response) => {
      this.project_type = response.data
    })
    this.getDicts('form_company_name').then((response) => {
      this.form_company_name = response.data
    })
    this.getDicts('contract_project_type').then((response) => {
      this.contract_project_type = response.data
    })
    this.getDicts('project_jiesuan_type').then((response) => {
      this.project_jiesuan_type = response.data
    })
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
    //高级搜索
    cardClick() {
      this.ifCardShow = !this.ifCardShow
    },
    //查询条件时间
    handletimeChange(dataarr) {
      this.queryParams.timesStart = dataarr[0]
      this.queryParams.timesEnd = dataarr[1]
      console.log(this.queryParams)
    },
    // 字典状态字典翻译
    projectTypeFormat(row, column) {
      return this.selectDictLabel(this.project_type, row.heitongleixing)
    },
    formCompanyNameFormat(row, column) {
      return this.selectDictLabel(this.form_company_name, row.company)
    },
    xmTypeFormat(row, column) {
      return this.selectDictLabel(this.contract_project_type, row.xmtype)
    },
    prostateFormat(row, column) {
      return this.selectDictLabel(this.form_process_state, row.prostate)
    },
    /** 查询项目合同申请列表 */
    getList() {
      this.loading = true
      listProject(this.queryParams).then(response => {
        this.projectList = response.rows
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
        dept: null,
        time: null,
        hetongnum: null,
        hetongname: null,
        heitongleixing: null,
        kehu: null,
        company: null,
        hetongmoney: null,
        gongqi: null,
        jiesuan: null,
        zhibaomoney: null,
        fukuanfangshi: null,
        zbkaishidate: null,
        beizhu: null,
        hetongfujian: null,
        agree: null,
        projectname: null,
        projectnum: null,
        projectid: null,
        xmtype: null
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
        flowId: 'process_pm2hhuaa'
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
        path: '/task/record/index/projectContract',
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
      getProject(id).then(response => {
        this.form = response.data
        this.open = true
        this.title = '项目合同详情'
      })
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateProject(this.form).then(response => {
              this.msgSuccess('修改成功')
              this.open = false
              this.getList()
            })
          } else {
            addProject(this.form).then(response => {
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
      this.$confirm('是否确认删除项目合同申请编号为"' + ids + '"的数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function() {
        return delProject(ids)
      }).then(() => {
        this.getList()
        this.msgSuccess('删除成功')
      })
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams
      this.$confirm('是否确认导出所有项目合同申请数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function() {
        return exportProject(queryParams)
      }).then(response => {
        this.download(response.msg)
      })
    },
    /** 流程流转记录 */
    async handleFlowRecord(row) {
      const { data } = await getFlowInfoByFlowId({
        flowId: 'process_pm2hhuaa'
      })
      this.$router.push({
        path: '/task/record/index/projectContract',
        query: {
          id: row.id,
          formId: data.formId,
          procInsId: row.procInsId,
          deployId: row.deployId,
          taskId: row.taskId,
          tableName: 'pms_hetongguanli'
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
