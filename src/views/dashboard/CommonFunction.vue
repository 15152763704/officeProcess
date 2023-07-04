<template>

  <div class="progk">
    <el-card class="box-card"  body-style	="height: 300px;" v-if="!isShow">
      <!--      <el-button type="success" size="mini" class="changes left_b" @click="isShow=!isShow">切换</el-button>-->
      <div class="fullscreens" @click="dialogbigVisible=!dialogbigVisible"></div>
      <el-button type="info" size="mini" icon="el-icon-close" circle class="closestyle" @click="isShow=!isShow"></el-button>
      <div class="navlist lista" @click="openupload"></div>
      <div class="navlist listb" @click="loadstyleone({type:1})"></div>
      <div class="navlist listc" @click="loadstyletow({type:2})"></div>
      <div class="navlist listd" @click="loadstylethree({type:3})"></div>
      <template v-if="this.personality=='1'" >
        <div class="content">
          <template >
            <div v-for="(item,index) in positionArr" :key="item" :class="item">
              <img v-if="stylesone.length>=(index+1)" :src="stylesone[index].url" alt="">
            </div>
          </template>
        </div>
      </template>

      <template v-else-if="this.personality=='2'" >
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
<!--                  <div class="content__title">{{ page.title }}</div>-->
                  <div class="content__img1"><img :src="page.img1"/>

                  </div>
                  <div class="content__text">{{ idx + 1 }}</div>
                  <div class="content__img2"><img :src="page.img2"/></div>
                  <div class="content__img3"><img :src="page.img3"/></div>
                </div>
              </div>
              <div class="album__page back" :style="{zIndex: idx + 1}"></div>
            </div>
            <div class="album__back"></div>
            <div class="album__bottom"></div>
            <div class="album__shadow"></div>
          </div>
        </div>
      </template>

  <template v-else-if="this.personality=='3'" >
    <div>
      <div class="swiper-container">
        <!-- Additional required wrapper -->
        <div class="swiper-wrapper">
          <!-- Slides -->
          <template v-if="stylethree.length<=0">
            <div class="swiper-slide"></div>
            <div class="swiper-slide"></div>
            <div class="swiper-slide"></div>
            <div class="swiper-slide"></div>
            <div class="swiper-slide"></div>
          </template>

          <template v-else>
            <div class="swiper-slide" v-for="(item,index) in stylethree" :key="index" >
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


    </el-card>
    <el-card class="box-card" shadow="never" v-if="isShow">
      <!--      <el-button type="success" size="mini" class="changes left_a" @click="showstyle">切换</el-button>-->
      <div class="changes left_a" @click="showstyle"></div>
      <div slot="header" class="clearfix">
        <span style="position: absolute">常用功能</span>
        <i class="el-icon-setting" @click="showFunctionEditer"></i>
      </div>
      <div class="commonFunctionContainer"  >
        <div v-for="( item ,i ) in defaultCheckedNodes " @click="goMenuDetail(item)" class="commonFunctionItem" >
          <div class="menuIconContainer" :style="{background: mdnuColor[i%8].bacColor }" >
            <svg-icon :icon-class="item.icon" class="menuIcon" :style="{color: mdnuColor[i%8].color }"/>
          </div>
          <div class="menuTitle">{{item.title}}</div>
        </div>
      </div>
    </el-card>

    <!-- 树弹框 -->
    <el-dialog
      title="菜单选择"
      :visible.sync="centerDialogVisible"
      width="30%"
      center>
      <el-tree
        ref="tree"
        :data="tableData"
        show-checkbox
        :props="defaultProps"
        node-key="meunid"
        :default-checked-keys="[defaultCheckedKeys]">
      </el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="goSave">确 定</el-button>
      </span>
    </el-dialog>
    <!--    上传图片弹出框-->
    <el-dialog title="上传图片" :visible.sync="dialogTuVisible" @close="handleClose">
      <template>
        <el-select v-model="paramsData.type" placeholder="请选择" @change="changechoice($event)">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </template>

      <div class="showimg" v-if="paramsData.type != '2'">
        <template v-for="(item,index) in fileList" >
          <div class="imglist">
            <label class="item-status-label">
              <i class="el-icon-upload-success el-icon-check"></i>
            </label>
            <img :src="item.url">
            <div v-if="fileList.length>0" class="close-img-dask">
              <span class="caozuo left" @click="handlePictureCardPreview(item)"></span>
              <span class="caozuo right" @click="beforeRemove(item,index)"></span>
            </div>
          </div>
        </template>
        <styleone  v-if="paramsData.type == '1'" :fileList="fileList" @addlist="changechoice($event)"></styleone>
        <stylethree  v-if="paramsData.type == '3'" :fileList="fileList" @addlist="changechoice($event)"></stylethree>

      </div>
      <el-upload
        v-if="paramsData.type == '2'"
        class="upload-demo"
        ref="upload"
        list-type="picture-card"
        :file-list="fileList"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :before-upload="beforeUpload"

        :headers="uploadHeaders"
        :action="uploadUrl"
        :data="paramsData"
        :auto-upload="true">
        <i class="el-icon-plus"></i>
<!--        (file)=>{beforeUpload(file,fileList)}-->
<!--:on-success="handlesuccess" :on-progress="handleProgress" -->
      </el-upload>


      <el-dialog :visible.sync="dialogVisible" :modal="false">
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>


      <!--      <el-button style="margin-top: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>-->

    </el-dialog>
    <!--    fullscreen="true" 全屏dialog  :modal-append-to-body="false"-->

    <el-dialog v-if="dialogbigVisible" :visible.sync="dialogbigVisible" :fullscreen="true">

      <gasaly @closedialog="guanbidialog"></gasaly>
      <boxRotationAlbum v-if="this.personality=='1'" :fileList="stylesone"></boxRotationAlbum>
      <bookAlbum v-if="this.personality=='2'" :items="items"></bookAlbum>
      <swiperAlbum v-if="this.personality=='3'" :stylethree="stylethree"></swiperAlbum>
    </el-dialog>


  </div>



</template>




<script>

import request from '@/utils/request'
// import '../../../src/assets/album/js/vue.min.js'
// import '../../../src/assets/album/js/vuetify.min.js'
//import 'https://cdn.bootcdn.net/ajax/libs/vuetify/2.3.0/vuetify.min.js'
//轮播
import Swiper from 'swiper';
import {getUserFileStyleList, removeUserFileStyleList} from '../../api/SysUserFileStyle/SysUserFileStyle'

import * as imageConversion from 'image-conversion';

import styleone from '../components/stylefile/styleone'
import stylethree from '../components/stylefile/stylethree'

import boxRotationAlbum from '../components/bigpicture/boxRotationAlbum'
import swiperAlbum from '../components/bigpicture/swiperAlbum'
import bookAlbum from '../components/bigpicture/bookAlbum'
import gasaly from '../components/gasaly/gasaly'


export default {
  name: 'CommonFunction',
  components: {
    styleone,
    stylethree,
    boxRotationAlbum,
    bookAlbum,
    swiperAlbum,
    gasaly
  },
  data() {
    return {
      positionArr: ['top', 'bottom', 'left', 'right', 'front', 'after'],
      dialogImageUrl: '',
      dialogVisible: false,
      dialogbigVisible: false,
      //下拉选择风格
      options: [{
        value: '1',
        label: '3D'
      }, {
        value: '2',
        label: '翻页'
      }, {
        value: '3',
        label: '轮播'
      }, ],

      //上传路径
      uploadUrl: process.env.VUE_APP_BASE_API + '/SysUserFileStyle/SysUserFileStyle/uploadMyPhoto',
      //上传请求头
      uploadHeaders: {
        Authorization: '',
      },
      //上传携带参数
      paramsData:{
        remark:'',
        type: '1',
      },
      //选择图片列表
      fileList:[],
      //上传弹出框
      dialogTuVisible:false,
      //风格
      personality:'1',
      //展示个性窗口
      isShow:true,
      //风格一 旋转数据
      stylesone:[],
      //风格二 书
      styletow:[],
      //风格三 轮播图
      stylethree:[],
      //翻页数据
      isOpenedTop: true,
      items: [
        {
          img1: " ",
          img2: " ",
          img3: " ",
          title: "NEKO",
          isOpen: false
        },
        {
          img1: " ",
          img2: " ",
          img3: " ",
          title: "NYAN",
          isOpen: false
        },
        {
          img1: " ",
          img2: " ",
          img3: " ",
          title: "NEKO",
          isOpen: false
        },
        {
          img1: " ",
          img2: " ",
          img3: " ",
          title: "NYANNYAN",
          isOpen: false
        },
        {
          img1: " ",
          img2: " ",
          img3: " ",
          title: "NEKONEKO",
          isOpen: false
        }
      ],
      tableData: [],
      centerDialogVisible: false,
      defaultProps: {
        children: 'children',
        label:this.treeName
      },
      defaultCheckedNodes:[],//默认选中的key,系统默认这5个
      defaultChckedIds:[],//默认选中的id
      defaultCheckedKeys:[],//默认选中的node
      mdnuColor:[
        {
          color: 'red',
          bacColor: '#ff000026',
        },
        {
          color: 'green',
          bacColor: '#40c9c63d',
        },
        {
          color: 'orange',
          bacColor: '#ffa01254',
        },{
          color: '#5488ff',
          bacColor: '#032eff47',
        },
        {
          color: '#00dcff9e',
          bacColor: '#00d0ff40',
        },
        {
          color: 'blue',
          bacColor: '#002bfb40',
        },
        {
          color: '#7b53f5',
          bacColor: '#6103f740',
        },
        {
          color: '#ff00f7',
          bacColor: '#fb00ff3b',
        }
      ],
    }
  },
  created(){
    this.uploadHeaders.Authorization = 'Bearer ' + this.$store.getters.token
    this.getFunctionList();

  },
  mounted() {

  },
  methods: {
    guanbidialog(val) {
      this.dialogbigVisible = val
    },
    openupload() {
      this.paramsData.type = '1'
      this.dialogTuVisible = true
      if (!this.fileList) {
        this.loadstyleone({type: 1})
      }


    },
    showstyle() {
      this.isShow=!this.isShow
      this.loadstyleone({type:1})

    },
    initSwiper(){
      console.log(document.getElementsByClassName('swiper-container'));
      let swiper= new Swiper('.swiper-container', {
        autoplay: {
          delay: 3000,
          stopOnLastSlide: false,
          disableOnInteraction:false,
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
    resetData(){
      this.defaultCheckedNodes = [
        {"path": "/task/finished", "icon": "time-range", "title": "已办任务"},
        {"path": "/task/todo", "icon": "cascader", "title": "待办任务"},
        {"path": "/task/tocc", "icon": "tree", "title": "抄送我的"},
        {"path": "/task/process", "icon": "guide", "title": "我的流程"}]//默认选中的key,系统默认这5个
      this.defaultChckedIds = [
        "003073cecfa96ad50d42f70876002b39",
        "1825178945695a6b744aa2b7a7cc8dbc",
        "332f1085fe0a4b82c5685fc7c7e8c72a",
        "c6b1c98a54165e6b598ae4c5b10fb1ed"]//默认选中的id
      this.defaultCheckedKeys = ["2025","2024","2036","2026"]//默认选中的node
      if(this.$refs.tree){
        this.$refs.tree.setCheckedKeys(this.defaultCheckedKeys)
      }
    },
    //点击常用功能菜单-跳转到具体页面
    goMenuDetail(item){
      console.log(item)
      this.$router.push({
        path: item.path,
      })
    },
    //显示菜单配置弹框
    showFunctionEditer(){
      this.centerDialogVisible = !this.centerDialogVisible
      this.getTreeList();
    },
    //树label名称属性挂载方法
    treeName(data,node){
      /*node.text = data.meta.title
      console.log(data,node)*/
      return data.meta.title
    },
    //查询功能树 数据
    getTreeList(){
      let that = this;
      request({
        url: '/commonFunctionRouters',
        method: 'get'
      }).then(response => {
        that.tableData = response.data
        console.log(response.data)
        this.getFunctionList();
      });
    },
    //保存用户选择的常用功能
    goSave(){
      let checkedData = this.$refs.tree.getCheckedNodes();
      console.log(checkedData)
      let savedData = [];
      for (let i = 0; i < checkedData.length ; i++) {
        if( checkedData[i].children == undefined || checkedData[i].children.length === 0 ){
          checkedData[i].icon = checkedData[i].meta.icon
          checkedData[i].title = checkedData[i].meta.title
          savedData.push(checkedData[i])
        }
      }
      //删除上次选中的菜单
      if(this.defaultChckedIds != undefined && this.defaultChckedIds.length > 0){
        request({
          url: '/system/commonfunction/'+ this.defaultChckedIds.join(","),
          method: 'delete',
        })
      }
      //保存当前选中的菜单
      request({
        url: '/system/commonfunction/save',
        method: 'post',
        data: savedData
      }).then( response => {
        this.$message({
          message: '操作成功',
          type: 'success'
        });
        this.centerDialogVisible = false;
        this.getFunctionList()
      })
    },
    //获取常用功能列表
    getFunctionList(){
      const currentUser = this.$store.getters.user
      let that = this;
      request({
        url: '/system/commonfunction/selectByUserId/'+ currentUser.userId ,
        method: 'get'
      }).then(response => {
        if(response.data.length > 0){
          let arr =  response.data;
          that.defaultCheckedNodes = response.data;
          that.defaultCheckedKeys = [];
          that.defaultChckedIds = [];
          for (let i = 0; i < arr.length ; i++) {
            that.defaultCheckedKeys.push(arr[i].meunid);
            that.defaultChckedIds.push(arr[i].id);
          }
          if(that.$refs.tree){
            that.$refs.tree.setCheckedKeys(that.defaultCheckedKeys)
          }
        }else{
          this.resetData();
        }
      });
    },
    //翻页方法
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
    },

    //图片上传
    submitUpload() {
      this.$refs.upload.submit();
    },
    // handlesuccess(response, file, fileList){
    //   console.log(response)
    //   console.log(file)
    //   console.log(fileList)
    // },
    handleRemoves(file,index) {
      this.fileList.splice(index,1)
      if(file.id){
        removeUserFileStyleList(file.id)
      }
    },
    async handleRemove(file,fileList) {
      if(file.id){
        await removeUserFileStyleList(file.id)
      }
      await this.changechoice(2);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 上传预处理
    beforeUpload(file) {

      let num = this.fileList.length++;
      let FileExt=file.name.replace(/.+\./, "");
      const isLt10M = file.size / 1024 / 1024 < 10;
      if(['png','jpg','jpeg'].indexOf(FileExt.toLowerCase())===-1){
        this.$message({
          type:"warning",
          message:"请上传.png .jpg .jpeg格式的文件"
        });
        this.changechoice(2);
        return false;
      }else if(!isLt10M){
        this.$message({
          type:"warning",
          message:"上传文件的大小不能超过10M"
        });
        return false;
      }else if(num >= 15 && this.paramsData.type=='2'){
        this.$message({
          type:"warning",
          message:"已存在十五张图片，请删除后重新上传！"
        });
        return false;
      }
      return new Promise((resolve, reject) =>{
        imageConversion.compress(file,0.3).then(res=>{
          resolve(res);
        })
      })
    },
    beforeRemove(file,index){
      console.log(file)
      this.handleRemoves(file, index)
    },
    async loadstyleone(type){
      this.personality = 1
      this.stylesone = []
      let {rows} = await getUserFileStyleList(type)
      rows.map((item)=>{
        item.url = process.env.VUE_APP_BASE_API + item.savePath
        this.stylesone.push(item)
      })
      this.$nextTick(()=>{
        this.fileList = rows
      })
    },
    async loadstyletow(type){
      this.personality = 2
      let {rows} = await getUserFileStyleList(type)
      rows.map((item)=>{
        item.url = process.env.VUE_APP_BASE_API + item.savePath
        return item
      })
      for(var i=0;i<rows.length;i+=3){
        this.styletow.push(rows.slice(i,i+3));
      }

      for(let j=0;j<this.styletow.length;j++){
        if(this.styletow[j][0]){
          this.items[j].img1 = this.styletow[j][0].url
        }
        if(this.styletow[j][1]){
          this.items[j].img2 = this.styletow[j][1].url
        }
        if(this.styletow[j][2]){
          this.items[j].img3 = this.styletow[j][2].url
        }

      }

    },
    async loadstylethree(type){
      if (this.personality == 3) return
      this.personality = 3
      this.stylethree = []
      let {rows} = await getUserFileStyleList(type)
      rows.map((item)=>{
        item.url = process.env.VUE_APP_BASE_API + item.savePath
        this.stylethree.push(item)
      })
      this.$nextTick(()=>{
        this.initSwiper()
      })

    },
    handleClose(){
      this.personality = this.paramsData.type
      this.fileList = []
      this.loadstyleone({type:'1'})
      this.paramsData.type = ''
    },
    async changechoice(e){
      this.fileList = []
      let {rows} = await getUserFileStyleList({type:e})
      rows.map((item)=>{
        item.url = process.env.VUE_APP_BASE_API + item.savePath
        this.fileList.push(item);
      })
      this.$forceUpdate()


    },


  }

}
</script>
<style scoped lang="scss">

.progk{
  position: relative;
  .content {
    width: 200px;
    height: 200px;
    transform-style: preserve-3d;
    transform: rotateX(-30deg) rotateY(-80deg);
    position: relative;
    margin: 40px auto;
    animation: rotate linear 20s infinite;

    .top {
      transform: rotateX(90deg) translateZ(100px);
      background: url("../../assets/images/上传你的照片.png") no-repeat;
      background-size: 100% 100%;
    }

    .left {
      transform: rotateY(-90deg) translateZ(100px);
      background: url("../../assets/images/上传你的照片.png") no-repeat;
      background-size: 100% 100%;
    }
    .bottom {
      transform: rotateX(-90deg) translateZ(100px);
      background: url("../../assets/images/上传你的照片.png") no-repeat;
      background-size: 100% 100%;
    }
    .right {
      transform: rotateY(90deg) translateZ(100px);
      background: url("../../assets/images/上传你的照片.png") no-repeat;
      background-size: 100% 100%;
    }
    .front {
      transform: rotateY(0deg) translateZ(100px);
      background: url("../../assets/images/上传你的照片.png") no-repeat;
      background-size: 100% 100%;
    }
    .after {
      transform: translateZ(-100px) rotateY(180deg);
      background: url("../../assets/images/上传你的照片.png") no-repeat;
      background-size: 100% 100%;
    }
    div{
      width:200px;
      height:200px;
      position: absolute;
      opacity:.95;
      img {
        width: 100%;
        height: 100%;
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
.commonFunctionContainer{
  height: 260px;
  overflow-y: scroll;
}
.commonFunctionItem{
  width: 25%;
  display: inline-block;
  text-align: center;
  margin: 20px 0;
}
.commonFunctionItem .menuTitle {
  font-weight: 600;
  font-size: 15px;
  color: #7e7e7e;
  margin-top: 10px;
}
.commonFunctionItem .menuIcon {
  height: 20px;
  width: 20px;
  margin-top: 15px ;
}
.commonFunctionItem:hover,.el-icon-setting:hover{
  cursor:pointer
}
.menuIconContainer{
  display: inline-block;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 1px solid #cbcbcb
}
//@import url("https://fonts.googleapis.com/css?family=Cute+Font&display=swap");

.el-icon-setting{
  display: inline-block;
  width: 100%;
  text-align: right;
}
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}

.box-card {
  position: relative;
  width: 100%;
  /*margin-bottom: 20px;*/
  height: 360px;
  .changes{
    width: 30px;
    height: 30px;
    position: absolute;
    top: 10px;
    cursor:pointer;

    background: url("../../assets/images/相册.png") no-repeat;
    background-size: 80%;
  }
  .left_a{
    left: 100px;
  }
  .left_b{
    left: 10px;
  }
  .moreoperation{
    position: absolute;
    top: 10px;
    right: 10px;
  }
  .fullscreens{
    width: 25px;
    height: 25px;
    cursor:pointer;
    background: url("../../assets/images/全屏.png") no-repeat;
    background-size: 100% 100%;
  }
}
/* 设置滚动条的样式 */
::-webkit-scrollbar {
  width:0px;
}
.container {
  margin: auto;
}

.album {
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
  -webkit-transition: 1s;
  transition: 1s;
  margin: auto;
  width: 350px;
  height: 400px;
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
  font-size: 25px;
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
  height: 350px;
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
  width: 350px;
  height: 400px;
  background: transparent;
  transform: translateZ(-3em);
  -webkit-transform: translateZ(-3em);
  box-shadow: 1em 1em 0px 0px #aaa;
  z-index: 1;
}
.album__bottom {
  width: 350px;
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
  //display: grid;
  //grid-template-columns: 50% 50%;
  //grid-template-rows: 0px auto;
  position: relative;
}
.content__title {
  grid-row: 1;
  grid-column: 1 / 3;
  font-size: 50px;
  line-height: 0.8;
  padding: 20px;
  box-sizing: border-box;
}
.content__img1 {
  //grid-row: 2 / 4;
  //grid-column: 1 / 2;
  position: absolute;
  left: 0;
  width: 175px;
  height: 300px;
  top: 10px;
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
  width: 100%;
  height: 60%;
  border: 10px solid #fff;
  box-sizing: border-box;
  background: url("../../assets/images/上传你的照片.png") no-repeat;
  background-size: 100% 100%;
  //transform: rotate(-36deg);
  //margin-top: 130px;
  //margin-left: 30px;

}
.content__img2 {
  //grid-row: 3 / 4;
  //grid-column: 2 / 4;
  position: absolute;
  top: 20px;
  right: 0;
  width: 175px;
  height: 150px;
  display: -webkit-box;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  box-sizing: border-box;
  //transform: rotate(-15deg);
  //margin-left: -10px;

}
.content__img2 img {
  margin: auto;
  width: 85%;
  height: 100%;
  border: 10px solid #fff;
  box-sizing: border-box;
  background: url("../../assets/images/上传你的照片.png") no-repeat;
  background-size: 100% 100%;
}
.content__img3 {
  //grid-row: 2;
  //grid-column: 2;
  position: absolute;
  right: 0;
  bottom: 50px;
  width: 175px;
  height: 140px;
  display: -webkit-box;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  box-sizing: border-box;
  //transform: rotate(23deg);

}
.content__img3 img {
  margin: auto;
  width: 95%;
  height: 100%;
  border: 10px solid #fff;
  box-sizing: border-box;
  background: url("../../assets/images/上传你的照片.png") no-repeat;
  background-size: 100% 100%;
  margin-top: 20px;
}
.content__text {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 30px;
  font-size: 30px;
  box-sizing: border-box;
}

@media screen and (max-width: 768px) {
  body {
    overflow: visible;
  }
}
//轮播
/* 外层容器 */
.swiper-container {
  width: 340px;
  height: 200px;
  margin-top: 50px;
}

/* 轮播项 */
.swiper-container .swiper-slide {
  width: 80%;
  height: 100%;
  font-size: 32px;
  font-weight: 500;
  color: #ffffff;
  background: url("../../assets/images/上传你的照片.png") no-repeat;
  background-size: 100% 100%;

  /* 文字垂直居中 */
  display: flex;
  justify-content: center;
  align-items: center;
  img{
    width: 100%;
    height: 100%;
  }

}


.upload-demo{
  margin-top: 10px;
}
.closestyle{
  position: absolute;
  right: 5px;
  top: 5px;
}
.navlist{
  width: 30px;
  height: 30px;
  background: black;
  position: absolute;
  cursor:pointer;
  right: 0;
}
.lista{
  top: 45px;
  background: url("../../assets/images/图片上传.png") no-repeat;
  background-size: 80%;
}
.listb{
  top:85px;
  background: url("../../assets/images/盒子.png") no-repeat;
  background-size: 70%;
}
.listc{
  top: 120px;
  background: url("../../assets/images/书.png") no-repeat;
  background-size: 80%;
}
.listd{
  top: 160px;
  background: url("../../assets/images/轮播效果.png") no-repeat;
  background-size: 80%;
}
.showimg{
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;
  margin-top: 10px;

  .imglist{
    width: 148px;
    height: 148px;
    border-radius: 10px;
    border: 1px solid #c0ccda;
    margin-right: 8px;
    margin-bottom: 10px;
    position: relative;
    overflow: hidden;
    flex-shrink: 0;
    .item-status-label{
      position: absolute;
      right: -15px;
      top: -6px;
      width: 40px;
      height: 24px;
      background: #13ce66;
      text-align: center;
      -webkit-transform: rotate(
          45deg);
      transform: rotate(
          45deg);
      -webkit-box-shadow: 0 0 1pc 1px rgb(0 0 0 / 20%);
      box-shadow: 0 0 1pc 1px rgb(0 0 0 / 20%);
      i{
        font-size: 12px;
        margin-top: 11px;
        -webkit-transform: rotate(
            -45deg);
        transform: rotate(
            -45deg);
      }
    }
    img{
      width: 100%;
      height: 100%;
    }
  }


  .imglist:hover {

    .close-img,
    .close-img-dask {
      display: block;
      .caozuo{
        width: 25px;
        height: 25px;
        position: absolute;
        top: 45%;
        cursor: pointer;
      }
      .left {
        left: 25%;
        background: url("../../assets/images/放大.png") no-repeat 50% 50%;
        background-size: 140% 140%;
      }
      .right {
        right: 25%;
        background: url("../../assets/images/删除.png") no-repeat 50% 50%;
        background-size: 100% 100%;
      }
    }
  }
  .close-img {
    display: none;
    position: absolute;
    right: 5px;
    top: 5px;
    color: white;
    font-size: 18px;
    z-index: 99999;
  }

  .close-img-dask {
    display: none;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5) !important;
    transition: opacity .3s;

  }



}


</style>
