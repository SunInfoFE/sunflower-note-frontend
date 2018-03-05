<template>
  <shell>
    <!--template插入菜单-->
    <template slot="aside">
      <el-menu
        :router="true"
        :default-active="defaultActive"
        @select="handleMenuSelected"
        class="el-menu-vertical-demo">
        <el-submenu index="reportManage">
          <template slot="title">
            <i class="el-icon-document"></i>
            <span>周报管理</span>
          </template>
          <el-menu-item :index="indexes[0]">本周周报</el-menu-item>
          <el-menu-item :index="indexes[1]">我的周报</el-menu-item>
          <el-menu-item :index="indexes[2]">小组周报</el-menu-item>
        </el-submenu>
        <el-submenu index="me">
          <template slot="title">
            <i class="el-icon-setting"></i>
            <span>个人中心</span>
          </template>
          <el-menu-item :index="indexes[3]">个人信息</el-menu-item>
          <el-menu-item :index="indexes[4]">密码修改</el-menu-item>
        </el-submenu>
      </el-menu>
    </template>
    <!--template插入主要内容-->
    <template slot="main">
      <component :is="currentComponent"></component>
    </template>
  </shell>
</template>

<script type="text/ecmascript-6">
  import Shell from '../../components/Shell.vue'
  import reportCurrentWeek from './components/reportCurrentWeek.vue'
  import reportMine from './components/reportMine.vue'
  import reportGroup from './components/reportGroup.vue'
  import meInfo from './components/meInfo.vue'
  import mePassword from './components/mePassword.vue'
  export default {
    components: {
      Shell,
      reportCurrentWeek,
      reportMine,
      reportGroup,
      meInfo,
      mePassword
    },
    data () {
      return {
        indexes: [
          'report-currentWeek',
          'report-mine',
          'report-group',
          'me-info',
          'me-password'
        ],
        components: [
          'reportCurrentWeek',
          'reportMine',
          'reportGroup',
          'meInfo',
          'mePassword'
        ],
        defaultActive: 'report-currentWeek',
        currentComponent: 'reportCurrentWeek'
      }
    },
    mounted() {
      // 当前路由
      let path = this.$route.params.path
      // 判断路由是否存在,存在设置defaultActive = path
      let index = this.indexes.indexOf(path)
      if (path && index !== -1) {
        this.defaultActive = path
        this.currentComponent = this.components[index]
      } else {
        this.$router.push('/User')
      }
    },
    methods: {
      handleMenuSelected(index){
        console.log(index)
        this.currentComponent = this.components[this.indexes.indexOf(index)]
      }
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
</style>
