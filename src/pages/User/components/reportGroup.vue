/*
create by YOU
*/
<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="本周周报" name="first">
        <table-pagination :data="tableData">
          <el-table-column
            prop="date"
            label="作者"
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
          <el-option label="张三" value="0"></el-option>
          <el-option label="李四" value="1"></el-option>
          <el-option label="全部" value="all"></el-option>
        </el-select>
        <table-pagination :data="tableData">
          <el-table-column
            prop="name"
            label="作者"
            width="120">
          </el-table-column>
          <el-table-column
            prop="date"
            label="提交时间"
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
        </table-pagination>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script type="text/babel">
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
    },
    methods: {
      handleClick() {
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
