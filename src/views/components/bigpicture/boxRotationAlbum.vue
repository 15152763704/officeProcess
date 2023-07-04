<!--
       boxRotationAlbum
       @module /boxRotationAlbum.vue
       @desc 组件描述
       @author zhanghao
       @date 2022/1/15 10:26
       -->
<template>
  <div id="boxRotationAlbum">
    <div class="content">
      <template >
        <div v-for="(item,index) in positionArr" :key="item" :class="item">
          <img v-if="fileList.length>=(index+1)" :src="fileList[index].url" alt="">
        </div>
      </template>
    </div>

  </div>
</template>

<script>

export default {
  components: {},
  props: {
    fileList: {
      type: Array,
      default:[],
    },
  },
  data() {
    return {
      positionArr:['top','bottom','left','right','front','after'],
    }
  },
  mounted() {

  },
  methods: {},
  watch: {}
}
</script>

<style lang="scss" scoped>
#boxRotationAlbum {
.content{
  width:400px;
  height:400px;
  transform-style:preserve-3d;
  transform: rotateX(-30deg) rotateY(-80deg);
  position:relative;
  margin:80px auto;
  animation: rotate linear 20s infinite;
.top{
  transform: rotateX(90deg) translateZ(200px);
  background: url("../../../assets/images/上传你的照片.png") no-repeat;
  background-size: 100% 100%;
}
.left{
  transform: rotateY(-90deg) translateZ(200px);
  background: url("../../../assets/images/上传你的照片.png") no-repeat;
  background-size: 100% 100%;
}
.bottom{
  transform: rotateX(-90deg) translateZ(200px);
  background: url("../../../assets/images/上传你的照片.png") no-repeat;
  background-size: 100% 100%;
}
.right{
  transform: rotateY(90deg) translateZ(200px);
  background: url("../../../assets/images/上传你的照片.png") no-repeat;
  background-size: 100% 100%;
}
.front{
  transform: rotateY(0deg) translateZ(200px);
  background: url("../../../assets/images/上传你的照片.png") no-repeat;
  background-size: 100% 100%;
}
.after{
  transform: rotateY(180deg) translateZ(200px);
  background: url("../../../assets/images/上传你的照片.png") no-repeat;
  background-size: 100% 100%;
}
div{
  width:400px;
  height:400px;
  position: absolute;
  opacity:.95;
img{
  width:100%;
  height:100%;
}
}

}
@-webkit-keyframes rotate {
  from {
    transform: rotateX(0deg) rotateY(0deg);
  }
  to {
    transform: rotateX(360deg) rotateY(360deg);
  }
}

}
</style>
