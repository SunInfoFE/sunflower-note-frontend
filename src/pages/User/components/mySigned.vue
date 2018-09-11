<template>
<div class="my_signed">
    <h3>{{ currentMon }}月签到情况如下</h3>
    <el-button type="primary" icon="el-icon-edit" class="signed_btn">申请补签</el-button>
    <full-calendar :events="fcEvents" lang="zh"
      @changeMonth="changeMonth"
      @eventClick="eventClick"
      @dayClick="dayClick"
    >
        <template slot="fc-header-right">
            <div class="stat">共有<span class="num">10</span>天签到</div>
        </template>
    </full-calendar>
</div>
</template>
<script type="text/ecmascript-6">
import fullCalendar from 'vue-fullcalendar'
var demoEvents = [
	{
      title : '已签到',
      start : '2018-09-10',
      end : '2018-09-10',
      cssClass  : 'family'
    },
    {
      title : '签到',
      start : '2018-09-11',
      end : '2018-09-11',
      cssClass  : 'family'
    }
];
export default {
  data() {
    return {
        fcEvents : demoEvents,
        currentMon: null
    }
  },
  mounted() {
      this.getCurrentMonthData();
  },
  methods : {
    getCurrentMonthData(){
        console.log('123');
    },
    changeMonth (start, end, current) {
      this.currentMon = current.split('-')[1];
      console.log('456');
    },
    eventClick (event, jsEvent, pos) {
       console.log('eventClick', event, jsEvent, pos)
    },
    dayClick (day, jsEvent) {
      console.log('dayClick', day, jsEvent)
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
.family {
    font-size: 18px !important;
    line-height: 75px !important;
    height: 75px !important;
    text-align: center !important;
}
</style>
