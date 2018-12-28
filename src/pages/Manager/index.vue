<template>
  <shell>
    <template slot="aside">
      <note-menu ref="noteMenu">
        <el-menu
          :router="true"
          :default-active="defaultActive"
          @select="handleMenuSelected"
          class="el-menu-vertical">
          <el-menu-item :index="indexes[0]">
            <i class="el-icon-tickets"></i>
            小组管理
          </el-menu-item>
          <el-menu-item :index="indexes[2]">
            <i class="el-icon-message"></i>
            收件人管理
          </el-menu-item>
          <el-menu-item :index="indexes[1]">
            <i class="el-icon-setting"></i>
            系统设置
          </el-menu-item>
          <el-menu-item :index="indexes[3]">
            <i class="el-icon-service"></i>
            收周报设置
          </el-menu-item>
          <el-menu-item :index="indexes[4]">
            <i class="el-icon-edit-outline"></i>
            实习签到
          </el-menu-item>
          <el-menu-item :index="indexes[5]">
            <i class="el-icon-edit-outline"></i>
            ip管理
          </el-menu-item>
        </el-menu>
      </note-menu>
    </template>
    <template slot="main">
      <component :is="currentComponent"></component>
    </template>
  </shell>
</template>

<script type="text/ecmascript-6">
  import noteMenu from '../../components/menu'
  import Shell from '../../components/Shell.vue'
  import teamManage from './components/teamManage.vue'
  import receiverManage from './components/receiverManage.vue'
  import systemSet from './components/systemSet.vue'
  import collectorSet from './components/collectorSet.vue'
  import internSet from './components/internSet.vue'
  import ipManage from './components/ipManage.vue'
  export default {
    components: {
      noteMenu,
      Shell,
      teamManage,
      systemSet,
      receiverManage,
      collectorSet,
      internSet,
      ipManage
    },
    data() {
      return {
        indexes: [
          '/Manager/team-manage',
          '/Manager/system-set',
          '/Manager/receiver-manage',
          '/Manager/collector-set',
          '/Manager/intern-set',
          '/Manager/ip-manage'
        ],
        components: [
          'teamManage',
          'systemSet',
          'receiverManage',
          'collectorSet',
          'internSet',
          'ipManage'
        ],
        defaultActive: '/Manager/team-manage',
        currentComponent: 'teamManage'
      }
    },
    watch: {
      '$route.path': function (index) {
        this.defaultActive = index
        this.currentComponent = this.components[this.indexes.indexOf(index)]
        this.$refs.noteMenu.close()
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
        this.defaultActive = index
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
</style>
