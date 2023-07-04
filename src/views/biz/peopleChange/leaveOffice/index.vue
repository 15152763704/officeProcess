<template>
  <div class="app-container">
    <el-form v-show="showSearch" ref="queryForm" :inline="true" :model="queryParams" label-width="102px"
             style="margin-bottom:10px;"
    >
      <el-card class="box-card" :body-style="{ padding: '14px 15px 7px' }">
        <div slot="header" class="clearfix">
          <el-form-item label="离职时间" prop="endtime">
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
          <el-form-item label="入职时间" prop="time">
            <el-date-picker
              v-model="queryParams.time"
              type="date"
              align="right"
              placeholder="离职日期"
              value-format="yyyy-MM-dd"
              :picker-options="danpickerOptions"
              @keyup.enter.native="handleQuery"
              @change="handlerChange"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="毕业院校" prop="school">
            <el-input
              v-model="queryParams.school"
              placeholder="请输入毕业院校"
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
              <el-form-item label="学历" prop="xueli">
                <el-select
                  v-model="queryParams.xueli"
                  clearable
                  placeholder="请选择学历"
                  @keyup.enter.native="handleQuery"
                >
                  <el-option
                    v-for="dict in education"
                    :key="dict.dictValue"
                    :label="dict.dictLabel"
                    :value="dict.dictValue"
                  />
                </el-select>
              </el-form-item>
              <el-form-item label="毕业院校" prop="school">
                <el-input
                  v-model="queryParams.school"
                  placeholder="请输入毕业院校"
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
          v-hasPermi="['peopleChange:leaveOffice:add']"
        >新增申请
        </el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="leaveOfficeList" @selection-change="handleSelectionChange">
      <el-table-column align="center" type="selection" width="55"/>
      <el-table-column align="center" label="申请人" prop="createUserName" sortable/>
      <el-table-column align="center" label="申请部门" prop="createDeptName" sortable/>
      <el-table-column :formatter="educationFormat" align="center" label="学历" prop="xueli" sortable/>
      <el-table-column align="center" label="毕业院校" prop="school" sortable/>
      <el-table-column align="center" label="专业" prop="position" sortable/>
      <el-table-column align="center" label="入职日期" prop="time" sortable/>
      <el-table-column align="center" label="离职日期" prop="endtime" sortable/>
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

    <!-- 添加或修改离职申请对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="离职时间" prop="endtime">
          <el-input v-model="form.endtime" placeholder="请输入离职时间"/>
        </el-form-item>
        <el-form-item label="离职原因" prop="reason">
          <el-input v-model="form.reason" placeholder="请输入内容" type="textarea"/>
        </el-form-item>
        <el-form-item label="申请人" prop="name">
          <el-input v-model="form.name" placeholder="请输入内容" type="textarea"/>
        </el-form-item>
        <el-form-item label="申请部门" prop="partment">
          <el-input v-model="form.partment" placeholder="请输入申请部门"/>
        </el-form-item>
        <el-form-item label="是否同意" prop="agree">
          <el-input v-model="form.agree" placeholder="请输入是否同意"/>
        </el-form-item>
        <el-form-item label="需求岗位" prop="position">
          <el-input v-model="form.position" placeholder="请输入内容" type="textarea"/>
        </el-form-item>
        <el-form-item label="userid" prop="userid">
          <el-input v-model="form.userid" placeholder="请输入userid"/>
        </el-form-item>
        <el-form-item label="申请时间" prop="time">
          <el-input v-model="form.time" placeholder="请输入申请时间"/>
        </el-form-item>
        <el-form-item label="学历" prop="xueli">
          <el-input v-model="form.xueli" placeholder="请输入内容" type="textarea"/>
        </el-form-item>
        <el-form-item label="毕业院校" prop="school">
          <el-input v-model="form.school" placeholder="请输入内容" type="textarea"/>
        </el-form-item>
        <el-form-item label="times" prop="times">
          <el-input v-model="form.times" placeholder="请输入times"/>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select v-model="form.sex" placeholder="请选择性别">
            <el-option label="请选择字典生成" value=""/>
          </el-select>
        </el-form-item>
        <el-form-item label="申请时间" prop="shenqingshijian">
          <el-input v-model="form.shenqingshijian" placeholder="请输入申请时间"/>
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
import {
  addLeaveOffice,
  delLeaveOffice,
  exportLeaveOffice,
  getLeaveOffice,
  listLeaveOffice,
  updateLeaveOffice
} from '@/api/biz/peopleChange/leaveOffice'
import { getFlowInfoByFlowId } from '@/api/flowable/definition'

export default {
  name: 'LeaveOffice',
  components: {},
  data() {
    return {
      //高级搜索
      ifCardShow: false,
      //申请时间
      showTimetime: '',
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
      // 离职申请表格数据
      leaveOfficeList: [],
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        endtime: null,
        reason: null,
        name: null,
        partment: null,
        agree: null,
        position: null,
        userid: null,
        time: null,
        xueli: null,
        school: null,
        times: null,
        sex: null,
        shenqingshijian: null,
        prostate: null,
        createUserName: null,
        createUserId: null,
        createDeptName: null,
        createDeptId: null,
        updateUserName: null,
        updateUserId: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {},
      danpickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        },
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            picker.$emit('pick', new Date())
          }
        }, {
          text: '昨天',
          onClick(picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24)
            picker.$emit('pick', date)
          }
        }, {
          text: '一周前',
          onClick(picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', date)
          }
        }]
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
      form_process_state: [],
      education: []
    }
  },
  created() {
    this.getList()

    this.getDicts('form_process_state').then((response) => {
      this.form_process_state = response.data
    })

    this.getDicts('education').then((response) => {
      this.education = response.data
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
    educationFormat(row, column) {
      return this.selectDictLabel(this.education, row.xueli)
    },
    //高级搜索
    cardClick() {
      this.ifCardShow = !this.ifCardShow
    },
    /** 查询离职申请列表 */
    getList() {
      this.loading = true
      listLeaveOffice(this.queryParams).then(response => {
        this.leaveOfficeList = response.rows
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
        endtime: null,
        reason: null,
        name: null,
        partment: null,
        agree: null,
        position: null,
        userid: null,
        time: null,
        xueli: null,
        school: null,
        times: null,
        sex: null,
        shenqingshijian: null,
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
    //离职时间区间 变化事件
    handletimeChangetime(dataarr) {
      console.log(dataarr)
      this.queryParams.endtimeStart = dataarr[0]
      this.queryParams.endtimeEnd = dataarr[1]
    },
    //入职时间变化事件
    handlerChange(date) {
      console.log(date)
      this.queryParams.time = date
      console.log(this.queryParams)
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.queryParams.endtimeStart = ''
      this.queryParams.endtimeEnd = ''
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
    /** 新增流程 */
    async handleAdd() {
      const { code, data, msg } = await getFlowInfoByFlowId({
        flowId: 'process_kvciy61i'
      })
      if (code == 200) {
        this.handleStartProcess(data)
      }
    },
    /** 详情 流程流转记录 */
    async handleFlowRecord(row) {
      const { data } = await getFlowInfoByFlowId({
        flowId: 'process_kvciy61i'
      })
      this.$router.push({
        path: '/task/record/index/peopleChangeLeaveOffice',
        query: {
          id: row.id,
          formId: data.formId,
          procInsId: row.procInsId,
          deployId: row.deployId,
          taskId: row.taskId,
          tableName: 'pms_lzsq'
        }
      })
    },
    /**  发起流程申请 */
    handleStartProcess(row) {
      localStorage.setItem('proData', '')
      localStorage.setItem('procInsId', '')
      this.$router.push({
        path: '/task/record/index/peopleChangeLeaveOffice',
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
      getLeaveOffice(id).then(response => {
        this.form = response.data
        this.open = true
        this.title = '修改离职申请'
      })
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateLeaveOffice(this.form).then(response => {
              this.msgSuccess('修改成功')
              this.open = false
              this.getList()
            })
          } else {
            addLeaveOffice(this.form).then(response => {
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
      this.$confirm('是否确认删除离职申请编号为"' + ids + '"的数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function() {
        return delLeaveOffice(ids)
      }).then(() => {
        this.getList()
        this.msgSuccess('删除成功')
      })
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams
      this.$confirm('是否确认导出所有离职申请数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function() {
        return exportLeaveOffice(queryParams)
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
  display: flex;
  justify-content: space-between;
  align-items: center;
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
