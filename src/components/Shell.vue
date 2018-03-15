/*
create by YOU
*/
<template>
  <el-container class="app-shell">
    <el-header style="background: rgb(84, 92, 100);,padding-top:5px">
      <s-header></s-header>
    </el-header>
    <el-container>
      <el-aside class="shell-aside" width="200px">
        <slot name="aside"></slot>
      </el-aside>
      <el-main>
        <slot name="main"></slot>
      </el-main>
    </el-container>
    <el-footer style="height: 30px">
      <s-footer></s-footer>
    </el-footer>
  </el-container>
</template>

<script type="text/babel">
  import SHeader from './shell/header.vue'
  import SFooter from './shell/footer.vue'
  export default {
    components: {
      SHeader,
      SFooter
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .app-shell
    height: 100%

  .app-shell .shell-aside
    border-right: solid 1px #e6e6e6
    overflow: hidden
    background: #fff

  .el-container
    display: flex
    flex-direction: row
    flex: 1
    flex-basis: auto
    box-sizing: border-box
    min-width: 0

  .el-container.is-vertical
    flex-direction: column

  .el-main
    flex: 1

  .el-header
    color: #fff
    line-height: 60px

  .el-footer
    padding: 0

  /* 覆盖样式 */
  ul.el-menu
    border-right: none

  @media screen and (max-width: 768px)
    .shell-aside
      width: 0 !important
    .el-main
      padding: 0 !important
</style>
