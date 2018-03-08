<template>
  <div class="s-footer">
    <div class="copyright">
      版权所有&copy;{{ new Date().getYear() }}&nbsp;www.suninfo.com&nbsp;上海上讯信息技术股份有限公司
    </div>
  </div>
</template>

<script type="text/babel">
  export default {}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .s-footer
    width: 100%
    text-align: center

  .copyright
    width: 100%
    height: 30px
    line-height: 30px
    font-size: 12px
    color: #fff
    background: rgb(84, 92, 100)

  @-moz-document url-prefix() {
  . s-footer-nav ul li {
  line-height: 45 px;
  }
  }
</style>

