<template>
  <el-card class="box-card" shadow="never" body-style="height: 300px;overflow-y:  scroll">
    <div slot="header" class="clearfix">
      <span>我的流程</span>
    </div>
    <div v-for="item in progressList" :key="item.taskId" class="text item" @click="handleProcess(item)">
      <svg-icon icon-class="process" style="margin-right: 2%;font-size: 21px;" />
      <el-tooltip effect="dark" :content="item.procDefName" placement="top">
        <span>{{item.procDefName}}</span>
      </el-tooltip>
      <span style="float:right;">{{formatDateWithoutTime(item.createTime)}}<svg-icon icon-class="right-arrow"/></span>
    </div>
  </el-card>
</template>

<script>
  import { formatDateWithoutTime } from '@/utils'
  import { getReqAction } from '@/utils/global'
  import { myProcessList } from '@/api/flowable/process'
  export default {
    name: 'myProgress',
    data() {
      return {
        // 流程待办任务表格数据
        progressList: [],
        formatDateWithoutTime,
        // 查询参数
        queryParams: {
          pageNum: 1,
          pageSize: 10,
        },

      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        myProcessList(this.queryParams).then((res) => {
          this.progressList = res.data.records;
        })
      },
      // 跳转到处理页面
      handleProcess(row) {
        getReqAction('/flowable/form/getFormInfoByDeployId', {
          deployId: row.deployId,
        }).then((response) => {
          this.$router.push({
            path: response.data.formRouterPath,
            query: {
              procInsId: row.procInsId,
              deployId: row.deployId,
              taskId: row.taskId,
              procDefId: row.procDefId,
            },
          })
        })
      },
    }
  }

</script>
<style>
  /* 设置滚动条的样式 */
  ::-webkit-scrollbar {
    width:0px;
  }
</style>
<style  scoped>
  .el-tooltip{
    display: inline-block;
    width: 50%;
    overflow: hidden;
    height: 20px;
  }
  .text {
    font-size: 16px;
  }

  .item {
    margin-bottom: 18px;
  }

  .item:hover{
    cursor:pointer
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 100%;
    margin-bottom: 10px;
    height: 450px;
  }
  .el-card__body{
    height: calc(100% - 60px);
    overflow-y: scroll;
  }
</style>
