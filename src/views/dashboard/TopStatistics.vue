<template>
  <el-row :gutter="40" class="panel-group">
    <el-col :xs="12" :sm="12" :lg="4"  class="panel-item" >
      <div class="card-container" @click="goObjectList('/task/todo')">
        <el-image style="height: 100%;"
          :src="url_daiban"
          :fit="fit"
          ></el-image>
        <div class="text-container">
          <count-to :start-val="0" :end-val="daiban_num" :duration="2600" class="card-panel-num" />
          <div class="card-panel-content">我的待办</div>
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="4" class="panel-item">
      <div class="card-container" @click="goObjectList('/task/finished')">
        <el-image
          style="height: 100%;"
          :src="url_yiban"
          :fit="fit"
           ></el-image>
        <div class="text-container">
          <count-to :start-val="0" :end-val="yiban_num" :duration="2600" class="card-panel-num" />
          <div class="card-panel-content">我的已办</div>
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="4" class="panel-item">
      <div class="card-container" @click="goObjectList('/task/tocc')">
        <el-image
          style="height: 100%;"
          :src="url_caosong"
          :fit="fit"
           ></el-image>
        <div class="text-container">
          <count-to :start-val="0" :end-val="caosong_num" :duration="2600" class="card-panel-num" />
          <div class="card-panel-content">我的抄送</div>
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="4" class="panel-item panel-raidus">
      <div class="card-container" @click="goObjectList('/task/process')">
        <el-image
          style="height: 100%;"
          :src="url_myprogress"
          :fit="fit"
           ></el-image>
        <div class="text-container">
          <count-to :start-val="0" :end-val="myprogress_num" :duration="2600" class="card-panel-num" />
          <div class="card-panel-content">我的流程</div>
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="8" class="meteorological" >
      <div class="meteorological-container">
        <Weather/>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import CountTo from 'vue-count-to'
import request from '@/utils/request'
import { myProcessList } from '@/api/flowable/process'
import {ccTaskList} from '@/api/flowable/finished'
import   Weather   from './Weather'

export default {
  name: 'TopStatistics',
  components: {
    CountTo,Weather
  },
  data(){
    return {
      // fits: ['fill', 'contain', 'cover', 'none', 'scale-down'],
      //fill 图片填充满整个控件，并不按照比例来伸缩。
      //contain 图片成比例的进行伸缩，直到图片的高或者宽填充满控件为止。
      //cover 等比例的缩放，直到图片的宽和高都充满整个控件为止，图片可以超出控件的范围，显示不完整。
      //none 不进行任何缩放，保持原生态。当控件过小时会造成显示不完整。默认会居中显示图片。
      //scaleDown 会将图片完整的显示在控件中。它有两种缩放方式：
          //1、当图片的宽或高大于控件时，和contain 的方式是一样的，等比例进行缩放，直到完全显示在控件中为止。
          //2、当图片的宽和高都小于控件时，和none的方式是一样的，不进行任何缩放，保持原身材居中显示。
      fit : 'fill',
      url_daiban: require("@/assets/images/index_bg1.png"),
      url_yiban: require("@/assets/images/index_bg2.png"),
      url_caosong: require("@/assets/images/index_bg3.png"),
      url_myprogress: require("@/assets/images/index_bg4.png"),

      daiban_num : null,
      yiban_num : null,
      caosong_num : null,
      myprogress_num : null,

      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 1,
      },
    }
  },
  created(){
    this.getDaibanCount();
    this.getMyProgressCount();
    this.getYibanCount();
    this.getCaosongCount();
  },
  methods: {
    //查询待办数量
    getDaibanCount(){
      request({
        url: '/IndexController/getTodoCount',
        method: 'get'
      }).then(response => {
        this.daiban_num = response.data;
      });
    },
    //查询我的流程数量
    getMyProgressCount(){
      myProcessList(this.queryParams).then((res) => {
        this.myprogress_num = res.data.total;
      })
    },
    //查询已办数量
    getYibanCount(){
      request({
        url: '/IndexController/getFinishedCount',
        method: 'get'
      }).then(response => {
        this.yiban_num = response.data;
      });
    },
    //查询抄送数量
    getCaosongCount(){
      ccTaskList(this.queryParams).then((res) => {
        this.caosong_num = res.data.total;
      })
    },
    //待办列表页面
    goObjectList(path){
      this.$router.push({
        path: path,
      })
    },
  }
}
</script>
<style lang="css" scoped>
  /*顶部图片*/
  .panel-group{
    margin: 0 2px 10px -6px!important;
  }
  .card-container{
    height: 138px;
    width:100%;
    text-align: center;
  }
  .card-container:hover{
    cursor:pointer
  }
  .el-image{
    width: 100%;
  }
  .panel-item{
    padding: 10px!important;
    background-color: #fff;
  }
  /*.panel-item:first-child{*/
    /*border-bottom-left-radius: 5%;*/
    /*border-top-left-radius: 5%;*/
  /*}*/
  /*.panel-raidus{*/
    /*border-bottom-right-radius: 5%;*/
    /*border-top-right-radius: 5%;*/
  /*}*/

  /*气象*/
  .meteorological{
    padding: 0 0 0 20px!important;
  }
  .meteorological-container{
    background-color: #fff;
    height: 158px;
  }

  /*顶部文字*/
  .text-container{
    position: absolute;
    top: 0;
    height: 158px;
    padding: 30px 0 20px 20px;
  }
  .card-panel-num,.card-panel-content{
    height: 54px;
    line-height: 54px;
    color: #fff;
    font-weight: 600;
  }
  .card-panel-num{
    font-size: 27px;
  }
  .card-panel-content{
    font-size: 20px;
  }
</style>


