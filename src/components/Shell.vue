/*
create by YOU
*/
<template>
  <el-container class="app-shell">
    <el-header style="background: rgb(84, 92, 100);">Header</el-header>
    <el-container>
      <el-aside class="shell-aside" width="200px">
        <slot name="aside"></slot>
      </el-aside>
      <el-main>
        <slot name="main"></slot>
      </el-main>
    </el-container>
    <el-footer>Footer</el-footer>
  </el-container>
</template>

<script type="text/babel">
  export default {};
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .app-shell
    min-height: 100%

  .app-shell .shell-aside
    border-right: solid 1px #e6e6e6
    overflow: hidden

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
</style>
