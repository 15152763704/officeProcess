<!-- 挂靠立项选择 -->
<template>
  <div class="zhezhou">
    <div class="mydialog">
      <div style="text-align: left;margin-top: 20px;margin-left: 30px;font-weight: 700;">挂靠立项选择</div>
      <div class="guanbianniu" @click="handleFlowRecord()" style="cursor:pointer;" >x</div>
      <el-form
        :model="queryParams"
        ref="queryForm"
        :inline="true"
        v-show="showSearch"
        label-width="70px"
        style="margin-top: 14px;width: 940px;margin-left: 30px;display: flex;"
      >
        <el-form-item label="立项编号" prop="num">
          <el-input style="width: 175px"
                    v-model="queryParams.num"
                    clearable
                    placeholder="请输入立项编号"
                    size="small"
                    @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <el-form-item label="项目名称" prop="projectname">
          <el-input
            v-model="queryParams.projectname" style="width: 175px"
            placeholder="请输入项目名称"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <el-form-item label="项目经理" prop="createUserName">
          <el-input style="width: 175px"
                    v-model="queryParams.createUserName"
                    clearable
                    placeholder="请输入项目经理"
                    size="small"
                    @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" size="mini" @click.stop="handleQuery">搜索</el-button>
          <el-button icon="el-icon-refresh" size="mini" @click.stop="resetQuery">重置</el-button>
        </el-form-item>
      </el-form>
      <el-table v-loading="loading" :data="projectList" class="table">
        <el-table-column align="center" label="立项编号" prop="num"/>
        <el-table-column align="center" label="项目名称" prop="projectname"/>
        <el-table-column align="center" label="项目经理" prop="createUserName"/>
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

      <pagination class="pagination"
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

export default {
  name: 'AffiliatedProject',
  props: {
    reqUrl: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
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
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        num: null,
        createUserName: null,
        projectname:null,
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
      console.log('三级页面组件')
      this.loading = true
      this.getReqAction(this.reqUrl, this.queryParams).then((response) => {
        this.projectList = response.rows
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
      this.handleQuery()
    },
    handleFlowRecord(row) {
      //func: 是父组件指定的传数据绑定的函数，this.msg:子组件给父组件传递的数据
      this.$emit('choosedProectGuakao', row)
    }
  }
}
</script>
<style scoped>
.mydialog {
  width: 1000px;
  height: 675px;
  position: fixed;
  top: 100px;
  background-color: white;
  z-index: 100;
  left: calc( 50% - 500px );
}

.table {
  height: 460px;
  width: 940px;
  margin-left: 30px;
  overflow-y: scroll;
  border: 1px solid #f1f1f1;
}

::-webkit-scrollbar-track-piece { /*滚动条凹槽的颜色，还可以设置边框属性*/
  background-color: transparent;
}

::-webkit-scrollbar { /*滚动条的宽度*/
  width: 5px;
  height: 5px;
}

::-webkit-scrollbar-thumb { /*滚动条的设置*/
  background-color: #DFE6EA;
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
  width: 970px;
}
</style>
