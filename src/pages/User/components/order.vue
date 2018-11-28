<template>
     <div class="board">
         <div style="text-align: center; height:100px; line-height:50px;">
             <span class="title">请在下午4点之前选择今天你想吃的晚餐</span>
         </div>
        <el-row type="flex" justify="center">
            <el-col :span="4" v-for="(o, index) in dinner.length" :key="o" :offset="index > 0 ? 1 : 0">
                <div class="content" @click="chooseDinner(index)">
                    <el-card :span="6" class="box menu" :body-style="{ padding: '0px' }" >
                <img :src='dinner[index]' class="image" alt="">
                <div style="padding: 14px; text-align:center">
                    <span class='dinner'>{{ dinnerChoose[index] }}</span>
                    <div class="bottom clearfix">
                    <time class="time"></time>
                    </div>
                </div>
                </el-card>
                </div>
            </el-col>
        </el-row>
        <div style="text-align:center; margin-top:30px">
            <el-button :disabled='hidden' style="display:inline-block" type="primary" @click.stop="fasong()">提交</el-button>
            <el-button :disabled='reset' style="display:inline-block" type="primary" @click.stop="cancle()">取消</el-button>
        </div>
    </div> 

</template>

<script>
import mc from "../../../assets/images/food/mao.jpg";
import rice from "../../../assets/images/food/rice.jpg";
import cb from "../../../assets/images/food/bing.jpg";
import cm from "../../../assets/images/food/noodles.jpg";
import clt from "../../../assets/images/food/latiao.jpg";
import jiucDum from "../../../assets/images/food/jiucDum.jpg";
import liancDum from "../../../assets/images/food/liancDum.jpg";
import luobDum from "../../../assets/images/food/luobDum.jpg";
import qincDum from "../../../assets/images/food/qincDum.jpg";
import xiarDum from "../../../assets/images/food/xiarDum.jpg";
import baicDum from "../../../assets/images/food/baicDum.jpg";
import $axios from '@/plugins/ajax'
export default {
  data() {
    return {
        reset: false,//控制重选按钮
        hidden: false,//控制确定按钮是否可见
        userDinner: '',//返回的用户已经选择的晚餐
        chooesd: '',//选中的晚餐
        todayDinner: [],//返回的今日晚餐
        dinnerChoose: []//晚餐列表
    };
  },
  created() {
      this.init();
  },
  computed: {
      //设置图片路径
      dinner() {
          let dinnerArr = [];
          for(let i = 0;i < this.todayDinner.length; i++) {
              
                  if(this.todayDinner[i].dinner == '米饭'){
                      dinnerArr.push(rice)
                  } else if(this.todayDinner[i].dinner == '炒饼丝') {
                      dinnerArr.push(cb)
                  } else if(this.todayDinner[i].dinner == '炒面') {
                      dinnerArr.push(cm)
                  } else if(this.todayDinner[i].dinner == '冒菜') {
                      dinnerArr.push(mc)
                  } else if(this.todayDinner[i].dinner == '炒拉条') {
                      dinnerArr.push(clt)
                  } else if(this.todayDinner[i].dinner == '米线肉夹馍') {
                      dinnerArr.push(mx)
                  } else if(this.todayDinner[i].dinner == '韭菜鸡蛋饺子') {
                      dinnerArr.push(jiucDum)
                  } else if(this.todayDinner[i].dinner == '莲菜猪肉饺子') {
                      dinnerArr.push(liancDum)
                  } else if(this.todayDinner[i].dinner == '萝卜猪肉饺子') {
                      dinnerArr.push(luobDum)
                  } else if(this.todayDinner[i].dinner == '芹菜猪肉饺子') {
                      dinnerArr.push(qincDum)
                  } else if(this.todayDinner[i].dinner == '虾仁西葫芦鸡蛋饺子') {
                      dinnerArr.push(xiarDum)
                  } else if(this.todayDinner[i].dinner == '白菜猪肉饺子') {
                      dinnerArr.push(baicDum)
                  }
              
            }
          return dinnerArr
      }
  },
  methods: {
      //初始化
      init() {
          let span = document.getElementsByClassName('dinner')
          let box = document.getElementsByClassName('box')
          let content = document.getElementsByClassName('content')
          $axios.get('/order/init').then(res => {
            this.getTodayDinner();
            this.getUserDinner();
            console.log(res.data.data)
            if(res.data.data > "16:00:00"){
                this.reset = true;
            } else {
                this.reset = false;
            }
          })
      },
      //选择晚餐
      chooseDinner(index) {
          this.chooesd = this.todayDinner[index].dinner;
          let span = document.getElementsByClassName('dinner')
          let box = document.getElementsByClassName('box')
          //判断其他card上是否有选中的样式，有就去除
          for(let i = 0; i < this.todayDinner.length; i ++) {
              if(span[i].textContent.indexOf('✔') != -1) {
                  span[i].innerHTML = this.todayDinner[i].dinner
                  box[i].style.border = "solid 2px white"
              }
          } 
          //为选中的card设置样式
          span[index].innerHTML = this.todayDinner[index].dinner + '✔'
          box[index].style.border = "solid 2px #545c64"
      },
      //获取用户已选择的晚餐
      getUserDinner() {
          let span = document.getElementsByClassName('dinner')
          let box = document.getElementsByClassName('box')
          let content = document.getElementsByClassName('content')
          //发送ajax请求获取用户已选择的晚餐
          $axios.get('/order/getuserdinner').then(res => {
              if(res.data.status) {
                  //把结果赋给userDinner
                  this.userDinner = res.data.data[0].dinner
                  //如果用户没有选择晚餐，将按钮设置为可用
                  if(this.userDinner == '' || this.userDinner == null) {
                      this.hidden = false
                  } else {
                      //如果有，将该晚餐对应的card的样式设置为已选择的样式
                      for(let i = 0; i < this.todayDinner.length; i ++) {
                          if(span[i].textContent == this.userDinner) {
                              span[i].innerHTML = this.todayDinner[i].dinner + '✔'
                              box[i].style.border = "solid 2px #545c64"
                          } else {
                              box[i].style.opacity = "0.5"
                              box[i].style.cursor = "not-allowed"
                              content[i].style.pointerEvents = 'none'
                              box[i].classList.remove('menu')
                          }
                      }
                      //把按钮设为不可用
                      this.hidden = true
                  }
              } else {
                  this.$message({
                      type: 'error',
                      message: res.data.data
                  })
              }
          })
      },
      //获取今天的晚餐种类
      getTodayDinner() {
          //发送ajax获取今日晚餐种类
          $axios.get('/order/gettodaydinner').then(res=>{
              //如果返回结果正确，将todayDinner设置为返回的结果
              if(res.data.status) {
                  this.todayDinner = res.data.data
                  //设置今天的晚餐列表
                  for(let i = 0; i < this.todayDinner.length; i ++) {
                    this.$set(this.dinnerChoose, i, this.todayDinner[i].dinner)
                    this.dinnerChoose[i] = this.todayDinner[i].dinner
                  }
              } else {
                  this.$message({
                      type: 'error',
                      message: res.data.data
                  })
              }
          })
      },
      //提交按钮
      fasong() {
          //判断是否选中了晚餐
          let box = document.getElementsByClassName('box')
          let content = document.getElementsByClassName('content')
          let span = document.getElementsByClassName('dinner')
          if(this.chooesd.length > 0) {
              //发送ajax提交数据
            $axios.post('/order/commit', {dinner: this.chooesd}).then(res=>{
                if(res.data.status) {
                    this.hidden = true
                    for(let i = 0; i < this.todayDinner.length; i ++) {
                        if(span[i].textContent.indexOf('✔') == -1){
                            box[i].style.opacity = "0.5"
                            box[i].style.cursor = "not-allowed"
                            content[i].style.pointerEvents = 'none'
                            box[i].classList.remove('menu')
                            console.log(11)
                        }
                    }
                    this.$message({
                        type: 'success',
                        message: res.data.data
                    })
                } else {
                    this.$message({
                        type: 'error',
                        message: res.data.data
                    })
                }
            }) 
          } else {
              this.$message({
                  type: 'error',
                  message: '你还没选择晚餐...'
              })
          }
      },
      //重新选择按钮
      cancle() {
          //发送ajax取消当前用户选择的晚餐
          let span = document.getElementsByClassName('dinner')
          let box = document.getElementsByClassName('box')
          let content = document.getElementsByClassName('content')
          $axios.get('/order/deletedinner').then(res => {
              //取消成功
              if(res.data.status) {
                  this.chooesd = ''
                  for(let i = 0; i < this.todayDinner.length; i ++) {
                      span[i].innerHTML = this.todayDinner[i].dinner 
                      box[i].style.border = "solid 2px white"
                      box[i].style.opacity = "1"
                      box[i].style.cursor = "pointer"
                      content[i].style.pointerEvents = 'auto'
                      box[i].classList.add('menu')
                  }
                  this.$message({
                      type: 'success',
                      message: res.data.data
                  })
                  this.hidden = false
                  //取消失败
              } else {
                  this.$message({
                      type: 'error',
                      message: res.data.data
                  })
              }
          })
      }
  }
};
</script>
<style scoped>
.title {
    font-family: "cursive";
    font-weight: bold;
    color: #888;
    
}
.board{
    width: 80%;
    margin-left: 10%;
}
.image {
    height: 180px;
    width: 100%;
    display: block;
}
.menu {
  position: relative;
  display: inline-block;
  cursor: pointer;
  border-radius: 5px;
  background-color: #fff;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease-in-out;
}
.menu::after {
  content: "";
  position: absolute;
  z-index: -1;
  width: 100%;
  height: 100%;
  opacity: 0;
  border-radius: 5px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  transition: opacity 0.3s ease-in-out;
}
.menu:hover {
  transform: scale(1.1, 1.1);
}
.menu:hover::after {
  opacity: 1;
}
</style>


