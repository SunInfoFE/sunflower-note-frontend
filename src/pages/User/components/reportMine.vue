/*
create by YOU
*/
<template>
  <div>
    <table-pagination :data="tableData">
      <el-table-column
        prop="date"
        label="周报名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="创建时间"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="本周工作总结">
      </el-table-column>
      <el-table-column
        prop="name"
        label="下周工作计划">
      </el-table-column>
      <el-table-column
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button type="text" icon="el-icon-view" @click="" title="查看"></el-button>
          <el-button type="text" icon="el-icon-delete" @click="" title="删除"></el-button>
        </template>
      </el-table-column>
    </table-pagination>
  </div>
</template>

<script type="text/babel">
  import tablePagination from '@/components/tablePagination'
  export default {
    components: {
      tablePagination
    },
    data() {
      return {
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
