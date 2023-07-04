<template>
  <el-card class="box-card monthly_eco_target_chart" shadow="never">
    <div slot="header" class="clearfix" style="display: flex;justify-content: space-between;align-items: center;">
      <span>经济目标</span>
      <span style="float: right;bottom: 2px;width: 40%;" v-if="isShowDeptOption">
        <el-select
         v-model="chartParam.deptId"
          placeholder="请选择"
          size="mini"
          @change="initChart">
         <el-option
           v-for="dict in deptOptions"
            :key="dict.id"
            :label="dict.label"
            :value="dict.id"
          />
        </el-select>
      </span>
      <span style="float: right;vertical-align: middle;width: 40%;">
        <el-select
          v-model="chartParam.chartType"
          placeholder="请选择"
          size="mini"
          @change="initChart">
         <el-option
           v-for="dict in targetOptions"
           :key="dict.dictLabel"
           :label="dict.dictValue"
           :value="dict.dictLabel"
         />
        </el-select>
      </span>
    </div>
    <div id="monthlyEcoTargetBarChart"></div>
  </el-card>
</template>

<script>
import * as echarts from 'echarts'

export default {
  name: 'MonthlyEcoTargetBarChart',
  data() {
    return {
      deptOptions: [],
      targetOptions: [],
      chartParam: {
        months: [],
        deptId: 115,
        chartType: '1'
      },
        isShowDeptOption: false,
      }
    },
    mounted() {
      this.initChart()
    },
    methods: {
      initChart() {
        this.chartParam.months = []

        let chartDom = document.getElementById('monthlyEcoTargetBarChart')
        let myChart = echarts.init(chartDom)
        let nowDate = new Date()
        let month = nowDate.getMonth() + 1
        for (let i = 1; i <= 12; i++) {
          this.chartParam.months.push(i)
        }
        let currentUser = this.$store.getters.user
        let currentUserRoles = this.$store.getters.roles
        for (let i = 0; i < currentUserRoles.length; i++) {
          if (currentUserRoles[i] == 'general_manager'
            || currentUserRoles[i] == 'admin'
            || currentUserRoles[i] == 'user_admin') {
            this.isShowDeptOption = true
            break
          } else {
            this.chartParam.deptId = currentUser.deptId
            this.isShowDeptOption = false
          }
        }
        this.postReqAction('/indexMonthlyEcoTargetBarChart/getChartData', this.chartParam).then((res) => {
          let source = res.data
          let option = {
            color: ['#c23531','#1296db'],
            legend: {},
            tooltip: {},
            dataset: {
              dimensions: ['month', '经济指标', '已完成指标'],
              source: source
            },
            xAxis: { type: 'category', name: '月份' },
            yAxis: { name: '金额（万元）' },
            dataZoom: [
              {
                type: 'inside',
                xAxisIndex: [0],
                start: 1,
                end: 100
              }
            ],
            series: [{ type: 'bar' }, { type: 'bar' }]
          }
          myChart.setOption(option)
        })
      }
    },
    watch: {},
    created() {
      this.getReqAction('/system/dept/treeselect').then((res) => {
        this.deptOptions = res.data[0].children
      })
      this.getDicts('eco_target_type').then(response => {
        this.targetOptions = response.data
      })
    }
  }
</script>

<style scoped>
  #monthlyEcoTargetBarChart {
    width: 100%;
    height: 300px;
  }

</style>
<style>
  .monthly_eco_target_chart .el-card__header{
    padding-top: 7px !important;
  }
  .monthly_eco_target_chart .el-card__body {
    padding-bottom: 0px !important;
  }
</style>
