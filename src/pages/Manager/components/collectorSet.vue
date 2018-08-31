<template>
  <div>
    <el-card class="box-card">
    <div slot="header" class="clearfix">
        <span>集中组设置</span>
    </div>
    <el-transfer 
    v-model="selectGroups"
    :props="{
      key: 'id',
      label: 'name'
    }"
    :titles="['不需要集中组', '需要集中的组']"
    :data="groups"></el-transfer>
    </el-card>
    <el-card class="box-card setMarinTop">
    <div slot="header" class="clearfix">
        <span>收集人设置</span>
    </div>
    <el-transfer v-model="selectUsers"
    :props="{
      key: 'email',
      label: 'name'
    }"
    :titles="['非收集人', '收集人']"
    :data="users"
    ></el-transfer>
    </el-card>
    <div class="setMarinTop">
    <el-button type="primary" @click="editGroupsCombine">保存更改</el-button>
    <el-button @click="onReset">重置更改</el-button>
    </div>
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
      selectGroups: []
    };
  },
  watch: {
      selectGroups: function (value) {
        this.getUserData(value)
      }
  },          
  mounted() {
      this.getGroupData()
  },
  methods: {
      onReset(){
        this.getGroupData();
      },
      onSubmit(){

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
                this.$message.success(data.data);
              }
            });
          }
      },
      getGroupData() {
        let groups = [];
        let sGroups = [];
        $axios.get('/group/groupManage/get').then(({data}) => {
          if (data.status === true) {
            this.groups = data.data;
            for(let i = 0,length = this.groups.length; i < length; i++){
              if(this.groups[i].combine == 1){
                sGroups.push(this.groups[i].id);
              }
            }
            this.selectGroups = sGroups;
          }
        })
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