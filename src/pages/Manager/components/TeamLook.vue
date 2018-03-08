<template>
  <div class="teamlook">
    <el-form class="topForm" label-position="top" :model="TeamData">
      <el-form-item label="小组名">
        <el-input v-model="TeamData.name" disabled></el-input>
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="TeamData.remark" type="textarea" disabled></el-input>
      </el-form-item>
    </el-form>
    <div style="margin-top: 20px">
      <el-input
        suffix-icon="el-icon-search"
        placeholder="请输入用户名"
        v-model="searchlookdata"
      >
      </el-input>
    </div>
    <table-pagination :data="tableData">
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
        searchlookdata: ''
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
    computed: {
      tableData() {
        return this.lookData.filter(item => {
          // 判断当前查询值不为空 且和item的相关字段不相等 返回false
          if (item.name.indexOf(this.searchlookdata) === -1) {
            return false
          }
          return true
        })
      }
    },
    created() {
    },
    methods: {
      deleteHandler(row) {
        this.$emit('delete', row)
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .topForm
    border: solid 1px #dedede
    .el-form-item
      margin: 0
      label
        width: 100%
        color: #fff
        background-color: rgb(84, 92, 100)
        padding: 0 10px
      .el-form-item__content
        line-height: 33px
        input, textarea
          border-radius: 0
          border: none
  .teamlook
    .el-row
      border: 1px #DCDFE6 solid
      border-bottom: 0px
      padding-left: 10px
      height: 40px
      line-height: 40px
</style>
