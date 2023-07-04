<!-- 正式立项选择 -->
<template>
  <div class="zhezhou">
    <div class="mydialog">
      <div style="text-align: left;margin-top: 10px;margin-left: 50px;font-weight: 700">项目选择</div>
      <div class="guanbianniu" @click="handleFlowRecord()" style="cursor:pointer;" >x</div>
      <el-form
        v-show="showSearch"
        ref="queryForm"
        :inline="true"
        :model="queryParams"
        label-width="102px"
        style="margin-top:15px;"
      >
        <el-form-item label="项目编号" prop="projectCode">
          <el-input
            v-model="queryParams.projectCode"
            clearable
            placeholder="请输入项目编号"
            size="small"
            style="width: 120px"
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <el-form-item label="项目名称" prop="projectName">
          <el-input
            v-model="queryParams.projectName"
            clearable
            placeholder="请输入项目名称"
            size="small"
            style="width: 120px"
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <el-form-item label="投标负责人" prop="createUserName">
          <el-input
            v-model="queryParams.createUserName"
            clearable
            placeholder="请输入投标负责人"
            size="small"
            style="width: 120px"
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>


        <el-form-item>
          <el-button icon="el-icon-search" size="mini" type="primary" @click.stop="handleQuery">搜索</el-button>
          <el-button icon="el-icon-refresh" size="mini" @click.stop="resetQuery">重置</el-button>
        </el-form-item>
      </el-form>

      <el-table v-loading="loading" :data="projectList" class="table">
        <el-table-column align="center" label="项目编号" prop="projectCode" sortable/>
        <el-table-column align="center" label="项目名称" prop="projectName" sortable/>
        <el-table-column align="center" label="项目经理" prop="createUserName" sortable/>

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
import { formatDate } from '@/utils'

export default {
  name: 'ProjectJiekuanPopup',
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
        projectCode: null,
        projectName: null,
        createUserName: null
      },
      // 表单参数
      form: {}
    }
  },
  created() {
    this.getList()
    // 项目类型
    // this.getDicts('project_type').then((res) => {
    //   this.formLeixingList = res.data
    // })
  },
  methods: {
    leixingFormat(row, column) {
      return this.selectDictLabel(this.formLeixingList, row.leixing)
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
        this.queryParams.startTimeBeg = date[0]
        this.queryParams.startTimeEnd = date[1]
      } else {
        this.queryParams.startTimeBeg = null
        this.queryParams.startTimeEnd = null
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
        num: null,
        projectname: null,
        leixing: null,
        fuzeren: null,
        startTimeBeg: null,
        startTimeEnd: null
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
  height: 700px;
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
