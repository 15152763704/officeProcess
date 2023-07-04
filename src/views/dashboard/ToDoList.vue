<template>
  <el-card class="box-card" shadow="never" body-style="height:350px;overflow-y:scroll">
    <div slot="header" class="clearfix">
      <span>待办工作</span>
      <span class="more_than" @click="goToDoList">更多<i class="el-icon-d-arrow-right"/></span>
    </div>
    <div v-for="item in todoList" :key="item.taskId" class="text item" @click="handleProcess(item)">
      <div class="top">
        <svg-icon icon-class="daiban"  style="margin-right: 2%;font-size: 21px;" />
        <el-tooltip effect="dark" :content="item.startUserName   +'  '+ item.procDefName" placement="top">
          <span class="top_title">{{item.startUserName   +"  "+ item.procDefName}}</span>
        </el-tooltip>
      </div>
      <span style="float:right;display: inline-block;width: 100px">{{formatDateWithoutTime(item.createTime)}}<svg-icon icon-class="right-arrow"/></span>
    </div>
  </el-card>
</template>

<script>
  import { todoList, } from '@/api/flowable/todo'
  import { formatDateWithoutTime } from '@/utils'
  import { getReqAction } from '@/utils/global'

  export default {
    name: 'ToDoList',
    data() {
      return {
        // 流程待办任务表格数据
        todoList: [],
        formatDateWithoutTime,
        // 查询参数
        queryParams: {
          pageNum: 1,
          pageSize: 10,
          name: null,
          category: null,
        },
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        todoList(this.queryParams).then((response) => {
          this.todoList = response.data.records
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
      goToDoList(){
        this.$router.push({
          path: "/task/todo",
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
<style scoped>
  .el-tooltip{
    display: inline-block;
    width: 100%;
    overflow: hidden;
    height: 20px;
  }
  .text {
    font-size: 16px;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
  }
  .top{
    display: flex;
    align-items: center;
    width: calc( 100% - 100px );
  }
  .top_title{
    margin-left: 10px;
  }
  .item {
    margin-bottom: 18px;
  }
  .more_than{
    position: absolute;
    right: 0;
    font-size: 13px;
    color: #1890ff;
    display: inline-block;
    width: 40px;
  }
  .more_than:hover{
    cursor: pointer;
  }
  .item:hover{
    cursor:pointer
  }
  .clearfix{
    position: relative;
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
    height: 450px;
  }
</style>
