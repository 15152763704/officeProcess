<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from '../dashboard/mixins/resize'

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '350px'
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    lcData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      chart: null
    }
  },
  watch: {
    lcData: {
      deep: true,
      handler(val) {
        this.setOptions(val)
        console.log(555888)
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
      // this.setOptions(this.lcData)
      this.setOptions();
    },
    setOptions({ expectedData, actualData } = {}) {
      this.chart.setOption({
        xAxis: {
          data: this.lcData.x,
          boundaryGap: false,
          axisTick: {
            show: false
          }
        },
        grid: {
          left: 10,
          right: 10,
          bottom: 20,
          top: 30,
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          },
          padding: [5, 10]
        },
        yAxis: {
          axisTick: {
            show: false
          }
        },
        legend: {
          data: ['跟踪数', '立项数']
        },
        series: [{
          name: '跟踪数', itemStyle: {
            normal: {
              color: '#3B3B80',
              lineStyle: {
                color: '#3B3B80',
                width: 2
              },
              areaStyle: {
                color: 'rgba(59, 59, 128, 0.1)'
              }
            }
          },
          smooth: false,
          type: 'line',
          // data: expectedData,
          animationDuration: 2800,
          animationEasing: 'cubicInOut',
          data: this.lcData.y[0].data,
        },
        {
          name: '立项数',
          smooth: false,
          type: 'line',
          itemStyle: {
            normal: {
              color: '#FEBA52',
              lineStyle: {
                color: '#FEBA52',
                width: 2
              },
              areaStyle: {
                color: 'rgba(254, 186, 82, 0.1)'
              }
            }
          },
          // data: actualData,
          data: this.lcData.y[1].data,
          animationDuration: 2800,
          animationEasing: 'quadraticOut'
        }]
      })
    }
  }
}
</script>
