<template>
<shell>
  <template slot="aside">
    <el-menu
     :router="true"
     :default-active="defaultActive"
     @select="handleMenuSelected"
     class="el-menu-vertical-demo">
      <el-menu-item :index="indexes[0]">小组管理</el-menu-item>
      <el-menu-item :index="indexes[1]">系统设置</el-menu-item>
    </el-menu>
  </template>
  <template slot="main">
    <component :is="currentComponent"></component>
  </template>
</shell>
</template>

<script type="text/ecmascript-6">
  import Shell from '../../components/Shell.vue'
  import teamManage from './components/teamManage.vue'
  import systemSet from './components/systemSet.vue'
  export default {
  components: {
  Shell,
  teamManage,
  systemSet
   },
   data() {
    return {
    indexes: [
      '/Manager/team-manage',
      '/Manager/system-set'
    ],
    components: [
     'teamManage',
     'systemSet'
    ],
      defaultActive: '/Manager/team-manage',
      currentComponent: 'teamManage'
    }
   },
   mounted() {
     let path = this.$route.path
     // 判断路由是否存在,存在设置defaultActive = path
     let index = this.indexes.indexOf(path)
     if (path && index !== -1) {
       this.defaultActive = path
       this.currentComponent = this.components[index]
     } else {
       this.$router.push('/Manager')
     }
   },
    methods: {
      handleMenuSelected(index){
        console.log(index)
        this.currentComponent = this.components[this.indexes.indexOf(index)]
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
</style>
