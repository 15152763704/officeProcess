<template>
  <div class="login">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form">
      <!-- <h3 class="title">
        <img src="../assets/logo/logo.png" alt="logo">
      江苏华信网络智能办公系统</h3>-->
      <h3 class="logintitle">
        <img src="../assets/logo/logo-h.png" alt="logo"/>
        网络智能办公系统
        <!--永信系统集成项目管理系统-->
      </h3>
      <div class="empty"></div>
      <el-row :gutter="2" type="flex" justify="space-between" align="middle">
        <el-col :span="10" class="img-col">
          <img style="width: 397px;
height: 361px;" src="../assets/images/login-pic.png" alt="pic" />
        </el-col>
        <div class="empty-col"></div>
        <el-col :span="10" class="login-formbox">
          <div class="title-text">用户登录</div>
          <el-form-item prop="username">
            <el-input v-model="loginForm.username" type="text" auto-complete="off" placeholder="账号">
              <svg-icon slot="prefix" icon-class="user" class="el-input__icon input-icon" />
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="loginForm.password"
              type="password"
              auto-complete="off"
              placeholder="密码"
              @keyup.enter.native="handleLogin"
            >
              <svg-icon slot="prefix" icon-class="password" class="el-input__icon input-icon" />
            </el-input>
          </el-form-item>
          <el-form-item prop="code" class="login_code_box">
            <el-input
              v-model="loginForm.code"
              auto-complete="off"
              placeholder="验证码"
              class="el_login_code_inp"
              @keyup.enter.native="handleLogin"
            >
              <svg-icon slot="prefix" icon-class="validCode" class="el-input__icon input-icon" />
            </el-input>
            <div class="login-code">
              <img :src="codeUrl" @click="getCode" class="login-code-img" />
            </div>
          </el-form-item>
          <div class="login-checkbox">
            <el-checkbox v-model="loginForm.rememberMe" style="margin:0px 0px 25px 0px;">记住密码</el-checkbox>
            <div @click="isShowDownload=true"><span>点击下载移动端</span></div>
          </div>
          <el-form-item>
            <el-button
              :loading="loading"
              size="medium"
              class="login-btn"
              type="primary"
              @click.native.prevent="handleLogin"
            >
              <span v-if="!loading">登 录</span>
              <span v-else>登 录 中...</span>
            </el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <!--  底部  -->
    <div class="el-login-footer">
      <span>技术支持：江苏华信科技有限公司</span>
      <!--<span>技术支持：江苏永信科信息技术限公司</span>-->
    </div>
    <div v-if="isShowDownload" @click="isShowDownload=false" class="download_box">
      <div class="containers" @click.stop>
        <div class="top">
          <span>下载手机客户端体验移动办公</span>
          <span class="close" @click="isShowDownload=false">x</span>
        </div>
        <div class="middle">
          <div class="left">
            <div class="left_box" >
              <div class="anzhuo" @click="download='anzhuo'">
                <div class="img"></div>
                <div>安卓版下载</div>
                <div class="triangle-right" v-show="download=='anzhuo'"></div>
              </div>
              <div class="ios" @click="download='ios'">
                <div class="img"></div>
                <div>ios版下载</div>
                <div class="triangle-right" v-show="download=='ios'"></div>
              </div>
            </div>
          </div>
          <div class="right">
            <div class="text">
              用手机上的二维码扫描软件扫描二维码，用手机自带浏览器打开安装页面即可下载客户端。
            </div>
            <div class="tu_box" >
              <div class="iostu" v-if="download=='ios'"></div>
              <div class="anzhuotu" v-if="download=='anzhuo'"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getCodeImg } from '@/api/login'
import Cookies from 'js-cookie'
import { decrypt, encrypt } from '@/utils/jsencrypt'

export default {
  name: 'Login',
  data() {
    return {
      isShowDownload:false,
      download:'anzhuo',
      codeUrl: '',
      cookiePassword: '',
      loginForm: {
        username: '',
        password: '',
        rememberMe: false,
        code: '',
        uuid: '',
      },
      loginRules: {
        username: [
          { required: true, trigger: 'blur', message: '用户名不能为空' },
        ],
        password: [
          { required: true, trigger: 'blur', message: '密码不能为空' },
        ],
        code: [
          { required: true, trigger: 'change', message: '验证码不能为空' },
        ],
      },
      loading: false,
      redirect: undefined,
    }
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true,
    },
  },
  created() {
    this.getCode()
    this.getCookie()
  },
  methods: {
    getCode() {
      getCodeImg().then((res) => {
        this.codeUrl = 'data:image/gif;base64,' + res.img
        this.loginForm.uuid = res.uuid
      })
    },
    getCookie() {
      const username = Cookies.get('username')
      const password = Cookies.get('password')
      const rememberMe = Cookies.get('rememberMe')
      this.loginForm = {
        username: username === undefined ? this.loginForm.username : username,
        password:
          password === undefined ? this.loginForm.password : decrypt(password),
        rememberMe: rememberMe === undefined ? false : Boolean(rememberMe),
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true
          if (this.loginForm.rememberMe) {
            Cookies.set('username', this.loginForm.username, { expires: 30 })
            Cookies.set('password', encrypt(this.loginForm.password), {
              expires: 30,
            })
            Cookies.set('rememberMe', this.loginForm.rememberMe, {
              expires: 30,
            })
          } else {
            Cookies.remove('username')
            Cookies.remove('password')
            Cookies.remove('rememberMe')
          }
          this.$store
            .dispatch('Login', this.loginForm)
            .then(() => {
              this.$router.push({ path: this.redirect || '/' }).catch(() => {})
            })
            .catch(() => {
              this.loading = false
              this.getCode()
            })
        }
      })
    },
  },
}
</script>

<style rel="stylesheet/scss" lang="scss">
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-image: url('../assets/images/login-background.jpg');
  background-size: cover;
}

.logintitle {
  margin: 0px auto 30px auto;
  text-align: center;
  color: #707070;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    margin-right: 8px;
    height: 24px;
    margin-top: 3px;
  }
}

.login-form {
  border-radius: 6px;
  background: #ffffff;
  width: 1200px;
  height: 620px;
  background: #ffffff;
  border-radius: 20px 20px 20px 20px;
  padding: 30px 60px;

  .title {
    margin-bottom: 27px !important;
    //     width: 141px;
    // height: 21px;
    font-size: 26px;
    font-family: zihun105hao;
    font-weight: normal;
    // color: #2691f9;
    color: #000;
    font-weight: 700;
  }
  .empty {
    width: 1076px;
    height: 1px;
    border: 1px dashed #0e6ed6;
    opacity: 0.2;
    margin-bottom: 45px;
  }
  .empty-col {
    width: 1px;
    height: 250px;
    border: 1px dashed #c3c3c3;
    opacity: 0.4;
  }
  .img-col {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .el-input {
    height: 38px;
    input {
      height: 38px;
    }
  }
  .input-icon {
    height: 39px;
    width: 14px;
    margin-left: 2px;
  }
}
.el-form-item {
  margin-bottom: 40px;
}
.login-formbox {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  .title-text {
    width: 100%;
    text-align: center;
    height: 28px;
    font-size: 30px;
    font-family: 'zihun176hao';
    font-weight: normal;
    color: #50a4fe;
    margin-bottom: 60px;
  }
  .el-input {
    width: 300px;
    input {
      border: none;
      border-bottom: 1px solid #dfdfdf;
      width: 300px;
    }
  }
}
.login-btn {
  width: 300px !important;
  height: 50px;
  background: linear-gradient(0deg, #5243f4, #1981fe);
  font-size: 20px;
  font-family: 'SourceHanSansSC';
  font-weight: 400;
  color: #ffffff;
  border-radius: 25px;
}
.login-tip {
  font-size: 13px;
  text-align: center;
  color: #bfbfbf;
}
.login-code {
  height: 38px;
  float: right;
  img {
    cursor: pointer;
    vertical-align: middle;
  }
}
.el_login_code_inp {
  width: 200px !important;
  input {
    width: 200px !important;
  }
}
.el-form-item__content {
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-checkbox {
  width: 300px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  span{
    font-size: 14px;
    text-decoration: underline;
    color: #1890ff;
    cursor: pointer;
    user-select: none;
  }
}
.el-login-footer {
  height: 40px;
  line-height: 40px;
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
  color: #fff;
  font-family: Arial;
  font-size: 12px;
  letter-spacing: 1px;
}
.login-code-img {
  height: 38px;
}
.download_box{
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #000000ab;
  z-index: 1000000;
  .containers{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 600px;
    height: 400px;
    background: white;
    border-radius: 10px;
    overflow: hidden;
    .top{
      width: 100%;
      height: 50px;
      background: #ededed;
      font-weight: bold;
      line-height: 50px;
      text-align: center;
      user-select: none;
      .close{
        position: absolute;
        right: 20px;
        cursor: pointer;
      }
    }
    .middle{
      width: 100%;
      height: 88%;
      display: flex;
      .left{
        width: 40%;
        height: 100%;
        padding: 40px 0 100px 0;
        box-sizing: border-box;
        .left_box{
          width: 100%;
          height: 100%;
          box-sizing: border-box;
          border-right: 2px solid #ebebeb;
          display: flex;
          flex-direction: column;
          align-items: center;
          user-select: none;
          cursor: pointer;
          .ios{
            width: 135px;
            height: 40px;
            background: black;
            display: flex;
            align-items: center;
            justify-content: space-evenly;
            color: white;
            border-radius: 5px;
            margin: 10px;
            position: relative;
            .img{
              width: 30px;
              height: 30px;
              background: url("../assets/images/IOS.png") no-repeat;
              background-size: 30px;
            }
            .triangle-right {
              width: 0;
              height: 0;
              border-top: 10px solid transparent;
              border-left: 15px solid black;
              border-bottom: 10px solid transparent;
              position: absolute;
              right: -14px;
            }

          }
          .anzhuo{
            width: 135px;
            height: 40px;
            background: #47a44b;
            display: flex;
            align-items: center;
            justify-content: space-evenly;
            color: white;
            border-radius: 5px;
            margin: 10px;
            position: relative;
            .img{
              width: 32px;
              height: 32px;
              background: url("../assets/images/安卓.png") no-repeat;
              background-size: 30px;
            }
            .triangle-right {
              width: 0;
              height: 0;
              border-top: 10px solid transparent;
              border-left: 15px solid #47a44b;
              border-bottom: 10px solid transparent;
              position: absolute;
              right: -14px;
            }


          }
        }
      }
      .right{
        width: 60%;
        height: 100%;
        padding: 40px;
        box-sizing: border-box;
        .text{
          color: #a7a7a7;
          font-size: 13px;
          user-select: none;
        }
        .tu_box{
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          .iostu{
            margin-top: 20px;
            width: 150px;
            height: 150px;
            background: url("../assets/images/IOS下载.png");
            background-size: 100%;
          }
          .anzhuotu{
            margin-top: 20px;
            width: 150px;
            height: 150px;
            background: url("../assets/images/安卓下载.jpg");
            background-size: 100%;
          }
        }

      }
    }
  }
}
</style>
