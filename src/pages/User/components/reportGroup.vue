/*
create by YOU
*/
<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="本周周报" name="first">
        <el-button type="primary">复制到剪切板</el-button>
        <table-pagination :data="tableData">
          <el-table-column
            prop="userName"
            label="作者"
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
        <table-pagination :data="tableData">
          <el-table-column
            prop="userName"
            label="作者"
            width="120">
          </el-table-column>
          <el-table-column
            prop="commitTime"
            label="提交时间"
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
        </table-pagination>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script type="text/babel">
  import tablePagination from '@/components/tablePagination'
  import ElButton from "../../../../node_modules/element-ui/packages/button/src/button";
  export default {
    components: {
      ElButton,
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
        tableData: [
          {
            userName: '张三',
            title: '测试测试',
            summary: '应该是会的，应该是会的，而且或许已经为地府带来了严重的经济问题。 在早期人类社会，显要人物在去世时都要配备数额庞大的陪葬品，其中，金银等贵金属占据了很大比重，为地府经济活动提供了丰富的通货。现存史料也支持了这一假设：绝大多数古代文明中都存在巫师和祭司。 ',
            plan: '应该是会的，应该是会的，而且或许已经为地府带来了严重的经济问题。 在早期人类社会，显要人物在去世时都要配备数额庞大的陪葬品，其中，金银等贵金属占据了很大比重，为地府经济活动提供了丰富的通货。现存史料也支持了这一假设：绝大多数古代文明中都存在巫师和祭司。 ',
            status: 0,
            commitTime: '2018-03-03',
            createTime: '2018-03-03'
          },
          {
            userName: '李四',
            title: '测试测试',
            summary: '应该是会的，而且或许已经为地府带来了严重的经济问题。 ',
            plan: '应该是会的，而且或许已经为地府带来了严重的经济问题。 ',
            status: 0,
            commitTime: '2018-03-03',
            createTime: '2018-03-03'
          },
          {
            userName: '王小虎',
            title: '测试测试',
            summary: '应该是会的，而且或许已经为地府带来了严重的经济问题。 ',
            plan: '应该是会的，而且或许已经为地府带来了严重的经济问题。 ',
            status: 1,
            commitTime: '2018-03-03',
            createTime: '2018-03-03'
          },
          {
            userName: '赵六',
            title: '测试测试',
            summary: '应该是会的，而且或许已经为地府带来了严重的经济问题。 ',
            plan: '应该是会的，而且或许已经为地府带来了严重的经济问题。 ',
            status: 0,
            commitTime: '2018-03-03',
            createTime: '2018-03-03'
          },
          {
            userName: '燕七',
            title: '测试测试',
            summary: '应该是会的，而且或许已经为地府带来了严重的经济问题。 ',
            plan: '应该是会的，而且或许已经为地府带来了严重的经济问题。 ',
            status: 0,
            commitTime: '2018-03-03',
            createTime: '2018-03-03'
          }
        ]
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
