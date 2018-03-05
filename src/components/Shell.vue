/*
create by YOU
*/
<template>
  <el-container class="app-shell">
    <el-header>Header</el-header>
    <el-container>
      <el-aside width="200px">
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

  /* 测试样式 */
  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
  }

  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
  }
</style>
