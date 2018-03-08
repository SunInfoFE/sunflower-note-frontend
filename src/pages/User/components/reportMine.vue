/*
create by YOU
*/
<template>
  <div>
    <div>
      <el-date-picker
        v-model="currentWeek"
        type="week"
        format="yyyy 第 WW 周"
        placeholder="选择周">
      </el-date-picker>
      <el-select v-model="currentStatus" placeholder="请选择">
        <el-option label="未提交" value="private"></el-option>
        <el-option label="已提交" value="public"></el-option>
        <el-option label="全部" value="all"></el-option>
      </el-select>
    </div>
    <table-pagination :data="tableData">
      <el-table-column
        type="index"
        width="50">
      </el-table-column>
      <el-table-column
        prop="title"
        label="周报名"
        width="120">
      </el-table-column>
      <el-table-column
        prop="title"
        label="状态"
        width="100">
        <template slot-scope="scope">
          {{ scope.row.status === 'public' ? '已提交' : '未提交' }}
        </template>
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="创建时间"
        width="180">
        <template slot-scope="scope">
          <pre>{{ new Date(scope.row.createTime).toLocaleString() }}</pre>
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
      <el-table-column
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button type="text" icon="el-icon-view" @click="" title="查看"></el-button>
          <el-button type="text" v-if="scope.row.status !== 'public'" icon="el-icon-delete" @click="handleDelete(scope.row)" title="删除"></el-button>
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
    data() {
      return {
        currentStatus: 'all',
        currentWeek: '',
        data: []
      }
    },
    mounted() {
      this.getData()
    },
    watch: {},
    computed: {
      tableData() {
        return this.data.filter(item => {
          // 判断当前查询值不为空 且和item的相关字段不相等 返回false
          if (this.currentStatus !== 'all' && this.currentStatus !== item.status) {
            return false
          }
          if (this.currentWeek && this.currentWeek.getTime() !== new Date(item.week).getTime()) {
            return false
          }
          // 其它所有情况返回true
          return true
        })
      }
    },
    methods: {
      getData() {
        $axios.post('/report/myReport/get').then(({data}) => {
          if (data.status) {
            this.data = data.data
          }
        })
      },
      handleDelete(item) {
        this.$confirm('确定删除?', '提示', {confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning'}).then(() => {
          $axios.post(`/report/myReport/delete`, {
            idList: [item.id]
          }).then(({data}) => {
            if (data.status) {
              this.$message({showClose: true, message: '删除成功!', type: 'success'});
              this.getData()
            } else {
              this.$message({showClose: true, message: '删除失败!', type: 'error'});
            }
          });
        }).catch();
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
