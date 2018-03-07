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
        <el-option label="未提交" :value="0"></el-option>
        <el-option label="已提交" :value="1"></el-option>
        <el-option label="全部" value="all"></el-option>
      </el-select>
    </div>
    <table-pagination :data="tableData">
      <el-table-column
        prop="title"
        label="周报名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="创建时间"
        width="180">
      </el-table-column>
      <el-table-column
        prop="summary"
        label="本周工作总结">
      </el-table-column>
      <el-table-column
        prop="plan"
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
        currentStatus: 'all',
        currentWeek: '',
        data: [
          {
            title: '测试测试',
            summary: '应该是会的，应该是会的，而且或许已经为地府带来了严重的经济问题。 在早期人类社会，显要人物在去世时都要配备数额庞大的陪葬品，其中，金银等贵金属占据了很大比重，为地府经济活动提供了丰富的通货。现存史料也支持了这一假设：绝大多数古代文明中都存在巫师和祭司。 ',
            plan: '应该是会的，应该是会的，而且或许已经为地府带来了严重的经济问题。 在早期人类社会，显要人物在去世时都要配备数额庞大的陪葬品，其中，金银等贵金属占据了很大比重，为地府经济活动提供了丰富的通货。现存史料也支持了这一假设：绝大多数古代文明中都存在巫师和祭司。 ',
            status: 0,
            createTime: '2018-03-03',
            currentWeek: '2018-03-12'
          },
          {
            title: '测试测试',
            summary: '应该是会的，而且或许已经为地府带来了严重的经济问题。 ',
            plan: '应该是会的，而且或许已经为地府带来了严重的经济问题。 ',
            status: 0,
            createTime: '2018-03-03',
            currentWeek: '2018-03-12'
          },
          {
            title: '测试测试',
            summary: '应该是会的，而且或许已经为地府带来了严重的经济问题。 ',
            plan: '应该是会的，而且或许已经为地府带来了严重的经济问题。 ',
            status: 1,
            createTime: '2018-03-03',
            currentWeek: '2018-03-19'
          },
          {
            title: '测试测试',
            summary: '应该是会的，而且或许已经为地府带来了严重的经济问题。 ',
            plan: '应该是会的，而且或许已经为地府带来了严重的经济问题。 ',
            status: 0,
            createTime: '2018-03-03',
            currentWeek: '2018-03-19'
          },
          {
            title: '测试测试',
            summary: '应该是会的，而且或许已经为地府带来了严重的经济问题。 ',
            plan: '应该是会的，而且或许已经为地府带来了严重的经济问题。 ',
            status: 0,
            createTime: '2018-03-03',
            currentWeek: '2018-03-19'
          }
        ]
      }
    },
    watch: {},
    computed: {
      tableData() {
        return this.data.filter(item => {
          // 判断当前查询值不为空 且和item的相关字段不相等 返回false
          if (this.currentStatus !== 'all' && this.currentStatus !== item.currentStatus) {
            return false
          }
          if (this.currentWeek && this.currentWeek.getTime() !== new Date(item.currentWeek + ' 00:00:00').getTime()) {
            return false
          }
          // 其它所有情况返回true
          return true
        })
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
