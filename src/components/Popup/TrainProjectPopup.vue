<!-- 正式立项选择 -->
<template>
  <div class="zhezhou">
    <div class="mydialog">
      <div style="text-align: left;margin-top: 10px;margin-left: 50px;font-weight: 700">项目选择</div>
      <div class="guanbianniu" @click="handleFlowRecord()" style="cursor:pointer;" >x</div>
      <el-form
        :model="queryParams"
        ref="queryForm"
        :inline="true"
        label-width="102px"
        style="margin-top:15px;"
        v-show="showSearch"
      >
        <el-form-item label="培训编号" prop="trainnumber">
          <el-input
            v-model="queryParams.trainnumber"
            placeholder="请输入培训编号"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <el-form-item label="培训内容" prop="neirong">
          <el-input
            v-model="queryParams.neirong"
            clearable
            placeholder="请输入培训内容"
            size="small"
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
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
        <el-form-item label="培训类型" prop="leixing">
          <el-select
            v-model="queryParams.leixing"
            clearable
            placeholder="请选择培训类型"
            @keyup.enter.native="handleQuery"
          >
            <el-option
              v-for="item in formTrainTypeList"
              :key="item.dictValue"
              :label="item.dictLabel"
              :value="item.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="培训时间" prop="trainingtime">
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

        <el-form-item>
          <el-button type="primary" icon="el-icon-search" size="mini" @click.stop="handleQuery">搜索</el-button>
          <el-button icon="el-icon-refresh" size="mini" @click.stop="resetQuery">重置</el-button>
        </el-form-item>
      </el-form>

      <el-table v-loading="loading" :data="projectList" class="table">
        <el-table-column align="center" label="培训编号" prop="trainnumber" sortable/>
        <el-table-column align="center" label="培训内容" prop="neirong" sortable/>
        <el-table-column
          label="培训方式"
          sortable
          align="center"
          prop="sfwc"
          :formatter="trainMethodFormat"
        />
        <el-table-column
          label="培训类型"
          sortable
          align="center"
          prop="sfwc"
          :formatter="trainTypeFormat"
        />
        <el-table-column label="培训时间" sortable align="center" prop="trainingtime">
          <template slot-scope="scope">{{ formatDate(scope.row.trainingtime) }}</template>
        </el-table-column>
        <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              icon="el-icon-tickets"
              @click.native="handleFlowRecord(scope.row)"
            >选择
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <pagination
        class="pagination"
        v-show="total>0"
        :total="total"
        :page.sync="queryParams.pageNum"
        :limit.sync="queryParams.pageSize"
        @pagination="getList"
      />
    </div>
  </div>
</template>

<script>
import { formatDate } from '@/utils'

export default {
  name: 'TrainProjectPopup',
  props: {
    reqUrl: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      formatDate,
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
      formLeixingList: [],
      formTrainMethodList: [],
      formTrainTypeList: [],
      showTime: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        trainnumber: null,
        neirong: null,
        sfwc: null,
        leixing: null,
        trainingtimeBeg: null,
        trainingtimeEnd: null
      },
      // 表单参数
      form: {}
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
    /** 查询项目合同申请列表 */
    getList() {
      this.loading = true
      this.getReqAction(this.reqUrl, this.queryParams).then((response) => {
        this.projectList = response.rows
        this.total = response.total
        this.loading = false
      })
    },
    handletimeChange(date) {
      if (date) {
        this.queryParams.trainingtimeBeg = date[0]
        this.queryParams.trainingtimeEnd = date[1]
      } else {
        this.queryParams.trainingtimeBeg = null
        this.queryParams.trainingtimeEnd = null
      }
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.getList()
    },
    /** 重置按钮操作 */
    resetQuery() {
      console.log('resetQuery')
      this.resetForm("queryForm");
      this.showTime = []
      this.queryParams = {
        pageNum: 1,
        pageSize: 10,
        trainnumber: null,
        neirong: null,
        sfwc: null,
        leixing: null,
        trainingtimeBeg: null,
        trainingtimeEnd: null
      }
      this.handleQuery()
    },
    handleFlowRecord(row) {
      //func: 是父组件指定的传数据绑定的函数，this.msg:子组件给父组件传递的数据
      this.$emit('choosedProect', row)
    }
  }
}
</script>
<style scoped>
.mydialog {
  width: 900px;
  height: 750px;
  position: fixed;
  top: 100px;
  background-color: white;
  z-index: 100;
  left: 450px;
}

.table {
  height: 450px;
  width: 850px;
  margin-left: 25px;
  overflow-y: scroll;
  border: 1px solid #f1f1f1;
}

::-webkit-scrollbar-track-piece {
  /*滚动条凹槽的颜色，还可以设置边框属性*/
  background-color: transparent;
}

::-webkit-scrollbar {
  /*滚动条的宽度*/
  width: 5px;
  height: 5px;
}

::-webkit-scrollbar-thumb {
  /*滚动条的设置*/
  background-color: #dfe6ea;
  background-clip: padding-box;
  min-height: 5px;
  border-radius: 10px;
}

.pagination-container .el-pagination {
  text-align: center;
  position: relative;
}

.zhezhou {
  background-color: #16151582;
  width: 100%;
  height: 100%;
  z-index: 99;
  position: fixed;
  top: 0;
  left: 0;
  text-align: center;
}

.guanbianniu {
  position: absolute;
  top: 10px;
  right: 20px;
}
</style>
