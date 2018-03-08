<template>
  <div id="headBar">
    <el-row type="flex" justify="between" align="middle" class="header-bg">
      <el-col :span="12" class="left-info">
        <div class="logo-icon">
          <!--<img src="" title="周报管理系统">-->
          <h1>周报管理系统V0.5 Alpha</h1>
        </div>
      </el-col>
      <el-col :span="12" class="right-info">
        <el-row  justify="center" align="middle" style="margin-top:25px">
          <el-col>
          <a class="user-info"> 您好! {{name}} </a> <a class="user-loginout" @click="loginout()">退出登录</a>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapGetters} from 'vuex'
export default {
 data() {
  return {
    name: ''
  }
 },
  created() {
    this.name = this.$store.state.data.name || this.$store.state.data.email
  },
   methods: {
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
          margin-left:15px
        & .user-loginout:hover
          color #D9FDFF
    .scrollheight
      max-height: 500px
</style>
