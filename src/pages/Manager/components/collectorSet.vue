<template>
  <div>
    <el-card class="box-card">
    <div slot="header" class="clearfix">
        <span>集中组生成</span>
    </div>
    <el-row>
      <el-col :span="12">
        <el-transfer 
          v-model="selectGroups"
          :props="{
            key: 'id',
            label: 'name'
          }"
          :titles="['不需要集中组', '需要集中的组']"
          :data="groups"></el-transfer>
      </el-col>
      <el-col :span="12">
          <el-transfer v-model="selectUsers"
            :props="{
              key: 'email',
              label: 'name'
            }"
            :titles="['非收集人', '收集人']"
            :data="users"
            ></el-transfer>
      </el-col>
    </el-row>
    <el-row style="margin-top:10px">
        <el-col :span="24">
          <el-button type="primary" @click="editGroupsCombine">保存</el-button>
        </el-col>
      </el-row>
    </el-card>
    <el-card class="box-card setMarinTop">
    <div slot="header" class="clearfix">
        <span>收集组信息</span>
    </div>
    <el-table
        :data="collectTable"
        border
        style="width: 100%">
        <el-table-column
          prop="combineCode"
          label="合并码"
          width="180">
        </el-table-column>
        <el-table-column
          prop="groupNames"
          label="包含组"
        >
        </el-table-column>
        <el-table-column
          fixed="right"
            label="操作"
            width="120">
          <template slot-scope="scope">
            <el-button @click="viewClick(scope.row)" type="text" size="small">查看详情</el-button>
            <el-button @click="deleteClick(scope.row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog :visible.sync="dialogFormVisible" width="40%">
      <el-form :model="form">
        <el-form-item label="合并码" :label-width="formLabelWidth">
          <el-input v-model="form.combineCode"></el-input>
        </el-form-item>
        <el-form-item label="收集人" :label-width="formLabelWidth">
          <el-input v-model="form.users"></el-input>
        </el-form-item>
        <el-form-item label="包含组" :label-width="formLabelWidth">
          <el-input v-model="form.groupNames"></el-input>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script type="text/ecmascript-6">
import $axios from "@/plugins/ajax";
export default {
  data() {
    return {
      users: [],
      selectUsers: [],
      groups: [],
      selectGroups: [],
      collectGroup: {},
      collectTable: [],
      dialogFormVisible: false,
      formLabelWidth: '120',
      form:{
        combineCode: 0,
        users: '',
        groupNames: ''
      }
    };
  },
  watch: {
      selectGroups: function (value) {
        this.getUserData(value)
      },
      collectGroup: function(object) {
        let tableData = [];
        for (const combine in object) {
          if (object.hasOwnProperty(combine)) {
            const ary = object[combine];
            let groupNames = [];
            let groupIds = [];
            ary.forEach(function(element) {
              groupNames.push(element.name);
              groupIds.push(element.id);
            });
            tableData.push({'combineCode': combine, 'groupNames': groupNames.join(','), 'groupIds': groupIds});
          }
        }
        this.collectTable = tableData;
      }
  },          
  mounted() {
      this.getGroupData()
  },
  methods: {
      onReset(){
        this.getGroupData();
      },
      viewClick(row){
        let selectUsers = [];
        $axios.post('/group/groupManage/getGroupsMember', {idList: row.groupIds}).then((res) => {
            if (res.data.status === true) {
              let users = res.data.data;
              for(let i = 0,length = users.length; i < length; i++){
                if(users[i].collector == row.combineCode){
                  selectUsers.push(users[i].name);
                }
              }
              this.form.combineCode = row.combineCode;
              this.form.users = selectUsers.join(',');
              this.form.groupNames = row.groupNames;
              this.dialogFormVisible = true;
            }  
        });
        
      },
      deleteClick(row){
        this.$confirm('确定删除?', '提示', {confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning'}).then(() => {
          $axios.post('/group/groupManage/deleteGroupsCombine',{combine: row.combineCode}).then(({data}) => {
                if(data.status !== true){
                  this.getGroupData();
                  this.$message({showClose: true, message: data.data, type: 'error'});
                } else {
                  this.getGroupData();
                  this.$message.success(data.data);
                }
          });
        }).catch();
      },
      editGroupsCombine(){
          let flag = true;
          if (this.selectGroups.length !== 0 && this.selectUsers.length === 0) {
            this.$message.warning('请为集中周报的组选择周报收集人!')
            flag = false;
          }
          if (flag) {
            $axios.post('/group/groupManage/editGroupsCombine',{idList: this.selectGroups, emailList: this.selectUsers}).then(({data}) => {
              if(data.status !== true){
                this.getGroupData();
                this.$message({showClose: true, message: data.data, type: 'error'});
              } else {
                this.getGroupData();
                this.$message.success(data.data);
              }
            });
          }
      },
      getGroupData() {
        let groups = [];
        let sGroups = [];
        // 取出来所有未集中的组记录
        $axios.get('/group/groupManage/get').then(({data}) => {
          if (data.status === true) {
            let groups = data.data;
            let collectGroup = {};
            for(let i = 0,length = groups.length; i < length; i++){
              if(groups[i].combine == 0){
                sGroups.push(groups[i]);
              } else {
                let combine = groups[i].combine;
                if (typeof collectGroup[combine] != 'undefined'){
                  collectGroup[combine].push(groups[i]);
                } else {
                  collectGroup[combine] = [groups[i]];
                }
              }
            }
            this.groups = sGroups;
            this.collectGroup = collectGroup;
            this.users = [];
            this.selectUsers = [];
            this.selectGroups = [];
          }
        });
      },
      getUserData(groupIds) {
        if(groupIds.length == 0) {
          this.users = [];
          this.selectUsers = [];
        } else {
          let selectUsers = [];
          $axios.post('/group/groupManage/getGroupsMember', {idList: groupIds}).then((res) => {
            if (res.data.status === true) {
              this.users = res.data.data;
              for(let i = 0,length = this.users.length; i < length; i++){
                if(this.users[i].collector == 1){
                  selectUsers.push(this.users[i].email);
                }
              }
              this.selectUsers = selectUsers;
            }  
          });
        }
      }
  }
};
</script>
<style lang="stylus" rel="stylesheet/stylus">
.setMarinTop
  margin-top 15px;
</style>      