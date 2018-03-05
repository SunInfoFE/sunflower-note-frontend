<template>
  <shell>
    <template slot="aside">
      aside
    </template>
    <template slot="main">
      main
    </template>
  </shell>
</template>

<script type="text/ecmascript-6">
  import Shell from '../../components/Shell.vue'
  export default {
    components: {
      Shell
    },
    data () {
      return {}
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
</style>
