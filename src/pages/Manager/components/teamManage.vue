<template>
<div>
   <div>
   <el-input
   suffix-icon="el-icon-search"
   placeholder="请输入组名"
   v-model="searchdata"
   @blur = "search()"
   style="width: 500px">
   </el-input>
   </div>
   <div style="margin-top: 10px">
     <el-button @click="add()">添加小组</el-button>
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
    width="700px">
    <team-manage ref="Teamedit" :editData = "editData"></team-manage>
    <span slot="footer" class="dialog-footer">
        <el-button @click="editDialog = false">取 消</el-button>
        <el-button type="primary" @click="editOK()">保 存</el-button>
      </span>
  </el-dialog>
  <!--查看-->
  <el-dialog
    :visible.sync="lookDialog"
    width="700px">
    <team-look  :lookData = "lookData" :TeamData = "lookTeamData" @delete="deleteUser"></team-look>
    <span slot="footer" class="dialog-footer">
        <el-button @click="lookDialog = false">取 消</el-button>
      </span>
  </el-dialog>
</div>
</template>

<script type="text/ecmascript-6">
import tablePagination from '@/components/tablePagination';
import $axios from '@/plugins/ajax';
import TeamManage from './TeamAdd';
import TeamLook from './TeamLook'
export default {
 components: {
   tablePagination,
   TeamManage,
   TeamLook
 },
 data() {
 return {
   tableData: [],
   ajaxData: [],
   addDialog: false,
   editDialog: false,
   editData: {},
   lookDialog: false,
   lookData: [],
   lookTeamData: {},
   searchdata: ''
 }
 },
 created() {
   this.getgroupList()
 },
 methods: {
 getgroupList() {
   $axios.get('/group/groupManage/get').then((res) => {
     this.ajaxData = res.data.data
     this.tableData = this.ajaxData
   })
 },
   eyeHandler(row) {
    this.lookTeamData = row
    $axios.get('/group/groupManage/getGroupMember', {id:row.id}).then((res) => {
      this.lookData = res.data.data
    })
   this.lookDialog = true
   },
   deleteUser(row) {
     $axios.post('/group/groupManage/deleteGroupMember', {idList: [row.groupId]}).then((res) => {
       if (res.data.status === true) {
         this.$message({
           type: 'success',
           message: res.data.data
         })
         this.eyeHandler()
       } else {
         this.$message({
           type: 'error',
           message: res.data.data
         })
       }
     })
   },
   deleteHandler(row) {
    if (row.memberNum !== 0) {
     this.$message({
        type: 'warning',
        message: res.data.data
      })
    } else {
      $axios.post('/group/groupManage/delete', {idList: [row.id]}).then((res) => {
      if (res.data.status === true) {
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
    }
   },
   editHandler(row) {
     this.editData = row
     this.editDialog = true
   },
   editOK() {
     let params = this.$refs.Teamedit.form
      $axios.post('/group/groupManage/edit' , params).then((res) => {
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
   },
   search() {
     this.tableData = []
     this.ajaxData.forEach(item => {
      if (item.name.indexOf(this.searchdata) >= 0) {
        this.tableData.push(item)
      }
     })
     return this.tableData
   }
 }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
</style>
