<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from "echarts";
require("echarts/theme/macarons"); // echarts theme
import resize from "../dashboard/mixins/resize";

const animationDuration = 3000;

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
      default: "300px"
    },
    cardData: {
      type: Object,
      default: () => ({
    
      })
    }
  },
  data() {
    return {
      chart: null
    };
  },
  watch: {
    cardData(val) {
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
        tooltip: {
          // trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            // type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        radar: {
          // shape: 'circle',
          indicator: [
            { name: "跟踪立项数/个", max: 100 },
            { name: "立项转化数/个", max: 100 },
            { name: "ROI指数", max: 100 },
            { name: "立项额转化率/%", max: 100 },
            { name: "立项金额/万元", max: 1500 }
          ]
        },
        series: [
          {
            name: "能力模型",
            type: "radar",
            data: [
              {
                value: [this.cardData.trackProjectNum, this.cardData.trackProjectTransNum, this.cardData.roi, this.cardData.trackProjectTransMoneyPer, this.cardData.trackProjectTransMoney]
                // name: "Allocated Budget"
              }
            ],
            color: '#1890FF',
            areaStyle: {
              normal: {
                opacity: 0.1 //背景透明
              }
            }
          }
        ]
      });
    }
  }
};
</script>
