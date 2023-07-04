<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from "echarts";
require("echarts/theme/macarons"); // echarts theme
import resize from "../dashboard/mixins/resize";

const animationDuration = 6000;

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: "chart"
    },
    width: {
      type: String,
      default: "100%"
    },
    height: {
      type: String,
      default: "350px"
    },
    bcData: {
      type: Object,
      required: true
    }
  },
  watch: {
    bcData: {
      deep: true,
      handler(val) {
        this.setOptions(val)
      }
    }
  },
  data() {
    return {
      chart: null,
      // 数据转化分析 折线图
      // chartData: {
      //   xAxis: ["1月", "2月", "3月", "4月", "5月", "6月", "7月"],
      //   yAxis: [
      //     {
      //       name: '跟踪数',
      //       data: [79, 52, 200, 334, 360, 330, 220]
      //     },
      //     {
      //       name: '立项额',
      //       data: [79, 52, 200, 334, 360, 330, 220]
      //     }
      //   ]
      // },
      // 数据转化分析 柱状图
      // chartData: {
      //   xAxis: ["1月", "2月", "3月", "4月", "5月", "6月", "7月"],
      //   yAxis: [
      //     {
      //       name: '立项数',
      //       data: [79, 52, 200, 334, 360, 330, 220]
      //     },
      //     {
      //       name: '立项额',
      //       data: [79, 52, 200, 334, 360, 330, 220]
      //     }
      //   ]
      // },
      // 能力模型
      // chartData: {
      //   indicator: [
      //     { name: "跟踪立项数", max: 6500 },
      //     { name: "立项转化数", max: 16000 },
      //     { name: "ROI指数", max: 30000 },
      //     { name: "立项额转化率%", max: 38000 },
      //     { name: "立项金额", max: 52000 }
      //   ],
      //   value: [4200, 3000, 20000, 35000, 50000, 18000]
      // }
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart();
    });
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, "macarons");
      // this.setOptions(this.bcData)
      this.setOptions();
    },
    setOptions() {
      this.chart.setOption({
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: 10,
          right: 10,
          bottom: 20,
          top: 30,
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: this.bcData.x,
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            axisTick: {
              show: false
            }
          }
        ],
        legend: {
          data: ["跟踪数", "立项数", "营销费用"]
        },
        series: [
          {
            name: '跟踪数',
            type: "bar",
            // stack: 'vistors',
            // barWidth: '60%',
            barWidth: 12,
            data: this.bcData.y[0].data,
            animationDuration,
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "rgba(90, 141, 255, 1)"
                  },
                  {
                    offset: 1,
                    color: "rgba(131, 46, 177, 1)"
                  }
                ]),
                barBorderRadius: [10, 10, 0, 0]
              }
            }
          },
          {
            name: "立项数",
            type: "bar",
            // stack: 'vistors',
            // barWidth: '60%',
            barWidth: 12,
            data: this.bcData.y[1].data,
            animationDuration,
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "rgba(255, 198, 90, 1)"
                  },
                  {
                    offset: 1,
                    color: "rgba(255, 148, 116, 1)"
                  }
                ]),
                barBorderRadius: [10, 10, 0, 0]
              },
            }
          },
          {
            name: "营销费用",
            type: "bar",
            // stack: 'vistors',
            // barWidth: '60%',
            barWidth: 12,
            data: this.bcData.y[2].data,
            animationDuration,
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "rgba(113, 255, 233, 1)"
                  },
                  {
                    offset: 1,
                    color: "rgba(116, 159, 255, 1)"
                  }
                ]),
                barBorderRadius: [10, 10, 0, 0]
              }
            }
          }
        ]
      });
    }
  }
};
</script>
