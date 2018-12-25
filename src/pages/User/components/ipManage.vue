<template>
    <div>
        <div class="myIp">
            <p class="message">我拥有的IP</p>
            <el-table
                :data="tableData1"
                :border= 'true'>
                <el-table-column
                    type="index"
                    width="50"
                    align="center">
                </el-table-column>
                <el-table-column
                    prop="networkSegment"
                    label="所属网段"
                    width="180"
                    align="center">
                </el-table-column>
                <el-table-column
                    prop="ip"
                    label="IP"
                    width="230"
                    align="center">
                </el-table-column>
                <el-table-column
                    prop="remarks"
                    label="备注"
                    align="center">
                </el-table-column>
                <el-table-column
                    fixed="right"
                    label="操作"
                    width="180"
                    align="center">
                    <template slot-scope="scope">
                        <el-button
                            @click.native.prevent="returnIp(scope.row)"
                            type="primary"
                            size="small">
                            退还
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                class="pagination"
                @size-change="myIpHandleSizeChange"
                @current-change="myIpHandleCurrentChange"
                :current-page="myIpCurrentPage"
                :page-size="myIpSize"
                layout="total, prev, pager, next, jumper"
                :total="myIpTotal">
            </el-pagination>
        </div>
        <div class="ipTable">
            <el-tabs
                v-model="activeName"
                type="border-card">
                <el-tab-pane label="IP资产管理" name="first">
                    <div class="head">
                        <div class="filter">
                            <div class="title">
                                <p>搜索：</p>
                            </div>
                            <div class="select">
                                <el-input type="text" size="small" placeholder="请输入您要搜索的信息" prefix-icon="el-icon-search" v-model="searchData.searchIp" clearable></el-input>
                            </div>
                        </div>
                        <div class="filter">
                            <div class="title">
                                <p>是否可用：</p>
                            </div>
                            <div class="select">
                                <el-select v-model='searchData.ifUsed' clearable placeholder="请选择" size="small">
                                    <el-option
                                        v-for="item in options1"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </div>
                        </div>
                        <div class="filter">
                            <div class="title">
                                <p>网段：</p>
                            </div>
                            <div class="select">
                                <el-select v-model='searchData.searchNetworkSegment' clearable placeholder="请选择" size="small">
                                    <el-option
                                        v-for="item in options2"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </div>
                        </div>
                    </div>
                    <div class="content">
                        <el-table
                            ref="filterTable"
                            :data="tableData2"
                            :border='true'
                            height="700px"
                            align="center"
                            :row-class-name='tableRowClassName'>
                            <el-table-column
                                type="index"
                                width="50"
                                align="center">
                            </el-table-column>
                            <el-table-column
                                prop="networkSegment"
                                label="所属网段"
                                width="120"
                                align="center">
                            </el-table-column>
                            <el-table-column
                                prop="ip"
                                label="IP"
                                width="180"
                                align="center">
                            </el-table-column>
                            <el-table-column
                                prop="used"
                                label="是否被使用"
                                width="100"
                                align="center">
                            </el-table-column>
                            <el-table-column
                                prop="name"
                                label="使用人"
                                align="center">
                            </el-table-column>
                            <el-table-column
                                prop="remarks"
                                label="备注"
                                align="center">
                            </el-table-column>
                            <el-table-column
                                fixed="right"
                                label="操作"
                                width="180"
                                align="center">
                                <template slot-scope="scope">
                                    <el-button 
                                        @click.native.prevent="applyIp(scope.row)"
                                        :type="type(scope.row)"
                                        :disabled="forbidden(scope.row)"
                                        size="small">
                                        申请此IP
                                    </el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <el-pagination
                            class="pagination"
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="currentPage"
                            :page-sizes="[5,10, 50, 100]"
                            :page-size="50"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="total">
                        </el-pagination>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="IP资产池" name="second">
                    <el-tabs v-model="currentSegment">
                        <el-tab-pane label="212网段" name="segment212">
                            <div class="overview">
                                <div v-for="(i, index) in segment212.length" :key="i">
                                    <div v-if="!Number(segment212[index].used)" class="ipbox" @click="apply(212, i)">
                                        <span class="address">{{String(segment212[index].ip).split('.')[3]}}</span>
                                    </div>
                                    <div v-else class="ipbox ipbox_used">
                                        <span class="address">{{String(segment212[index].ip).split('.')[3]}}</span>
                                    </div>
                                </div>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="213网段" name="segment213">
                            <div class="overview">
                                <div v-for="(i, index) in segment213.length" :key="i">
                                    <div v-if="!Number(segment213[index].used)" class="ipbox" @click="apply(213, i)">
                                        <span class="address">{{String(segment213[index].ip).split('.')[3]}}</span>
                                    </div>
                                    <div v-else class="ipbox ipbox_used">
                                        <span class="address">{{String(segment213[index].ip).split('.')[3]}}</span>
                                    </div>
                                </div>
                            </div>
                        </el-tab-pane>
                    </el-tabs>
                </el-tab-pane>
            </el-tabs>
        </div>
        <!-- 确认申请dialog -->
        <el-dialog
            title="确认申请此IP吗？"
            :visible.sync='applyIpDialog'
            width="30%"
            center>
            请输入备注：<el-input type="text" size="medium" v-model="editRemarks" style="width:70%"></el-input>
            <span slot="footer" class="dialog-footer">
            <el-button @click="applyIpDialog = false">取 消</el-button>
            <el-button type="primary" @click="confirmApplyIp">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import $axios from "@/plugins/ajax";
export default {
     data() {
        return {
            myIpCurrentPage: 1,
            myIpSize: 2,
            myIpTotal: 0,
            netNum: '192.168.',
            segment212: [],                         // 212网段的ip信息
            segment213: [],                         // 213网段的ip信息
            currentSegment: 'segment212',           // 默认展示212网段
            searchData:{ 
                ifUsed: '',// 是否可用
                searchIp: '',//搜索
                searchNetworkSegment: '',//网段过滤
            },
            applyIpAddress:'', //要申请的ip地址
            myIpData: [],
            allIpData: [],
            options1: [{
                value: '被占用',
            }, {
                value: '可申请',
            }],
           options2: [{
                value: '212网段',
            }, {
                value: '213网段',
            }],
            size: 50,
            currentPage: 1,
            total: 0,//数据总数
            activeName: 'first',//默认tab页
            applyIpDialog: false,
            editRemarks: '个人使用',
        }
      },
       methods: {
        //获取所有IP
        getAllIpList(){
            $axios.get("/ipmanage/getallip").then(res =>{
                console.log(res)
                for(let i =0 ;i<res.data.data.length;i++){
                    this.allIpData.push(
                        {   
                            networkSegment: this.anaSegment(res.data.data[i].ip),
                            ip: res.data.data[i].ip,
                            used: res.data.data[i].used == 0 ? '可申请':'被占用',
                            name: res.data.data[i].name == ''? '无':res.data.data[i].name,
                            remarks: res.data.data[i].remarks == ''? '无':res.data.data[i].remarks
                        }
                    ); 
                }
                this.anaIpPool(res.data.data)
            })
        },
        // 点击资产池IP按钮
        apply(segment, num) {
            this.applyIpAddress = `${this.netNum}${segment}.${num}`
            console.log(segment, num)
            this.applyIpDialog = true
        },
        //获取我的IP
        getMyIpList(){
            $axios.get("/ipmanage/getmyip").then(res => {
                for(let i=0;i<res.data.data.length;i++){
                    this.myIpData.push(
                        {
                            networkSegment: this.anaSegment(res.data.data[i].ip),
                            ip: res.data.data[i].ip,
                            remarks:res.data.data[i].remarks
                        }
                    );
                }
            })
        },
        //表格数据根据“可申请”和“被占用”显示不同的颜色
        tableRowClassName({row, rowIndex}) {
            if(row.used === '被占用'){
                return 'error-row';
            } else if(row.used === '可申请'){
                return 'success-row';
            }           
        },
        // 绑定disabled属性，设置按钮根据“可申请”和“被占用”可用否
        forbidden(row){
            if(row.used === '被占用'){
                return true;
            }else if(row.used === '可申请'){
                return false;
            }
        },
        //绑定button的type属性，设置类型根据“可申请”和“被占用”显示不同的type
        type(row) { 
            if(row.used === '被占用'){
                return 'danger';
            }else if(row.used === "可申请"){
                return 'primary';
            }
        },
        //根据ip地址获取网段
        anaSegment(ip) {
            return  String(ip.split('.')[2]) + '网段';
        },
        // 分析网段，获得各个网段的ip信息
        anaIpPool(ipData) {
            for (let i = 0; i < ipData.length; i++) {
                if (String(ipData[i].ip).split('.')[2] == 212) {
                    this.segment212.push(ipData[i])
                } else if (String(ipData[i].ip).split('.')[2] == 213) {
                    this.segment213.push(ipData[i])
                }
            }
        },
        //申请IP
        applyIp(row){
            this.applyIpDialog = true;
            this.applyIpAddress = row.ip;
        },
        //确认申请
        confirmApplyIp(){
            $axios.post("/ipmanage/applyip",{ip:this.applyIpAddress,remarks:this.editRemarks}).then(res =>{
                if(res.data.status){
                    this.applyIpDialog = false;
                    this.myIpData.push({
                        ip: this.applyIpAddress,
                        remarks: this.editRemarks,
                        networkSegment: this.anaSegment(this.applyIpAddress)
                    });
                    this.allIpData = [];
                    this.myIpData = [];
                    this.getAllIpList();
                    this.getMyIpList();
                    this.$message.success('申请成功，如闲置请及时退还')
                }else{
                    this.$message.error('申请失败，请手动刷新后重试');
                }
            })
        },
        //归还IP
        returnIp(row){
            this.$confirm('确定归还吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() =>{
                $axios.post("/ipmanage/returnip",{ip:row.ip}).then(res => {
                    if(res.data.status){
                        this.$message.success('退换成功，谢谢！')
                        this.allIpData = [];
                        this.myIpData = [];
                        this.getAllIpList();
                        this.getMyIpList();
                    }else{
                        this.$message.error('退换失败，请手动刷新后重试')
                    }
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });       
            })
            
        },
        myIpHandleSizeChange(val){
            this.myIpSize = val;
        },
        myIpHandleCurrentChange(val){
            this.myIpCurrentPage =val;
        },
        handleSizeChange(val) {
            this.size = val;
        },
        handleCurrentChange(val) {
            this.currentPage = val;
        }
    },
    mounted () {
        // this.searchData.searchIp = this.$store.state.data.name
        this.getAllIpList();
        this.getMyIpList();
    },
    computed: {
        //过滤器
        tableDataFilter(){
            //按“是否可用”过滤
            return this.allIpData.filter( item =>{
                if(! this.searchData.ifUsed){
                    return true;
                }
                if(item.used === this.searchData.ifUsed){
                    return true;
                }
            })
            //按“搜索”过滤
            .filter(item => {
                if(! this.searchData.searchIp){
                    return true;
                }else{
                    return Object.keys(item).some(key => {
                    return String(item[key]).toLowerCase().indexOf(this.searchData.searchIp) > -1
                 })
                 return this.allIpData
                }
            })
            //按“网段”过滤
            .filter(item => {
                if(!this.searchData.searchNetworkSegment) {
                    return true;
                } 
                if(item.networkSegment === this.searchData.searchNetworkSegment) {
                    return true;
                }
            })
        },
        //myIpData 按分页显示数据
        tableData1() {
            this.myIpTotal = this.myIpData.length;
            let from = (this.myIpCurrentPage - 1) * this.myIpSize;
            let to = this.myIpCurrentPage * this.myIpSize;
            let tableData = [];
            for(; from < to; from++){
                if(this.myIpData[from]){
                    tableData.push(this.myIpData[from]);
                }
            }
            return tableData;
        },
        //allIpData表 按分页条件显示数据
        tableData2() {
            this.total = this.tableDataFilter.length;
            let from = (this.currentPage - 1)* this.size;
            let to = this.currentPage * this.size;
            let tableData = [];
            for(; from < to; from++){
                if(this.tableDataFilter[from]){
                    tableData.push(this.tableDataFilter[from]);
                }
            }
            return tableData;
        }
    },
    watch: {
        applyIpDialog: function(){
            if(this.applyIpDialog === false){
                this.editRemarks = '个人使用';
            }
        }
    }
}
</script>
 
<style scoped>
.message{
    font-weight: bold;
    margin-bottom: 10px;
    color: #888;
}
.myIp{
    width:60%;
}
.ipTable{
    width: 60%;
    margin-top: 50px;
}
.head{
    display: flex;
    flex-direction: row;
    background-color: #f9f9f9;
    margin-bottom: 20px;
}
.filter {
    width: 32%;
    display: flex;
    flex-direction: row;
    margin-left:1%;
}
.select {
    display: flex;
    flex-direction: row;
    margin: auto 0;
}
.title {
    display: block;
}
.el-table .error-row{
    color: #F56C6C;
} 
.el-table .success-row{
    color: #409EFF;
}
.pagination{
    float: right;
    margin-top: 10px;
    margin-bottom: 10px;
}
.overview {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}
.ipbox {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 8px; 
    width: 50px; 
    height: 50px; 
    background-color:#409EFF;
    border-radius: 10px;
    cursor: pointer;
}
.address {
    font-size: large;
    font-weight: bold;
}
.ipbox_used {
    background-color:#E9686B;
    cursor:auto;
}
</style>
