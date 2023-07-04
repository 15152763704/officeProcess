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
      default: "100%"
    },
    ROI: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      chart: null
    };
  },
  watch: {
    ROI(val) {
      this.initChart();
    }
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

      this.chart.setOption({
        // tooltip: {
        //   formatter: "{a} <br/>{b} : {c}%"
        // },
        // grid: {
        //   top: 10,
        //   left: "2%",
        //   right: "2%",
        //   bottom: "3%",
        //   containLabel: true
        // },
        series: [
          {
            type: "gauge",
            radius: "100%",
            startAngle: 180,
            endAngle: 0,
            min: 0,
            max: 120,
            splitNumber: 0,
            itemStyle: {
                // color: '#1AA7E8',
                // shadowColor: 'rgba(0,0,0,0.45)',
                // shadowBlur: 4,
                // shadowOffsetX: 1,
                // shadowOffsetY: 1
            },
            progress: {
              show: true,
              roundCap: true,
              width: 18
            },
            pointer: {
              icon: "path://M2090.36389,615.30999 L2090.36389,615.30999 C2091.48372,615.30999 2092.40383,616.194028 2092.44859,617.312956 L2096.90698,728.755929 C2097.05155,732.369577 2094.2393,735.416212 2090.62566,735.56078 C2090.53845,735.564269 2090.45117,735.566014 2090.36389,735.566014 L2090.36389,735.566014 C2086.74736,735.566014 2083.81557,732.63423 2083.81557,729.017692 C2083.81557,728.930412 2083.81732,728.84314 2083.82081,728.755929 L2088.2792,617.312956 C2088.32396,616.194028 2089.24407,615.30999 2090.36389,615.30999 Z",
              length: "70%",
              width: 10,
              offsetCenter: [0, 0]
            },
            axisLine: {
              roundCap: true,
              lineStyle: {
                width: 18, // 仪表盘粗细
                color: [
                  [5/12, '#fd666d'],
                  [5/6, '#37a2da'],
                  [1, '#67C23A']
                ]
              }
            },
            axisTick: {
              // splitNumber: 2,
              // lineStyle: {
              //   width: 2,
              //   // color: "#999"
              // }

              distance: -30,
              length: 8,
              lineStyle: {
                color: '#fff',
                width: 2
              },
              color: '#ffffff'
            },
            splitLine: {
              // length: 12,
              // lineStyle: {
              //   width: 3,
              //   // color: "#999"
              // }

              distance: -30,
              length: 30,
              lineStyle: {
                color: '#fff',
                width: 4
              }
            },
            axisLabel: {
              show: false,
              // distance: 30,
              // color: "#999",
              color: 'inherit',
              // fontSize: 20
            },
            title: {
              show: false
            },
            detail: {
            //   backgroundColor: "#1AA7E8",
            //   borderColor: "#1AA7E8",
            //   borderWidth: 2,
              //   width: "60%",
            //   color: '#ffffff',
              lineHeight: 46,
              height: 40,
              borderRadius: 25,
              offsetCenter: [0, "40%"],
              valueAnimation: true,
              formatter: function(value) {
                return '{unit|ROI：}{value|' + value + '}';
              },
              rich: {
                value: {
                  fontSize: 30,
                  fontWeight: 500
                  // color: "#777"
                },
                unit: {
                  fontSize: 30,
                  fontWeight: 600,
                  color: "#999",
                  // padding: [0, 0, -20, 10]
                }
              }
            },
            data: [
              {
                value: this.ROI
              }
            ]
          },
          {
            type: "gauge",
            radius: "100%",
            startAngle: 180,
            endAngle: 30,
            min: 0,
            max: 100,
            splitNumber: 2,
            itemStyle: {
                // color: '#1AA7E8',
                // shadowColor: 'rgba(0,0,0,0.45)',
                // shadowBlur: 4,
                // shadowOffsetX: 1,
                // shadowOffsetY: 1
            },
            progress: {
              show: true,
              roundCap: true,
              width: 18
            },
            pointer: {
              show: false,
              icon: "path://M2090.36389,615.30999 L2090.36389,615.30999 C2091.48372,615.30999 2092.40383,616.194028 2092.44859,617.312956 L2096.90698,728.755929 C2097.05155,732.369577 2094.2393,735.416212 2090.62566,735.56078 C2090.53845,735.564269 2090.45117,735.566014 2090.36389,735.566014 L2090.36389,735.566014 C2086.74736,735.566014 2083.81557,732.63423 2083.81557,729.017692 C2083.81557,728.930412 2083.81732,728.84314 2083.82081,728.755929 L2088.2792,617.312956 C2088.32396,616.194028 2089.24407,615.30999 2090.36389,615.30999 Z",
              length: "70%",
              width: 10,
              offsetCenter: [0, 0]
            },
            axisLine: {
              roundCap: true,
              lineStyle: {
                width: 18, // 仪表盘粗细
                color: [
                  [0.5, '#fd666d'],
                  [1, '#37a2da']
                ]
              }
            },
            axisTick: {
              // splitNumber: 2,
              // lineStyle: {
              //   width: 2,
              //   // color: "#999"
              // }
              
              distance: -30,
              length: 6,
              lineStyle: {
                color: '#fff',
                width: 2
              },
              color: '#ffffff'
            },
            splitLine: {
              // length: 12,
              // lineStyle: {
              //   width: 3,
              //   // color: "#999"
              // }
              
              distance: -30,
              length: 30,
              lineStyle: {
                color: '#fff',
                width: 4
              }
            },
            axisLabel: {
              // show: false,
              // color: 'inherit',
              // distance: 30,
              fontSize: 20
            },
            title: {
              show: false
            },
            detail: {
              show: false,
            //   backgroundColor: "#1AA7E8",
            //   borderColor: "#1AA7E8",
            //   borderWidth: 2,
              //   width: "60%",
            //   color: '#ffffff',
              lineHeight: 46,
              height: 40,
              borderRadius: 25,
              offsetCenter: [0, "40%"],
              valueAnimation: true,
              formatter: function(value) {
                // return '{unit|ROI：}{value|' + value.toFixed(0) + '}';
                return value.toFixed(0);
              },
              rich: {
                value: {
                  fontSize: 40,
                  fontWeight: 500
                  // color: "#777"
                },
                unit: {
                  fontSize: 30,
                  fontWeight: 600,
                  color: "#999",
                  // padding: [0, 0, -20, 10]
                }
              }
            },
            data: [
              {
                // value: 120
              }
            ]
          }
        ]
      });
    }
  }
};
</script>
