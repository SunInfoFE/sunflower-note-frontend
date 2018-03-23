/*
create by YOU
*/
<template>
  <div>
    <div>
      <el-button type="primary" @click="saveDraft" style="margin-bottom: 20px">存为周报草稿</el-button>
      <el-button type="primary" @click="submitDraft" style="margin-bottom: 20px">提交为小组周报</el-button>
      <el-button type="primary" @click="add" style="margin-bottom: 20px">新增条目</el-button>
    </div>
    <div>
      <el-card style="margin-bottom: 20px">
        <div slot="header" class="clearfix">未完成条目</div>
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
                <p v-if="!scope.row.editing">{{scope.row.task}}</p>
                <el-input v-else ref="editField" @blur="saveEdit(scope.row)" v-model="scope.row.task"
                          placeholder="请输入条目内容"></el-input>
              </template>
            </el-table-column>
            <el-table-column
              label="操作"
              width="180">
              <template slot-scope="scope">
                <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.row)" title="编辑"></el-button>
                <el-button type="text" icon="el-icon-sort" @click="handleChangeStatus(scope.row)"
                           title="标记为已完成"></el-button>
                <el-button type="text" icon="el-icon-delete" @click="handleDelete(scope.row)" title="删除"></el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-card>
      <el-card>
        <div slot="header" class="clearfix">已完成条目</div>
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
                <pre>{{scope.row.task}}</pre>
              </template>
            </el-table-column>
            <el-table-column
              label="操作"
              width="180">
              <template slot-scope="scope">
                <el-button type="text" icon="el-icon-sort" @click="handleChangeStatus(scope.row)"
                           title="标记为待完成"></el-button>
                <el-button type="text" icon="el-icon-delete" @click="handleDelete(scope.row)" title="删除"></el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-card>
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
        unfinishedSelectedList: []
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
        $axios.get('/journal/currentWeekJournal/getAll').then(({data}) => {
          if (data.status) {
            this.data = data.data
          }
        })
      },
      add() {
        $axios.post('/journal/currentWeekJournal/add', {
          task: ''
        }).then(({data}) => {
          if (data.status) {
            this.$message.success(data.data)
            this.getData()
          } else {
            this.$message.error(data.data)
          }
        })
      },
      handleEdit(row) {
        this.data.map(item => {
          item.editing = false
        })
        row.editing = true
        this.$nextTick(() => {
          this.$refs.editField.focus()
        })
      },
      saveEdit(row) {
        if (row.task) {
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
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
