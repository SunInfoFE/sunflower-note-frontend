<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'App'
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    height: 100%;
    color: #2c3e50;
  }

  html, body {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    min-height: 500px
  }
  .el-dialog{
    border-radius: 5px;
  }
  pre{
    white-space: pre-line !important;
  }
</style>
