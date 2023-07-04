<!-- 正式立项选择 -->
<template>
  <div class="zhezhou">
    <div class="mydialog">
      <div style="text-align: left;margin-top: 20px;margin-left: 30px;font-weight: 700;">项目推进选择</div>
      <div class="guanbianniu" @click="handleFlowRecord()" style="cursor:pointer;" >x</div>
      <el-form
        v-show="showSearch"
        ref="queryForm"
        :inline="true"
        :model="queryParams"
        label-width="70px"
        style="margin-top: 14px;width: 1140px;margin-left: 30px;display: flex;text-align: left;"
      >
        <el-form-item label="申请人" prop="createUserName">
          <el-input
            v-model="queryParams.createUserName"
            placeholder="请输入申请人"
            clearable
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
        <el-form-item label="申请日期" prop="createTime">
          <el-date-picker
            v-model="showTime"
            align="right"
            end-placeholder="结束日期"
            range-separator="至"
            start-placeholder="开始日期"
            style="width: 160px"
            type="daterange"
            unlink-panels
            value-format="yyyy-MM-dd"
            @change="handletimeChange"
            @keyup.enter.native="handleQuery"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button icon="el-icon-search" size="mini" type="primary" @click.stop="handleQuery">搜索</el-button>
          <el-button icon="el-icon-refresh" size="mini" @click.stop="resetQuery">重置</el-button>
        </el-form-item>
      </el-form>

      <el-table v-loading="loading" :data="projectList" class="table">
        <el-table-column align="center" label="申请人" prop="createUserName" sortable/>
        <el-table-column align="center" label="项目名称" prop="projectname" sortable/>
        <el-table-column align="center" label="申请人部门" prop="createDeptName" sortable/>
        <el-table-column label="申请日期" sortable align="center" prop="createTime">
          <template slot-scope="scope">{{ formatDate(scope.row.createTime) }}</template>
        </el-table-column>
        <el-table-column align="center" label="建设（投资）方" prop="jianshefang" sortable/>
        <el-table-column align="center" label="推进成本(元)" prop="yusuan" sortable/>
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
    </div>
  </div>
</template>

<script>
import request from '@/utils/request'
import { formatDate } from '@/utils'

export default {
  name: 'ProductionProjectPromotionPopup',
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
      showTime: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        prostate: 1,
        createUserName: null,
        projectname: null,
        createDeptName: null,
        createTimeBeg: null,
        createTimeEnd: null
      },
      // 表单参数
      form: {}
    }
  },
  created() {
    this.getList()
  },
  methods: {
    /** 查询项目合同申请列表 */
    getList() {
      this.loading = true
      request({
        url: this.reqUrl,
        method: 'get',
        params: this.queryParams
      }).then((response) => {
        this.projectList = response.rows
        this.total = response.total
        this.loading = false
      })
    },
    handletimeChange(date) {
      if (date) {
        this.queryParams.createTimeBeg = date[0]
        this.queryParams.createTimeEnd = date[1]
      } else {
        this.queryParams.createTimeBeg = null
        this.queryParams.createTimeEnd = null
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
        createUserName: null,
        projectname: null,
        createDeptName: null,
        createTimeBeg: null,
        createTimeEnd: null
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
  width: 1200px;
  height: 670px;
  position: fixed;
  top: 100px;
  background-color: white;
  z-index: 100;
  left: calc( 50% - 500px );
}

.table {
  height: 460px;
  width: 1140px;
  margin-left: 30px;
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
  top: 20px;
  right: 30px;
}
.pagination{
  width: 1170px;
}
</style>
