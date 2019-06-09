<template>
  <div>
    <div class="operation-group">
      <el-button @click="add()" type="primary">添加小组</el-button>
      <el-input
        suffix-icon="el-icon-search"
        placeholder="请输入组名"
        v-model="searchdata">
      </el-input>
    </div>
    <table-pagination :data="tableData">
      <el-table-column
        prop="name"
        label="组名"
      >
      </el-table-column>
      <el-table-column
        prop="remark"
        label="备注"
      >
      </el-table-column>
      <el-table-column
        prop="memberNum"
        label="成员数"
      >
      </el-table-column>
      <el-table-column
        label="操作"
        width="100"
      >
        <template slot-scope="scope">
          <el-button type="text" icon="el-icon-view" @click="eyeHandler(scope.row)" tilte="查看"></el-button>
          <el-button type="text" icon="el-icon-edit" @click="editHandler(scope.row)" tilte="编辑"></el-button>
          <el-button type="text" icon="el-icon-delete" @click="deleteHandler(scope.row)" tilte="删除"></el-button>
        </template>
      </el-table-column>
    </table-pagination>
    <!--添加-->
    <el-dialog
      :visible.sync="addDialog"
      v-if="addDialog"
      width="700px">
      <team-manage ref="TeamAdd"></team-manage>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialog = false">取 消</el-button>
        <el-button type="primary" @click="addOK()">保 存</el-button>
      </span>
    </el-dialog>
    <!--编辑-->
    <el-dialog
      :visible.sync="editDialog"
      v-if="editDialog"
      width="700px">
      <team-manage ref="Teamedit" :editData="editData"></team-manage>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialog = false">取 消</el-button>
        <el-button type="primary" @click="editOK()">保 存</el-button>
      </span>
    </el-dialog>
    <!--查看-->
    <el-dialog
      :visible.sync="lookDialog"
      v-if="lookDialog"
      width="800px">
      <div style="max-height: 600px; overflow-y: scroll">
        <team-look :lookData="lookData" :TeamData="lookTeamData" @move="openMoveUserDialog"
                   @delete="deleteUser" @edit="openEditUserDialog"></team-look>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="lookDialog = false">取 消</el-button>
      </span>
    </el-dialog>
    <!--移动-->
    <el-dialog
      :visible.sync="moveUserDialog"
      v-if="moveUserDialog"
      width="500px">
      <el-form class="moveForm" :model="moveForm" ref="moveForm" label-width="60px">
        <el-form-item label="小组">
          <el-select style="width: 100%" v-model="moveForm.moveTo" placeholder="请选择小组">
            <el-option
              v-for="item in tableData"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="moveUser()">移 动</el-button>
        <el-button @click="moveUserDialog = false">取 消</el-button>
      </span>
    </el-dialog>
    <!--编辑用户-->
    <el-dialog
      :visible.sync="editUserDialog"
      v-if="editUserDialog"
      width="600px">
      <el-form class="moveForm" :model="moveForm" ref="moveForm" label-width="60px">
        <user-edit :userData="editUser" @finish="closeEditUserDialog"></user-edit>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeEditUserDialog">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  import tablePagination from '@/components/tablePagination';
  import $axios from '@/plugins/ajax';
  import TeamManage from './TeamAdd';
  import UserEdit from './UserEdit';
  import TeamLook from './TeamLook'
  export default {
    components: {
      tablePagination,
      TeamManage,
      TeamLook,
      UserEdit
    },
    data() {
      return {
        ajaxData: [],
        addDialog: false,
        editDialog: false,
        editData: {},
        lookDialog: false,
        moveUserDialog: false,
        editUser: {},
        editUserDialog: false,
        lookData: [],
        lookTeamData: {},
        searchdata: '',
        moveForm: {
          moveTo: ''
        },
        moveTo: '',
        moveUsers: []
      }
    },
    created() {
      this.getgroupList()
    },
    methods: {
      getgroupList() {
        $axios.get('/group/groupManage/get').then((res) => {
          this.ajaxData = res.data.data
        })
      },
      eyeHandler(row) {
        this.lookTeamData = row
        $axios.get('/group/groupManage/getGroupMember', {id: row.id}).then((res) => {
          if (res.data.status === true) {
            this.lookData = res.data.data
          } else {
            this.$message({
                type: 'error',
                message: res.data.data
            })
          }
        })
        this.lookDialog = true
      },
      deleteUser(row) {
        this.$confirm('确定删除?', '提示', {confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning'}).then(() => {
          $axios.post('/group/groupManage/deleteGroupMember', {idList: [row.email]}).then((res) => {
            if (res.data.status === true) {
              this.$message({
                type: 'success',
                message: res.data.data
              })
              this.eyeHandler(row)
            } else {
              this.$message({
                type: 'error',
                message: res.data.data
              })
            }
          })
        }).catch();
      },
      openMoveUserDialog(row) {
        this.moveUsers = [row.email]
        this.moveUserDialog = true
      },
      moveUser(row) {
        this.moveUserDialog = false
        $axios.post('/group/groupManage/moveGroupMember', {
          emailList: this.moveUsers,
          groupId: this.moveForm.moveTo
        }).then((res) => {
          console.log(res.data.status);
          if (res.data.status) {
            this.$message({
              type: 'success',
              message: res.data.data
            })
            this.getgroupList()
          } else {
            this.$message({
              type: 'error',
              message: res.data.data
            })
          }
        })
      },
      openEditUserDialog(row){
        this.editUser = row;
        this.editUserDialog = true
      },
      closeEditUserDialog(){
        this.editUser = {};
        this.editUserDialog = false;
        this.getgroupList();
      },
      deleteHandler(row) {
        if (row.memberNum !== 0) {
          this.$message({
            type: 'warning',
            message: '该组组员数不为0,不能删除！'
          })
        } else {
          this.$confirm('确定删除?', '提示', {confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning'}).then(() => {
            $axios.post('/group/groupManage/delete', {idList: [row.id]}).then((res) => {
              if (res.data.status === true) {
                this.$message({
                  type: 'success',
                  message: res.data.data
                })
                this.getgroupList()
              }
              this.$message({
                type: 'error',
                message: res.data.data
              })
            })
          }).catch();
        }
      },
      editHandler(row) {
        this.editData = row
        this.editDialog = true
      },
      editOK() {
        let params = this.$refs.Teamedit.form
        $axios.post('/group/groupManage/edit', params).then((res) => {
          if (res.data.status === true) {
            this.$message({
              type: 'success',
              message: res.data.data
            })
            this.editDialog = false
            this.getgroupList()
          } else {
            this.$message({
              type: 'error',
              message: res.data.data
            })
          }
        })
      },
      add() {
        this.addDialog = true
      },
      addOK() {
        let params = this.$refs.TeamAdd.form
        $axios.post('/group/groupManage/add', params).then((res) => {
          if (res.data.status === true) {
            this.$message({
              type: 'success',
              message: res.data.data
            })
            this.addDialog = false
            this.getgroupList()
          } else {
            this.$message({
              type: 'error',
              message: res.data.data
            })
          }
        })
      }
    },
    computed: {
      tableData() {
        return this.ajaxData.filter(item => {
          // 判断当前查询值不为空 且和item的相关字段不相等 返回false
          if (item.name.indexOf(this.searchdata) === -1) {
            return false
          }
          return true
        })
      }
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .operation-group
    display: flex
    justify-content: space-between
    .el-input
      width: 200px

  @media screen and (max-width: 768px)
    .operation-group
      padding: 10px
      flex-direction: column
      .el-button, .el-input
        width: 100%
        margin-bottom: 10px

    .el-dialog__wrapper
      max-height: 100%
      .el-dialog
        border-radius: 0 !important
        width: 100% !important
        margin: 0 !important
        .el-dialog__body
          padding: 20px 0 0
        .dialog-footer
          display: flex
          .el-button
            flex: 1
            &.el-button--default
              display: none !important
</style>
