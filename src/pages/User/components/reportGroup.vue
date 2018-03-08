/*
create by YOU
*/
<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="本周周报" name="first">
        <el-button type="primary">复制到剪切板</el-button>
        <table-pagination :data="weekData">
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
        <el-date-picker
          v-model="currentWeek"
          type="week"
          format="yyyy 第 WW 周"
          placeholder="选择周">
        </el-date-picker>
        <el-select v-model="userName" placeholder="请选择用户">
          <el-option v-for="item in users" :label="item.userName" :value="item.email" :key="item.email"></el-option>
        </el-select>
        <table-pagination :data="data">
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
        userName: 'all',
        users: [
          {userName: '所有成员', email: 'all'},
          {userName: '张三', email: 'mail1@suninfo.com'},
          {userName: '李四', email: 'mail2@suninfo.com'},
          {userName: '王小虎', email: 'mail3@suninfo.com'},
          {userName: '赵六', email: 'mail4@suninfo.com'},
          {userName: '钱老板', email: 'mail5@suninfo.com'},
          {userName: '张麻子', email: 'mail6@suninfo.com'},
          {userName: '师爷', email: 'mail7@suninfo.com'}
        ],
        weekData: [],
        data: []
      }
    },
    mounted() {
      this.getData()
    },
    methods: {
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
