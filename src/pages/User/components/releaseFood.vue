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
            <el-row class="other">
                <el-col :span="8">
                    <el-card :body-style="{ paddingBottom: '0px' }">
                        <img src="../../../assets/images/food/jiucDum.jpg" class="image">
                        <div style="padding: 14px;">
                            <span>韭菜鸡蛋馅饺子</span>
                            <div class="bottom clearfix">
                                <el-button type="text" class="button" @click="addFood('韭菜鸡蛋饺子')">添加</el-button>
                            </div>
                        </div>
                    </el-card>
                </el-col>
                <el-col :span="8">
                    <el-card :body-style="{ paddingBottom: '0px' }">
                        <img src="../../../assets/images/food/liancDum.jpg" class="image">
                        <div style="padding: 14px;">
                            <span>莲菜猪肉馅饺子</span>
                            <div class="bottom clearfix">
                                <el-button type="text" class="button" @click="addFood('莲菜猪肉饺子')">添加</el-button>
                            </div>
                        </div>
                    </el-card>
                </el-col>
                <el-col :span="8">
                    <el-card :body-style="{ paddingBottom: '0px' }">
                        <img src="../../../assets/images/food/qincDum.jpg" class="image">
                        <div style="padding: 14px;">
                            <span>芹菜猪肉馅饺子</span>
                            <div class="bottom clearfix">
                                <el-button type="text" class="button" @click="addFood('芹菜猪肉饺子')">添加</el-button>
                            </div>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
            <el-row class="other">
                <el-col :span="8">
                    <el-card :body-style="{ paddingBottom: '0px' }">
                        <img src="../../../assets/images/food/xiarDum.jpg" class="image">
                        <div style="padding: 14px;">
                            <span>虾仁西葫芦馅饺子</span>
                            <div class="bottom clearfix">
                                <el-button type="text" class="button" @click="addFood('虾仁西葫芦鸡蛋饺子')">添加</el-button>
                            </div>
                        </div>
                    </el-card>
                </el-col>
                <el-col :span="8">
                    <el-card :body-style="{ paddingBottom: '0px' }">
                        <img src="../../../assets/images/food/luobDum.jpg" class="image">
                        <div style="padding: 14px;">
                            <span>萝卜猪肉馅饺子</span>
                            <div class="bottom clearfix">
                                <el-button type="text" class="button" @click="addFood('萝卜猪肉饺子')">添加</el-button>
                            </div>
                        </div>
                    </el-card>
                </el-col>
                <el-col :span="8">
                    <el-card :body-style="{ paddingBottom: '0px' }">
                        <img src="../../../assets/images/food/baicDum.jpg" class="image">
                        <div style="padding: 14px;">
                            <span>白菜猪肉馅饺子</span>
                            <div class="bottom clearfix">
                                <el-button type="text" class="button" @click="addFood('白菜猪肉饺子')">添加</el-button>
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
                        <el-table :data="releaseFoods" style="width:100%;" max-height="400" :empty-text="messageOne" >
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
            <el-table ref="filterTable" :data="alldata" style="width: 100%" max-height="550" :empty-text="messageThree">
                    <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column  prop="foodName" label="晚餐"  width="180"  column-key="foodName" 
                :filters = filtersFood
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
      alldata:[],
      filtersFood:[],
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
        this.$confirm('确定删除该记录?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            $axios.post("/order/admindelete",{userId:rows[index].email,dinner:rows[index].foodName}).then(res=>{
                if(res.data.status){
                    this.$message.success("删除成功")
                    rows.splice(index, 1);
                    this.getCollectDinner();
                }else{
                    this.$message.error(res.data.data)
                }
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    //发布
    releaseFood() {
        console.log(this.releaseFoods)
        let foodList = []
      if (this.releaseFoods.length <= 1) {
        this.$message.error("请至少选择两种晚餐");
      } else {
          console.log(this.releaseFoods)
        foodList = JSON.parse(JSON.stringify(this.releaseFoods))
        console.log(this.releaseFoods)
        for(let i = 0;i < foodList.length; i++) {
            if(foodList[i].foodName == '米线肉夹馍') {
                foodList.splice(i, 1);
                foodList.push({foodName: '辣米线肥瘦肉夹馍'})
                foodList.push({foodName: '辣米线纯瘦肉夹馍'})
                foodList.push({foodName: '不辣米线肥瘦肉夹馍'})
                foodList.push({foodName: '不辣米线纯瘦肉夹馍'})
                foodList.push({foodName: '两个肥瘦肉夹馍'})
                foodList.push({foodName: '两个纯瘦肉夹馍'})
                foodList.push({foodName: '一肥一瘦肉夹馍'})
            } else if(foodList[i].foodName == '冒菜') {
                foodList.splice(i, 1);
                foodList.push({foodName: '辣冒菜'})
                foodList.push({foodName: '不辣冒菜'})
            }
        }
        console.log(this.releaseFoods)
        $axios.post("/order/setdinner", {dinner: foodList}).then(res => {
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
          let obj = {}
        if (!res.data.status) {
          this.messageOne = res.data.data;
        } else {
          this.released = true;
          this.notRelease = false;
          for (let i = 0; i < res.data.data.length; i++) {
              if(res.data.data[i].dinner.indexOf("米线") != -1) {
                  obj["米线肉夹馍"] = 1
              } else if(res.data.data[i].dinner.indexOf("肉夹馍") != -1) {
                  obj["米线肉夹馍"] = 1
              } else if(res.data.data[i].dinner.indexOf("冒菜") != -1) {
                  obj["冒菜"] = 1
              } else {
                  obj[res.data.data[i].dinner] = 1
              }
          }
            for (const i in obj) {
                if (obj.hasOwnProperty(i)) {
                    this.releaseFoods.push({foodName: i})
                    
                }
            }
        }
      });
    },
    //获取收集板数据
    getCollectDinner() {
      let collectFoods = [];
      $axios.get("/order/getalluserdinner").then(res => {
        if(!res.data.status){
            this.messageTwo = res.data.data;
        }else{
            let object = {};
            let data = res.data.data;
            let alldata = [];
            for (let i = 0; i < data.length; i++) {
                let foodName = data[i].dinner;
                if(typeof object[foodName] === 'undefined'){
                    object[foodName] = 1;
                } else {
                    object[foodName] = object[foodName] + 1;
                }
                alldata.push({
                    foodName: data[i].dinner,
                    name: data[i].name,
                    email:data[i].email});
            }
            this.alldata = alldata;
            for (const key in object) {
                if (object.hasOwnProperty(key)) {
                    collectFoods.push({foodName: key, count: object[key]});
                }
            }
            this.collectFoods = getRealFoodsCount(collectFoods);
        }
      });
    },
    getRealFoodsCount(data){
        var item = {'肥瘦肉夹馍': 0, '纯瘦肉夹馍': 0, '辣米线': 0, '不辣米线': 0};
        for (let i = 0; i < data.length; i++) {
            let element = data[i]; 
            if (element.foodName === '两个纯瘦肉夹馍') {
                item['纯瘦肉夹馍'] = item['纯瘦肉夹馍'] + 2 * element.count;
            } else if (element.foodName === '两个肥瘦肉夹馍') {
                item['肥瘦肉夹馍'] = item['肥瘦肉夹馍'] + 2 * element.count;
            } else if (element.foodName === '一肥一瘦肉夹馍') {
                item['纯瘦肉夹馍'] = item['纯瘦肉夹馍'] + element.count;
                item['肥瘦肉夹馍'] = item['肥瘦肉夹馍'] + element.count;
            } else if (element.foodName === '辣米线纯瘦肉夹馍') {
                item['辣米线'] = item['辣米线'] + element.count;
                item['纯瘦肉夹馍'] = item['纯瘦肉夹馍'] + element.count;
            } else if (element.foodName === '辣米线肥瘦肉夹馍') {
                item['辣米线'] = item['辣米线'] + element.count;
                item['肥瘦肉夹馍'] = item['肥瘦肉夹馍'] + element.count;
            } else if (element.foodName === '不辣米线肥瘦肉夹馍') {
                item['不辣米线'] = item['不辣米线'] + element.count;
                item['肥瘦肉夹馍'] = item['肥瘦肉夹馍'] + element.count;
            } else if (element.foodName === '不辣米线纯瘦肉夹馍') {
                item['不辣米线'] = item['不辣米线'] + element.count;
                item['纯瘦肉夹馍'] = item['纯瘦肉夹馍'] + element.count;
            } else {
                item[element.foodName] = element.count;
            }
        }
        var tData = [];
        for (const key in item) {
            if (item.hasOwnProperty(key)) {
                if(item[key] != 0) {
                    tData.push({foodName:key, count: item[key]});
                }
            }
        }
        return tData;
    },
    //获取筛选框里的食物
    getFiltersFood(){
        $axios.get("/order/getTodayDinner").then( res =>{
            for(let i=0;i<res.data.data.length;i++){
                this.filtersFood.push({
                    text:res.data.data[i].dinner,
                    value:res.data.data[i].dinner
                })
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
        this.viewDialog = true;
    }
  },
  mounted() {
      this.getFiltersFood()
  }
};
</script>
<style scoped>
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