/*
create by YOU
*/
<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="本周周报" name="first">
        <el-button type="primary" style="margin-bottom: 20px">复制到剪切板</el-button>
        <table-pagination :data="weekData">
          <el-table-column
            type="index"
            width="50">
          </el-table-column>
          <el-table-column
            prop="name"
            label="作者"
            width="180">
          </el-table-column>
          <el-table-column
            prop="summary"
            label="本周工作总结">
            <template slot-scope="scope">
              <pre>{{scope.row.summary}}</pre>
            </template>
          </el-table-column>
          <el-table-column
            prop="plan"
            label="下周工作计划">
            <template slot-scope="scope">
              <pre>{{scope.row.plan}}</pre>
            </template>
          </el-table-column>
        </table-pagination>
      </el-tab-pane>
      <el-tab-pane label="历史周报" name="second">
        <div style="margin-bottom: 20px">
          <el-date-picker
            v-model="currentWeek"
            type="week"
            format="yyyy 第 WW 周"
            placeholder="选择周">
          </el-date-picker>
          <el-select v-model="email" placeholder="请选择用户">
            <el-option v-for="item in users" :label="`${item.name}(${item.email})`" :value="item.email"
                       :key="item.email"></el-option>
          </el-select>
        </div>
        <table-pagination :data="tableData">
          <el-table-column
            type="index"
            width="50">
          </el-table-column>
          <el-table-column
            prop="name"
            label="作者"
            width="120">
          </el-table-column>
          <el-table-column
            prop="lastUpdateTime"
            label="提交时间"
            width="180">
            <template slot-scope="scope">
              <pre>{{ new Date(scope.row.lastUpdateTime).toLocaleString() }}</pre>
            </template>
          </el-table-column>
          <el-table-column
            prop="summary"
            label="本周工作总结">
            <template slot-scope="scope">
              <pre>{{scope.row.summary}}</pre>
            </template>
          </el-table-column>
          <el-table-column
            prop="plan"
            label="下周工作计划">
            <template slot-scope="scope">
              <pre>{{scope.row.plan}}</pre>
            </template>
          </el-table-column>
        </table-pagination>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script type="text/babel">
  import $axios from '@/plugins/ajax'
  import tablePagination from '@/components/tablePagination'
  export default {
    components: {
      tablePagination
    },
    data () {
      return {
        activeName: 'first',
        currentWeek: '',
        email: 'all',
        users: [],
        weekData: [],
        data: []
      }
    },
    computed: {
      tableData() {
        return this.data.filter(item => {
          // 判断当前查询值不为空 且和item的相关字段不相等 返回false
          console.log(this.email)
          if (this.email !== 'all' && this.email !== item.email) {
            return false
          }
          if (this.currentWeek && this.currentWeek.toDateString() !== new Date(item.week).toDateString()) {
            return false
          }
          // 其它所有情况返回true
          return true
        })
      }
    },
    mounted() {
      this.getData()
      this.getUsers()
    },
    methods: {
      getUsers() {
        $axios.get('/group/groupManage/getGroupMember', {
          id: this.$store.state.data.groupId
        }).then(({data}) => {
          if (data.status) {
            this.users = data.data
            this.users.unshift({name: '所有成员', email: 'all'})
            console.log(this.users)
          }
        })
      },
      getData() {
        $axios.post('report/groupCurrentWeekReport/get').then(({data}) => {
          if (data.status) {
            this.weekData = data.data
          }
        })
        $axios.post('report/groupHistoryWeekReport/get').then(({data}) => {
          if (data.status) {
            this.data = data.data
          }
        })
      },
      handleClick() {
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
