<template>
  <el-dialog title="培训申请选择" :visible.sync="isshow" :before-close="onBeforeClose">
    <el-form
      ref="queryForm"
      :inline="true"
      :model="queryParams"
      label-width="102px"
      style="margin-top:15px;"
    >
      <div class="my-col">
        <el-form-item label="培训编号" prop="trainnumber">
          <el-input
            v-model="queryParams.trainnumber"
            clearable
            placeholder="请输入培训编号"
            size="small"
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <el-form-item label="申请人" prop="createUserName">
          <el-input
            v-model="queryParams.createUserName"
            clearable
            placeholder="请输入申请人"
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
            <el-form-item label="培训内容" prop="neirong">
              <el-input
                v-model="queryParams.neirong"
                clearable
                placeholder="请输入培训内容"
                size="small"
                @keyup.enter.native="handleQuery"
              />
            </el-form-item>
            <el-form-item label="申请部门" prop="createDeptName">
              <el-input
                v-model="queryParams.createDeptName"
                clearable
                placeholder="请输入申请部门"
                size="small"
                @keyup.enter.native="handleQuery"
              />
            </el-form-item>
            <el-form-item label="培训地点" prop="trainingplace">
              <el-input
                v-model="queryParams.trainingplace"
                clearable
                placeholder="请输入培训地点"
                size="small"
                @keyup.enter.native="handleQuery"
              />
            </el-form-item>
            <el-form-item label="培训课时" prop="keshi">
              <el-input
                v-model="queryParams.keshi"
                clearable
                placeholder="请输入培训课时"
                size="small"
                @keyup.enter.native="handleQuery"
              />
            </el-form-item>
          </div>

          <div class="my-col">
            <el-form-item label="培训方式" prop="sfwc">
              <el-select
                v-model="queryParams.sfwc"
                clearable
                placeholder="请选择培训方式"
                @keyup.enter.native="handleQuery"
              >
                <el-option
                  v-for="item in formTrainMethodList"
                  :key="item.dictValue"
                  :label="item.dictLabel"
                  :value="item.dictValue"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="培训时间" prop="trainingtime">
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
            <el-form-item></el-form-item>

          </div>
        </div>
      </el-collapse-transition>
    </el-form>
    <el-table v-loading="loading" :data="modelList" class="table">
      <el-table-column align="center" label="培训编号" prop="trainnumber" sortable/>
      <el-table-column align="center" label="申请人" prop="createUserName" sortable/>
      <el-table-column align="center" label="申请部门" prop="createDeptName" sortable/>
      <el-table-column align="center" label="培训内容" prop="neirong" sortable/>
      <el-table-column :formatter="trainMethodFormat" align="center" label="培训方式" prop="sfwc" sortable/>
      <el-table-column :formatter="trainTypeFormat" align="center" label="培训类型" prop="sfwc" sortable/>
      <el-table-column align="center" label="培训时间" prop="trainingtime" sortable>
        <template slot-scope="scope">{{ formatDate(scope.row.trainingtime) }}</template>
      </el-table-column>
      <el-table-column align="center" label="培训地点" prop="trainingplace" sortable/>
      <el-table-column align="center" label="培训课时" prop="keshi" sortable/>
      <el-table-column align="center" class-name="small-padding fixed-width" label="操作">
        <template slot-scope="scope">
          <el-button
            icon="el-icon-tickets"
            size="mini"
            type="text"
            @click.native="handleFlowRecord(scope.row)"
          >选择
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :limit.sync="queryParams.pageSize"
      :page.sync="queryParams.pageNum"
      :total="total"
      class="pagination"
      @pagination="getList"
    />
  </el-dialog>
</template>

<script>
import { formatDate } from '@/utils'

export default {
  name: 'TrainingApplication',
  props: {
    reqUrl: {
      type: String,
      default: ''
    },
    isshow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      showTime: '',
      formatDate,
      ifCardShow: false,
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
      // 表格数据
      modelList: [],
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        trainnumber:null,
        createUserName:null,
        createDeptName:null,
        trainingplace:null,
        neirong:null,
        sfwc:null,
        keshi:null,
        prostate: '1'
      },
      // 表单参数
      form: {},
      formTrainMethodList: [],
      formTrainTypeList: [],
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
      }
    }
  },
  created() {
    this.getList()
    // 培训方式
    this.getDicts('train_method').then((res) => {
      this.formTrainMethodList = res.data
    })
    // 培训类型
    this.getDicts('train_type').then((res) => {
      this.formTrainTypeList = res.data
    })
  },
  methods: {
    // 培训方式翻译
    trainMethodFormat(row, column) {
      return this.selectDictLabel(this.formTrainMethodList, row.sfwc)
    },
    // 培训类型翻译
    trainTypeFormat(row, column) {
      return this.selectDictLabel(this.formTrainTypeList, row.leixing)
    },
    cardClick() {
      this.ifCardShow = !this.ifCardShow
    },
    /** 查询项目合同申请列表 */
    getList() {
      this.loading = true
      this.getReqAction(this.reqUrl, this.queryParams).then((response) => {
        this.modelList = response.rows
        this.total = response.total
        this.loading = false
      })
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1
      this.getList()
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.showTime = []
      this.queryParams.timesStart = ''
      this.queryParams.timesEnd = ''
      this.handleQuery()
    },
    handleFlowRecord(row) {
      //func: 是父组件指定的传数据绑定的函数，this.msg:子组件给父组件传递的数据
      this.$emit('transferTrainingApplicationData', row)
    },
    handletimeChange(date) {
      if (date == null) {
        this.queryParams.trainingtimeBeg = null
        this.queryParams.trainingtimeEnd = null
      }
    },
    onBeforeClose() {
      this.$emit('onBeforeClose')
    }
  }
}
</script>
<style scoped lang="scss">
.my-col {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;

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
