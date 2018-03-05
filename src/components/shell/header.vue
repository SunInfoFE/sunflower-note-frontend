<template>
  <header id="headBar">
    <el-row type="flex" justify="between" align="middle" class="header-bg">
      <el-col :span="16" class="left-info">
        <div class="logo-icon">
          <img src="" title="周报管理系统">
        </div>
      </el-col>
      <el-col :span="8" class="right-info">
        <el-row  justify="center" align="middle" :gutter="16" style="margin-top:60px">
          <el-col class="user-info-icon">
            <i class="iconfont icon-user"></i>
          </el-col>
          <el-col class="user-info">
          您好:XXXX
          </el-col>
          <el-col class="head-handler-btns">
            <span><a><i class="iconfont icon-quit-s" title="退出登录"></i></a></span>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </header>
</template>

<script type="text/ecmascript-6">

</script>

<style lang="stylus" rel="stylesheet/stylus">
  mainColor = #fff
  activeColor = #fff
  #headBar
    .header-bg
      min-width: 1310px
      color: mainColor
      height: 35px
      font-size: 14px
      background-color: bgColor
      & .s-col
        height: 35px
        line-height: 35px

      & .left-info
        display flex
        margin-left 30px
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
          border-right: 1px solid #009CBA
    .scrollheight
      max-height: 500px
</style>
