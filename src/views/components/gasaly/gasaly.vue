<!--
       gasaly
       @module /gasaly.vue
       @desc 组件描述
       @author zhanghao
       @date 2022/1/16 19:21
       -->
<template>
  <div id="gasaly">
    <el-button type="primary" size="mini" icon="el-icon-close" circle class="chacha" @click="closedia"></el-button>
    <svg ref="svg" @mousemove="doThing" @touchmove="doThingTouch" width="100%" height="100%"
         xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="100%" height="100%" fill="#0D0D0D" />

      <g v-once v-for="star in 100">
        <circle class="star"
                :cx="StarXY()+`%`"
                :cy="`${StarXY()}%`"
                :r="StarR()"
                :fill="StarColor()"/>
        <circle class="star" :cx="`${StarXY() + 100}%`" :cy="`${StarXY() - 100}%`" :r="StarR()" :fill="StarColor()"/>
        <circle class="star" :cx="`${StarXY()}%`" :cy="`${StarXY() - 100}%`" :r="StarR()" :fill="StarColor()"/>
        <circle class="star" :cx="`${StarXY() + 100}%`" :cy="`${StarXY()}%`" :r="StarR()" :fill="StarColor()"/>
      </g>
<!--      <star v-once v-for="star in 100" />-->
<!--      <dynamic-circle :class="`circle-${index}`" :index="index" :origin="origin" v-for="(circles, index) in 100" />-->
      <shooting-star class="testShootingStar"/>
    </svg>
  </div>
</template>

<script>
import Vue from 'vue'
import './vue.min'

// const colors = ["#0A4247", "#8C2F0D", "#F2A057", "#F2C185", "#8CB7B8"];
// const shootingStarColors = ["#F2C185", "#8CB7B8"];
import shootingStar from './components/shooting-star'
export default {
  components: {
     shootingStar
  },
  props: {},
  data() {
    return {
      colors : ["#0A4247", "#8C2F0D", "#F2A057", "#F2C185", "#8CB7B8"],
      origin: {},
      bounds: {},
      circles: []
    }
  },
  mounted() {
    this.bounds = this.$refs.svg.getBoundingClientRect();
  },
  methods: {
    closedia(){
      this.$emit('closedialog',false)
    },
    StarXY(){
      return Math.floor(Math.random() * 100)
    },
    StarR(){
      return Math.random() * 2 + 0.5
    },
    StarColor(){
      return this.colors[Math.floor(Math.random() * this.colors.length)]
    },
    doThing(e) {
      this.$set(this.origin, "x", e.x - this.bounds.x);
      this.$set(this.origin, "y", e.y - this.bounds.y);
    },
    doThingTouch(e) {
      this.$set(this.origin, "x", e.touches[0].pageX - this.bounds.x);
      this.$set(this.origin, "y", e.touches[0].pageY - this.bounds.y);
    }
  },
  watch: {}
}
</script>

<style lang="scss" scoped>
#gasaly {
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
.star {
  animation: move 20s linear infinite;
}

.shootingStar {
  animation: dash 0.7s ease;
}

@keyframes move {
  from {
    transform: translate(0%, 0%);
  }
  to {
    transform: translate(-100%, 100%);
  }
}

@keyframes dash {
  to {
    stroke-dashoffset: -227.62;
  }
}
  .chacha{
    position: absolute;
    right: 20px;
    top: 20px;
  }
}
</style>
