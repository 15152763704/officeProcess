<template>
  <el-card class="box-card" shadow="never" body-style="height:350px;overflow-y:scroll;">
    <div slot="header" class="clearfix">
      <span>通知公告</span>
      <span class="more_than" @click="transmission">更多<i class="el-icon-d-arrow-right"/></span>
    </div>
    <div v-for="item in todoList" :key="item.id" class="text item" @click="handleProcess(item)">
      <div class="item_box">
        <svg-icon icon-class="point" style="margin-right: 2%;flex-shrink: 0;" />
        <span class="text_box">{{item.biaoti}}</span>
        <svg-icon icon-class="new" v-if="compareDateWithNow(item.createTime)" style="flex-shrink: 0;"/>
      </div>
      <span style="float:right;">{{formatDateWithoutTime(item.createTime)}}<svg-icon icon-class="right-arrow"/></span>
    </div>
  </el-card>
</template>

<script>
  import { currentCcDept } from '@/api/biz/gonggao'
  import { formatDateWithoutTime } from '@/utils'
  export default {
    name: 'NoticeList',
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
        currentCcDept().then((response) => {
          this.todoList = response.data
        })
      },
      // 跳转到处理页面
      handleProcess(row) {
        this.$router.push({
          name: 'announcementdetails',
          query: {
            id: row.id,
            procInsId: row.procInsId,
            deployId: row.deployId,
            taskId: row.taskId,
            tableName: 'pms_gonggao',
          },
        })
        // this.$router.push({
        //   path: '/task/record/index/notice',
        //   query: {
        //     id: row.id,
        //     procInsId: row.procInsId,
        //     deployId: row.deployId,
        //     taskId: row.taskId,
        //     tableName: 'pms_gonggao',
        //   },
        // })
      },
      compareDateWithNow(dateStr){
        let date = new Date(new Date(dateStr).getTime() + 24*60*60*1000*3)
        let now = new Date()
        if(date >= now){
          return true
        }else{
          return false
        }
      },
      transmission(){
        this.$emit("changeValue",'true')
      }
    }
  }

</script>

<style scoped>
  .text {
    font-size: 16px;
  }

  .item {
    display: flex;
    justify-content: space-between;
    align-items: self-end;
    margin-bottom: 18px;

  }
  .item_box{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 70%;
  }
  .text_box{
    max-width: 260px;
    overflow: hidden;
    white-space:nowrap;
    text-overflow:ellipsis;
    margin-right: 5px;
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
</style>
