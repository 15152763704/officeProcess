<template>
  <div>
    <div class="showimgupload" @click="editCropper()"></div>
    <el-dialog :title="title" :visible.sync="opens" width="800px" append-to-body @opened="modalOpened">
      <el-row>
        <el-col :xs="24" :md="12" :style="{height: '350px'}">
          <vue-cropper
            ref="croppert"
            :img="options.img"
            :info="true"
            :original="options.original"
            :outputSize="options.size"
            :autoCrop="options.autoCrop"
            :autoCropWidth="options.autoCropWidth"
            :autoCropHeight="options.autoCropHeight"
            :fixedBox="options.fixedBox"
            :full="options.full"
            @realTime="realTime"
            v-if="visible"
          />
        </el-col>
        <el-col :xs="24" :md="12" :style="{height: '350px'}">
          <div class="avatar-upload-preview">
            <img :src="previews.url" :style="previews.img" />
          </div>
        </el-col>
      </el-row>
      <br />
      <el-row>
        <el-col :lg="2" :md="2">
          <el-upload :action="uploadUrl"
                     ref="stylethree"
                     :show-file-list="false"
                     :data="paramsData"
                     :before-upload="beforeUpload">
            <el-button size="small">
              选择
              <i class="el-icon-upload el-icon--right"></i>
            </el-button>
          </el-upload>
        </el-col>
        <el-col :lg="{span: 1, offset: 2}" :md="2">
          <el-button icon="el-icon-plus" size="small" @click="changeScale(1)"></el-button>
        </el-col>
        <el-col :lg="{span: 1, offset: 1}" :md="2">
          <el-button icon="el-icon-minus" size="small" @click="changeScale(-1)"></el-button>
        </el-col>
        <el-col :lg="{span: 1, offset: 1}" :md="2">
          <el-button icon="el-icon-refresh-left" size="small" @click="rotateLeft()"></el-button>
        </el-col>
        <el-col :lg="{span: 1, offset: 1}" :md="2">
          <el-button icon="el-icon-refresh-right" size="small" @click="rotateRight()"></el-button>
        </el-col>
        <el-col :lg="{span: 2, offset: 6}" :md="2">
          <el-button type="primary" size="small" @click="uploadImg()">提 交</el-button>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import store from "@/store";
import { VueCropper } from "vue-cropper";

import { uploadMyPhoto,getUserFileStyleList } from '@/api/SysUserFileStyle/SysUserFileStyle'
import * as imageConversion from "image-conversion";

export default {
  components: { VueCropper },
  props: {
    fileList: {
      type: Array,
      default:[],
    },
  },
  data() {
    return {
      //上传路径
      uploadUrl: process.env.VUE_APP_BASE_API + '/SysUserFileStyle/SysUserFileStyle/uploadMyPhoto',
      //上传请求头
      uploadHeaders: {
        Authorization: '',
      },
      //上传携带参数
      paramsData:{
        remark:'',
        type: '3',
      },
      // 是否显示弹出层
      opens: false,
      // 是否显示cropper
      visible: false,
      // 弹出层标题
      title: "上传轮播相册图片",
      options: {
        img: '', //裁剪图片的地址
        autoCrop: true, // 是否默认生成截图框
        autoCropWidth: 272, // 默认生成截图框宽度
        autoCropHeight: 200, // 默认生成截图框高度
        fixedBox: true, // 固定截图框大小 不允许改变
        size: 0.8, // 裁剪生成图片的质量
        full: true, // 是否输出原图比例的截图
        original: true, // 上传图片按照原始比例渲染
      },
      previews: {}
    };
  },

  created() {
    this.uploadHeaders.Authorization = 'Bearer ' + this.$store.getters.token
  },
  methods: {
    // 编辑头像
    editCropper() {
      this.opens = true;
    },
    // 打开弹出层结束时的回调
    modalOpened() {
      this.visible = true;
    },
    // 覆盖默认的上传行为
    requestUpload() {
    },
    // 向左旋转
    rotateLeft() {
      this.$refs.croppert.rotateLeft();
    },
    // 向右旋转
    rotateRight() {
      this.$refs.croppert.rotateRight();
    },
    // 图片缩放
    changeScale(num) {
      num = num || 1;
      this.$refs.croppert.changeScale(num);
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
        this.$emit("addlist",'3')
        return false;
      }else if(!isLt10M){
        this.$message({
          type:"warning",
          message:"上传文件的大小不能超过10M"
        });
        this.$emit("addlist",'3')
        return false;
      }

      if(num >= 10 && this.paramsData.type=='3'){
        this.$message({
          type:"warning",
          message:"已存在十张图片，请删除后重新上传！"
        });
        this.$emit("addlist",'3')
        return false;
      }else {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.options.img = reader.result;
        };
      }
    },
    // 上传图片
    uploadImg() {
      this.$refs.croppert.getCropBlob(data => {
        let formData = new FormData();
        formData.append("file", data);
        uploadMyPhoto({type:'3'},formData).then(response => {
          if(response.code == '200'){
            this.$emit("addlist",'3')
          }
          this.opens = false;
          this.options.img = process.env.VUE_APP_BASE_API + response.imgUrl;
          this.msgSuccess("上传成功");
          this.visible = false;
        });
      });
    },
    // 实时预览
    realTime(data) {
      this.previews = data;
    }
  }
};
</script>
<style scoped lang="scss">
.user-info-head {
  position: relative;
  display: inline-block;
  height: 120px;
}
.avatar-upload-preview{
  width: 272px;
  height: 200px;
  border-radius: unset;
  left: 300px;
}

.user-info-head:hover:after {
  content: '+';
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  color: #eee;
  background: rgba(0, 0, 0, 0.5);
  font-size: 24px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  cursor: pointer;
  line-height: 110px;
  //border-radius: 50%;
}
.showimgupload{
  width: 148px;
  height: 148px;
  border-radius: 10px;
  border: 1px dashed #c0ccda;
  background-color: #fbfdff !important;
  background: url("../../../assets/images/图片上传 (1).png") no-repeat;
  background-position: 50% 50%;
  background-size: 20% 20%;
  cursor: pointer;
  flex-shrink: 0;
}
</style>
