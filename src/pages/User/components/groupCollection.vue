/*
create by YOU
*/
<template>
  <div>
    <div class="buttons-wrapper">
      <el-button type="primary" @click="preView" style="margin-bottom: 20px">预览</el-button>
      <el-button type="primary" @click="showUnfinishedList" style="margin-bottom: 20px">未提交名单</el-button>
      <span style="float: right;font-size: 14px;font-weight: 600; color: #6f7180;">最后更新：{{timePass}}</span>
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
      <div style="margin-bottom: 10px; font-weight: 600">需要提交周报共 {{users.length}} 人，还有<span
        style="color: red"> {{unFinishedList.length}} </span>人未提交
      </div>
      <el-input ref="preView" v-model="content" type="textarea"
                :autosize="{ minRows: 10, maxRows: 20}"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="openMailSendDialog">发送邮件</el-button>
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
    <el-dialog
      v-if="mailSendDialog"
      v-loading="loading"
      element-loading-text="邮件发送中"
      :visible.sync="mailSendDialog"
      title="邮件发送"
      width="700px">
      <el-form ref="mailForm" :model="mailForm" :rules="mailFormRules" label-width="100px">
        <el-form-item label="邮件标题" prop="title">
          <el-input v-model="mailForm.title"></el-input>
        </el-form-item>
        <el-form-item label="收件人" prop="to">
          <el-select style="width:100%"
                     filterable
                     allow-create
                     v-model="mailForm.to" multiple placeholder="选择或手动输入">
            <el-option
              v-for="item in receivers"
              :key="item.email"
              :label="item.name"
              :value="item.email">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="抄送周报作者">
          <el-select style="width: 100%" v-model="mailForm.defaultCc" multiple placeholder="请选择">
            <el-option
              v-for="item in users"
              :key="item.email"
              :label="item.name"
              :value="item.email">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="抄送其他人">
          <el-select style="width: 100%"
                     filterable
                     allow-create
                     v-model="mailForm.cc" multiple placeholder="选择或手动输入">
            <el-option
              v-for="item in receivers"
              :key="item.email"
              :label="item.name"
              :value="item.email">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="邮件内容" prop="content">
          <div style="height: 200px; overflow-y: scroll; padding: 10px; border:1px solid #dcdfe6">
            <div v-html="mailForm.content" class="mail-content">
            </div>
          </div>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="sendEmail">发送</el-button>
        <el-button type="primary" @click="mailSendDialog = false">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script type="text/babel">
  import $axios from '@/plugins/ajax'
  import tablePagination from '@/components/tablePagination'
  import ElInput from "../../../../node_modules/element-ui/packages/input/src/input";
  export default {
    components: {
      ElInput,
      tablePagination
    },
    data () {
      return {
        weekData: [],
        eyeDialog: false,
        unfinishedDialog: false,
        mailSendDialog: false,
        content: '',
        users: [],
        receivers: [],
        mailForm: {
          title: '',
          to: '',
          defaultCc: '',
          cc: '',
          content: ''
        },
        mailFormRules: {
          title: [{required: true, message: '不能为空', trigger: 'blur'}],
          to: [{required: true, message: '不能为空', trigger: 'blur'}],
          defaultCc: '',
          cc: '',
          content: [{required: true, message: '不能为空', trigger: 'blur'}]
        },
        str: {
          currentWeekTitle: '本周工作内容',
          nextWeekTitle: '下周工作计划'
        },
        loading: false,
        lastUpdateTime: new Date().getTime(),
        timePass: '已是最新数据'
      }
    },
    mounted() {
      this.getData()
      let sGroups = [];
      $axios.get('/group/groupManage/get').then(({data}) => {
          if (data.status === true) {
            let groups = data.data;
            for(let i = 0,length = groups.length; i < length; i++){
              if(groups[i].combine == 1){
                sGroups.push(groups[i].id);
              }
            }
            this.getUsers(sGroups).then(() => {
                this.setDefaultCc()
            })
            $axios.get('/user/getSendMailUser').then(({data}) => {
                if (data.status === true) {
                this.receivers = data.data
                }
            })
            window.setInterval(this.getData, 20000)
            window.setInterval(this.updateTimePass, 1000)
          }
        })
      
    },
    beforeDestroy() {
      window.clearInterval(this.getData)
      window.clearInterval(this.updateTimePass)
    },
    computed: {
      unFinishedList() {
        let finishedList = this.weekData.map(item => item.email)
        return this.users.filter(item => finishedList.indexOf(item.email) === -1)
      }
    },
    methods: {
      getUsers(groupIds) {
        return $axios.post('/group/groupManage/getGroupsMember', {idList: groupIds}).then((res) => {
            if (res.data.status === true) {
              this.users = res.data.data;
            }
            return res.data.data
        });
      },
      setDefaultCc() {
        this.mailForm.defaultCc = this.weekData.map(item => item.email)
      },
      updateTimePass() {
        let pass = Math.floor((new Date().getTime() - this.lastUpdateTime) / 1000)
        this.timePass = pass < 2 ? '已是最新数据' : (Math.floor((new Date().getTime() - this.lastUpdateTime) / 1000) + '秒前')
      },
      getData() {
        window.clearInterval(this.updateTimePass)
        $axios.post('report/getCollectGroupCurrentWeekPort/get', {collector: this.$store.state.data.collector}).then(({data}) => {
          if (data.status) {
            window.setInterval(this.updateTimePass, 1000)
            this.weekData = data.data
            this.lastUpdateTime = new Date().getTime()
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
        if (this.unFinishedList.length > 0) {
          this.unfinishedDialog = true
        } else {
          this.$message('所有成员都已提交！')
        }
      },
      resetContent() {
        let content = ''
        this.weekData.map(item => {
          content += `${item.name}\n${this.str.currentWeekTitle}\n${item.summary}\n${this.str.nextWeekTitle}\n${item.plan}\n\n`
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
      },
      openMailSendDialog() {
        // content mailForm
//        this.mailForm.content = '<div>' + this.content.replace(/[^\n]+/g, function (str) {
//            return `<p style=" margin: 0; padidng: 0; height: 20px; line-height 20px; font-size 14px;">${str}</p>`
//          }).replace(new RegExp(`<p[\w:; "]*>([^\\n]+)</p[\w:; "]*>([\\n]<p>+${this.str.currentWeekTitle}</p>)`, 'g'), function () {
//            return `<h4>${arguments[1]}</h4>${arguments[2]}`
//          }) + '</div>'
        this.mailForm.content = '<div>' + this.content.replace(new RegExp(`([^\\n]+)([\\n]+${this.str.currentWeekTitle})`, 'g'), function () {
            return `<h4 style="margin: 20px 0 0 0; padding: 0; height: 20px; line-height: 20px; font-size: 14px;">${arguments[1]}</h4>${arguments[2]}`
          }).replace(/[^\n]+/g, function (str) {
            return `<div style=" margin: 0; padding: 5px 0; height: auto; line-height: 1; font-size: 14px;">${str}</div>`
          }) + '</div>'
        this.mailSendDialog = true
      },
      sendEmail() {
        this.$refs.mailForm.validate(valid => {
          if (valid) {
            let quesition = '确定发送邮件？'
            if (this.unFinishedList.length > 0) {
              quesition = `${this.unFinishedList.length}人未提交，确定发送邮件？`
            }
            this.$confirm(quesition, '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.loading = true
              $axios.post('/report/groupCurrentWeekReport/sendMail', {
                title: this.mailForm.title,
                to: this.mailForm.to,
                defaultCc: '',
                cc: [...this.mailForm.cc, ...this.mailForm.defaultCc],
                content: this.mailForm.content
              }).then(({data}) => {
                this.loading = false
                if (data.status === true) {
                  this.$message.success(data.data)
                } else {
                  this.$message.error(data.data)
                }
              })
            }).catch()
          }
        })
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
