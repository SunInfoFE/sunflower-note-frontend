<template>
    <div class="stat_signed">
        <el-date-picker
        v-model="month"
        type="month"
        placeholder="选择月" @change="changeMonth" value-format="yyyy-MM">
        </el-date-picker>
        月份实习生统计信息
        <el-table
            :data="member"
            stripe
            style="width: 100%">
            <el-table-column
            prop="name"
            label="姓名"
            width="180">
            </el-table-column>
            <el-table-column
            prop="email"
            label="邮箱"
            width="180">
            </el-table-column>
            <el-table-column
            prop="count"
            label="天数">
            </el-table-column>
        </el-table>
    </div> 
</template>
<script type="text/ecmascript-6">
import $axios from "@/plugins/ajax";
export default {
  data() {
    return{
        member: [],
        month: '',
        memberData: []
    }
  },
  mounted() {
    let month = new Date().getMonth() + 1;
    let year = new Date().getFullYear();
    let monthStr = String(month).length === 1 ? '0' + month : month;
    this.month = year + '-' + monthStr;
    this.getData();
  },
  methods: {
    getData() {
        $axios.post('/punchcard/getLevelMember',{ id: '1' }).then(({data}) => {
           if(data.status){
                this.memberData = data.data;
                this.getStatData();
           } else {
               this.$message({showClose: true, message: data.data, type: 'error'});
           }
        });
    },
    changeMonth(){
        this.getStatData();
    },
    getStatData(){
        $axios.post('/punchcard/monthList',{ month: this.month }).then((res) => {
            let statData = {};
            let member = [];
            if (res.data.status) {
                let monthDataAry = res.data.data;
                for(let i = 0; i < monthDataAry.length; i++){
                    if (typeof statData[monthDataAry[i].userid] == 'undefined') {
                        statData[monthDataAry[i].userid] = 1;
                    } else {
                        statData[monthDataAry[i].userid] = statData[monthDataAry[i].userid] + 1;
                    }
                }
                let member = [];
                for (let i=0; i < this.memberData.length; i++) {
                    let count = 0;
                    if(typeof statData[this.memberData[i].email] !== 'undefined'){
                        count = statData[this.memberData[i].email]; 
                    }
                    member.push({name:this.memberData[i].name, email:this.memberData[i].email, count: count});
                }
                this.member = member;
            } else {
                this.$message({showClose: true, message: res.data.data, type: 'error'});
            }
        });
    }
  }
};
</script>
<style>
</style>
    