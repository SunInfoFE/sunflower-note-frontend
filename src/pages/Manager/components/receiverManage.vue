/*
create by YOU
*/
<template>
  <div>
    <div class="operation-group">
      <el-button @click="add()" type="primary">添加收件人</el-button>
    </div>
    <table-pagination :data="tableData">
      <el-table-column
        prop="name"
        label="收件人"
      >
      </el-table-column>
      <el-table-column
        prop="email"
        label="邮箱"
      >
      </el-table-column>
      <el-table-column
        label="操作"
        width="100px"
      >
        <template slot-scope="scope">
          <el-button type="text" icon="el-icon-edit" @click="editHandler(scope.row)" tilte="编辑"></el-button>
          <el-button type="text" icon="el-icon-delete" @click="deleteHandler(scope.row)" tilte="删除"></el-button>
        </template>
      </el-table-column>
    </table-pagination>
    <!--新增-->
    <el-dialog
      :visible.sync="addDialog"
      width="700px">
      <receiver-add ref="add"></receiver-add>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="saveAdd">保 存</el-button>
        <el-button @click="addDialog = false">取 消</el-button>
      </span>
    </el-dialog>
    <!--编辑-->
    <el-dialog
      :visible.sync="editDialog"
      width="700px">
      <receiver-add ref="edit" :editData="editData"></receiver-add>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="saveEdit">保 存</el-button>
        <el-button @click="editDialog = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script type="text/babel">
  import $axios from '@/plugins/ajax'
  import receiverAdd from './receiverAdd.vue'
  import tablePagination from '@/components/tablePagination';
  export default {
    components: {
      tablePagination,
      receiverAdd
    },
    data(){
      return {
        tableData: [],
        editData: null,
        addDialog: false,
        editDialog: false
      }
    },
    mounted() {
      this.getData()
    },
    methods: {
      getData() {
        $axios.get('/user/getSendMailUser').then(({data}) => {
          if (data.status === true) {
            this.tableData = data.data
          }
        })
      },
      add() {
        this.addDialog = true
      },
      editHandler(row) {
        this.editData = row
        this.editDialog = true
      },
      deleteHandler(row) {
        this.$confirm('确定删除?', '提示', {confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning'}).then(() => {
          $axios.post(`/user/deleteSendMailUser`, {
            idList: [row.id]
          }).then(({data}) => {
            this.getData()
            if (data.status) {
              this.$message({showClose: true, message: '删除成功!', type: 'success'});
            } else {
              this.$message({showClose: true, message: '删除失败!', type: 'error'});
            }
          });
        }).catch();
      },
      saveAdd() {
        this.addDialog = false
        $axios.post('/user/addSendMailUser', this.$refs.add.form).then(({data}) => {
          this.getData()
          if (data.status === true) {
            this.$message.success('保存成功')
          } else {
            this.$message.error('保存失败')
          }
        })
      },
      saveEdit() {
        this.editDialog = false
        $axios.post('/user/updateSendMailUser', this.$refs.edit.form).then(({data}) => {
          this.getData()
          if (data.status === true) {
            this.$message.success('保存成功')
          } else {
            this.$message.error('保存失败')
          }
        })
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
