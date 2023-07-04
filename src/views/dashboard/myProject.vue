<template>
  <el-card class="box-card" shadow="never" body-style	="height: 300px;overflow-y:  scroll">
    <div slot="header" class="clearfix">
      <span>我的项目</span>
    </div>
    <div v-for="item in projectList" :key="item.taskId" class="text item" @click="handleProcess(item)">
      <svg-icon icon-class="project" style="margin-right: 10px;font-size: 21px;" />
      <el-tooltip effect="dark" :content="item.projectName" placement="top">
        <span>{{item.projectName}}</span>
      </el-tooltip>
      <span style="float:right;display: inline-block;width: 105px;height: 24px;line-height: 24px;">
        {{formatDateWithoutTime(item.createTime)}}
        <svg-icon icon-class="right-arrow"/>
      </span>
    </div>
  </el-card>
</template>

<script>
  import { formatDateWithoutTime } from '@/utils'
  import { getReqAction } from '@/utils/global'
  export default {
    name: 'myProject',
    data() {
      return {
        // 流程待办任务表格数据
        projectList: [],
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
        getReqAction('/system/productionproject/my',this.queryParams).then((res) => {
          this.$emit("backMyProject",res);
          this.projectList = res.rows;
        })
      },
      // 跳转到处理页面
      handleProcess(row) {
        this.$router.push({
          path: '/task/record/index/productionProject',
          query: {
            id: row.id,
            procInsId: row.procInsId,
            deployId: row.deployId,
            taskId: row.taskId,
            tableName: 'pms_production_project',
          },
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
    width: calc( 100% - 140px );
    overflow: hidden;
    height: 20px;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .text {
    font-size: 16px;
    height: 24px;
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
    /*margin-bottom: 32px;*/
    height: 360px;
  }
  .el-card__body{
    height: calc(100% - 60px);
    overflow-y: scroll;
  }
</style>
