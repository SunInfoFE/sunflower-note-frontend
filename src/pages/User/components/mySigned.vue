<template>
<div class="my_signed">
    <h3>{{ calendarMonth }}月签到情况如下</h3>
   <!-- <el-button type="primary" icon="el-icon-edit" class="signed_btn">申请补签</el-button> -->
    <full-calendar :events="fcEvents" lang="zh"
      @changeMonth="changeMonth"
      @eventClick="eventClick"
      
    >
        <template slot="fc-header-right">
            <div class="stat">共有<span class="num">{{total}}</span>天签到</div>
        </template>
    </full-calendar>
</div>
</template>
<script type="text/ecmascript-6">
import fullCalendar from 'vue-fullcalendar';
import $axios from "@/plugins/ajax";
export default {
  data() {
    return {
        fcEvents : [],
        currentMon: null,
        currentDate: null,
        currentDay: 0,
        currentYear: 1987,
        allData: [],
        total: 0,
        calendarDate: null,
        calendarMonth: '',
        num:0
    }
  },
  methods : {
    getMontDataAjax(totalDay,monthStr,flag){
        $axios.post('/punchcard/userMonthList',{ userid: this.$store.state.data.email, month: monthStr }).then(({data}) => {
            if (data.status) {
               this.allData = data.data;
              // console.log(data.data)
                let eventData = [];
                //let num = 0;
                // 对于当月特殊处理
                let length = flag ? (totalDay - 1) : totalDay;
                for (let i = 0; i < length; i++) {
                    let day = String(i + 1).length === 1 ? '0' + String(i + 1) : String(i + 1);
                    let dateStr = monthStr + '-' + day;
                    let index = this.allData.findIndex(function(element){ return element.card_time === dateStr && element.card_status === 1});
                    if (index !== -1) {
                        eventData.push({
                            title : data.data[this.num].signed_time,
                            start : dateStr,
                            end : dateStr,
                            cssClass  : 'signed',
                            myData : {
                                status:'上班打卡成功'
                            }
                        },{
                            title : data.data[this.num].off_time,
                            start : dateStr,
                            end : dateStr,
                            cssClass  : 'signed',
                            myData : {
                                status : '下班打卡成功'
                            }
                        });   
                        this.total ++;
                        this.num ++
                        console .log(this.num)
                    } else {
                        let day = String(i + 1).length === 1 ? '0' + String(i + 1) : String(i + 1);
                        eventData.push({
                            title : '未签到',
                            start : dateStr,
                            end : dateStr,
                            cssClass  : 'unsigned',
                            myData : {
                                status : '未签到'
                            }
                        });
                    }
                }
                // 对于当月特殊处理
                if (flag) {
                    let day = String(this.currentDay).length === 1 ? '0' + String(this.currentDay) : String(this.currentDay);
                    let dateStr = this.currentYear + '-' + this.currentMon + '-' + day;
                    let signedIndex = this.allData.findIndex(function(element){ return element.card_time === dateStr && element.signed_time != null && element.off_time == null});
                    let offedIndex = this.allData.findIndex(function(element){ return element.card_time === dateStr && element.signed_time != null && element.off_time != null});
                    if (signedIndex !== -1) {
                        eventData.push({
                            title : data.data[this.num].signed_time,
                            start : dateStr,
                            end : dateStr,
                            cssClass  : 'signed',
                            myData : {
                                status: '上班打卡成功'
                            }
                        },{
                            title : '下班打卡',
                            start : dateStr,
                            end : dateStr,
                            cssClass  : 'sign',
                            myData : {
                                status: ''
                            }
                        });
                        this.total ++;
                    } else if (offedIndex !== -1) {
                        eventData.push({
                            title : data.data[this.num].signed_time,
                            start : dateStr,
                            end : dateStr,
                            cssClass  : 'signed',
                            myData : {
                                status: '上班打卡成功'
                            }
                        },{
                            title : data.data[this.num].off_time,
                            start : dateStr,
                            end : dateStr,
                            cssClass  : 'signed',
                            myData : {
                                status: '下班打卡成功'
                            }
                        });
                    } else {
                        eventData.push({
                            title : '上班打卡',
                            start : dateStr,
                            end : dateStr,
                            cssClass : 'sign',
                            myData : {
                                status : ''
                            }
                        },{
                            title : '下班打卡',
                            start : dateStr,
                            end : dateStr,
                            cssClass : 'sign',
                            myData : {
                                status : ''
                            }
                        })
                    }
                }
                this.fcEvents = eventData; 
            } else {
                let eventData = [];
                for (let i = 0; i < totalDay; i++) {
                    let day = String(i + 1).length === 1 ? '0' + String(i + 1) : String(i + 1);
                        eventData.push({
                            title : '未签到',
                            start : monthStr + '-' + day,
                            end : monthStr + '-' + day,
                            cssClass  : 'unsigned',
                            myData : {
                                status : '未签到'
                            }
                        });
                }
                this.fcEvents = eventData;
                //console.log(this.fcEvents)
            }
        });
    },
    changeMonth (start, end, current) {
        // 初始化
        if(this.currentMon === null) {
            this.currentMon = current.split('-')[1];
            let date = new Date();
            this.currentDate = date.getFullYear() + '-' + this.currentMon + '-' + date.getDate();
            this.currentDay = date.getDate();
            this.currentYear = date.getFullYear();
        }
        this.calendarDate = current;
        let calendarDateAry = this.calendarDate.split('-');
        let calendarYear = calendarDateAry[0];
        let calendarMonth = calendarDateAry[1];
        this.calendarMonth = calendarMonth;
        let calendarDay = calendarDateAry[2];
        this.total = 0;

        if(calendarYear === String(this.currentYear) && calendarMonth === String(this.currentMon)){
            this.getMontDataAjax(this.currentDay,calendarYear + '-' + calendarMonth, true);
        } else {
            // 只有已经过去的日子才需要获取签到数据
            if (this.currentYear > Number(calendarYear) || this.currentYear == Number(calendarYear) && Number(calendarMonth) < this.currentMon) {
                var totalDay = new Date(calendarYear, calendarMonth, 0).getDate();
                this.getMontDataAjax(totalDay,calendarYear + '-' + calendarMonth, false);
            }
        }
    },
    eventClick (event, jsEvent, pos) {
       if (event.start === this.currentDate) {
           if(event.title == "上班打卡" || event.myData.status == "上班打卡成功"){
               $axios.post('/punchcard/signin',{ userid: this.$store.state.data.email }).then(({data}) => {
                   if(!data.status){
                        this.$message({showClose: true, message: data.data, type: 'error'});
                    } else {
                        event.title = data.data;
                        event.cssClass = "signed";
                        event.myData.status = "上班打卡成功"
                        this.$message.success('签到成功！');
                        this.$set( this.fcEvents, this.fcEvents.length - 2, event); 
                        this.total ++;
                    }
               });
            } else {
                $axios.post('/punchcard/signoff', {userid: this.$store.state.data.email }).then(({data}) => {
                    if(!data.status) {
                        this.$message({showClose: true,message: data.data,type: 'error'}); 
                    } else {
                        this.$message.success("下班打卡成功");
                        this.$set( this.fcEvents, this.fcEvents.length - 1,{
                            title : data.data,
                            start : this.currentDate,
                            end : this.currentDate,
                            cssClass : 'signed',
                            myData : {
                                status : '下班打卡成功'
                            }
                        });
                    }
                });
            }    
        }
    }
  },
  components: {
	'full-calendar': fullCalendar	
  }
};          
</script>
<style>
.my_signed{
    position: relative;
}
.my_signed h3{
    text-align: center;
}
.my_signed .stat{
    text-align: right;
}
.my_signed .num{
    color: blue;
    font-weight: 600;
    margin: 0 3px;
}
.signed_btn{
    position: absolute;
    right: 60px;
    top: 20px;
}
.signed {
    font-size: 9px !important;
    line-height: 35px !important;
    height: 35px !important;
    text-align: center !important;
    background-color: rgba(0, 255, 0, 0.2)!important;
}
.sign{
    font-size: 9px !important;
    line-height: 35px !important;
    height: 35px !important;
    text-align: center !important;
}
.unsigned{
    font-size: 18px !important;
    line-height: 75px !important;
    height: 75px !important;
    text-align: center !important;
    background-color:rgba(255, 0, 0, 0.2) !important;
}
</style>
