<!--
       shooting-star
       @module /shooting-star.vue
       @desc 组件描述
       @author zhanghao
       @date 2022/1/16 21:32
       -->
<template>
    <g>
      <g class="star" v-if="shoot"><path :style="`transform: translate(${x}%, ${y}%)`" class="shootingStar" :d="`M 0 0 q ${80 + arcOffset} ${80 - arcOffset} 160 160`" :stroke="color" fill="transparent" stroke-dasharray="227.62" stroke-dashoffset="227.62" stroke-width="2" stroke-linecap="round"/></g>
    </g>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      shoot: false,
      x: 50,
      y: 50,
      arcOffset: 0,
      color: "",
      shootingStarColors : ["#F2C185", "#8CB7B8"],
      colors : ["#0A4247", "#8C2F0D", "#F2A057", "#F2C185", "#8CB7B8"],
      timer:null
    }
  },
  methods: {


    shootAStar() {
      if (Math.random() < 0.2) {
        this.x = Math.random() * 100;
        this.y = Math.random() * 100;
        this.arcOffset = Math.random() * 60 - 30;
        this.color =
          this.shootingStarColors[Math.floor(Math.random() * this.colors.length)];
        this.shoot = true;
        setTimeout(() => {
          this.shoot = false;
        }, 600);
      }
    }
  },
  mounted() {
   this.timer= setInterval(this.shootAStar, 700);
  },
  destroyed() {
    this.timer&&clearInterval(this.timer)
  },
  watch: {}
}
</script>

<style scoped>

.star {
  animation: move 20s linear infinite;
}

.shootingStar {
  animation: dash 0.7s ease;
}
@keyframes dash {
  to {
    stroke-dashoffset: -227.62;
  }
}
@keyframes move {
  from {
    transform: translate(0%, 0%);
  }
  to {
    transform: translate(-100%, 100%);
  }
}
</style>
