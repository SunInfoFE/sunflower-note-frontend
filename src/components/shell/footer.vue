<template>
  <footer class="s-footer">
    <div class="copyright">
      版权所有&copy;2017&nbsp;www.suninfo.com&nbsp;上海上讯信息技术股份有限公司
    </div>
  </footer>
</template>

<script type="text/babel">
  export default {
    data () {
    },
    mounted () {
    },
    computed: {
    },
    methods: {}
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .s-footer
    position: absolute
    left: 0
    bottom: 0
    width: 100%
    min-width: 1310px
    text-align: center

  .copyright
    width: 100%
    height: 20px
    line-height: 20px
    font-size: 12px
    color: #fff
    background: rgb(84, 92, 100)

  @-moz-document url-prefix() {
  . s-footer-nav ul li {
  line-height: 45 px;
  }
  }
</style>

