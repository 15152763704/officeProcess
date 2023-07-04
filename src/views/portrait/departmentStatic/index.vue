<template>
  <div class="app-container" style="background: #E6ECF4;">
    <div class="row-container">
      <el-row>
        <el-col :span="20" :xs="24">
          <el-form :model="queryForm" ref="queryForm" :inline="true" label-width="" size="mini">
            <el-form-item label="时间:" style="margin-right: 20px;">
              <el-date-picker format="yyyy 年 MM 月" value-format="yyyy-MM" type="month" placeholder="选择日期" v-model="queryForm.month" style="" @change="datePicker"></el-date-picker>
            </el-form-item>
            <el-form-item label="" style="margin-right: 58px;">
              <el-radio-group v-model="queryForm.type" @input="radioInput">
                <el-radio :label="'single'" style="margin-right: 8px;">单月</el-radio>
                <el-radio :label="'total'">累计</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="部门:">
              <el-select :disabled="deptSelect" v-model="queryForm.deptId" placeholder="请选择部门" @change="dpartChange">
                <el-option
                  v-for="item in dpartOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24" class="card-col">
          <el-col class="card">
            <div class="left">
              <div class="num">{{ cardData.trackProjectTransPer }}%</div>
              <div class="tit">转化率</div>
            </div>
            <div class="right">
              <div>
                <div class="tit">跟踪立项数</div>
                <div class="num">{{ cardData.trackProjectNum }}个</div>
              </div>
              <div>
                <div class="tit">立项转化数</div>
                <div class="num">{{ cardData.trackProjectTransNum }}个</div>
              </div>
            </div>
          </el-col>
          <el-col class="card">
            <div class="left">
              <div class="num">{{ cardData.trackProjectTransMoneyPer }}%</div>
              <div class="tit">转化率</div>
            </div>
            <div class="right">
              <div>
                <div class="tit">跟踪立项金额</div>
                <div class="num">{{ cardData.trackProjectMoney }}万元</div>
              </div>
              <div>
                <div class="tit">立项转化金额</div>
                <div class="num">{{ cardData.trackProjectTransMoney }}万元</div>
              </div>
            </div>
          </el-col>
          <el-col class="card">
            <div class="left">
              <div class="num">{{ cardData.roi }}</div>
              <div class="tit">投入回报率</div>
            </div>
            <div class="right">
              <div>
                <div class="tit">营销费用消耗</div>
                <div class="num">{{ cardData.promotionMoney }}万元</div>
              </div>
              <div>
                <div class="tit">立项转化金额</div>
                <div class="num">{{ cardData.trackProjectTransMoney }}万元</div>
              </div>
            </div>
          </el-col>
          <el-col class="card">
           <div class="left">
              <div class="num">{{ cardData.promotionPer }}%</div>
              <div class="tit">消耗进度</div>
            </div>
            <div class="right">
              <div>
                <div class="tit">营销费用预算</div>
                <div class="num">{{ cardData.promotionLimit }}万元</div>
              </div>
              <div>
                <div class="tit">营销费用消耗</div>
                <div class="num">{{ cardData.promotionMoney }}万元</div>
              </div>
            </div>
          </el-col>
          <el-col class="card">
            <div class="left">
              <div class="num">{{ cardData.promotionTargetPer }}%</div>
              <div class="tit">完成指标率</div>
            </div>
            <div class="right">
              <div>
                <div class="tit">年销售指标</div>
                <div class="num">{{ cardData.promotionTarget }}万元</div>
              </div>
              <div>
                <div class="tit">立项转化金额</div>
                <div class="num">{{ cardData.trackProjectTransMoney }}万元</div>
              </div>
            </div>
          </el-col>
        </el-col>
      </el-row>
    </div>
    <div class="row-container">
      <div class="title11">
        营销人员分析
      </div>
      <el-table
        :data="tableData"
        stripe
        style="width: 100%">
        <el-table-column
          label="营销员"
          align="center"
          >
          <template slot-scope="scope">
            <!-- <i class="el-icon-time"></i> -->
            <span style="color: #479BFC;">{{ scope.row.trackUserName }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="trackProjectNum"
          label="跟踪项目数"
          align="center"
          >
        </el-table-column>
        <el-table-column
          prop="trackProjectMoney"
          label="跟踪金额（万元）"
          align="center"
          >
        </el-table-column>
        <el-table-column
          prop="productionProjectNum"
          label="立项数"
          align="center"
          >
        </el-table-column>
        <el-table-column
          prop="productionProjectMoney"
          label="立项金额（万元）"
          align="center"
          >
        </el-table-column>
        <el-table-column
          prop="promotionMoney"
          label="营销费用（万元）"
          align="center"
          >
        </el-table-column>
        <el-table-column
          prop="promotionTarget"
          label="年指标（万元）"
          align="center"
          >
        </el-table-column>
        <el-table-column
          prop="promotionTargetPer"
          label="指标完成度"
          align="center"
          >
        </el-table-column>
        <el-table-column
          prop="roi"
          label="ROI"
          align="center"
          >
        </el-table-column>
      </el-table>
    </div>
    <div class="row-container">
      <el-row :gutter="20">
        <el-col :span="12" class="">
          <div class="title11">
            数据转化分析
          </div>
          <lineChart :lcData="lcData"/>
        </el-col>
        <el-col :span="12" class="">
          <div class="title11">
            数据转化分析
          </div>
          <barChart :bcData="bcData"/>
        </el-col>
      </el-row>
    </div>
    <div class="row-container noStyle">
      <el-row :gutter="20">
        <el-col :span="12" :xs="24">
          <div class="last-col">
            <div class="title11">
              年度目标完成度
            </div>
            <div class="yearGoalPercent">
              <el-progress type="circle" :percentage="cardData.promotionTargetPer" :width="250" :stroke-width="30" :text-color="'#9013FE'" color="#9013FE" :show-text="true">
                <!-- <div class="textCenter">
                  <div>25%</div>
                </div> -->
              </el-progress>
              <div class="intro">
                <span>{{ cardData.trackProjectTransMoney }}万元/</span><span>{{ cardData.promotionTarget }}万元</span>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="12" :xs="24">
          <div class="last-col">
            <div class="title11">
              营销费用投入回报率指数（ROI）
            </div>
            <gaugeChart :ROI="cardData.roi"/>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
// import { listUser, getUser, delUser, addUser, updateUser, exportUser, resetUserPwd, changeUserStatus, importTemplate } from "@/api/system/user";
import { getCardData, getDeptTableData, getPromotionDeptDict, getLineEchartsData, getBarEchartsData } from "@/api/portrait/portrait";
import { listDept } from '@/api/system/dept'
// import { getToken } from "@/utils/auth";
// import { treeselect } from "@/api/system/dept";
// import Treeselect from "@riophae/vue-treeselect";
// import "@riophae/vue-treeselect/dist/vue-treeselect.css";
// import barChart from '../../dashboard/Weather'
import barChart from '../BarChart'
import lineChart from '../LineChart'
import gaugeChart from '../GaugeChart'
export default {
  name: "personalStatic",
  components: { barChart, lineChart, gaugeChart },
  data() {
    return {
      deptId: this.$store.getters.user.deptId,
      currentUser: this.$store.getters.user,
      queryForm: {
        userId: null,
        month: new Date().getFullYear() + '-' + ((new Date().getMonth() + 1)>9?(new Date().getMonth() + 1): '0' + (new Date().getMonth() + 1)),
        type: "single",
        // deptId: this.$store.getters.user.deptId
        deptId: null
      },
      deptSelect: false,
      dpartOptions: [],
      cardData: {},
      tableData: [],
      bcData: {},
      lcData: {}
    };
  },
  watch: {
    // 根据名称筛选部门树
    // deptName(val) {
    //   this.$refs.tree.filter(val);
    // }
  },
  computed: {
    // yearGoalPercent() {
    //   return this.cardData.trackProjectTransMoney/this.cardData.promotionTarget;
    // },
  }, 
  created() {
    this.getPromotionDeptDict();
    // console.log(this.currentUser);
  },
  methods: {
    datePicker() {
      // console.log(this.queryForm.month);
      this.getCardData();
      this.getDeptTableData();
      this.getBarEchartsData();
      this.getLineEchartsData();
    },
    radioInput() {
      // console.log(this.queryForm.type);
      this.getCardData();
      this.getDeptTableData();
      this.getBarEchartsData();
      this.getLineEchartsData();
    },
    dpartChange() {
      // console.log(this.queryForm.deptId);
      this.getCardData();
      this.getDeptTableData();
      this.getBarEchartsData();
      this.getLineEchartsData();
    },
    getPromotionDeptDict() {
      let roles = this.$store.getters.roles;
      if(roles.includes('promotion_user_all')) {
        this.deptId = null;
      } else {
        this.deptId = this.$store.getters.user.deptId;
      }
      getPromotionDeptDict({ deptId: this.deptId }).then((response) => {
        // console.log('getDeptList', response.data)
        this.dpartOptions = response;
        this.queryForm.deptId = response[0].value;
        this.getCardData();
        this.getDeptTableData();
        this.getBarEchartsData();
        this.getLineEchartsData();
      })
    },
    // 查询卡片数据
    getCardData() {
      // let queryForm = {
      //   // userId: 308, // 人员
      //   deptId: 116, // 部门
      //   month: '2022-05', // 时间
      //   type: 'single' // 统计类型（单月：single，累计：total）
      // }
      getCardData(this.queryForm).then(res => {
        // console.log(res.data);
        this.cardData = res.data;
      })
    },
    getDeptTableData() {
      getDeptTableData(this.queryForm).then(res => {
        // console.log(res.data);
        this.tableData = res.rows;
      })
    },
    getBarEchartsData() {
      getBarEchartsData(this.queryForm).then(res => {
        // console.log(res);
        this.bcData = res.data;
      })
    },
    getLineEchartsData() {
      getLineEchartsData(this.queryForm).then(res => {
        // console.log(res);
        this.lcData = res.data;
      })
    }
    /** 查询用户列表 */
    // getList() {
    //   this.loading = true;
    //   listUser(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
    //       this.userList = response.rows;
    //       this.total = response.total;
    //       this.loading = false;
    //     }
    //   );
    // },
  }
};
</script>
<style scoped lang="scss">
.noStyle {
  background: #E6ECF4!important;
  box-shadow: none!important;
  padding: 0!important;
  .last-col {
    background: #ffffff;
    height: 480px;
    border-radius: 32px;
    box-shadow: 0px 0px 8px 1px #a3d3fe;
    padding: 42px 21px 55px;
    box-sizing: border-box;
    .yearGoalPercent {
      // text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .intro {
        margin-top: 30px;
        span {
          font-size: 20px;
          font-weight: 500;
          color: #304156;
          &:last-child {
            color: #989898;
          }
        }
      }
    }
  }
}
.row-container {
  // min-height: 150px;
  background: #ffffff;
  border-radius: 32px;
  box-shadow: 0px 0px 8px 1px #a3d3fe;
  margin-bottom: 24px;
  padding: 42px 21px 55px;
  box-sizing: border-box;
  &:last-child {
    margin-bottom: 0;
  }
  .card-col {
    // background: #a3d3fe;
    display: flex;
    justify-content: space-between;
    margin-top: 12px;
    .card {
      &:first-child {
        background: #08968F;
      }
      &:nth-child(2) {
        background: #4B3D71;
      }
      &:nth-child(3) {
        background: #585858;
      }
      &:nth-child(4) {
        background: #3D4D71;
      }
      &:last-child {
        background: #136C8D;
      }
      // min-width: 315px;
      width: 19%;
      height: 155px;
      border-radius: 19px 19px 19px 19px;
      // background: #a3d3fe;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .left {
        width: 60%;
        
        text-align: center;
        .num {
          color: #FFF5AA;
          font-size: 40px;
          font-weight: 500;
          text-shadow: 0px 3px 6px rgba(0,0,0,0.4157);
        }
        .tit {
          font-size: 20px;
          font-weight: 600;
          color: #FFFFFF;
          letter-spacing: 1px;
        }
      }
      .right{
        width: 40%;
        text-align: center;
        border-left: 3px solid rgb(255, 255, 255, 0.5);
        >div:first-child {
          margin-bottom: 9px;
        }
        .tit {
          font-size: 16px;
          font-weight: 400;
          color: #FFFFFF;
          margin-bottom: 8px;
        }
        .num {
          font-size: 18px;
          font-weight: 500;
          color: #FFE399;
        }
      }
    }
  }
  .title11 {
    font-size: 22px;
    // font-family: 'Microsoft YaHei';
    font-weight: 500;
    color: #304156;
    margin-bottom: 40px;
  }
}
</style>
