/*
create by YOU
*/
<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        type="index"
        fixed
        width="30">
      </el-table-column>
      <slot></slot>
    </el-table>
    <el-pagination
      style="margin-top: 20px"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>

<script type="text/babel">
  export default {
    data () {
      return {
        size: 20,
        currentPage: 1,
        total: 0
      }
    },
    mounted() {
      this.total = this.data.length
    },
    watch: {
      data() {
        this.total = this.data.length
      }
    },
    computed: {
      tableData () {
        let end = this.size * this.currentPage
        return this.data.slice(end - this.size, end)
      }
    },
    methods: {
      handleSizeChange(size){
        this.size = size
      },
      handleCurrentChange(currentPage){
        this.currentPage = currentPage
      }
    },
    props: {
      data: {
        type: Array,
        default() {
          return []
        }
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @media screen and (max-width: 768px)
    .el-pagination
      display: flex
      justify-content: space-around
      .el-pagination__jump
        display: none !important
</style>
