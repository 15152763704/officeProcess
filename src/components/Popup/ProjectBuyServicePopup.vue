<template>
  <el-dialog title="服务类请购选择" :visible.sync="isshow" :before-close="onBeforeClose">
    <el-form
      ref="queryForm"
      :inline="true"
      :model="queryParams"
      label-width="102px"
      style="margin-top:15px;"
    >
      <div class="my-col">
        <el-form-item label="项目编号" prop="projectnum">
          <el-input
            v-model="queryParams.projectnum"
            clearable
            placeholder="请输入项目编号"
            size="small"
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <el-form-item label="项目名称" prop="project">
          <el-input
            v-model="queryParams.project"
            clearable
            placeholder="请输入项目名称"
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
            <el-form-item label="项目经理" prop="xiangmujingli" label-width="150px">
              <el-input
                v-model="queryParams.xiangmujingli"
                clearable
                placeholder="请输入项目经理"
                size="small"
                @keyup.enter.native="handleQuery"
              />
            </el-form-item>
            <el-form-item label="申请人" prop="createUserName" label-width="150px">
              <el-input
                v-model="queryParams.createUserName"
                clearable
                placeholder="请输入申请人"
                size="small"
                @keyup.enter.native="handleQuery"
              />
            </el-form-item>

            <el-form-item label="申请日期" prop="createTime">
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
            <el-form-item></el-form-item>
          </div>

        </div>
      </el-collapse-transition>
    </el-form>
    <el-table v-loading="loading" :data="modelList" class="table">
      <el-table-column align="center" label="项目编号" prop="projectnum" sortable/>
      <el-table-column align="center" label="项目名称" prop="project" sortable/>
      <el-table-column align="center" label="项目经理" prop="xiangmujingli" sortable/>
      <el-table-column align="center" label="申请人" prop="createUserName" sortable/>
      <el-table-column align="center" label="申请时间" prop="createTime" sortable>
        <template slot-scope="scope">{{ formatDate(scope.row.createTime) }}</template>
      </el-table-column>
      <el-table-column align="center" class-name="small-padding fixed-width" label="操作">
        <template slot-scope="scope">
          <el-button
            icon="el-icon-view"
            size="mini"
            type="text"
            @click.native="goperview(scope.row)"
          >预览
          </el-button>
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
  name: 'ProjectBuyServicePopup',
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
        projectnum:null,
        project:null,
        xiangmujingli:null,
        createUserName:null,
        pageNum: 1,
        pageSize: 10
      },
      // 表单参数
      form: {},
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
  },
  methods: {
    cardClick() {
      this.ifCardShow = !this.ifCardShow
    },
    /** 查询项目合同申请列表 */
    getList() {
      this.loading = true
      if (null != this.showTime && '' != this.showTime) {
        this.queryParams.createTimeStart = this.showTime[0]
        this.queryParams.createTimeEnd = this.showTime[1]
      }
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
      this.queryParams.createTimeStart = ''
      this.queryParams.createTimeEnd = ''
      this.handleQuery()
    },
    handleFlowRecord(row) {
      //func: 是父组件指定的传数据绑定的函数，this.msg:子组件给父组件传递的数据
      this.$emit('transferProjectBuyServiceData', row)
    },
    goperview(row){
      console.log(row)
      // http://localhost/task/record/index/projectBuyMaterialBuy?id=HZ2880ec6d47458e016eb50f55f87c14&formId=62&tableName=pms_materialcost
      const{ href } = this.$router.resolve({
        name : 'projectBuyServiceBuy',
        query:{
          id:row.id,
          tableName:'pms_shigongfuwu'
        }
      });
      window.open(href,'_blank');
    },
    handletimeChange(date) {
      if (date == null) {
        this.queryParams.createTimeStart = null
        this.queryParams.createTimeEnd = null
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
