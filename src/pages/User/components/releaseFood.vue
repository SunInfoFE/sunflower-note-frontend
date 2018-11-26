<template>
    <div style="display:flex; flex-direction:row;">
        <div style="width:70%">
            <el-row class="noodles">
                <el-col :span="8">
                    <el-card :body-style="{ paddingBottom: '0px' }">
                        <img src="../../../assets/images/food/noodles.jpg" class="image">
                        <div style="padding: 14px;">
                            <span>炒面</span>
                        </div>
                    </el-card>
                </el-col>
                <el-col :span="8" shadow="never">
                    <el-card :body-style="{ paddingBottom: '0px' }">
                        <img src="../../../assets/images/food/bing.jpg" class="image">
                        <div style="padding: 14px;">
                            <span>炒饼</span>
                        </div>
                    </el-card>
                </el-col>
                <el-col :span="8">
                    <el-card :body-style="{ paddingBottom: '0px' }">
                        <img src="../../../assets/images/food/latiao.jpg" class="image">
                        <div style="padding: 14px;">
                            <span>炒拉条</span>
                        </div>
                    </el-card>
                </el-col>
                <el-card :body-style="{ padding: '15px' }">
                    <div style="display:block;text-align:center">
                        <span>炒面系列</span>
                        <el-button
                            type="text"
                            style="padding: 0;float: right;margin-top:4px;"
                            @click="addFood('炒面系列')"
                        >添加</el-button>
                    </div>
                </el-card>
            </el-row>
            <el-row class="other">
                <el-col :span="8">
                    <el-card :body-style="{ paddingBottom: '0px' }">
                        <img src="../../../assets/images/food/mao.jpg" class="image">
                        <div style="padding: 14px;">
                            <span>冒菜</span>
                            <div class="bottom clearfix">
                                <el-button type="text" class="button" @click="addFood('冒菜')">添加</el-button>
                            </div>
                        </div>
                    </el-card>
                </el-col>
                <el-col :span="8">
                    <el-card :body-style="{ paddingBottom: '0px' }">
                        <img src="../../../assets/images/food/mixian.jpg" class="image">
                        <div style="padding: 14px;">
                            <span>米线肉夹馍</span>
                            <div class="bottom clearfix">
                                <el-button type="text" class="button" @click="addFood('米线肉夹馍')">添加</el-button>
                            </div>
                        </div>
                    </el-card>
                </el-col>
                <el-col :span="8">
                    <el-card :body-style="{ paddingBottom: '0px' }">
                        <img src="../../../assets/images/food/rice.jpg" class="image">
                        <div style="padding: 14px;">
                            <span>米饭</span>
                            <div class="bottom clearfix">
                                <el-button type="text" class="button" @click="addFood('米饭')">添加</el-button>
                            </div>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
        </div>
        <div class="total">
            <el-tabs v-model="activeName" @tab-click="handleClick" type="border-card">
                <el-tab-pane label="发布晚餐" name="first" style="padding:0px;">
                    <el-card class="box-card" :body-style="{ padding: '0px' }">
                        <div slot="header" class="clearfix">
                            <span class="releaseSpan">加班餐发布板</span>
                        </div>
                        <el-table :data="releaseFoods" style="width:100%;" max-height="450" :empty-text="messageOne" >
                            <el-table-column fixed prop="foodName" label="加班餐" width="150" align="center" ></el-table-column>
                            <el-table-column fixed="right" label="操作" width="150" align="center">
                                <template slot-scope="scope">
                                    <el-button @click.native.prevent="deleteRow(scope.$index, releaseFoods)" type="text" size="small" style="padding:0px">移除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <div>
                            <el-button type="text" class="releaseFood" @click="releaseFood" v-if="notRelease">点击发布</el-button>
                            <el-button type="text" class="releaseFood" v-if="released" style="color: red">已发布</el-button>
                        </div>
                    </el-card>
                </el-tab-pane>
                <el-tab-pane label="统计晚餐" name="second" style="padding:0px;">
                   <el-card class="box-card" :body-style="{ padding: '0px' }">
                        <div slot="header" class="clearfix">
                            <span class="releaseSpan">加班餐统计板</span>
                            <el-button class="el-icon-refresh refresh" type="text" @click="getCollectDinner"></el-button>
                        </div>
                        <el-table :data="collectFoods" style="width:100%;" max-height="450" :empty-text="messageTwo">
                            <el-table-column fixed prop="foodName" label="加班餐" width="150" align="center" style="paddind:16px;"></el-table-column>
                            <el-table-column fixed="right" prop="count" label="数量" width="150" align="center"></el-table-column>
                        </el-table>
                        <el-button type="text" class="releaseFood" @click="open">查看详情</el-button>
                    </el-card>
                </el-tab-pane>
            </el-tabs>
        </div>
        <el-dialog v-if="viewDialog" :visible.sync="viewDialog" width="700px" title="统计详情">
            <el-button @click="clearFilter" style="margin-top:0px;">清除过滤器</el-button>
            <el-table ref="filterTable" :data="alldata" style="width: 100%" max-height="550" :empty-text="messageThree">
                    <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column  prop="foodName" label="晚餐"  width="180"  column-key="foodName" 
                :filters="[{text:'米饭',value:'米饭'},{text:'米线肉夹馍',value:'米线肉夹馍'},{text:'炒饼丝',value:'炒饼丝'},
                {text:'炒面',value:'炒面'},{text:'炒拉条',value:'炒拉条'},{text:'冒菜',value:'冒菜'}]" 
                :filter-method="filterHandler"></el-table-column>
                <el-table-column prop="name" label="姓名" width="180"></el-table-column>
                <el-table-column fixed="right" label="操作" width="150" align="center">
                    <template slot-scope="scope">
                        <el-button @click.native.prevent="deleteDinner(scope.$index, alldata)" type="text" size="small" style="padding:0px">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>   
        </el-dialog>
    </div>
</template>
<script>
import $axios from "@/plugins/ajax";
export default {
  data() {
    return {
      activeName: "first",
      releaseFoods: [], //发布的晚餐
      collectFoods: [], //收集的晚餐
      released: false, //已经发布
      notRelease: true, //还没有发布
      messageOne: "", //还没有发布加班餐
      messageTwo: "", //请先发布加班餐
      messageThree: "", //还没有人点餐
      viewDialog: false,
      alldata:[]
      }
  },
  created() {
      this.init();
  },
  methods: {
      init() {
          $axios.get('/order/init').then(res=>{
              this.getDinner();
          })
      },
    handleClick(tab, event) {
        if(tab.$options.propsData.name = 'second'){ //点击统计点餐 更新统计数据 
            this.getCollectDinner();
        }
    },
    addFood(name) {
        //判断是否已经发布
      if (this.notRelease) { //未发布
        let isHave = true;
        for (let i = 0; i < this.releaseFoods.length; i++) {
          if (name == "炒面系列") { //遍历 判断重复添加炒面系列
            for (let j = 0; j < this.releaseFoods.length; j++) {
              if (this.releaseFoods[j].foodName == "炒面" ||this.releaseFoods[j].foodName == "炒饼丝" ||this.releaseFoods[j].foodName == "炒拉条") {
                isHave = false;
              }
            }
          } else if (this.releaseFoods[i].foodName == name) {//判断其他的晚餐
            isHave = false;
          }
        }
        //判断是否重复
        if (isHave) {
          if (name == "炒面系列") {
            this.releaseFoods.push({ foodName: "炒面" });
            this.releaseFoods.push({ foodName: "炒拉条" });
            this.releaseFoods.push({ foodName: "炒饼丝" });
          } else {
            this.releaseFoods.push({ foodName: name });
          }
        } else {
          this.$message.error("请不要重复添加");
        }
      }else{ //已经发布，添加无效
          this.$message.error("已经发布了，添加无效！！！")
      }
    },
    //删除
    deleteRow(index, rows) {
      if(this.notRelease){
          rows.splice(index, 1);
      }else{
          this.$message.error("已经发布了，删除无效！！！")
      }
    },
    deleteDinner(index,rows){
        $axios.post("/order/admindelete",{userId:rows[index].email,dinner:rows[index].foodName}).then(res=>{
            if(res.data.status){
                this.$message.success("删除成功")
                rows.splice(index, 1);
                this.getCollectDinner();
            }else{
                this.$message.error(res.data.data)
            }
        })
       
    },
    //发布
    releaseFood() {
      if (this.releaseFoods.length <= 1) {
        this.$message.error("请至少选择两种晚餐");
      } else {
        $axios.post("/order/setdinner", {dinner: this.releaseFoods}).then(res => {
            if (res.data.status == 2) {
                this.$message.error(res.data.data);
                }else{
                    this.$confirm('确定要发布吗？', '提示', {confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning'}).then(()=>{
                        this.$message.success("成功发布");
                        this.released = true;
                        this.notRelease = false;
                    })
                }
            })
        }
    },
    //发布板获取数据
    getDinner() {
      $axios.get("/order/gettodaydinner").then(res => {
        if (!res.data.status) {
          this.messageOne = res.data.data;
        } else {
          this.released = true;
          this.notRelease = false;
          for (let i = 0; i < res.data.data.length; i++) {
            this.releaseFoods.push({ foodName: res.data.data[i].dinner });
          }
        }
      });
    },
    //获取收集板数据
    getCollectDinner() {
      this.collectFoods.splice(0,this.collectFoods.length);
      $axios.get("/order/getdinnermount").then(res => {
        if(!res.data.status){
            this.messageTwo = res.data.data;
        }else{
            for (let i = 0; i < res.data.data.length; i++) {
            this.collectFoods.push({
            foodName: res.data.data[i].dinner,
            count: res.data.data[i].mount});
          }
        }
      });
    },
    //获取详细数据
    getAllUserDinner(){
        $axios.get('/order/getalluserdinner').then(res=>{
            if(res.data.status){
                for (let i = 0; i < res.data.data.length; i++) {
                    this.alldata.push({
                    foodName: res.data.data[i].dinner,
                    name: res.data.data[i].name,
                    email:res.data.data[i].email});
                }
            }else{
                this.$message.error(res.data.data)
            }  
        })
    },
    filterHandler(value, row, column) {
        const property = column['property'];
        return row[property] === value;
    },
    clearFilter(){
        this.$refs.filterTable.clearFilter();
    },
    open(){
        this.alldata.splice(0,this.alldata.length);
        this.viewDialog = true;
        this.getAllUserDinner()
    }
  },
  mounted() {
  }
};
</script>
<style>
.info {
  height: 30px;
  width: 200px;
  text-align: center;
}
.info span {
  line-height: 30px;
  color: #409eff;
}
.noodles {
  width: 95%;
  margin-left: 5%;
  margin-top: 30px;
}
.other {
  width: 95%;
  margin-left: 5%;
  margin-top: 10px;
}
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  height: 16px;
  line-height: 16px;
}

.button {
  padding: 0;
  float: right;
}
.refresh{
  width: 150px;
  position: absolute;
  right:0;
  margin-top:3px;
  text-align: center;
  padding:  0;
}
.card {
  display: flex;
  flex-direction: column;
}
.image {
  width: 100%;
  height: 237px;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
.total {
  width: 24%;
  margin-left: 4%;
  margin-top: 80px;
  margin-bottom: 1px;
  background-color: #fff;
}
.total .releaseSpan {
  margin-left: 25px;
  color: #909399;
}
.box-card {
  position: relative;
  color: #606266;
  height: 500px;
  width: 100%;
}

.delete {
  position: absolute;
  right: 20px;
}
.releaseFood {
  position: absolute;
  padding: 0px;
  bottom: 15px;
  width: 100%;
  text-align: center;
}
</style>