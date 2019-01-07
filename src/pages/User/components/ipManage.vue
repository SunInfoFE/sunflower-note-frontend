<template>
    <div>
        <div class="ipTable">
            <el-tabs
                v-model="activeName"
                type="border-card"
                style="width:100%;"
                @tab-click="handleClick">
                <el-tab-pane label="我拥有的IP" name="first">
                     <el-table
                        :data="myIpData"
                        style="height:700px;"
                        max-height="700"
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
                </el-tab-pane>
                <el-tab-pane label="IP资产管理" name="second">
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
                            :data="tableData"
                            style="width:100%"
                            :border='true'
                            height="700px"
                            :row-class-name='tableRowClassName'>
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
                                prop="used"
                                label="是否被使用"
                                width="100"
                                align="center">
                            </el-table-column>
                            <el-table-column
                                prop="name"
                                label="使用人"
                                width="100"
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
                <el-tab-pane label="IP资产池" name="third">
                    <el-tabs v-model="currentSegment">
                        <el-tab-pane v-for="(o, indexs) in segment.length" :key="o" :label="`${segment[indexs]}网段`" :name="segment[indexs]">
                            <div class="overview">
                                <div v-for="(i,index) in ipData[indexs].length" :key="i">
                                    <el-popover
                                      placement="top-start"
                                      width="200"
                                      trigger="hover">
                                        <div>
                                            <p>IP地址：{{ipData[indexs][index].ip}}</p>
                                            <p v-if="Number(ipData[indexs][index].used)">状态：被使用</p>
                                            <p v-else>状态：可用</p>
                                            <p v-if="Number(ipData[indexs][index].used)">使用人：{{ipData[indexs][index].name}}</p>
                                            <p v-else>使用人：无</p>
                                        </div>
                                        <div slot="reference" v-if="!Number(ipData[indexs][index].used)" class="ipbox" @click="apply(segment[indexs], i)">
                                            <span class="address">{{String(ipData[indexs][index].ip).split('.')[3]}}</span>
                                        </div>
                                        <div slot="reference" v-else class="ipbox ipbox_used">
                                            <span class="address">{{String(ipData[indexs][index].ip).split('.')[3]}}</span>
                                        </div>
                                    </el-popover>
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
            netNum: '192.168.',
            currentSegment: '',           // 默认展示网段
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
           options2: [],
            size: 50,
            currentPage: 1,
            total: 0,//数据总数
            activeName: 'first',//默认tab页
            applyIpDialog: false,
            editRemarks: '个人使用',
            segment: [], // 保存网段的数组
            ipData: [] // 分段之后的ip数据
        }
      },
       methods: {
        //获取所有IP
        getAllIpList(){
            let temp = [] // 保存整个网段的ip的临时数组
            $axios.get("/ipmanage/getallip").then(res =>{
                //清空上一次push的数据
                this.allIpData = [];
                // 将ipData置空，清空上一次push的数据
                this.ipData = []
                // 将IP数据按网段保存在一个二维数组中
                for(let i =0 ;i<res.data.data.length;i++){
                    temp.push(res.data.data[i])
                    if( (i+1) % 254 === 0) {
                        this.ipData.push(temp)
                        temp = []
                    }
                    this.allIpData.push(
                        {   
                            networkSegment: this.anaSegment(res.data.data[i].ip),
                            ip: res.data.data[i].ip,
                            used: res.data.data[i].used == 0 ? '可申请':'被占用',
                            name: res.data.data[i].name == '' ? '无':res.data.data[i].name,
                            remarks: res.data.data[i].remarks == ''? '无':res.data.data[i].remarks
                        }
                    ); 
                }
            })
        },
        // 点击资产池IP按钮
        apply(segment, num) {
            this.applyIpAddress = `${this.netNum}${segment}.${num}`
            this.applyIpDialog = true
        },
        //获取我的IP
        getMyIpList(){
            $axios.get("/ipmanage/getmyip").then(res => {
                this.myIpData = [];
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
        // 获取网段的种类
        getSegment() {
            $axios.get(`/ipmanage/getsegment`).then(res => {
                this.segment = []
                this.options2 = []
                for (let i = 0; i < res.data.data.length; i++) {
                    this.segment.push(res.data.data[i].segment)
                    this.options2.push({value:(this.segment[i]+'网段')})
                }
                this.currentSegment = this.segment[0]
                
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
        //申请IP
        applyIp(row){
            this.applyIpDialog = true;
            this.applyIpAddress = row.ip;
        },
        //确认申请
        confirmApplyIp(){
            $axios.post("/ipmanage/applyip",{ip:this.applyIpAddress,remarks:this.editRemarks}).then(res =>{
                if(res.data.status){
                    this.getAllIpList();
                    this.$message.success('申请成功，如闲置请及时退还')
                    this.applyIpDialog = false;
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
        handleSizeChange(val) {
            this.size = val;
        },
        handleCurrentChange(val) {
            this.currentPage = val;
        },
        //切换tab页的时候，请求该tab页下的数据
        handleClick(event){
            if(event.name == "first"){
                this.getMyIpList();
            }
            if(event.name == "second"){
                this.getAllIpList();
                this.searchData.searchIp = ''
                this.searchData.searchNetworkSegment = ''
                this.searchData.ifUsed = ''
            }
            if(event.name == "third"){
                this.getAllIpList();
            }
        }
    },
    mounted () {
        // this.searchData.searchIp = this.$store.state.data.name
        this.getAllIpList();
        this.getMyIpList();
        this.getSegment();
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
        //allIpData表 按分页条件显示数据
        tableData() {
            this.total = this.tableDataFilter.length;
            let from = (this.currentPage - 1)* this.size;
            let to = this.currentPage * this.size;
            let data = [];
            for(; from < to; from++){
                if(this.tableDataFilter[from]){
                    data.push(this.tableDataFilter[from]);
                }
            }
            return data;
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
.ipTable{
    width: 60%;
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
