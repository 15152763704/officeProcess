<template>
  <div class="app-container">
    <div class="row-container">
      <el-row align="center">
        <!-- <el-col :span="1">
          <img src="../../../assets/logo/logo.png" alt="" style="width: 70px; height: 70px; border-radius: 35px;">
        </el-col> -->
        <el-col :span="24" style="display: flex; align-items:center; border-bottom: 1px solid #E6ECF4; padding-bottom: 18px;">
          <img class="marketer-photo" src="../../../assets/logo/logo.png" alt="" style="">
          <el-form :model="queryForm" ref="queryForm" :inline="true" label-width="" size="mini">
            <el-form-item label="营销人员:" style=" margin-bottom: 0;">
              <!-- <el-select :disabled="userSelect" v-model="queryForm.userId" placeholder="请选择营销人员" @change="marketerChange">
                <el-option
                  v-for="item in marketerOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select> -->
              <el-cascader
                :disabled="userSelect"
                v-model="marketerValue"
                :options="marketerOptions"
                :show-all-levels="false"
                @change="marketerChange">
              </el-cascader>
            </el-form-item>
            <!-- <span class="belongtoDpart" style="">({{ deptName }})</span> -->
            <el-form-item label="时间:" style="margin-left: 38px; margin-bottom: 0;">
              <el-date-picker format="yyyy 年 MM 月" value-format="yyyy-MM" type="month" placeholder="选择日期" v-model="queryForm.month" style="" @change="datePicker"></el-date-picker>
            </el-form-item>
            <el-form-item label="" style="margin-left: 8px; margin-bottom: 0;">
              <el-radio-group v-model="queryForm.type" @input="radioInput">
                <el-radio :label="'single'" style="margin-right: 8px;">单月</el-radio>
                <el-radio :label="'total'">累计</el-radio>
              </el-radio-group>
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
      <el-row :gutter="20">
        <el-col :span="8" class="">
          <div class="title11 center">
            能力模型
          </div>
          <raddarChart :cardData="cardData"/>
        </el-col>
        <el-col :span="8" class="">
          <div class="title11 center">
            年度指标完成度
          </div>
          <div class="yearGoalPercent">
              <el-progress type="circle" :percentage="Number(cardData.promotionTargetPer)" :width="220" :stroke-width="25" :text-color="'#9013FE'" color="#9013FE" :show-text="true">
                <!-- <div class="textCenter">
                  <div>25%</div>
                </div> -->
              </el-progress>
              <div class="intro">
                <span>{{ cardData.trackProjectTransMoney }}万元/</span><span>{{ cardData.promotionTarget }}万元</span>
              </div>
            </div>
        </el-col>
        <el-col :span="8" class="" style="height: 320px;">
          <div class="title11 center">
            ROI指数
          </div>
          <gaugeChart style="margin-top: 70px;" :ROI="cardData.roi"/>
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
          label="项目名称"
          align="center"
          :show-overflow-tooltip="true"
          >
          <template slot-scope="scope">
            <!-- <i class="el-icon-time"></i> -->
            <span style="color: #479BFC;">{{ scope.row.productionProjectName }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="productionProjectNo"
          label="项目编号"
          align="center"
          >
        </el-table-column>
        <el-table-column
          prop="productionProjectTime"
          label="时间"
          align="center"
          >
        </el-table-column>
        <el-table-column
          prop="promotionMoney"
          label="跟踪金额（万元）"
          align="center"
          >
        </el-table-column>
        <el-table-column
          label="立项名称"
          align="center"
          :show-overflow-tooltip="true"
          >
          <template slot-scope="scope">
            <!-- <i class="el-icon-time"></i> -->
            <span :style="scope.row.trackProjectName=='未转化'?'': 'color: #479BFC;'">{{ scope.row.trackProjectName }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="trackProjectNo"
          label="立项编号"
          align="center"
          >
        </el-table-column>
        <el-table-column
          prop="trackProjectTime"
          label="时间"
          align="center"
          >
        </el-table-column>
        <el-table-column
          prop="trackProjectMoney"
          label="立项金额（万元）"
          align="center"
          >
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
// import { listUser, getUser, delUser, addUser, updateUser, exportUser, resetUserPwd, changeUserStatus, importTemplate } from "@/api/system/user";
import { getCardData, getSingleTableData, getDeptUserDict } from "@/api/portrait/portrait";
// import { getToken } from "@/utils/auth";
// import { treeselect } from "@/api/system/dept";
// import Treeselect from "@riophae/vue-treeselect";
// import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import gaugeChart from '../GaugeChart'
import raddarChart from '../RaddarChart'

export default {
  name: "departmentStatic",
  components: { gaugeChart, raddarChart },
  data() {
    return {
      roleCode: null,
      // deptName: this.$store.getters.user.dept.deptName,
      deptId: this.$store.getters.user.deptId,
      queryForm: {
        userId: null,
        month: new Date().getFullYear() + '-' + ((new Date().getMonth() + 1)>9?(new Date().getMonth() + 1): '0' + (new Date().getMonth() + 1)),
        type: "single",
        deptId: null
      },
      userSelect: false,
      marketerOptions: [],
      marketerValue: [],    // ['116', '308']
      cardData: {},
      tableData: []
    };
  },
  watch: {
    // 根据名称筛选部门树
    // deptName(val) {
    //   this.$refs.tree.filter(val);
    // }
  },
  computed: {
    // marketerValue() {
    //   let arr = [];
    //   arr[0] = this.$store.getters.user.deptId + '';
    //   arr[1] = this.$store.getters.user.userId + '';
    //   console.log(arr);
    //   return arr;
    // },
  }, 
  created() {
    // 营销人员-个人 promotion_user_single
    // 营销人员-部门 promotion_user_dept
    // 营销人员-全部 promotion_user_all
    let roles = this.$store.getters.roles;
    // console.log(this.$store.getters.roles);
    if(roles.includes('promotion_user_all')) {
      this.roleCode = 0;
      this.deptId = null;
      this.getDeptUserDict();
      return;
    }
    if(roles.includes('promotion_user_dept')) {
      this.roleCode = 1;
      this.getDeptUserDict();
      return;
    }
    if(roles.includes('promotion_user_single')) {
      this.roleCode = 2;
      this.userSelect = true;
      this.getDeptUserDict();
      return;
    }
  },
  methods: {
    getDeptUserDict() {
      getDeptUserDict({ deptId: this.deptId }).then(res => {
        // console.log(res);
        this.marketerOptions = res;
        this.queryForm.userId = res[0].children[0].value;
        this.marketerValue[0] = res[0].value;
        this.marketerValue[1] = res[0].children[0].value;
        this.getCardData();
        this.getSingleTableData();
      })
    },
    datePicker() {
      // console.log(this.queryForm.month);
      this.getCardData();
      this.getSingleTableData();
    },
    radioInput() {
      // console.log(this.queryForm.type);
      this.getCardData();
      this.getSingleTableData();
    },
    marketerChange(item) {
      // console.log(this.queryForm.userId);
      console.log('item', item);
      this.queryForm.userId = item[1];
      this.getCardData();
      this.getSingleTableData();
    },
    // 查询卡片数据
    getCardData() {
      getCardData(this.queryForm).then(res => {
        // console.log(res.data);
        this.cardData = res.data;
      })
    },
    getSingleTableData() {
      getSingleTableData(this.queryForm).then(res => {
        // console.log(res.data);
        this.tableData = res.rows;
      })
    }
  }
};
</script>
<style scoped lang="scss">
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
  .marketer-photo {
    width: 70px;
    height: 70px;
    border-radius: 35px;
    margin-right: 18px;
  }
  .belongtoDpart {
    color: rgba(123, 123, 123, 0.71);
    font-size: 16px;
    position: relative;
    top: 2px;
  }
  .card-col {
    // background: #a3d3fe;
    display: flex;
    justify-content: space-between;
    margin-top: 12px;
    &:first-child {
      margin-top: 47px;
    }
    .card {
      &:first-child {
        background: #08968f;
      }
      &:nth-child(2) {
        background: #4b3d71;
      }
      &:nth-child(3) {
        background: #585858;
      }
      &:nth-child(4) {
        background: #3d4d71;
      }
      &:last-child {
        background: #136c8d;
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
          color: #fff5aa;
          font-size: 40px;
          font-weight: 500;
          text-shadow: 0px 3px 6px rgba(0, 0, 0, 0.4157);
        }
        .tit {
          font-size: 20px;
          font-weight: 600;
          color: #ffffff;
          letter-spacing: 1px;
        }
      }
      .right {
        width: 40%;
        text-align: center;
        border-left: 3px solid rgb(255, 255, 255, 0.5);
        > div:first-child {
          margin-bottom: 9px;
        }
        .tit {
          font-size: 16px;
          font-weight: 400;
          color: #ffffff;
          margin-bottom: 8px;
        }
        .num {
          font-size: 18px;
          font-weight: 500;
          color: #ffe399;
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
  .center {
    text-align: center;
  }
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
</style>
