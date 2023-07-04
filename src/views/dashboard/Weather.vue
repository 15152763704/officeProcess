<template>
  <div id="weater">

    <div class="wendu_container">
      <div class="wendu_text_container">
        <div class="time_hms">{{shifenmiao}}</div>
        <i class="el-icon-location" />
        <div class="wendu_item_container">
          <div class="wendu_address wendu_item">江苏-扬州<span style="width: 20px;display: inline-block" />{{wendu}}</div>
          <div class="other_weather wendu_item">{{otherWeather}}</div>
        </div>
      </div>
      <div class="time_container">
        <div class="time_ymd"><i class="el-icon-date" style="display: none"/>
          <el-date-picker popper-class="myDate"
            v-model="value" :clearable="false" style="cursor:pointer;"
            type="date">
          </el-date-picker>
          {{nianyueri_xinqi}}
        </div>
      </div>
    </div>

    <div class="weather_father">
      <div class="weather_container">
        <el-image :src="image_url" fit="contain" id="myWeatherImage"></el-image>
        <div class="wendu_range wendu_item">{{wendurange}}</div>
      </div>
    </div>

  </div>
</template>
<style>
  .time_ymd .el-date-editor {
    width: 40px;
    height: 26px;
  }
  .time_ymd .el-input__inner{
    display: none;
  }


  #weater{
    display: flex;
    padding: 20px 20px 0 20px;
  }
  .el-icon-location{
    height: 30px;
    line-height: 30px;
    margin-right: 10px;
    font-size: 20px;
    color: #2f79b9;
  }
  .el-image{
    width: 70px;
    height: 70px;
  }
  .wendu_item_container{

  }
  .wendu_container{
    display: block;
    width: 65%;
  }
  .weather_father {
    width: 35%;
    text-align: center;
  }
  .wendu_text_container {
    height: 54px;
    display: inline-flex;
    line-height: 54px;
    width: 280px;
  }
  .wendu_item{
    height: 30px;
    line-height: 30px;
    color: #2f79b9;
    font-size: 15px;
    font-weight: 600;
  }
  .time_container{
    text-align: left;
  }
  .wendu_range{
    margin-top: 8px;
  }
  .time_container .time_ymd {
    height: 54px;
    font-weight: 600;
    color: #6a6a6afa;
    margin-top: 31px;
    font-size: 21px;
  }
  .time_hms{
    font-size: 20px;
    font-weight: 600;
    margin-right: 40px;
  }
  .el-icon-date{
    margin-right: 10px;
    font-size: 26px;
    font-weight: 600;
  }
</style>

<script>
  import request from '@/utils/request'

  export default {
    name: "Weather",
    data() {
      return {
        value: new Date(),
        jsonData: null,

        shifenmiao: '',
        nianyueri_xinqi: '',

        wendurange:'',
        wendu:'',
        otherWeather:'',

        image_url:'',

        ganmao:'',
      }
    },
    created(){
      this.getJsonData();
      this.executeTimer();
      this.getLocalTime();
    },
    methods:{
      getJsonData(){
        //https://blog.csdn.net/weixin_43719622/article/details/102566622
        //http://www.weatherdt.com/help.html
        request({
          url: '/IndexController/findWeather',
          method: 'get'
        }).then(response => {
          console.log(response.data.weatherinfo)
          // date: "15日星期三"
          // fengli: "<![CDATA[2级]]>"
          // fengxiang: "东南风"
          // high: "高温 15℃"
          // low: "低温 5℃"
          // type: "多云"

          // ganmao: "感冒易发期，外出请适当调整衣物，注意补充水分。"
          // wendu: "14"
          this.wendu = response.data.weatherinfo.temp1;
          this.wendurange = response.data.weatherinfo.temp1 + " - " + response.data.weatherinfo.temp2;
          this.otherWeather = response.data.weatherinfo.weather;
          //this.ganmao = response.data.weatherinfo.ganmao
          this.transImageUrlUtil(response.data.weatherinfo.weather);
        });
      },
      //根据类型转换不同图标
      transImageUrlUtil(text){
        if(text.indexOf("雨")!=-1){
          this.image_url = require("@/assets/weather/a_3.gif");
        }else if(text.indexOf("云")!=-1){
          this.image_url = require("@/assets/weather/a_1.gif");
        }else if(text.indexOf("阴")!=-1){
          this.image_url = require("@/assets/weather/a_2.gif");
        }else if(text.indexOf("雪")!=-1){
          this.image_url = require("@/assets/weather/a_16.gif");
        }else{
          this.image_url = require("@/assets/weather/a_0.gif");
        }
        console.log(this.image_url)
        /*switch (text) {
          case "多云":
            this.image_url = require("@/assets/weather/a_1.gif");
            break;
          case "阴":
            this.image_url = require("@/assets/weather/a_2.gif");
            break;
          case "霾":
            this.image_url = require("@/assets/weather/1605608583138583.png");
            break;
          case "小雨":
            this.image_url = require("@/assets/weather/a_9.gif");
            break;
          case "中雨":
            this.image_url = require("@/assets/weather/a_3.gif");
            break;
          case "大雨":
            this.image_url = require("@/assets/weather/a_4.gif");
            break;
          case "小雪":
            this.image_url = require("@/assets/weather/a_15.gif");
            break;
          case "中雪":
            this.image_url = require("@/assets/weather/a_16.gif");
            break;
          case "大雪":
            this.image_url = require("@/assets/weather/a_17.gif");
            break;
          default://晴
            this.image_url = require("@/assets/weather/a_0.gif");
        }*/
        //this.executeWeatherPicTimer();
      },
      //时间
      executeWeatherPicTimer: function () {
        this.timer = setInterval(() => {
          let dom =  document.getElementById("myWeatherImage");
          let height = dom.offsetHeight;
          if(height == 70){
            dom.style.height = "75px"
            dom.style.width = "75px"
          }else{
            dom.style.height = "70px"
            dom.style.width = "70px"
          }
          //console.log(dom.offsetHeight);//offsetHeight的值包括元素内容+内边距+边框
          //console.log(dom.clientHeight);//clientHeight的值包括元素内容+内边距
          //console.log(window.getComputedStyle(dom).getPropertyValue("height"));
          //getComputedStyle()获取的是最终应用在元素上的所有CSS属性对象（即使没有CSS代码，也会把默认的属性都显示出来）
          // 并且getComputedStyle()是只读的，通过getPropertyValue()获取CSS样式申明对象上的属性值。
          //console.log(dom.getBoundingClientRect().height);//height的属性值 = 元素内容+内边距+边框
        }, 1000)
      },
      //时间
      executeTimer(){
        this.timer = setInterval(()=>{
          this.getLocalTime();
        },1000)
      },
      //获取当前时间
      getLocalTime(){
        let myDate = new Date();
        // myDate.getYear(); //获取当前年份(2位)
        // myDate.getFullYear(); //获取完整的年份(4位,1970-????)
        // myDate.getMonth(); //获取当前月份(0-11,0代表1月)
        // myDate.getDate(); //获取当前日(1-31)
        // myDate.getDay(); //获取当前星期X(0-6,0代表星期天)
        // myDate.getTime(); //获取当前时间(从1970.1.1开始的毫秒数)
        // myDate.getHours(); //获取当前小时数(0-23)
        // myDate.getMinutes(); //获取当前分钟数(0-59)
        // myDate.getSeconds(); //获取当前秒数(0-59)
        // myDate.getMilliseconds(); //获取当前毫秒数(0-999)
        // myDate.toLocaleDateString(); //获取当前日期
        // let mytime=myDate.toLocaleTimeString(); //获取当前时间
        // myDate.toLocaleString( ); //获取日期与时间
        this.shifenmiao = myDate.getHours() + ":" + this.transOnetoTwoUtil(myDate.getMinutes()) + ":" + this.transOnetoTwoUtil(myDate.getSeconds());
        this.nianyueri_xinqi = myDate.getFullYear() + "-" + this.transOnetoTwoUtil((myDate.getMonth()+1)) + "-" + this.transOnetoTwoUtil(myDate.getDate())
                        + "  星期" + this.tansWeekUtil(myDate.getDay())  ;
      },
      //时间一位数换成两位数
      transOnetoTwoUtil(time){
        if(time < 10){
          return "0"+time;
        }
        return time;
      },
      //星期转换
      tansWeekUtil(week){
        switch (week) {
          case 0 :
            return "天";
          case 1 :
            return "一";
          case 2 :
            return "二";
          case 3 :
            return "三";
          case 4 :
            return "四";
          case 5 :
            return "五";
          case 6 :
            return "六";
        }
      },


    },
  }
</script>


