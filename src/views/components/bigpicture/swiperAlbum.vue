<!--
       swiperAlbum
       @module /swiperAlbum.vue
       @desc 组件描述
       @author zhanghao
       @date 2022/1/15 10:28
       -->
<template>
  <div id="swiperAlbum">
    <div class="swiper-containers">
      <!-- Additional required wrapper -->
      <div class="swiper-wrapper">
        <!-- Slides -->
        <template v-if="stylethree.length<=0">
          <div v-for="i in 5" class="swiper-slide no-img"></div>
        </template>

        <template v-else>
          <div v-for="(item,index) in stylethree" v-if="item.url" :key="index" class="swiper-slide">
            <img :src="item.url">
          </div>
        </template>
      </div>
      <!-- If we need pagination -->
      <div class="swiper-pagination"></div>

      <!-- If we need navigation buttons -->
      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>

      <!-- If we need scrollbar -->
      <div class="swiper-scrollbar"></div>
    </div>
  </div>
</template>

<script>
import Swiper from "swiper";

export default {
  components: {},
  props: {
    stylethree: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {}
  },

  methods: {
    initSwiper() {
      let swiper = new Swiper('.swiper-containers', {
        autoplay: {
          delay: 3000,
          stopOnLastSlide: false,
          disableOnInteraction: false,
        },
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        coverflowEffect: {
          rotate: 0,
          stretch: 0,
          depth: 500,
          modifier: 1,
          slideShadows: false,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        pagination: {
          el: '.swiper-pagination',
        },
        loop: true,
      })
      swiper.on('slideChange', (e) => {
      })
    },
  },
  watch: {
    stylethree: {
      handler() {
        this.$nextTick(() => {
          this.initSwiper()

        })
      },
      immediate: true
    }

  }
}
</script>

<style lang="scss" scoped>
#swiperAlbum {
  //轮播
  ///* 外层容器 */
  .swiper-containers {
    width: 640px;
    height: 400px;
    overflow: hidden;
    margin: 10% auto;
  }

  /* 轮播项 */

  .swiper-containers .swiper-slide {
    width: 80%;
    height: 100%;
    font-size: 32px;
    font-weight: 500;
    color: #ffffff;
    //background: url("../../../assets/images/上传你的照片.png") no-repeat;
    //background-size: 100% 100%;

    /* 文字垂直居中 */
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      width: 100%;
      height: 100%;
    }

  }

  .swiper-containers .no-img {
    background: url("../../../assets/images/上传你的照片.png") no-repeat;
    background-size: 100% 100%;
  }
}
</style>
