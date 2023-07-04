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
              <el-form-item label="申请事由" prop="shenqingshiyou">
                <el-input
                  v-model="queryParams.shenqingshiyou"
                  placeholder="请输入申请事由"
                  clearable
                  size="small"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
              <el-form-item label="车牌号码" prop="carno">
                <el-input
                  v-model="queryParams.carno"
                  placeholder="请输入车牌号码"
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
              <el-form-item label="所属区域" prop="travelscope">
                <el-select
                  v-model="queryParams.travelscope"
                  clearable
                  placeholder="请选择所属区域"
                  @keyup.enter.native="handleQuery"
                >
                  <el-option
                    v-for="dict in car_belong_area"
                    :key="dict.dictValue"
                    :label="dict.dictLabel"
                    :value="dict.dictValue"
                  />
                </el-select>
              </el-form-item>
              <el-form-item label="用途类型" prop="yongtuleixing">
                <el-select
                  v-model="queryParams.yongtuleixing"
                  clearable
                  placeholder="请选择用途类型"
                  @keyup.enter.native="handleQuery"
                >
                  <el-option
                    v-for="dict in car_use_type"
                    :key="dict.dictValue"
                    :label="dict.dictLabel"
                    :value="dict.dictValue"
                  />
                </el-select>
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
              <el-form-item label="申请时间" prop="time">
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
              <el-form-item label="借用时间" prop="starttime">
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
              <el-form-item label="归还时间" prop="endtime">
                <el-date-picker
                  v-model="showTimeendtime"
                  :picker-options="pickerOptions"
                  align="right"
                  end-placeholder="结束日期"
                  range-separator="至"
                  start-placeholder="开始日期"
                  type="daterange"
                  unlink-panels
                  value-format="yyyy-MM-dd"
                  @change="handletimeChangeendtime"
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
          v-hasPermi="['administrationCarManage:carApply:add']"
        >新增申请
        </el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="carApplyList" @selection-change="handleSelectionChange">
      <el-table-column align="center" type="selection" width="55"/>
      <el-table-column align="center" label="申请事由" prop="shenqingshiyou" sortable/>
      <el-table-column align="center" label="车牌号码" prop="carno" sortable/>
      <el-table-column align="center" label="借用时间" prop="starttime" sortable/>
      <el-table-column :formatter="carBelongAreaFormat" align="center" label="所属区域" prop="travelscope" sortable/>
      <el-table-column align="center" label="归还时间" prop="endtime" sortable/>
      <el-table-column align="center" label="申请时间" prop="time" sortable/>
      <el-table-column :formatter="carUserTypeFormat" align="center" label="用途类型" prop="yongtuleixing" sortable/>
      <el-table-column :formatter="prostateFormat" align="center" label="流程状态" prop="prostate" sortable/>
      <el-table-column align="center" label="申请人" prop="createUserName" sortable/>
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
            v-hasPermi="['administrationCarManage:carApply:edit']"
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
  </div>
</template>

<script>
import {
  addCarApply,
  delCarApply,
  exportCarApply,
  listCarApply,
  updateCarApply
} from '@/api/biz/administrationCarManage/carApply'
import { getFlowInfoByFlowId } from '@/api/flowable/definition'

export default {
  name: 'CarApply',
  components: {},
  data() {
    return {
      ifCardShow: false,
      car_use_type: [],
      car_belong_area: [],
      form_process_state: [],
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
      // 车辆预定表格数据
      carApplyList: [],
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        carname: null,
        carno: null,
        users: null,
        tel: null,
        simpleSearch:'',
        usersName: null,
        costdept: null,
        origin: null,
        destinations: null,
        starttime: null,
        endtime: null,
        travelscope: null,
        memo: null,
        agreeJie: null,
        userid: null,
        cast: null,
        lastStarttime: null,
        lastEndtime: null,
        time: null,
        zhuangtai: null,
        agreeHuan: null,
        zhuangtaiHuan: null,
        shenqingshiyou: null,
        yongtuleixing: null,
        siji: null,
        jialing: null,
        fujian: null,
        prostate: null,
        createUserName: null,
        createUserId: null,
        createDeptName: null,
        createDeptId: null,
        updateUserName: null,
        updateUserId: null,

        timesStart: null,
        timeEnd: null,
        timesStartendtime: null,
        timeEndendtime: null,
        timesStarttime: null,
        timeEndtime: null
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
      showTime: '',
      showTimetime: '',
      showTimeendtime: ''
    }
  },
  created() {
    this.getList()
    this.getDicts('car_use_type').then((response) => {
      this.car_use_type = response.data
    })
    this.getDicts('car_belong_area').then((response) => {
      this.car_belong_area = response.data
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
    carBelongAreaFormat(row, column) {
      return this.selectDictLabel(this.car_belong_area, row.travelscope)
    },
    prostateFormat(row, column) {
      return this.selectDictLabel(this.form_process_state, row.prostate)
    },
    carUserTypeFormat(row, column) {
      return this.selectDictLabel(this.car_use_type, row.yongtuleixing)
    },
    //条件申请时间
    handletimeChange(dataarr) {
      this.queryParams.timesStart = dataarr[0]
      this.queryParams.timesEnd = dataarr[1]
    },
    //条件归还时间
    handletimeChangeendtime(dataarr) {
      this.queryParams.timesStartendtime = dataarr[0]
      this.queryParams.timesEndendtime = dataarr[1]
    },
    //条件申请时间
    handletimeChangetime(dataarr) {
      this.queryParams.timesStarttime = dataarr[0]
      this.queryParams.timesEndtime = dataarr[1]
    },

    //高级搜索
    cardClick() {
      this.ifCardShow = !this.ifCardShow
    },
    /** 查询车辆预定列表 */
    getList() {
      this.loading = true
      listCarApply(this.queryParams).then(response => {
        this.carApplyList = response.rows
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
        carname: null,
        carno: null,
        users: null,
        tel: null,
        usersName: null,
        costdept: null,
        origin: null,
        destinations: null,
        starttime: null,
        endtime: null,
        travelscope: null,
        memo: null,
        agreeJie: null,
        userid: null,
        cast: null,
        lastStarttime: null,
        lastEndtime: null,
        time: null,
        zhuangtai: null,
        agreeHuan: null,
        zhuangtaiHuan: null,
        shenqingshiyou: null,
        yongtuleixing: null,
        siji: null,
        jialing: null,
        fujian: null,
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
      this.showTime = []
      this.queryParams.timesStart = ''
      this.queryParams.timesEnd = ''

      this.showTimetime = []
      this.queryParams.timesStarttime = ''
      this.queryParams.timesEndtime = ''

      this.showTimeendtime = []
      this.queryParams.timesStartendtime = ''
      this.queryParams.timesEndendtime = ''

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
        flowId: 'process_bwqvmpvq'
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
        path: '/task/record/index/administrationCarApply',
        query: {
          deployId: row.deploymentId,
          procDefId: row.id,
          formId: row.formId
        }
      })
    },
    /** 流程流转记录 */
    async handleFlowRecord(row) {
      console.log(row)
      const { code, data, msg } = await getFlowInfoByFlowId({
        flowId: 'process_bwqvmpvq'
      })
      this.$router.push({
        path: '/task/record/index/administrationCarApply',
        query: {
          id: row.id,
          formId: data.formId,
          procInsId: row.procInsId,
          deployId: row.deployId,
          taskId: row.taskId,
          tableName: 'pms_oa_carbook'
        }
      })
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateCarApply(this.form).then(response => {
              this.msgSuccess('修改成功')
              this.open = false
              this.getList()
            })
          } else {
            addCarApply(this.form).then(response => {
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
      this.$confirm('是否确认删除车辆预定编号为"' + ids + '"的数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function() {
        return delCarApply(ids)
      }).then(() => {
        this.getList()
        this.msgSuccess('删除成功')
      })
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams
      this.$confirm('是否确认导出所有车辆预定数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function() {
        return exportCarApply(queryParams)
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
