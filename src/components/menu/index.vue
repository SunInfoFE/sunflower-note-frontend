/*
create by YOU
*/
<template>
  <div ref="menuWrapper" class="menu-wrapper hidden" @click.self="close">
    <div class="menu-toggle-icon">
      <i @click="open" class="el-icon-menu"></i>
    </div>
    <slot></slot>
  </div>
</template>

<script type="text/babel">
  export default {
    methods: {
      open() {
        let menu = this.$refs.menuWrapper
        menu.className = menu.className.replace('hidden', '').trim()
      },
      close() {
        this.$refs.menuWrapper.className += ' hidden'
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .menu-wrapper
    .menu-toggle-icon
      display: none
      position: fixed
      left: 10px
      top: 10px
      width: 50px
      height: 40px
      line-height: 40px
      text-align: center
      font-size: 30px
      color: #fff
      >i
        transition: .3s
        &:active
          transform: rotate(90deg)

  @media screen and (max-width: 768px)
    .menu-wrapper
      position: absolute
      top: 0
      right: 0
      z-index: 999
      width: 100% !important
      height: 100%
      background: rgba(0, 0, 0, .3) !important
      .menu-toggle-icon
        display: block
      .el-menu-vertical
        position: absolute
        top: 0
        left: 0
        width: 70%
        height: 100%
        transition: .3s
      &.hidden
        right: 100%
        .el-menu-vertical
          left: -100%

</style>
