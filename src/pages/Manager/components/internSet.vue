<template>
  <div>
    <el-card class="box-card">
    <div slot="header" class="clearfix">
        <span>实习生</span>
    </div>
    <el-form ref="form" :inline="true" label-width="80px">
        <el-form-item label="邮箱地址">
            <el-input v-model="email1"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" icon="el-icon-circle-plus-outline" @click="setMemberLevel('1')">添加</el-button>
        </el-form-item>
    </el-form>
    <el-table
            :data="internMember"
            stripe
            style="width: 100%">
            <el-table-column
            prop="name"
            label="姓名"
            width="180">
            </el-table-column>
            <el-table-column
            prop="sex"
            width="120"
            label="性别">
            </el-table-column>
            <el-table-column
            prop="email"
            label="邮箱">
            </el-table-column>
            <el-table-column
                fixed="right"
                label="操作"
                width="100">
                <template slot-scope="scope">
                    <el-button @click="deleteAction(scope.row)" type="text" size="small">删除</el-button>
                </template>
                </el-table-column>
        </el-table>
    </el-card>
    <el-card class="box-card setMarinTop">
    <div slot="header" class="clearfix">
        <span>实习监督</span>
    </div>
    <el-form ref="form" :inline="true" label-width="80px">
        <el-form-item label="邮箱地址">
            <el-input v-model="email2"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" icon="el-icon-circle-plus-outline" @click="setMemberLevel('2')">添加</el-button>
        </el-form-item>
    </el-form>
    <el-table
            :data="otherMember"
            stripe
            style="width: 100%">
            <el-table-column
            prop="name"
            label="姓名"
            width="180">
            </el-table-column>
            <el-table-column
            prop="sex"
            width="120"
            label="性别">
            </el-table-column>
            <el-table-column
            prop="email"
            label="邮箱">
            </el-table-column>
            <el-table-column
                fixed="right"
                label="操作"
                width="100">
                <template slot-scope="scope">
                    <el-button @click="deleteAction(scope.row)" type="text" size="small">删除</el-button>
                </template>
                </el-table-column>
        </el-table>
    </el-card>
  </div>
</template>
<script type="text/ecmascript-6">
import $axios from "@/plugins/ajax";
export default {
  data() {
    return {
        internMember: [],
        otherMember: [],
        email2: '',
        email1: ''
    }
  },
  mounted() {
    this.getInternMember();
    this.getOtherMember();
  },    
  methods: {
    deleteAction(row){
        this.$confirm('确定删除?', '提示', {confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning'}).then(() => {
            this.ajaxUpdate('0',row.email);
        }).catch();
    },
    setMemberLevel(type) {
        let email = type === '1' ? this.email1 : this.email2;
        if (email.length > 0) {
            this.ajaxUpdate(type, email.trim());
        }
    },
    ajaxUpdate(type, email){
        $axios.post('/punchcard/setLevelMember',{ level: type ,userEmail: email}).then(({data}) => {
            if(data.status){
                this.$message.success(data.data);
                this.getInternMember();
                this.getOtherMember();
                this.email2 = '';
                this.email1 = '';
            } else {
                this.$message({showClose: true, message: data.data, type: 'error'});
            }
        });
    },
    getInternMember() {
        $axios.post('/punchcard/getLevelMember',{ id: '1' }).then(({data}) => {
           if(data.status){
                this.internMember = data.data;
           } else {
               this.$message({showClose: true, message: data.data, type: 'error'});
           }
        });
    },
    getOtherMember() {
        $axios.post('/punchcard/getLevelMember',{ id: '2' }).then(({data}) => {
           if(data.status){
                this.otherMember = data.data;
           } else {
               this.$message({showClose: true, message: data.data, type: 'error'});
           }
        });
    }
  }
}          
</script>
<style lang="stylus" rel="stylesheet/stylus">
.setMarinTop
  margin-top 15px;
</style>   