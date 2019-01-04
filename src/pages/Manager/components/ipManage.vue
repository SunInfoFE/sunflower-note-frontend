<template>
    <div>
        <div class="ipTable">
            <el-tabs
                v-model="activeName"
                type="border-card"
                @tab-click="handleModeChange">
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
                                        @click.native.prevent="returnIp(scope.row)"
                                        type="primary"
                                        :disabled="forbidden(scope.row)"
                                        size="small">
                                        退还
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
                                        <div slot="reference" v-if="!Number(ipData[indexs][index].used)" class="ipbox">
                                            <span class="address">{{String(ipData[indexs][index].ip).split('.')[3]}}</span>
                                        </div>
                                        <div slot="reference" v-else class="ipbox ipbox_used" style="cursor:pointer" @click="returnIp('', ipData[indexs][index].ip)">
                                            <span class="address">{{String(ipData[indexs][index].ip).split('.')[3]}}</span>
                                        </div>
                                    </el-popover>
                                </div>
                            </div>
                        </el-tab-pane>
                    </el-tabs>
                </el-tab-pane>
                <el-tab-pane label="网段管理" name="third" class="networkMeanage">
                    <el-table
                        :data="networkSegmentTable"
                        style="width: 85%"
                        class="networkTable"
                        max-height="400"
                        border>
                        <el-table-column
                            fixed
                            prop="networkSegment"
                            label="网段"
                            align="center"
                            width="180">
                        </el-table-column>
                        <el-table-column
                            fixed
                            prop="usedCount"
                            label="已使用"
                            align="center"
                            width="180">
                        </el-table-column>
                        <el-table-column
                            fixed
                            prop="notUsedCount"
                            label="闲置中"
                            align="center"
                            width="180">
                        </el-table-column>
                        <el-table-column
                            fixed="right"
                            align="center"
                            label="操作">
                            <template slot-scope="scope">
                                <el-button
                                    @click.native.prevent="deleteRow(scope.$index, networkSegmentTable)"
                                    type="text"
                                    size="small">
                                    移除
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-button type="primary" round class="increase" @click="addNetworkSegment">增加网段</el-button>
                 </el-tab-pane>
            </el-tabs>
        </div>
        <!-- 编辑增加的网段DIalog -->
        <el-dialog
            title="增加网段"
            :visible.sync="addNetworkSegmentDialog"
            width="30%">
            <el-form :label-position="labelPosition" :rules="rules" label-width="80px" :model="formLabelAlign">
                <el-form-item prop="addSegment" label="网段">
                    <el-input placeholder="请输入要添加的网段,  例如：215" v-model="formLabelAlign.addSegment"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="addHandle" v-loading="loading" :disabled="disabled">确 定</el-button>
                    <el-button @click="addNetworkSegmentDialog = false">取 消</el-button>
                </el-form-item>
            </el-form>
            </el-dialog>
    </div>
</template>

<script>
import $axios from "@/plugins/ajax";
export default {
     data() {
         let checkSegment = (rule, value, callback) => {
            if(!value) {
                return callback(new Error('网段不能为空'))
            }
            if(value > 255 || value < 0) {
                return callback(new Error('网段必须在0到255之间'))
            }
            if(!(/^\d+$/.test(value))) {
                return callback(new Error('网段必须只包含数字'))
            }
            callback()
         }
        return {
            netNum: '192.168.',
            currentSegment: '',           // 默认展示212网段
            searchData:{ 
                ifUsed: '',                         // 是否可用
                searchIp: '',                       //搜索
                searchNetworkSegment: '',           //网段过滤
            },
            applyIpAddress:'',                      //要申请的ip地址
            allIpData: [],
            options1: [{
                value: '被占用',
            }, {
                value: '可申请',
            }],
           options2: [],
            size: 50,
            currentPage: 1,
            total: 0,                               //数据总数
            activeName: 'first',                    //默认tab页
            applyIpDialog: false,                   //申请IP开关   
            editRemarks: '个人使用',
            networkSegmentTable: [],
            floateMessage:[],
            addNetworkSegmentDialog: false,         //增加网段开关
            labelPosition: 'right',
            formLabelAlign:{
                addSegment:''
            },
            rules: {
                addSegment: [{required: true, validator: checkSegment}]
            },
            segment: [],
            ipData: [],
            loading: false,
            disabled: false
        }
      },
       methods: {
        //获取所有IP
        getAllIpList(){
            let temp = []
            $axios.get("/ipmanage/getallip").then(res =>{
                // console.log(res)
                this.ipData = []
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
                // this.anaIpPool(res.data.data)
            })
        },
        // 点击资产池IP按钮
        apply(segment, num) {
            this.applyIpAddress = `${this.netNum}${segment}.${num}`
            console.log(segment, num)
            this.applyIpDialog = true
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
                return false;
            }else if(row.used === '可申请'){
                return true;
            }
        },
        //根据ip地址获取网段
        anaSegment(ip) {
            return  String(ip.split('.')[2]) + '网段';
        },
        // 分析网段，获得各个网段的ip信息
        anaIpPool() {
            $axios.get(`/ipmanage/getallip`).then(res => {
                for (let i = 0; i < res.data.data.length; i++) {
                    if (String(res.data.data[i].ip).split('.')[2] == 212) {
                        this.segment212.push(res.data.data[i])
                    } else if (String(res.data.data[i].ip).split('.')[2] == 213) {
                        this.segment213.push(res.data.data[i])
                    }
                }
            })
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
                    this.allIpData = [];
                    this.getAllIpList();
                    this.anaIpPool()
                    this.getSegment();
                    this.$message.success('申请成功，如闲置请及时退还')
                }else{
                    this.$message.error('申请失败，请手动刷新后重试');
                }
            })
        },
        //归还IP
        returnIp(row, ip){
            let returnedIp = ''
            this.$confirm('确定归还吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() =>{
                if(row == '') {
                    returnedIp = ip
                } else {
                    returnedIp = row.ip
                }
                $axios.post("/ipmanage/returnip",{ip:returnedIp}).then(res => {
                    if(res.data.status){
                        this.$message.success('退换成功')
                        this.allIpData = [];
                        this.getAllIpList();
                        this.anaIpPool();
                        this.getSegment();
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
        getSegment() {
            $axios.get(`/ipmanage/getsegment`).then(res => {
                this.segment = []
                for (let i = 0; i < res.data.data.length; i++) {
                    this.segment.push(res.data.data[i].segment)
                }
                // this.currentSegment = segment[0]
                //console.log(this.segment.length)
                for(let i=0;i<res.data.data.length;i++){
                    this.options2.push(res.data.data[i])
                }
                this.currentSegment = this.segment[0]
            })
        },
         // 获取网段管理table的数据
        getSegmentManage(){
            $axios.get("/ipmanage/getsegment").then(({data}) => {
                this.networkSegmentTable = []
                for(let i=0;i<data.data.length;i++){
                    $axios.post("/ipmanage/getcount",data.data[i]).then( res =>{
                        this.networkSegmentTable.push({
                            networkSegment: data.data[i].segment,
                            usedCount: res.data.data,
                            notUsedCount: (254-res.data.data) 
                            })
                    })
                }
            })
            
        },
         // 删除网段
        deleteRow(index, rows) {
            let deleteSegment = rows[index].networkSegment.substring(0,3)
            this.$confirm('确定删除吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() =>{
                $axios.post("/ipmanage/deletesegment",{segment:deleteSegment}).then(res => {
                    if(res.data.status){
                        this.$message.success('删除成功')
                        rows.splice(index, 1);
                        this.getSegment()
                    }else{
                        this.$message.error('删除失败，请重试')
                    }
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });       
            }) 
        },
        addNetworkSegment(){
            this.addNetworkSegmentDialog = true;
        },
        addHandle(){
            let repeatTime = 0;
            this.loading = true
            this.disabled = true
            let segment = this.formLabelAlign.addSegment
            for(let i=0;i<this.segment.length;i++){
                if(segment == this.segment[i]){
                    repeatTime++
                }
            }
            if(repeatTime == 0){
                $axios.post("/ipmanage/addsegment",{segment:segment}).then(res =>{
                    if(res.data.status){
                        this.$message.success('添加成功')
                        this.getSegmentManage();
                        this.addNetworkSegmentDialog = false;
                    }else{
                        this.$message.error('添加失败，请重试')
                        this.addNetworkSegmentDialog = false;
                    }
                    this.loading = false
                    this.disabled = false
                })
            }else{
                this.$message.error('请不要重复添加')
            }
        },
        getIpData() {
            let temp = []
            $axios.get(`/ipmanage/getallip`).then(res => {
                this.ipData = []
                for (let i = 0; i < res.data.data.length; i++) {
                    temp.push(res.data.data[i])
                    if( (i+1) % 254 === 0) {
                        this.ipData.push(temp)
                        temp = []
                    }
                }
                console.log(this.ipData)
            })
        },
        handleSizeChange(val) {
            this.size = val;
        },
        handleCurrentChange(val) {
            this.currentPage = val;
        },
        handleModeChange() {
            if(this.activeName === 'first') {
                this.allIpData = [];
                this.getAllIpList();
            } else if (this.activeName === 'second') {
                this.getSegment()
                this.getSegmentManage()
            }
        }
    },
    mounted () {
        // this.searchData.searchIp = this.$store.state.data.name
        this.getAllIpList();
        this.anaIpPool();
        this.getSegment();
        this.getSegmentManage()
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
}
.address {
    font-size: large;
    font-weight: bold;
}
.ipbox_used {
    background-color:#E9686B;
    cursor:auto;
}
.networkMeanage{
    height: 500px;
}
.networkTable{
    height: 400px;
}
.increase{
    margin-top: 20px;
    margin-left: 70%
}
</style>
