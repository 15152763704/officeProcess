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
            <div  class="my-col">
              <el-form-item label="出差编号" prop="chuchainum">
                <el-input
                  v-model="queryParams.chuchainum"
                  placeholder="请输入出差编号"
                  clearable
                  size="small"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
              <el-form-item label="出差事由" prop="argument">
                <el-input
                  v-model="queryParams.argument"
                  placeholder="请输入出差事由"
                  clearable
                  size="small"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
              <el-form-item label="出差类型" prop="chuchaitype">
                <el-select
                  v-model="queryParams.chuchaitype"
                  placeholder="请选择出差类型"
                  clearable
                  size="small"
                >
                  <el-option
                    v-for="dict in chuchaitypeOptions"
                    :key="dict.dictValue"
                    :label="dict.dictLabel"
                    :value="dict.dictValue"
                  />
                </el-select>
              </el-form-item>
              <el-form-item label="审核结果" prop="prostate">
                <el-select
                  v-model="queryParams.prostate"
                  placeholder="请选择审核结果"
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
              <el-form-item label="申请人部门" prop="createDeptName">
                <el-input
                  v-model="queryParams.createDeptName"
                  placeholder="请输入申请人部门"
                  clearable
                  size="small"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
              <el-form-item label="出差地区" prop="area">
                <el-input
                  v-model="queryParams.area"
                  style="width:100%;"
                  clearable
                  placeholder="请选择出差地区"
                ></el-input>
              </el-form-item>
              <el-form-item label="出差天数" prop="days">
                <el-input
                  v-model="queryParams.days"
                  placeholder="请输入出差天数"
                  clearable
                  size="small"
                  @keyup.enter.native="handleQuery"
                />
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
            </div>
            <div class="my-col">
              <el-form-item label="开始时间">
                <el-date-picker
                  v-model="daterangeStarttime"
                  size="small"
                  style="width: 240px"
                  value-format="yyyy-MM-dd"
                  type="daterange"
                  range-separator="-"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                ></el-date-picker>
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
          v-hasPermi="['system:evection:add']"
        >新增申请
        </el-button>
      </el-col>

      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table
      v-loading="loading"
      :data="evectionList"
      @selection-change="handleSelectionChange"
      border
    >
      <el-table-column align="center" type="selection" width="55"/>
      <el-table-column align="center" label="出差编号" prop="chuchainum" sortable/>
      <el-table-column align="center" label="出差事由" prop="argument" sortable/>
      <el-table-column
        label="出差类型"
        sortable
        align="center"
        prop="chuchaitype"
        :formatter="chuchaitypeFormat"
      />
      <el-table-column sortable label="出差日期" align="center" prop="starttime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.starttime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="出差地区" prop="area" sortable/>
      <el-table-column align="center" label="出差天数" prop="days" sortable/>
      <el-table-column align="center" label="申请人" prop="createUserName" sortable/>
      <el-table-column align="center" label="申请人部门" prop="createDeptName" sortable/>
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

    <!-- 添加或修改evection对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="开始时间" prop="starttime">
          <el-date-picker
            clearable
            size="small"
            v-model="form.starttime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择开始时间"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间" prop="finishtime">
          <el-date-picker
            clearable
            size="small"
            v-model="form.finishtime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择结束时间"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="出差地区" prop="area">
          <el-select v-model="form.area" placeholder="请选择出差地区">
            <el-option
              v-for="dict in areaOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="出差事由" prop="argument">
          <el-input v-model="form.argument" placeholder="请输入内容" type="textarea"/>
        </el-form-item>
        <el-form-item label="交通工具" prop="vehicle">
          <el-select v-model="form.vehicle" placeholder="请选择交通工具">
            <el-option
              v-for="dict in vehicleOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="出差天数" prop="days">
          <el-input v-model="form.days" placeholder="请输入出差天数"/>
        </el-form-item>
        <el-form-item label="出差类型" prop="chuchaitype">
          <el-select v-model="form.chuchaitype" placeholder="请选择出差类型">
            <el-option
              v-for="dict in chuchaitypeOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="编号" prop="numbers">
          <el-input v-model="form.numbers" placeholder="请输入编号"/>
        </el-form-item>
        <el-form-item label="备注" prop="beizhu">
          <el-input v-model="form.beizhu" placeholder="请输入内容" type="textarea"/>
        </el-form-item>
        <el-form-item label="附件">
          <fileUpload v-model="form.fujian"/>
        </el-form-item>
        <el-form-item label="项目名称" prop="projectname">
          <el-input v-model="form.projectname" placeholder="请输入项目名称"/>
        </el-form-item>
        <el-form-item label="建设方" prop="jianshefang">
          <el-input v-model="form.jianshefang" placeholder="请输入建设方"/>
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
import { addEvection, delEvection, exportEvection, getEvection, listEvection, updateEvection } from '@/api/biz/evection'
import FileUpload from '@/components/FileUpload'
import { getFlowInfoByFlowId } from '@/api/flowable/definition'

export default {
  name: 'Evection',
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
      // evection表格数据
      evectionList: [],
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 开始时间时间范围
      daterangeStarttime: [],
      // 出差地区字典
      areaOptions: [],
      // 交通工具字典
      vehicleOptions: [],
      // 出差类型字典
      chuchaitypeOptions: [],
      // 流程状态字典
      prostateOptions: [],
      // 创建时间时间范围
      daterangeCreateTime: [],
      regionAllList: [],
      siteShiArr: [],
      regionList: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        simpleSearch:'',
        starttime: null,
        area: null,
        argument: null,
        days: null,
        chuchainum: null,
        chuchaitype: null,
        prostate: null,
        createUserName: null,
        createTime: null,
        createDeptName: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {}
    }
  },
  created() {
    this.getList()
    this.getDicts('car_belong_area').then((response) => {
      this.areaOptions = response.data
    })
    this.getDicts('traffic_type').then((response) => {
      this.vehicleOptions = response.data
    })
    this.getDicts('evection_type').then((response) => {
      this.chuchaitypeOptions = response.data
    })
    this.getDicts('form_process_state').then((response) => {
      this.prostateOptions = response.data
    })
    // 所有省市区
    // this.getRegionAll().then((res) => {
    //   this.regionAllList = res.data
    // })
    // this.getRegionTree().then((res) => {
    //   this.regionList = res.data
    // })
  },
  activated(){
    if(localStorage.getItem("needLoadList") === "yes"){
      this.resetQuery()
      localStorage.setItem("needLoadList",undefined)
    }
  },
  methods: {
    handleRegionChange(value) {
      this.queryParams.area = this.siteShiArr.join(',')
    },
    cardClick() {
      this.ifCardShow = !this.ifCardShow
    },
    // 省市区翻译
    regionFormat(row, column) {
      if (row.area) {
        return this.selectRegionName(this.regionAllList, row.area)
      }
    },
    /** 查询evection列表 */
    getList() {
      this.loading = true
      this.queryParams.params = {}
      if (null != this.daterangeStarttime && '' != this.daterangeStarttime) {
        this.queryParams.startStartTime = this.daterangeStarttime[0]
        this.queryParams.startEndTime = this.daterangeStarttime[1]
      }
      if (null != this.daterangeCreateTime && '' != this.daterangeCreateTime) {
        this.queryParams.createStartTime = this.daterangeCreateTime[0]
        this.queryParams.createEndTime = this.daterangeCreateTime[1]
      }
      listEvection(this.queryParams).then((response) => {
        this.evectionList = response.rows
        this.total = response.total
        this.loading = false
      })
    },
    // 出差地区字典翻译
    areaFormat(row, column) {
      return this.selectDictLabel(this.areaOptions, row.area)
    },
    // 交通工具字典翻译
    vehicleFormat(row, column) {
      return this.selectDictLabel(this.vehicleOptions, row.vehicle)
    },
    // 出差类型字典翻译
    chuchaitypeFormat(row, column) {
      return this.selectDictLabel(this.chuchaitypeOptions, row.chuchaitype)
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
        dept: null,
        username: null,
        time: null,
        starttime: null,
        finishtime: null,
        area: null,
        argument: null,
        vehicle: null,
        days: null,
        agree: null,
        creatorid: null,
        chuchainum: null,
        chuchaitype: null,
        numbers: null,
        beizhu: null,
        fujian: null,
        projectname: null,
        jianshefang: null,
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
      this.daterangeStarttime = []
      this.queryParams.startStartTime = null
      this.queryParams.startEndTime = null
      this.daterangeCreateTime = []
      this.queryParams.createStartTime = null
      this.queryParams.createEndTime = null
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
        flowId: 'process_ylpny8jg'
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
        path: '/task/record/index/evection',
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
        flowId: 'process_ylpny8jg'
      })
      this.$router.push({
        path: '/task/record/index/evection',
        query: {
          id: row.id,
          formId: data.formId,
          procInsId: row.procInsId,
          deployId: row.deployId,
          taskId: row.taskId,
          tableName: 'pms_evection'
        }
      })
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset()
      const id = row.id || this.ids
      getEvection(id).then((response) => {
        this.form = response.data
        this.open = true
        this.title = '修改evection'
      })
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          if (this.form.id != null) {
            updateEvection(this.form).then((response) => {
              this.msgSuccess('修改成功')
              this.open = false
              this.getList()
            })
          } else {
            addEvection(this.form).then((response) => {
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
        '是否确认删除evection编号为"' + ids + '"的数据项?',
        '警告',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      )
        .then(function() {
          return delEvection(ids)
        })
        .then(() => {
          this.getList()
          this.msgSuccess('删除成功')
        })
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams
      this.$confirm('是否确认导出所有evection数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(function() {
          return exportEvection(queryParams)
        })
        .then((response) => {
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
