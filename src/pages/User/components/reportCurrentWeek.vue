/*
create by YOU
*/
<template>
  <div class="report-current-week" style="display: flex">
    <el-card class="report-card"
             :body-style="{height: '150px'}"
             :style="item.status === 'public' ? 'border:1px solid rgb(64, 158, 255)' : ''"
             v-for="(item,index) in data" :key="index">
      <div slot="header" class="clearfix">
        <span>{{ item.title }}</span>
        <el-button v-if="item.status === 'public'" class="report-card-button" type="text" icon="el-icon-circle-check"
                   @click="changeStatus(item)"
                   title="撤销提交"></el-button>
        <el-button v-if="item.status !== 'public'" class="report-card-button" type="text" icon="el-icon-delete"
                   @click="handleDelete(item)"
                   title="删除"></el-button>
        <el-button v-if="item.status !== 'public'" class="report-card-button" type="text"
                   icon="el-icon-circle-check-outline"
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
      <report-current-week-form @change="handleReportChange" ref="edit"
                                :defaultData="currentReport"></report-current-week-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialog = false">取 消</el-button>
        <el-button type="primary" :disabled="saving" @click="saveReport">
          <span v-if="saving">保存中 <i class="el-icon-loading"></i></span>
          <span v-else>保 存</span>
        </el-button>
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
        data: [],
        editDialog: false,
        currentReport: {},
        saving: false
      }
    },
    mounted() {
      this.getData()
    },
    methods: {
      getData() {
        $axios.get('/report/currentWeekReport/get').then(({data}) => {
          if (data.status) {
            this.data = data.data
          }
        })
      },
      handleCardClick(item) {
        this.currentReport = item
        this.editDialog = true
      },
      handleReportChange() {
        this.saving = true
        this.submitReport().then(() => {
          setTimeout(() => {
            this.saving = false
            this.getData()
          }, 500)
        })
      },
      submitReport() {
        return $axios.post('/report/currentWeekReport/edit', this.$refs.edit.getForm()).then(({data}) => {
          return data
        })
      },
      saveReport() {
        this.submitReport().then(() => {
          this.editDialog = false
          this.getData()
        })
      },
      handleReportAdd() {
        if (this.data.length < 8) {
          $axios.post('/report/currentWeekReport/add', {title: '未命名周报', summary: '总结', plan: '计划'}).then(({data}) => {
            if (data.status) {
              this.getData()
            }
          })
        } else {
          this.$message.warning('本周新建周报数量已达上限！')
        }
      },
      handleDelete(item) {
        this.$confirm('确定删除?', '提示', {confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning'}).then(() => {
          $axios.post(`/report/currentWeekReport/delete`, {
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
      },
      changeStatus(item) {
        if (item.status !== 'public') {
          $axios.post('/report/currentWeekReport/submit', {
            id: item.id
          }).then(({data}) => {
            if (data.status) {
              this.getData()
            }
          })
        }
      }
    }
  }
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
  @media screen and (max-width: 786px)
    .el-message-box
      width: auto !important
    .el-dialog
      border-radius: 0 !important
      width: 100% !important
      height: 100%
      max-height: 100%
      margin: 0 !important
      .el-dialog__body
        padding: 20px 0 0
      .dialog-footer
        display: flex
        .el-button
          flex: 1
          &.el-button--default
            display: none !important
    .report-current-week
      display: flex
      flex-wrap: wrap
      justify-content: center
      .report-card
        width: 100%
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
        &:active
          box-shadow: 0 5px 12px 0 rgba(0, 0, 0, .5)
</style>
