/*
create by YOU
*/
<template>
  <div>
    <div>
      <el-button type="primary" @click="saveDraft" style="margin-bottom: 20px">存为周报草稿</el-button>
      <el-button type="primary" @click="submitDraft" style="margin-bottom: 20px">提交为小组周报</el-button>
      <el-button type="primary" @click="handeDeleteSelected" style="margin-bottom: 20px">批量删除</el-button>
      <div style="margin-bottom: 20px">
        <el-input v-model="task" @keyup.enter.native="add" placeholder="请输入任务内容,回车添加条目"></el-input>
      </div>
    </div>
    <div>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-card style="margin-bottom: 20px">
            <div slot="header" class="clearfix">未完成任务</div>
            <div>
              <el-table @selection-change="handleUnfinishedChange" :data="completedData">
                <el-table-column
                  type="selection"
                  width="55">
                </el-table-column>
                <el-table-column
                  type="index"
                  fixed
                  width="40">
                </el-table-column>
                <el-table-column
                  prop="task"
                  label="内容">
                  <template slot-scope="scope">
                    <p :class='`editField showField${scope.row.id}`' @click="handleEdit(scope.row)">{{scope.row.task}}</p>
                    <el-input :class='`editField hidden editField${scope.row.id}`' ref="editField" @blur="saveEdit(scope.row)"
                              v-model="scope.row.task"
                              placeholder="请输入条目内容"></el-input>
                  </template>
                </el-table-column>
                <el-table-column
                  label="操作"
                  width="180">
                  <template slot-scope="scope">
                    <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.row)" title="编辑"></el-button>
                    <el-button type="text" icon="iconfont icon-carry-out" @click="handleChangeStatus(scope.row)"
                               title="标记为已完成"></el-button>
                    <el-button type="text" icon="el-icon-delete" @click="handleDelete(scope.row)"
                               title="删除"></el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card>
            <div slot="header" class="clearfix">已完成任务</div>
            <div>
              <el-table @selection-change="handleFinishedChange" :data="uncompletedData">
                <el-table-column
                  type="selection"
                  width="55">
                </el-table-column>
                <el-table-column
                  type="index"
                  fixed
                  width="40">
                </el-table-column>
                <el-table-column
                  prop="task"
                  label="内容">
                  <template slot-scope="scope">
                    <p :class='`editField showField${scope.row.id}`' @click="handleEdit(scope.row)">{{scope.row.task}}</p>
                    <el-input :class='`editField hidden editField${scope.row.id}`' ref="editField" @blur="saveEdit(scope.row)"
                              v-model="scope.row.task"
                              placeholder="请输入条目内容"></el-input>
                  </template>
                </el-table-column>
                <el-table-column
                  label="操作"
                  width="180">
                  <template slot-scope="scope">
                    <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.row)" title="编辑"></el-button>
                    <el-button type="text" icon="iconfont icon-retreat" @click="handleChangeStatus(scope.row)"
                               title="标记为待完成"></el-button>
                    <el-button type="text" icon="el-icon-delete" @click="handleDelete(scope.row)"
                               title="删除"></el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script type="text/babel">
  import $axios from '@/plugins/ajax'
  export default {
    data() {
      return {
        data: [],
        finishedSelectedList: [],
        unfinishedSelectedList: [],
        task: ''
      }
    },
    mounted() {
      this.getData()
    },
    computed: {
      completedData() {
        return this.data.filter(item => {
          this.$set(item, 'editing', false)
          return item.status === 'unfinished'
        })
      },
      uncompletedData() {
        return this.data.filter(item => {
          return item.status === 'finished'
        })
      }
    },
    methods: {
      getData() {
        return $axios.get('/journal/currentWeekJournal/getAll').then(({data}) => {
          if (data.status) {
            this.data = data.data
          }
        })
      },
      add() {
        if (this.task) {
          $axios.post('/journal/currentWeekJournal/add', {
            task: this.task
          }).then(({data}) => {
            this.task = ''
            if (data.status) {
              this.$message.success(data.data)
              this.getData()
            } else {
              this.$message.error(data.data)
            }
          })
        }
      },
      handleEdit(row) {
        this.data.map(item => {
          item.editing = false
        })
        row.editing = true
        document.querySelector(`.showField${row.id}`).className = `editField hidden showField${row.id}`
        document.querySelector(`.editField${row.id}`).className = `editField editField${row.id}`
        this.$nextTick(() => {
          document.querySelector(`.editField${row.id} input`).focus()
        })
      },
      saveEdit(row) {
        if (row.task) {
          document.querySelector(`.showField${row.id}`).className = `editField showField${row.id}`
          document.querySelector(`.editField${row.id}`).className = `editField hidden editField${row.id}`
          row.editing = false
          $axios.post('/journal/currentWeekJournal/edit', {
            id: row.id,
            task: row.task
          }).then(({data}) => {
            if (data.status) {
              this.$message.success(data.data)
              this.getData()
            } else {
              this.$message.error(data.data)
            }
          })
        } else {
          this.$message.error('任务内容不能为空!')
        }
      },
      handleFinishedChange(val) {
        this.finishedSelectedList = val
      },
      handleUnfinishedChange(val) {
        this.unfinishedSelectedList = val
      },
      saveDraft() {
        if (this.finishedSelectedList.length > 0) {
          let summary = this.finishedSelectedList.map((item, index) => {
            return `${index + 1}.${item.task}`
          }).join('\n')
          let plan = this.unfinishedSelectedList.map((item, index) => {
            return `${index + 1}.${item.task}`
          }).join('\n')
          $axios.post('/journal/currentWeekJournal/saveDraft', {
            title: '本周周报' + new Date().toLocaleString(),
            summary: summary,
            plan: plan
          }).then(({data}) => {
            if (data.status) {
              this.$message.success(data.data)
              this.getData()
            } else {
              this.$message.error(data.data)
            }
          })
        } else {
          this.$message.error('请至少选择一个已完成任务!')
        }
      },
      submitDraft() {
        if (this.finishedSelectedList.length > 0) {
          let summary = this.finishedSelectedList.map((item, index) => {
            return `${index + 1}.${item.task}`
          }).join('\n')
          let plan = this.unfinishedSelectedList.map((item, index) => {
            return `${index + 1}.${item.task}`
          }).join('\n')
          $axios.post('/journal/currentWeekJournal/submitDraft', {
            title: '本周周报' + new Date().toLocaleString(),
            summary: summary,
            plan: plan
          }).then(({data}) => {
            if (data.status) {
              this.$message.success(data.data)
              this.getData()
            } else {
              this.$message.error(data.data)
            }
          })
        } else {
          this.$message.error('请至少选择一个已完成任务!')
        }
      },
      handleChangeStatus(row) {
        let newStatus = row.status === 'finished' ? 'unfinished' : 'finished'
        $axios.post('/journal/currentWeekJournal/changeStatus', {
          id: row.id,
          status: newStatus
        }).then(({data}) => {
          if (data.status) {
            this.$message.success(data.data)
            this.getData()
          } else {
            this.$message.error(data.data)
          }
        })
      },
      handleDelete(row) {
        this.$confirm('确定删除?', '提示', {confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning'}).then(() => {
          $axios.post(`/journal/currentWeekJournal/delete`, {
            idList: [row.id]
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
      handeDeleteSelected() {
        let list = [...this.unfinishedSelectedList, ...this.finishedSelectedList].map(item => item.id)
        if (list.length > 0) {
          this.$confirm('确定删除?', '提示', {confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning'}).then(() => {
            $axios.post(`/journal/currentWeekJournal/delete`, {
              idList: list
            }).then(({data}) => {
              if (data.status) {
                this.$message({showClose: true, message: '删除成功!', type: 'success'});
                this.getData()
              } else {
                this.$message({showClose: true, message: '删除失败!', type: 'error'});
              }
            });
          }).catch();
        } else {
          this.$message('请选择要删除的任务!')
        }
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .editField
    display: inline-block
    &.hidden
      display: none
</style>
