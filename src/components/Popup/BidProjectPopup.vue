<!-- 正式立项选择 -->
<template>
  <el-dialog :visible="true" title="投标立项选择" width="60%" @close="handleFlowRecord">
    <el-form
      v-show="showSearch"
      ref="queryForm"
      :inline="true"
      :model="queryParams"
      label-width="70px"
    >
      <el-form-item label="项目编号" prop="num">
        <el-input
          v-model="queryParams.num"
          clearable
          placeholder="请输入项目编号"
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
      <el-form-item label="项目类型" prop="leixing">
        <el-select
          v-model="queryParams.leixing"
          clearable
          placeholder="请选择项目类型"
          @keyup.enter.native="handleQuery"
        >
          <el-option
            v-for="item in formLeixingList"
            :key="item.dictValue"
            :label="item.dictLabel"
            :value="item.dictValue"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="投标人" prop="fuzeren">
        <el-input
          v-model="queryParams.fuzeren"
          clearable
          placeholder="请输入投标负责人"
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>

      <el-form-item label="立项时间" prop="createTime">
        <el-date-picker
          v-model="showTime"
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
      <el-form-item>
        <el-button icon="el-icon-search" size="mini" type="primary" @click.stop="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click.stop="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-table v-loading="loading" :data="projectList" class="table">
      <el-table-column align="center" label="项目编号" prop="num" sortable/>
      <el-table-column align="center" label="项目名称" prop="projectname" sortable/>
      <el-table-column
        :formatter="leixingFormat"
        align="center"
        label="项目类型"
        prop="leixing"
        sortable
      />
      <el-table-column align="center" label="投标负责人" prop="createUserName" sortable/>
      <el-table-column align="center" label="立项时间" prop="createTime" sortable>
        <template slot-scope="scope">{{ formatDate(scope.row.createTime) }}</template>
      </el-table-column>
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
  name: 'BidProjectPopup',
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
        prostate: '1',
        num: null,
        projectname: null,
        leixing: null,
        fuzeren: null,
        startTimeBeg: null,
        startTimeEnd: null
      },
      // 表单参数
      form: {}
    }
  },
  created() {
    this.getList()
    // 项目类型
    this.getDicts('project_type').then((res) => {
      this.formLeixingList = res.data
    })
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

.table {
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

</style>
