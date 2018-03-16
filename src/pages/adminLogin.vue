<template>
  <section id="adminLogin-page">
    <div class="all_bg">
      <div class="login_wrapper">
        <div class="top_con">
          <p>周报管理系统</p>
        </div>
        <div class="bottom_con">
          <p class="wel_word">欢迎管理员登录:</p>
          <el-form :model="loginForm" :rules="rules" ref="loginForm" labs-position="left" labs-width="0px"
                   class="demo-ruleForm login-container">
            <el-form-item prop="email" class="inp_group username">
              <label></label>
              <el-input @keyup.enter.native="handleSubmit" id="username" type="text" v-model="loginForm.email"
                        auto-complete="off" placeholder="账号" autofocus></el-input>
            </el-form-item>
            <el-form-item prop="password" class="inp_group password">
              <label></label>
              <el-input @keyup.enter.native="handleSubmit" id="password" type="password" v-model="loginForm.password"
                        auto-complete="off" placeholder="密码"></el-input>
            </el-form-item>
            <el-form-item style="width: 320px;">
              <el-button @click.native.prevent="jumpToLogin" icon="el-icon-back">
                普通用户登录
              </el-button>
              <el-button style="float: right" @click.native.prevent="handleSubmit"
                         :disabled="logining">{{loginButton}}
              </el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="clr"></div>
      </div>
      <footer>
        <p>版权所有&copy;{{ new Date().getYear() }} 上海上讯信息技术股份有限公司</p>
        <p>Copyright&copy;{{ new Date().getYear() }} Shanghai Suninfo Information Technology Co., Ltd. All rights reserved</p>
      </footer>
    </div>
  </section>
</template>

<script>
  import $axios from '@/plugins/ajax'
  import Validaters from '@/common/utils/validaters';
  export default {
    data () {
      return {
        logining: false,
        loginButton: '登 录',
        loginForm: {
          email: '',
          password: ''
        },
        loginTypeName: '--',
        rules: {
          email: [
            {required: true, message: '请输入邮箱账号', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'}
          ]
        }
      };
    },
    computed: {
      btnStyle() {
        if (this.sendDisable) {
          return 'color:#ff4949;'
        }
      }
    },
    created () {
    },
    methods: {
      toggleLogining(state) {
        if (state) {
          this.logining = true;
          this.loginButton = '登录中...';
        } else {
          this.logining = false;
          this.loginButton = '登录';
        }
      },
      handleSubmit (ev) {
        let _self = this
        this.$refs.loginForm.validate((valid) => {
          if (valid) {
            _self.toggleLogining(true)
            let loginParams = _self.loginForm
            _self.$store.dispatch('adminLOGIN', loginParams).then(function (data) {
              _self.toggleLogining(false)
              _self.userData = data
              _self.$router.push('/');
            }).catch(function (data) {
              _self.toggleLogining(false)
              _self.$message({
                message: data.data,
                type: 'error'
              });
            })
          } else {
            _self.$message({
              type: 'warning',
              message: '请完善登录信息！'
            })
            return false;
          }
        });
      },
      jumpToLogin() {
        this.$router.push('/Login')
      }
    }
  }
</script>

<style>
  #adminLogin-page .dialogScrollHeight {
    height: 85px;
  }

  #adminLogin-page input {
    border: none;
  }

  #adminLogin-page .el-input, #adminLogin-page .el-select {
    width: 80%;
  }

  #adminLogin-page .el-select .el-input {
    width: 100%;
  }

  #login-div {
    height: 42px;
    line-height: 42px;
    color: #fff;
  }

  #adminLogin-page .el-form-item-error {
    top: 39px
  }

  /******公共******/
  .fl {
    float: left;
  }

  .fr {
    float: right;
  }

  .clr {
    clear: both;
  }

  input::-webkit-input-placeholder {
    color: #515c65;
  }

  input:-moz-placeholder {
    color: #515c65;
  }

  input::-moz-placeholder {
    color: #515c65;
  }

  input:-ms-input-placeholder {
    color: #515c65;
  }

  /******主内容******/
  #adminLogin-page {
    background: #030a13 url(../assets/images/login/all_pg.jpg) no-repeat;
    background-size: cover;
    height: 100vh
  }

  .login_wrapper {
    width: 960px;
    margin: 0 auto;
    padding-top: 5%
  }

  .top_con {
    width: 100%;
    text-align: center;
    font-size: 20px;
    color: #000;
    line-height: 28px;
  }

  /*LOGO*/
  .top_con img.logo {
    display: block;
    width: 386px;
    margin-top: 125px;
  }

  /*公告*/
  .notice_con {
    width: 424px;
    height: 206px;
    margin-top: 40px;
    background: url(../assets/images/login/notice_bg.png) no-repeat;
  }

  .notice_con .s-carousel-item.is-active {
    border: none;
    box-shadow: none;
  }

  .notice_con h4 {
    padding-top: 18px;
    text-align: center;
    color: #35b0e3;
    font-size: 16px;
    font-weight: bold;
    line-height: 46px;
  }

  .notice_con p {
    width: 86%;
    margin: 0 auto; /*height: 85px;*/
    color: #f9f9f9;
    font-size: 14px;
    line-height: 22px;
  }

  .notice_con .page {
    width: 86%;
    margin: 15px auto 0;
  }

  .notice_con .page span {
    display: block;
    float: left;
    font-size: 12px;
    line-height: 24px;
    color: #515c65;
  }

  .notice_con .page .page_turn {
    float: right;
    width: auto;
  }

  .notice_con .page .page_turn a {
    display: block;
    float: left;
    width: 24px;
    height: 24px;
    margin-left: 5px;
    background-color: rgba(22, 117, 203, .5);
    background-repeat: no-repeat;
    background-position: center;
    border-radius: 2px;
    border: 1px solid #195482;
  }

  .notice_con .page .page_turn a:hover {
    transition: all .2s;
    background-color: rgba(22, 117, 203, 1);
    border-radius: 2px;
    border: 1px solid #1c6dad;
  }

  /*登录信息*/
  .bottom_con {
    width: 384px;
    height: 370px;
    margin: 0 auto;
    padding-top: 75px;
    border-radius: 50%;
    padding-left: 58px;
    background: url(../assets/images/login/input_bg.jpg) 36% 23% no-repeat;
    background-size: 143% auto;
    background-position: 47% 47%;
  }

  .bottom_con .wel_word {
    padding-bottom: 5px;
    font-size: 20px;
    color: #000;
    line-height: 28px;
    text-align: left;
  }

  /*登录框*/
  .inp_group {
    width: 320px;
    height: 42px;
    margin-top: 12px;
    margin-bottom: 20px;
    /*background-color: rgba(41, 59, 74, .3);*/
    border-radius: 2px;
    border: 1px solid rgba(41, 59, 74, .3);
  }

  .inp_group:hover, .inp_group:focus {
    background-color: rgba(32, 152, 208, .2);
    border: 1px solid rgba(32, 152, 208, .6);
    transition: all .15s ease-in-out;
  }

  .inp_group label {
    display: block;
    width: 52px;
    height: 42px;
    float: left;
  }

  .inp_group input, .inp_group select {
    width: 250px;
    height: 42px;
    font-size: 14px;
    line-height: 42px;
    background: none;
  }

  .inp_group.identify input {
    width: 100%
  }

  .inp_group select {
    background: url(../assets/images/login/select_arrow.png) right center no-repeat;
    appearance: none;
    -moz-appearance: none;
    -webkit-appearance: none;
  }

  .username label {
    background: url(../assets/images/login/username_icon.png) 20px center no-repeat;
  }

  .password label {
    background: url(../assets/images/login/password_icon.png) 20px center no-repeat;
  }

  .method label {
    background: url(../assets/images/login/method_icon.png) 20px center no-repeat;
  }

  /*记住密码*/
  .remember {
    height: 40px;
    margin-top: 10px;
  }

  .remember input {
    background: none;
    opacity: 0;
  }

  .remember label {
    color: #8c98a2;
    line-height: 30px;
    position: relative;
    padding-left: 12px;
    cursor: pointer;
  }

  .remember label:before {
    content: "";
    position: absolute;
    z-index: 99;
    width: 16px;
    height: 16px;
    left: 0;
    top: 1px;
    background-color: rgba(22, 117, 203, 0);
    border-radius: 2px;
    border: 1px solid #293b4a;
  }

  .remember label:after {
    content: "";
    position: absolute;
    z-index: 999;
    width: 16px;
    height: 16px;
    left: 0;
    top: 1px;
    background-image: url(../assets/images/login/opt.png);
    background-repeat: no-repeat;
    background-position: center;
    background-color: rgba(22, 117, 203, .7);
    border-radius: 2px;
    border: 1px solid #1c6dad;
  }

  /*错误提示*/
  .error {
    color: #fc2b2b;
    line-height: 30px;
    margin-top: 5px;
  }

  /******版权信息******/
  #adminLogin-page footer {
    position: fixed;
    width: 100%;
    bottom: 10px;
    height: auto !important;
  }

  #adminLogin-page footer p {
    font-size: 12px;
    color: #333D46;
    line-height: 18px;
    text-align: center;
  }

  @media screen and (max-width: 768px) {
    .login_wrapper {
      width: 100% !important;
    }

    .bottom_con {
      box-sizing: border-box;
      width: 100% !important;
      padding: 75px 10px 0 !important;
      background: none !important;
    }

    .bottom_con .el-form-item {
      box-sizing: border-box;
      width: 100%;
      color: #fff !important;
    }

    .bottom_con .el-form-item input {
      color: #fff !important;
    }
  }
</style>



