/*
create by YOU
*/
<template>
  <div class="report-current-week" style="display: flex">
    <el-card class="report-card"
             :body-style="{height: '150px'}"
             :style="item.status === 1 ? 'border:1px solid rgb(64, 158, 255)' : ''"
             v-for="(item,index) in data" :key="index">
      <div slot="header" class="clearfix">
        <span>{{ item.title }}</span>
        <el-button v-if="item.status === 1" class="report-card-button" type="text" icon="el-icon-circle-check"
                   @click="changeStatus(item)"
                   title="撤销提交"></el-button>
        <el-button v-if="item.status !== 1" class="report-card-button" type="text" icon="el-icon-delete"
                   @click="handleDelete(item)"
                   title="删除"></el-button>
        <el-button v-if="item.status !== 1" class="report-card-button" type="text" icon="el-icon-circle-check-outline"
                   @click="changeStatus(item)"
                   title="提交为本周周报"></el-button>
      </div>
      <div class="report-card-content"
           @click="handleCardClick(item)">
        <pre>{{item.summary}}</pre>
      </div>
    </el-card>
    <el-card class="report-card" :body-style="{height: '200px'}" key="report-add"
             style="background: #dedede; border-color: #dedede; cursor: pointer">
      <div style="text-align: center; transform: scale(10,10) translate(0, 10px); color: #fff"
           @click="handleReportAdd">
        <i class="el-icon-plus"></i>
      </div>
    </el-card>
    <el-dialog
      v-if="editDialog"
      :visible.sync="editDialog"
      width="700px">
      <report-current-week-form :defaultData="currentReport"></report-current-week-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialog = false">取 消</el-button>
        <el-button type="primary" @click="editDialog = false">保 存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script type="text/babel">
  import $axios from '@/plugins/ajax'
  import reportCurrentWeekForm from './reportCurrentWeekForm.vue'
  export default {
    components: {
      reportCurrentWeekForm
    },
    data() {
      return {
        data: [
          {
            title: '测试测试',
            summary: '1.阿斯达所大阿斯达所大阿斯达所大阿斯达所大阿阿斯达所大\n2.阿斯达所大\n3.阿斯达所大\n4.阿斯达所大\n5.阿斯达所大\n6.阿斯达所大\n7.阿斯达所大\n8.阿斯达所大\n9.阿斯达所大\n10.阿斯达所大\n11.阿斯达所大',
            plan: '应该是会的，应该是会的，而且或许已经为地府带来了严重的经济问题。 在早期人类社会，显要人物在去世时都要配备数额庞大的陪葬品，其中，金银等贵金属占据了很大比重，为地府经济活动提供了丰富的通货。现存史料也支持了这一假设：绝大多数古代文明中都存在巫师和祭司。 ',
            status: 0
          },
          {title: '测试测试', summary: '应该是会的，而且或许已经为地府带来了严重的经济问题。 ', plan: '应该是会的，而且或许已经为地府带来了严重的经济问题。 ', status: 0},
          {title: '测试测试', summary: '应该是会的，而且或许已经为地府带来了严重的经济问题。 ', plan: '应该是会的，而且或许已经为地府带来了严重的经济问题。 ', status: 1},
          {title: '测试测试', summary: '应该是会的，而且或许已经为地府带来了严重的经济问题。 ', plan: '应该是会的，而且或许已经为地府带来了严重的经济问题。 ', status: 0},
          {title: '测试测试', summary: '应该是会的，而且或许已经为地府带来了严重的经济问题。 ', plan: '应该是会的，而且或许已经为地府带来了严重的经济问题。 ', status: 0}
        ],
        editDialog: false,
        currentReport: {}
      }
    },
    mounted() {
      $axios.get('/report/currentWeekReport/get').then(({data}) => {
        if (data.status) {
          this.data = data.data
        }
      })
    },
    methods: {
      handleCardClick(item) {
        this.currentReport = item
        this.editDialog = true
      },
      handleReportAdd() {
        if (this.data.length < 8) {
          this.data.push({title: '未命名周报', summary: '总结', plan: '计划', status: 0})
        } else {
          this.$message.warning('本周新建周报数量已达上限！')
        }
      },
      handleDelete(item) {
        this.data = Object.assign([], this.data).splice(this.data.indexOf(item), 1)
      },
      changeStatus(item) {
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .report-current-week
    display: flex
    flex-wrap: wrap
    justify-content: center
    .report-card
      width: 300px
      margin: 10px
      transition: .3s
      .report-card-button
        float: right
        padding: 3px 0
        margin-left: 10px
        &:hover
          transform: scale(1.3, 1.3)
      .report-card-content
        height: 100%
        overflow: hidden
        text-overflow: ellipsis
        word-break: break-all
        color: #565656
        cursor: pointer
        > pre
          display: inline-block
          word-wrap: break-word
          word-break: break-all
          font-size: 14px
          line-height: 22px
      &:hover
        box-shadow: 0 5px 12px 0 rgba(0, 0, 0, .3)
      &:active
        box-shadow: 0 5px 12px 0 rgba(0, 0, 0, .5)
</style>
