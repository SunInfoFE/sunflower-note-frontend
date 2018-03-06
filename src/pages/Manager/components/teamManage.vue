<template>
<div>
   <div>
   <el-input
   suffix-icon="el-icon-search"
   placeholder="请输入查询内容"
   style="width: 500px">
   </el-input>
   </div>
  <table-pagination :data="tableData">
    <el-table-column
    prop="name"
    label="组名"
    >
    </el-table-column>
    <el-table-column
    prop="remark"
    label="备注"
    >
    </el-table-column>
    <el-table-column
    prop="memberNum"
    label="成员数"
    >
    </el-table-column>
    <el-table-column
     label="操作"
     width="100"
    >
    <template slot-scope="scope">
      <el-button type="text" icon="el-icon-view" @click="" tilte="查看"></el-button>
      <el-button type="text" icon="el-icon-edit" @click="" tilte="编辑"></el-button>
      <el-button type="text" icon="el-icon-delete" @click="deleteHandler(scope.row)" tilte="删除"></el-button>
    </template>
    </el-table-column>
  </table-pagination>
</div>
</template>

<script type="text/ecmascript-6">
import tablePagination from '@/components/tablePagination';
import $axios from '@/plugins/ajax';
export default {
 components: {
   tablePagination
 },
 data() {
 return {
   tableData: []
 }
 },
 created() {
   this.getgroupList()
 },
 methods: {
 getgroupList() {
   $axios.get('/group/groupManage/get').then((res) => {
     this.tableData = res.data.data
   })
 },
   deleteHandler(row) {
    if (row.memberNum !== 0) {
     this.$message({
        type: 'warning',
        message: '仅可以删除成员数为0的小组'
      })
    } else {
      $axios.post('/group/groupManage/delete', {idList: [row.id]}).then((res) => {
      if (res.data.status === true) {
        this.$message({
          type: 'success',
          message: '删除成功'
        })
        this.getgroupList()
      } else {
        this.$message({
          type: 'warning',
          message: '失败'
        })
      }
      })
    }
   }
 }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
</style>
