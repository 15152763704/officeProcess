<template>
  <el-card class="box-card project_money_chart" shadow="never">
    <div slot="header" class="clearfix">
      <span>项目金额统计</span>
    </div>
    <div id="myChart"></div>
  </el-card>
</template>

<script>
  import * as echarts from 'echarts'

  export default {
    name: 'ProjectMoneyBarChart',
    data() {
      return {}
    },
    mounted() {
      this.initChart()
    },
    methods: {
      initChart(){
        let chartDom = document.getElementById('myChart')
        let myChart = echarts.init(chartDom)
        this.initOption(myChart)
      },
      initOption(myChart){
        let nowDate = new Date();
        let month = nowDate.getMonth() + 1
        let months = []
        for(let i=1;i<=month;i++){
          months.push(i)
        }
        let currentUser = this.$store.getters.user
        let currentUserRoles = this.$store.getters.roles
        let deptId = ''
        for(let i=0;i<currentUserRoles.length;i++){
          if(currentUserRoles[i] == 'general_manager'
            || currentUserRoles[i] == 'admin'
            || currentUserRoles[i] == 'user_admin'){
            break
          }else{
            deptId = currentUser.deptId
          }
        }
        this.postReqAction('/indexProjectMoneyBarChart/getChartData',{
          months: months,
          deptId: deptId
        }).then((res) => {
          let source = res.data
          let option = {
            color: ['#c23531','#1296db', '#61a0a8'],
            legend: {},
            tooltip: {},
            dataset: {
              dimensions: ['month', '合同金额', '开票金额', '回笼金额'],
              source: source
            },
            xAxis: { type: 'category', name: '月份' },
            yAxis: { name: '金额（万元）'},
            dataZoom: [
              {
                type: 'inside',
                xAxisIndex: [0],
                start: 1,
                end: 100
              },
            ],
            series: [{ type: 'bar' }, { type: 'bar' }, { type: 'bar' }]
          }
          myChart.setOption(option)
        })
      }
    },
    watch: {},
    created() {

    }
  }
</script>

<style scoped>
  #myChart {
    width: 100%;
    height: 300px;
  }
</style>
<style>
  .project_money_chart .el-card__body {
    padding-bottom: 0px !important;
  }
</style>
