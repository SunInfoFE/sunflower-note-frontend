/*
create by YOU
*/
<template>
  <div class="notFound">
    <el-button @click="gotoHome" style="position: absolute; top: 50%; left: 50%; box-sizing: border-box; border-radius: 100px; width: 242px; height: 56px; margin-left: -125px; margin-top: 205px">
      返回首页
    </el-button>
  </div>
</template>

<script type="text/babel">
  export default {
    methods: {
      gotoHome() {
        this.$router.push('/')
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .notFound
    position: relative
    width: 100%
    height: 100%
    background: url('../assets/images/404.jpg') 50% 50% no-repeat
</style>
