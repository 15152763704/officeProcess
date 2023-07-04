<template>
  <input type="file" ref="clearFile"
         @change="handleFileChange($event)" multiple="multiplt"
         class="add-file-right-input" style="margin-left:70px;" accept="">
</template>

<script>
  import axios from 'axios';
  import { getToken } from '@/utils/auth'

  export default {
    name: "Deploy",
    components: {
    },
    data() {
      return {
        addArr: []
      }
    },
    created() {

    },
    methods: {
      handleFileChange(event){
        var file = event.target.files;
        for(var i = 0;i<file.length;i++){
          this.addArr.push(file[i]);
          //    上传类型判断
          // var imgName = file[i].name;
          // var idx = imgName.lastIndexOf(".");
          // if (idx != -1){
          //   var ext = imgName.substr(idx+1).toUpperCase();
          //   ext = ext.toLowerCase( );
          //   if (ext!='pdf' && ext!='doc' && ext!='docx'){
          //
          //   }else{
          //
          //   }
          // }else{
          //
          // }
        }
        this.submitAddFile();
      },
      submitAddFile(){
        console.log(this.addArr);
        if(0 == this.addArr.length){
          this.$message({
            type: 'info',
            message: '请选择要上传的文件'
          });
          return;
        }

        var formData = new FormData();
        formData.append('num', this.addType);
        formData.append('linkId',this.addId);
        formData.append('rfilename',this.addFileName);
        for(var i=0;i<this.addArr.length;i++){
          formData.append('file',this.addArr[i]);
        }

        let config = {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': 'Bearer ' + getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
          }
        };

        axios.post('http://localhost:8080/common/batchUpload',formData,config)
          .then((response) => {
            if(response.data.info=="success"){this.$message({
              type: 'success',
              message: '附件上传成功!'
            });
            }
          })

      }


    }
  };
</script>

