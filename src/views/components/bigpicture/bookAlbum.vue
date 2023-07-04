<!--
       bookAlbum
       @module /bookAlbum.vue
       @desc 组件描述
       @author zhanghao
       @date 2022/1/15 10:26
       -->
<template>
  <div id="bookAlbum">
    <div class="container">
      <div class="album" :class="{'album--open': isOpenedTop}">
        <div class="album__paper" :style="{zIndex: isOpenedTop ? 0 : items.length + 1 }" :class="{'open': isOpenedTop}" @click="topOpen(isOpenedTop)">
          <div class="album__page front" :style="{transform: `translateZ(0.${items.length + 1}px)`}">
            <div>
              <div class="album__top-title"></div>
              <!--                  <div class="cat-mark"></div>-->
            </div>
          </div>
          <div class="album__page back" :style="{zIndex: 0}"></div>
        </div>
        <div class="album__paper" v-for="(page, idx) in items" :key="idx + 1" :style="{zIndex: page.isOpen ? idx + 1 : items.length + 1 - (idx + 1) }" :class="{'open': page.isOpen}" @click="idx + 1 === items.length ? reset() : open(idx, page.isOpen)">
          <div class="album__page front" :style="{transform: `translateZ(0.${items.length + 1 - (idx + 1)}px)`}">
            <div class="contents">
<!--              <div class="content__title">{{ page.title }}</div>-->
              <div class="content__img1"><img :src="page.img1"/>

              </div>
              <div class="content__img2"><img :src="page.img2"/></div>
              <div class="content__img3"><img :src="page.img3"/></div>
              <div class="content__text">{{ idx + 1 }}</div>
            </div>
          </div>
          <div class="album__page back" :style="{zIndex: idx + 1}"></div>
        </div>
        <div class="album__back"></div>
        <div class="album__bottom"></div>
        <div class="album__shadow"></div>
      </div>
    </div>
  </div>
</template>

<script>
// import '../../../assets/album/js/vue.min.js'
// import '../../../assets/album/js/vuetify.min.js'
//import 'https://cdn.bootcdn.net/ajax/libs/vuetify/2.3.0/vuetify.min.js'
export default {
  components: {},
  props: {
    items: {
      type: Array,
      default:[],
    },
  },
  data() {
    return {
      isOpenedTop: true,
    }
  },
  mounted() {

  },
  methods: {
    topOpen() {
      this.isOpenedTop = !this.isOpenedTop;
    },

    open(idx, isOpen) {
      if (this.isOpenedTop) {
        this.items[idx].isOpen = !isOpen;
      }
    },

    reset() {
      this.items.forEach(item => (item.isOpen = false));
      this.isOpenedTop = false;
    }
  },
  watch: {}
}
</script>

<style lang="scss" scoped>
#bookAlbum {
  .container {
    margin: auto;
  }

  .album {
    -webkit-transform-style: preserve-3d;
    transform-style: preserve-3d;
    -webkit-transition: 1s;
    transition: 1s;
    margin: auto;
    width: 600px;
    height: 700px;
    -webkit-transform: scale(0.5);
    transform: scale(0.5);
  }
  .album--open {
    -webkit-transform: translate(65px, 0) rotateX(35deg) rotateY(0deg) rotateZ(35deg) scale(0.5);
    transform: translate(65px, 0) rotateX(35deg) rotateY(0deg) rotateZ(35deg) scale(0.5);
  }
  .album__paper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    -webkit-transition: 1s;
    transition: 1s;
    -webkit-transform-origin: 0 50%;
    transform-origin: 0 50%;
    -webkit-transform-style: preserve-3d;
    transform-style: preserve-3d;
  }
  .album__paper:not(.first) .album__page {
    background: #f1f0f0;
    background-size: 100% 1.5em;
  }
  .album__paper:not(.first) .back {
    background: #d4d3d3;
  }
  .album__paper:nth-of-type(1) .back {
    background: #0095a3;
  }
  .album__paper:nth-of-type(1) .album__page {
    background: #0095a3;
  }
  .album__paper.open {
    box-shadow: 0 1em 0 0 #aaa;
    -webkit-transform: rotateX(0) rotateY(-180deg) rotateZ(0);
    transform: rotateX(0) rotateY(-180deg) rotateZ(0);
  }
  .album__paper .album__page.front {
    transition: 1s;
    -webkit-transition: 1s;
    transform-origin: 0 50%;
    -webkit-transform-origin: 0 50%;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    z-index: 2;
  }
  .album__paper .back {
    transition: 1s;
    -webkit-transition: 1s;
    transform-origin: 0 50%;
    -webkit-transform-origin: 0 50%;
    background: #e1e1e1;
  }
  .album__top-title {
    font-size: 100px;
    line-height: 0.8;
    padding: 20px;
  }
  .album__page {
    width: 100%;
    height: 100%;
    position: absolute;
    -webkit-transform: translateZ(0px);
    transform: translateZ(0px);
  }
  .album__back {
    width: 3em;
    height: 700px;
    background: #007e8a;
    position: absolute;
    left: -3em;
    top: 0;
    transform-origin: 100% 100%;
    -webkit-transform-origin: 100% 100%;
    transform: rotateY(-90deg) rotateX(0deg);
    -webkit-transform: rotateY(-90deg) rotateX(0deg);
  }
  .album__shadow {
    position: absolute;
    top: 0;
    left: 0;
    width: 600px;
    height: 700px;
    background: transparent;
    transform: translateZ(-3em);
    -webkit-transform: translateZ(-3em);
    box-shadow: 1em 1em 0px 0px #aaa;
    z-index: 1;
  }
  .album__bottom {
    width: 600px;
    height: 3em;
    background: #d4d3d3;
    position: absolute;
    bottom: 0;
    left: 0;
    transform-origin: 100% 100%;
    -webkit-transform-origin: 100% 100%;
    transform: rotateX(90deg);
    -webkit-transform: rotateX(90deg);
  }

  .cat-mark {
    position: relative;
    width: 200px;
    height: 170px;
    background: #333;
    border-radius: 60% 60% 90px 90px;
    margin: 150px auto auto;
  }
  .cat-mark:before, .cat-mark:after {
    top: -25px;
    width: 0;
    height: 0;
    border-bottom: 80px solid #333;
    border-right: 50px solid transparent;
    border-left: 50px solid transparent;
    border-radius: 33px;
  }
  .cat-mark:before {
    right: -20px;
    transform: rotate(32deg);
    -webkit-transform: rotate(32deg);
  }
  .cat-mark:after {
    left: -20px;
    transform: rotate(-32deg);
    -webkit-transform: rotate(-32deg);
  }

  .top-content {
    height: 100%;
    display: -webkit-box;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    flex-flow: column;
  }

  .contents {
    height: 100%;
   position: relative;
  }
  //.content__title {
  //  grid-row:  1;
  //  grid-column: 1 / 2;
  //  font-size: 100px;
  //  line-height: 0.8;
  //  //padding: 20px;
  //  box-sizing: border-box;
  //}
  .content__img1 {
    position: absolute;
    left: 0;
    top: 20px;
    width: 50%;
    display: -webkit-box;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    flex-flow: column;
    box-sizing: border-box;
  }
  .content__img1 img {
    margin: auto;
    width: 90%;
    border: 10px solid #fff;
    box-sizing: border-box;
  }
  .content__img2 {
    position: absolute;
    right: 0;
    top: 20px;
    width: 50%;

    display: -webkit-box;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    box-sizing: border-box;
  }
  .content__img2 img {
    margin: auto;
    width: 80%;
    border: 10px solid #fff;
    box-sizing: border-box;
  }
  .content__img3 {
    position: absolute;
    right: 0;
    bottom: 0;
    display: -webkit-box;
    display: flex;

    -webkit-box-align: center;
    align-items: center;
    box-sizing: border-box;
  }
  .content__img3 img {
    margin: auto;
    width: 60%;
    border: 10px solid #fff;
    box-sizing: border-box;
  }
  .content__text {
    position: absolute;
    right: 0;
    bottom: 0;
    //width: 100%;
    padding: 30px;
    font-size: 30px;
    box-sizing: border-box;
  }

  @media screen and (max-width: 768px) {
    body {
      overflow: visible;
    }
  }


}
</style>
