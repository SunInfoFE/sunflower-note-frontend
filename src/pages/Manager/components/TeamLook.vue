<template>
<div class="teamlook">
  <el-row>小组名</el-row>
  <el-row>{{TeamData.name}}</el-row>
  <el-row>备注</el-row>
  <el-row>{{TeamData.remark}}</el-row>
  <el-row>成员列表</el-row>
  <div>
  <el-input
    suffix-icon="el-icon-search"
    placeholder="请输入查询内容">
  </el-input>
</div>
  <table-pagination :data="lookData">
    <el-table-column
      prop="name"
      label="用户名"
      width="100"
    >
    </el-table-column>
    <el-table-column
      prop="email"
      label="邮箱"
    >
    </el-table-column>
    <el-table-column
      prop="remark"
      label="备注"
      width="150"
    >
    </el-table-column>
    <el-table-column
      prop="sex"
      label="性别"
      width="80"
    >
    </el-table-column>
    <el-table-column
      label="操作"
      width="100"
    >
      <template slot-scope="scope">
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
     }
     },
    props: {
      lookData: {
        type: Array
      },
      TeamData: {
      type: Object
      }
    },
     methods: {
       deleteHandler(row) {
         this.$emit('delete', row)
       }
     }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
 .teamlook
   .el-row
       border: 1px #DCDFE6 solid
       border-bottom: 0px
       padding-left: 10px
       height: 40px
       line-height: 40px
</style>
