<template>
  <shell>
    <!--template插入菜单-->
    <template slot="aside">
      <note-menu ref="noteMenu">
        <el-menu
          :router="true"
          :default-active="defaultActive"
          :default-openeds="['reportManage', 'me', indexes[2]]"
          @select="handleMenuSelected"
          class="el-menu-vertical">
          <el-submenu index="reportManage">
            <template slot="title">
              <i class="el-icon-document"></i>
              <span>周报管理</span>
            </template>
            <el-menu-item :index="indexes[7]">我的任务</el-menu-item>
            <el-menu-item :index="indexes[0]">本周周报</el-menu-item>
            <el-menu-item :index="indexes[1]">我的周报</el-menu-item>
            <!--<el-menu-item :index="indexes[2]">小组周报</el-menu-item>-->
            <el-submenu :index="indexes[2]">
              <template slot="title">
                <span>小组周报</span>
              </template>
              <el-menu-item :index="indexes[5]">本周</el-menu-item>
              <el-menu-item :index="indexes[6]">历史</el-menu-item>
            </el-submenu>
            <el-menu-item :index="indexes[8]" v-if="collector">集中组本周周报</el-menu-item>
          </el-submenu>
          <el-submenu index="me">
            <template slot="title">
              <i class="el-icon-setting"></i>
              <span>个人中心</span>
            </template>
            <el-menu-item :index="indexes[3]">个人信息</el-menu-item>
            <el-menu-item :index="indexes[4]">密码修改</el-menu-item>
            <el-menu-item :index="indexes[9]" v-if="intern">实习签到</el-menu-item>
            <el-menu-item :index="indexes[10]" v-if="statIntern">实习签到统计</el-menu-item>
            <el-menu-item :index="indexes[11]" v-if="releaseFood">发布加班餐</el-menu-item>
            <el-menu-item :index="indexes[12]">点餐</el-menu-item>
          </el-submenu>
        </el-menu>
      </note-menu>
    </template>
    <!--template插入主要内容-->
    <template slot="main">
      <component :is="currentComponent"></component>
    </template>
  </shell>
</template>

<script type="text/ecmascript-6">
  import noteMenu from '../../components/menu'
  import Shell from '../../components/Shell.vue'
  import reportCurrentWeek from './components/reportCurrentWeek.vue'
  import reportMine from './components/reportMine.vue'
  import reportGroup from './components/reportGroup.vue'
  import meInfo from './components/meInfo.vue'
  import mePassword from './components/mePassword.vue'
  import reportGroupCurrentWeek from './components/reportGroupCurrentWeek.vue'
  import reportGroupHistory from './components/reportGroupHistory.vue'
  import todoList from './components/todoList.vue'
  import groupCollection from './components/groupCollection.vue';
  import mySigned from './components/mySigned.vue';
  import statSigned from './components/statSigned.vue';
  import releaseFood from './components/releaseFood.vue'
  import order from './components/order.vue'
  export default {
    components: {
      noteMenu,
      Shell,
      reportCurrentWeek,
      reportMine,
      reportGroup,
      meInfo,
      mePassword,
      reportGroupCurrentWeek,
      reportGroupHistory,
      todoList,
      groupCollection,
      mySigned,
      statSigned,
      releaseFood,
      order
    },
    data () {
      return {
        indexes: [
          '/User/report-currentWeek',
          '/User/report-mine',
          '/User/report-group',
          '/User/me-info',
          '/User/me-password',
          '/User/group_currentWeek',
          '/User/group_history',
          '/User/todo_list',
          '/User/group_collection',
          '/User/my_signed',
          '/User/stat_signed',
          '/User/release_food',
          '/User/order'
        ],
        components: [
          'reportCurrentWeek',
          'reportMine',
          'reportGroup',
          'meInfo',
          'mePassword',
          'reportGroupCurrentWeek',
          'reportGroupHistory',
          'todoList',
          'groupCollection',
          'mySigned',
          'statSigned',
          'releaseFood',
          'order'
        ],
        defaultActive: '/User/report-currentWeek',
        currentComponent: 'reportCurrentWeek',
        collector: false, // 是否为多组周报收集者
        intern: false, // 是否为实习生,
        statIntern: false, // 实习生签到统计页面
        releaseFood:false, //发布食物页面
      }
    },
    watch: {
      '$route.path': function (index) {
        this.defaultActive = index;
        this.currentComponent = this.components[this.indexes.indexOf(index)]
        this.$refs.noteMenu.close()
      }
    },
    mounted() {
      // 当前路由
      let path = this.$route.path
      // 动态处理用户是否为周报整理人员
      this.collector = this.$store.state.data.collector != 0 ? true : false;
      this.intern = this.$store.state.data.level == 1 ? true : false;
      this.statIntern = this.$store.state.data.level == 2 ? true : false;
      this.releaseFood = this.$store.state.data.name == "李雪松" ? true : false;
      // 判断路由是否存在,存在设置defaultActive = path
      let index = this.indexes.indexOf(path);
      if (path && index !== -1) {
        this.defaultActive = path
        this.currentComponent = this.components[index]
      } else {
        this.$router.push('/User')
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
