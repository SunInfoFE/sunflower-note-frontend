/*
create by YOU
*/
<template>
  <div>
    <div class="buttons-wrapper">
      <el-button type="primary" style="margin-bottom: 20px">复制周报到剪切板</el-button>
    </div>
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
        weekData: []
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
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @media screen and (max-width: 768px)
    .buttons-wrapper
      padding: 10px
      .el-button
        width: 100%
</style>
