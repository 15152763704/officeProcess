<template>
  <div class="dashboard-editor-container">
    <!--<panel-group  />-->
    <TopStatistics/>

    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="8">
        <CommonFunction/>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <!--<ProjectMoneyBarChart v-if="!isShowProjectManagerView"/>-->
          <!--<ProjectInfo v-if="isShowProjectManagerView"/>-->
          <ProjectInfo />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper" v-if="!isShowProjectManagerView">
          <MonthlyEcoTargetBarChart />
        </div>
        <myProject v-if="isShowProjectManagerView"/>
      </el-col>
    </el-row>

    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <WarningList/>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <ToDoList v-if="!isShowProjectManagerView"/>
        <myProgress v-if="isShowProjectManagerView"/>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <NoticeList @changeValue="change"/>
      </el-col>
    </el-row>
    <div v-show="showSearch" class="backg" @click="showSearch=false">
      <div class="container" @click.stop>
        <div class="header">
          <el-input
            placeholder="搜索公告标题、公告内容"
            prefix-icon="el-icon-search"
            v-model="noticeParam.data"
            size="large"
            clearable
            class="input_search"
            @input="onSearch"
          >
          </el-input>
          <el-button type="primary" round @click="doSearch" size="small">搜 索</el-button>
          <el-button type="info" icon="el-icon-close" circle size="mini" class="close_box" @click="showSearch=false"></el-button>
        </div>
        <div class="content" v-infinite-scroll="onLoad"  infinite-scroll-disabled="finished" infinite-scroll-distance="5" @scroll="divScroll($event)">
          <div class="card" v-for="(item,idx) in todoDataList" :key="idx" @click="handleProcess(item)">
            <div class="contents">
              <div class="biaoti">
                <div class="dian"></div>
                <div class="name">{{item.biaoti}}</div>
              </div>
              <div class="time">发布时间：{{item.createTime}}</div>
            </div>
          </div>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
import PanelGroup from './dashboard/PanelGroup'
import  WarningList from './dashboard/WarningList'
import  ToDoList from './dashboard/ToDoList'
import  NoticeList from './dashboard/NoticeList'
import  CommonFunction from './dashboard/CommonFunction'
import  ProjectMoneyBarChart from './dashboard/ProjectMoneyBarChart'
import  MonthlyEcoTargetBarChart from './dashboard/MonthlyEcoTargetBarChart'
import  TopStatistics from './dashboard/TopStatistics'
import  myProject from './dashboard/myProject'
import  ProjectInfo from './dashboard/ProjectInfo'
import  myProgress from './dashboard/myProgress'
import { getNoticeOsList } from '@/api/biz/gonggao'


export default {
  name: 'Index',
  components: {
    PanelGroup,
    WarningList,
    ToDoList,
    NoticeList,
    CommonFunction,
    ProjectMoneyBarChart,
    MonthlyEcoTargetBarChart,
    TopStatistics,
    myProgress,
    myProject,
    ProjectInfo
  },
  data() {
    return {
      isShowProjectManagerView: false,
      showSearch:false,
      finished:false,
      todoDataList:[],
      noticeParam: {
        pageNum: 1,
        pageSize: 10,
        data: '',
      },
    }
  },
  created() {
    let currentUserRoles = this.$store.getters.roles
    for (let i = 0; i < currentUserRoles.length; i++) {
      if (currentUserRoles[i] == 'project_manager') {
        this.isShowProjectManagerView = true
        break
      }
    }
  },
  methods: {
    change(val){
      this.showSearch = val
      this.getList()
    },
    async getList() {
      // this.finished = true
      this.loading = true
      const data = await getNoticeOsList(this.noticeParam)
      data.rows.map((item) =>
        this.todoDataList.push(item)
      )
      this.total = data.total
      this.loading = false
      // this.finished = false
      //没有更多判断
      if (
        this.noticeParam.pageNum >=
        Math.ceil(data.total / this.noticeParam.pageSize)
      ) {
        this.finished = true
      }
    },
    onSearch() {
        this.todoDataList = []
        this.getList()
      },
    doSearch(){
      this.getList()
    },
    onLoad() {
      this.noticeParam.pageNum++
      this.loading = true
      this.getList()
    },
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
    },
    divScroll:function(e){
      var k = e.wheelDelta? e.wheelDelta:-e.detail*10;
      this.scrollTop = this.scrollTop - k;
      return false;
    },

  },
}
</script>

<style lang="scss" scoped>
  .el-col{
    padding: 0 10px!important;
  }
.dashboard-editor-container {
  padding: 10px 25px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 10px;
  }
}
.backg{
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #000000ab;
  z-index: 2;
  .container{
    width: 500px;
    height: 620px;
    border-radius: 10px;
    background: white;
    overflow: hidden;
    position: fixed;
    overflow-y: scroll;
    left: 30%;
    top: 12%;
    .header{
      position: sticky;
      top: 0;
      left: 0;
      background: white;
      .input_search{
        width: 70%;
        margin: 20px;
      }
      .close_box{
        position: absolute;
        top: 5px;
        right: 5px;
      }
    }
    .content{
      width: 100%;
      height: 87%;
      background: #f8f8f8;
      padding: 20px;
      box-sizing: border-box;
      overflow: auto;
      .card {
        margin-bottom: 0.625rem;
        background-color: #fff;
        width: 100%;
        height: 4rem;
        box-shadow: 0.3125rem 0.3125rem 0.625rem 0px rgba(200, 200, 200, 0.5);
        padding: 0.625rem;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        .iconfont {
          font-size: 0.75rem;
          background-color: #3a86f4;
          width: 3.75rem;
          height: 3.75rem;
          line-height: 3.75rem;
          border-radius: 50%;
          text-align: center;
          overflow: hidden;
          color: #fff;
          white-space: nowrap;
        }
        .contents {
          margin-left: 0.625rem;
          width: calc(100% - 3.75rem - 0.3125rem - 0.3125rem);
          font-size: 1rem;
          .biaoti {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            .dian {
              width: 4px;
              height: 4px;
              border-radius: 50%;
              background: #1e1e1e;
              margin-right: 8px;
            }
            .name {
              font-weight: bold;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }
          }
          .time {
            font-size: 0.85rem;
            color: #2b2b2b;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            margin-top: 10px;
          }
          .explain {
            color: #e0c095;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            font-size: 0.875rem;
          }
        }
      }
    }
  }
}

@media (max-width: 1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
