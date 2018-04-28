<template>
  <div id="headBar">
    <el-row type="flex" justify="between" align="middle" class="header-bg">
      <el-col :span="18" class="left-info">
        <div class="logo-icon">
          <!--<img src="" title="周报管理系统">-->
          <h1>周报管理系统V1.0 Alpha</h1>
        </div>
      </el-col>
      <el-col :span="6" class="right-info">
        <el-row justify="center" align="middle" style="margin-top:25px">
          <el-col>
            <i @click="openHelpDialog" class="iconfont icon-help"></i> &nbsp;&nbsp;&nbsp;&nbsp;
            <a class="user-info"> 您好! {{name}} </a>
            <a class="user-loginout" @click="loginout()">登出</a>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-dialog
      title="帮助"
      :visible.sync="helpDialog"
      width="30%">
      <el-collapse v-model="activeName" accordion>
        <el-collapse-item title="我的任务模块" name="1">
          <template slot="title">
            我的任务模块<i class="iconfont icon-help"></i>
          </template>
          <div style="padding: 10px">
            <span>添加单个任务条目（默认为未完成状态）</span><br>
            <span>点击完成将任务变为完成状态</span><br>
            <span>选择已完成和未完成任务生成周报</span><br>
            <span>&nbsp;&nbsp;&nbsp;&nbsp;已完成任务->本周工作内容</span><br>
            <span>&nbsp;&nbsp;&nbsp;&nbsp;未完成任务->下周工作计划</span><br>
          </div>
        </el-collapse-item>
        <el-collapse-item title="本周周报模块" name="2">
          <template slot="title">
            本周周报模块<i class="iconfont icon-help"></i>
          </template>
          <div style="padding: 10px">
            <span>本周周报模块</span><br>
          </div>
        </el-collapse-item>
        <el-collapse-item title="我的周报模块" name="3">
          <template slot="title">
            我的周报模块<i class="iconfont icon-help"></i>
          </template>
          <div style="padding: 10px">
            <span>我的周报模块</span><br>
          </div>
        </el-collapse-item>
        <el-collapse-item title="小组周报模块" name="4">
          <template slot="title">
            小组周报模块<i class="iconfont icon-help"></i>
          </template>
          <div style="padding: 10px">
            <span>小组周报模块</span><br>
          </div>
        </el-collapse-item>
      </el-collapse>
      <span slot="footer" class="dialog-footer">
        <el-button @click="helpDialog = false">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapGetters} from 'vuex'
  export default {
    data() {
      return {
        name: '',
        helpDialog: false,
        activeNames: '1'
      }
    },
    created() {
      this.name = this.$store.state.data.name || this.$store.state.data.email
    },
    methods: {
      openHelpDialog() {
        this.helpDialog = true
      },
      loginout() {
        this.$confirm('确定退出登录?', '提示', {confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning'}).then(() => {
          this.$store.dispatch('LOGOUT')
          window.location.reload('/#/login')
        }).catch();
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  mainColor = #fff
  activeColor = #fff
  #headBar
    .header-bg
      color: mainColor
      height: 35px
      font-size: 14px
      background-color: bgColor
      & .s-col
        height: 35px
        line-height: 35px

      & .left-info
        display flex
        & .logo-icon
          margin-top: 30px
      & .right-info
        display flex
        justify-content flex-end
        margin-right 8px
        & i
          font-size: 20px
          color #fff
          cursor pointer
        & .search-btn
          i:active
            color: activeColor
        & .search-btn
          i:hover
            cursor: pointer
            color #D9FDFF
        & .head-handler-btns
          display flex
          & span
            width 40px
            height 35px
            text-align center
            & a i:active
              color: activeColor
            & a i:hover
              cursor: pointer
              color #D9FDFF
        & .user-info
          cursor pointer
          font-size 12px
          color #fff
        & .user-info:hover
          color #D9FDFF
        & .user-info:after
          display: inline-block
          width: 10px
          height: 10px
          content: ""
          margin-bottom: 1px
        & .user-loginout
          cursor pointer
          font-size 12px
          width: 10px
          color #fff
          margin-left: 15px
        & .user-loginout:hover
          color #D9FDFF
    .scrollheight
      max-height: 500px

  @media screen and (max-width: 768px)
    .logo-icon
      margin-left: 60px !important

    .user-info
      display: none

    .el-message-box
      width: auto !important

  @media screen and (max-width: 500px)
    .logo-icon
      h1
        font-size: 16px

  @media screen and (max-width: 400px)
    .logo-icon
      h1
        font-size: 12px
</style>
