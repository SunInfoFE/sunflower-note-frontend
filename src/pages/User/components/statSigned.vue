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
            type="index"
            width="50">
            </el-table-column>
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
            label="邮箱"
            width="180">
            </el-table-column>
            <el-table-column
            prop="count"
            label="天数">
            </el-table-column>
            <el-table-column
                fixed="right"
                label="操作"
                width="100">
                <template slot-scope="scope">
                    <el-button @click="viewAction(scope.row)" type="text" size="small">查看详细</el-button>
                </template>
                </el-table-column>
        </el-table>
        <el-dialog
            v-if="viewDialog"
            :visible.sync="viewDialog"
            width="700px" title="签到详情">
            <el-table
            :data="detailTableData"
            stripe
            style="width: 100%">
            <el-table-column
                type="index"
                width="50">
                </el-table-column>
            <el-table-column
            prop="card_time"
            label="签到日期"
            width="180">
            </el-table-column>
            <el-table-column
            prop="userid"
            label="邮箱"
            width="180">
            </el-table-column>
            <el-table-column
            prop="card_status"
            label="状态">
            </el-table-column>
            </el-table>
            <span slot="footer" class="dialog-footer">
                <el-button @click="viewDialog = false">关闭</el-button>
            </span>
            </el-dialog>
    </div>
</template>
<script type="text/ecmascript-6">
import $axios from "@/plugins/ajax";
export default {
  data() {
    return{
        member: [],
        month: '',
        memberData: [],
        monthBaseData: [],
        viewDialog: false,
        detailTableData: []
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
    viewAction(row){
        this.viewDialog = true;
        console.log(this.monthBaseData);
        this.detailTableData = this.monthBaseData.filter(function(element){ return element.userid === row.email});
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
                this.monthBaseData = monthDataAry;
                let member = [];
                for (let i=0; i < this.memberData.length; i++) {
                    let count = 0;
                    if(typeof statData[this.memberData[i].email] !== 'undefined'){
                        count = statData[this.memberData[i].email]; 
                    }
                    member.push({name:this.memberData[i].name, sex: this.memberData[i].sex, email:this.memberData[i].email, count: count});
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
    