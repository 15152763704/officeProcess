<template>

    <el-card class="box-card"  body-style	="height: 300px;" >
      <div slot="header" class="clearfix">
        <span>项目概况</span>
      </div>
      <div>
        <el-row :gutter="32">
          <el-col :xs="24" :sm="24" :lg="12">
            <div class="item_container" @click="gosclx">
              <div class="item_text_container">
                <div style="" class="item_text">项目总数</div>
                <div style="color: #fa9d2a;" class="item_num" >{{projectInfo.myProjectNum}}(个)</div>
              </div>
              <el-image :src="projectNumImage" fit="fill"
                        style=""/>
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :lg="12">
            <div class="item_container">
              <div class="item_text_container" @click="gosclx">
                <div style="" class="item_text">总合同额</div>
                <div style="color: rgb(72 146 254);" class="item_num">{{projectInfo.hetongNum}}(万元)</div>
              </div>
              <el-image :src="hetongNumImage" fit="fill"
                        style=""/>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="32">
          <el-col :xs="24" :sm="24" :lg="12">
            <div class="item_container">
              <div class="item_text_container" @click="gokpsq">
                <div style="" class="item_text">开票金额</div>
                <div style="color: rgb(71 207 245);" class="item_num">{{projectInfo.invoiceNum}}(万元)</div>
              </div>
              <el-image :src="invoiceNumImage" fit="fill"
                        style=""/>
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :lg="12">
            <div class="item_container">
              <div class="item_text_container" >
                <div style="" class="item_text">回笼金额</div>
                <div style="color: rgb(75 216 132);" class="item_num">{{projectInfo.moneyBackNum}}(万元)</div>
              </div>
              <el-image :src="moneyBackNumImage" fit="fill"
                        style=""/>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-card>

</template>

<script>
  import { formatDateWithoutTime } from '@/utils'
  import { getReqAction } from '@/utils/global'
  export default {
    // computed:{
    //   myhetong(){
    //     let tempNum = 0;
    //     for (let i = 0; i < this.myProject.rows.length ; i++) {
    //       if(this.myProject.rows[i].projectAmount){
    //         tempNum += Number(this.myProject.rows[i].projectAmount)
    //       }
    //     }
    //     return tempNum
    //   }
    // },
    // props:["myProject"],
    name: 'myProject',
    data() {
      return {

        projectNumImage: require('@/assets/images/projectNum.png'),
        hetongNumImage: require('@/assets/images/hetongNum.png'),
        invoiceNumImage: require('@/assets/images/invoiceNum.png'),
        moneyBackNumImage: require('@/assets/images/moneyBackNum.png'),
        projectInfo: {},
      }
    },
    created() {
      this.getList()
    },
    methods: {
      //跳转资金回笼
      gozjhl(){
        this.$router.push({
          path: '/project/moneyBack/backProgress',
        })
      },
      //跳转开票申请
      gokpsq(){
        this.$router.push({
          path: '/project/moneyBack/invoiceApply',
        })
      },
      //跳转生产立项
      gosclx(){
        this.$router.push({
          path: '/project/productionProject/index',
        })
      },
      getList() {
        getReqAction('/IndexController/getProjectInfo').then((res) => {
          console.log(res)
          this.projectInfo = res;
        })
      },
    }
  }

</script>
<style scoped >

  .item_num{
    font-size: 17px;
    font-weight: 600;
  }
  .el-image{
    float: right;
    width: 70px;
    height: 70px;
    margin-top: 10px;
  }
  .item_text{
    height: 45px;
    line-height: 45px;
    font-size: 19px;
    font-weight: 600;
    color: #979797;
  }
  .item_text_container{
    display: inline-block;
    width: calc( 100% - 65px );
    text-align: center
  }
  .item_container{
    height: 110px;
    box-shadow: 1px 1px 5px #ccc;
    padding: 10px 20px 10px 0;
    border-radius: 3px;
  }
  .item_container:hover{
    cursor: pointer;
  }
  .el-image{
    width: 65px;
    height: auto;
  }
  .el-row{
    text-align: center;
  }
  .el-col{
    padding: 20px 32px;
  }

</style>
<style scoped>
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
    /*margin-bottom: 20px;*/
    height: 360px;
  }
  .el-card__body{
    height: calc(100% - 60px);
    overflow-y: scroll;
  }
</style>
