<!-- 正式立项选择 -->
<template>
  <el-dialog title="行政推进选择" :visible.sync="isshow" :before-close="onBeforeClose">
    <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="120px">
      <div class="my-col">
        <el-form-item label="推进编号" prop="bianhao">
          <el-input
            v-model="queryParams.bianhao"
            placeholder="请输入推进编号"
            clearable
            style="width:100%;"
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <el-form-item label="推进事由" prop="beizhu">
          <el-input
            v-model="queryParams.beizhu"
            placeholder="请输入推进事由"
            clearable
            style="width:100%;"
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" size="mini" @click.stop="handleQuery">搜索</el-button>
          <el-button icon="el-icon-refresh" size="mini" @click.stop="resetQuery">重置</el-button>
        </el-form-item>
      </div>
      <div class="my-col">
        <el-form-item label="申请人" prop="createUserName">
          <el-input
            v-model="queryParams.createUserName"
            placeholder="请输入申请人"
            clearable
            style="width:100%;"
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <el-form-item label="申请人部门" prop="createDeptName">
          <el-input
            v-model="queryParams.createDeptName"
            placeholder="请输入申请人部门"
            clearable
            style="width:100%;"
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <el-form-item></el-form-item>
      </div>
    </el-form>
    <el-table v-loading="loading" :data="projectList" class="table">
      <el-table-column align="center" label="推进编号" prop="bianhao" sortable/>
      <el-table-column align="center" label="推进事由" prop="beizhu" sortable/>
      <el-table-column align="center" label="申请人" prop="createUserName" sortable/>
      <el-table-column align="center" label="申请人部门" prop="createDeptName" sortable/>
      <el-table-column align="center" label="推进成本(元)" prop="jine" sortable/>
      <el-table-column label="申请时间" sortable align="center" prop="createTime">
        <template slot-scope="scope">{{ formatDate(scope.row.createTime) }}</template>
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
      slot="footer"
      class="pagination dialog-footer"
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />
  </el-dialog>
</template>

<script>
import request from '@/utils/request'
import { formatDate } from '@/utils'

export default {
  name: 'AdministrationPromotionPopup',
  props: {
    reqUrl: {
      type: String,
      default: ''
    },
    isshow: {
      type: Boolean,
      default: false
    },
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
        bianhao: null,
        xiangmuname: null,
        xiangmuleixing: null,
        createUserName: null,
        startTime: null,
        endTime: null
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
    onBeforeClose() {
      this.$emit('onBeforeClose')
    },
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
        this.queryParams.startTime = date[0]
        this.queryParams.endTime = date[1]
      } else {
        this.queryParams.startTime = null
        this.queryParams.endTime = null
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
        startTime: null,
        endTime: null
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
