/*
create by YOU
*/
<template>
  <div>
    <div class="buttons-wrapper">
      <el-button type="primary" @click="preView" style="margin-bottom: 20px">预览</el-button>
      <el-button type="primary" @click="showUnfinishedList" style="margin-bottom: 20px">未提交名单</el-button>
    </div>
    <table-pagination :data="weekData">
      <el-table-column
        prop="name"
        label="作者"
        width="180">
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
    </table-pagination>
    <el-dialog
      v-if="eyeDialog"
      :visible.sync="eyeDialog"
      width="700px">
      <el-input ref="preView" v-model="content" type="textarea"
                :autosize="{ minRows: 10, maxRows: 20}"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="resetContent">重置内容</el-button>
        <el-button type="primary" @click="copy">复制到剪贴板</el-button>
      </span>
    </el-dialog>
    <el-dialog
      v-if="unfinishedDialog"
      :visible.sync="unfinishedDialog"
      width="700px">
      <el-table :data="unFinishedList">
        <el-table-column
          type="index"
          fixed
          width="40">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名">
        </el-table-column>
        <el-table-column
          prop="email"
          label="邮箱">
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="unfinishedDialog = false">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script type="text/babel">
  import $axios from '@/plugins/ajax'
  import tablePagination from '@/components/tablePagination'
  export default {
    components: {
      tablePagination
    },
    data () {
      return {
        weekData: [],
        eyeDialog: false,
        unfinishedDialog: false,
        content: '',
        users: []
      }
    },
    mounted() {
      this.getData()
      this.getUsers()
    },
    computed: {
      unFinishedList() {
        let finishedList = this.weekData.map(item => item.email)
        return this.users.filter(item => finishedList.indexOf(item.email) === -1)
      }
    },
    methods: {
      getUsers() {
        $axios.get('/group/groupManage/getGroupMember', {
          id: this.$store.state.data.groupId
        }).then(({data}) => {
          if (data.status) {
            this.users = data.data
          }
        })
      },
      getData() {
        $axios.post('report/groupCurrentWeekReport/get').then(({data}) => {
          if (data.status) {
            this.weekData = data.data
          }
        })
      },
      preView() {
        if (!this.content) {
          this.resetContent()
        }
        this.eyeDialog = true
      },
      showUnfinishedList() {
        this.unfinishedDialog = true
      },
      resetContent() {
        let content = ''
        this.weekData.map(item => {
          content += `${item.name}\n本周工作内容:\n${item.summary}\n下周工作内容:\n${item.plan}\n\n`
        })
        this.content = content
      },
      copy() {
        let inputText = document.createElement('textarea');
        inputText.value = this.content
        inputText.style.position = 'fixed'
        inputText.style.left = '-99999px'
        inputText.style.top = '-99999px'
        document.body.appendChild(inputText)
        let currentFocus = document.activeElement;
        inputText.focus();
        inputText.setSelectionRange(0, inputText.value.length);
        document.execCommand('copy', true);
        this.$message.success('复制成功！')
        currentFocus.focus();
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @media screen and (max-width: 768px)
    .buttons-wrapper
      padding: 10px
      .el-button
        width: 100%

    .el-dialog
      height: 100% !important
      .el-dialog__body
        height: calc(100% - 130px) !important
        .el-textarea
          height: 100% !important
          textarea
            height: 100% !important
</style>
