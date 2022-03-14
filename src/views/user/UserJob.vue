<template>
    <div>
        <div >
            <div style="display:flex;justify-content: space-between;">
                <div>
                    <el-input placeholder="请输入兼职姓名进行搜索，可以直接回车搜索..." prefix-icon="el-icon-search"
                              clearable
                              @clear="initJobs"
                              size="small" style="width: 350px; margin-right: 10px;" v-model="keyword" @keydown.enter.native="initJobs" :disabled="showAdvanceSearchView"></el-input>
                    <el-button size="small" icon="el-icon-search" type="primary" @click="initJobs" :disabled="showAdvanceSearchView">搜索</el-button>
                    <el-button size="small" type="primary" @click="showAdvanceSearchView=!showAdvanceSearchView">
                        <i :class="showAdvanceSearchView?'fa fa-angle-double-up':'fa fa-angle-double-down'" aria-hidden="true"></i>
                        高级搜索
                    </el-button>
                </div>
                <div>
                    <el-upload
                            :show-file-list="false"
                            :before-upload="beforeUpload"
                            :on-success="onSuccess"
                            :on-error="onError"
                            :disabled="importDataDisabled"
                            style="display:inline-flex; margin-right: 10px"
                            action="/user/job/import">
                        <el-button type="success" size="small" :icon="importDataBtnIcon">
                            {{importDataBtnText}}</el-button>
                    </el-upload>

                    <el-button :disabled="importDataDisabled" type="success" size="small" @click="exportData" icon="el-icon-download">
                        导出数据</el-button>
                    <el-button type="primary" size="small" icon="el-icon-plus" @click="showAddJobView">
                        添加兼职</el-button>
                </div>
            </div>
            <transition name="slide-fade">
            <div v-show="showAdvanceSearchView" style="border: 1px solid #409eff;border-radius: 5px;box-sizing: border-box;padding: 5px;margin:10px 0px;">
                <el-row>
                    <el-col :span="6">
                        时段：<el-select v-model="searchValue.jobtime" placeholder="请选择" size="mini" style="width: 150px">
                                    <el-option
                                            v-for="item in times"
                                            :key="item"
                                            :label="item"
                                            :value="item">
                                    </el-option>
                                </el-select>
                    </el-col>
                    <el-col :span="6">
                        公司：<el-select v-model="searchValue.businessid" placeholder="请选择" size="small" style="width: 180px">
                            <el-option
                                    v-for="item in business"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="12">
                        兼职日期：<el-date-picker
                            unlink-panels
                            v-model="searchValue.beginDateScope"
                                    size="mini"
                                    type="daterange"
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期">
                                </el-date-picker>
                    </el-col>
                </el-row>
                <el-row style="margin-top: 10px;">
                    <el-col :span="20">
                        商家类型：<el-select style="width: 150px" size="mini" v-model="searchValue.businesstype" placeholder="请选择">
                                    <el-option
                                            v-for="item in businesstype"
                                            :key="item"
                                            :label="item"
                                            :value="item">
                                    </el-option>
                                </el-select>
                    </el-col>
                    <el-col :span="4">
                        <el-button size="mini" >取消</el-button>
                        <el-button size="mini" icon="el-icon-search" type="primary" @click="initJobs('advanced')">搜索</el-button>
                    </el-col>
                </el-row>
            </div>
            </transition>
        </div>

        <div style="margin-top: 10px;">
            <el-table
                    :data="jobs"
                    stripe
                    v-loading="loading"
                    element-loading-text="加载..."
                    element-loading-spinner="el-icon-loading"
                    element-loading-background="rgba(0, 0, 0, 0.8)"
                    border
                    style="width: 100%">
                <el-table-column
                        type="selection"
                        width="55">
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="兼职名称"
                        fixed
                        align="left"
                        width="150">
                </el-table-column>
                <el-table-column
                        label="人数"
                        align="left"
                        width="80">
                    <template slot-scope="scope">
                        <el-tag>{{scope.row.num}}</el-tag>人
                    </template>
                </el-table-column>
                <el-table-column
                        prop="beginDate"
                        label="开始日期"
                        align="left"
                        width="120">
                </el-table-column>
                    <el-table-column
                        prop="endDate"
                        label="结束日期"
                        align="left"
                        width="120">
                    </el-table-column>
                    <el-table-column
                        prop="jobtime"
                        label="时段"
                        align="left"
                        width="120">
                    </el-table-column>
                    <el-table-column
                        prop="salary"
                        label="薪资"
                        align="left"
                        width="90">
                    </el-table-column>
                    <el-table-column
                        prop="workplace"
                        label="工作地点"
                        align="left"
                        width="150">
                    </el-table-column>

                    <el-table-column
                        prop="user.name"
                        label="发布者"
                        align="left"
                        width="100">
                    </el-table-column>
                <el-table-column
                        prop="user.telephone"
                        label="电话号码"
                        align="left"
                        width="130">
                </el-table-column>
                <el-table-column
                        prop="business.name"
                        label="商家名称"
                        align="left"
                        width="200">
                </el-table-column>
                <el-table-column
                        prop="business.type"
                        label="商家类型"
                        align="left"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="user.address"
                        label="住址"
                        align="left"
                        width="150">
                </el-table-column>
                <el-table-column
                        prop="business.local"
                        label="公司地点"
                        align="left"
                        width="250">
                </el-table-column>
                <el-table-column
                        prop="jobState.stateZh"
                        fixed="right"
                        label="状态"
                        align="left"
                        width="90">
                </el-table-column>
                <el-table-column
                        label="操作"
                        fixed="right"
                        width="230">
                    <template slot-scope="scope">
                        <el-button  @click="showEditJobView(scope.row)" style="padding:3px" size="small">编辑</el-button>
                        <el-button @click="showDetails(scope.row)" style="padding:3px" size="small" type="primary">查看详情</el-button>
                        <el-button @click="passJob(scope.row)" style="padding:3px" size="mini" type="success">通过</el-button>
                        <el-button @click="deleteById(scope.row)" style="padding:3px" size="mini" type="danger">不通过</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div style="display:flex;justify-content: flex-end">
                <el-pagination
                        background
                        @size-change="sizeChange"
                        @current-change="currentChange"
                        layout="sizes, prev, pager, next, jumper, ->, total, slot"
                        :total="total">
                </el-pagination>
            </div>
        </div>
        <el-dialog
                :title="title"
                :visible.sync="dialogVisible"
                width="70%">
            <div>
                <el-form :model="job" :rules="rules" ref="jobForm">
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="名称:" prop="name">
                                <el-input size="small" style="width: 150px;" prefix-icon="el-icon-edit" v-model="job.name" placehodler="请输入兼职名称"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="人数:" prop="num">
                                <el-input size="small" style="width: 150px;" prefix-icon="el-icon-edit" v-model="job.num" placehodler="请直接输入数字或不限"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="起始日期:" prop="beginDate">
                                <el-date-picker
                                        v-model="job.beginDate"
                                        size="small"
                                        type="date"
                                        style="width: 150px"
                                        value-format="yyyy-MM-dd"
                                        placeholder="选择起始日期">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="结束日期:" prop="endDate">
                                <el-date-picker
                                        v-model="job.endDate"
                                        size="small"
                                        type="date"
                                        style="width: 150px"
                                        value-format="yyyy-MM-dd"
                                        placeholder="选择结束日期">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="薪资:" prop="endDate">
                                <el-input size="small" style="width: 150px;" prefix-icon="el-icon-edit" v-model="job.salary" placehodler="请直接输入元/天或面议"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="公司:" prop="businessid">
                                    <el-select v-model="job.businessid" placeholder="请选择" size="small" style="width: 150px">
                                        <el-option
                                                v-for="item in business"
                                                :key="item.id"
                                                :label="item.name"
                                                :value="item.id">
                                        </el-option>
                                    </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="当前状态:" prop="beginDate">
                                    <el-select v-model="job.state" placeholder="请选择" size="small" style="width: 150px">
                                        <el-option
                                                v-for="item in options"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value">
                                        </el-option>
                                    </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="工作时段:" prop="jobtime">
                                <el-select v-model="job.jobtime" placeholder="请选择" size="small" style="width: 150px">
                                    <el-option
                                            v-for="item in times"
                                            :key="item"
                                            :label="item"
                                            :value="item">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                        <el-form-item label="工作地点:" prop="workplace">
                            <el-input size="small" style="width: 350px;" prefix-icon="el-icon-edit" v-model="job.workplace" placehodler="请直接输入数字或不限"></el-input>
                        </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="具体要求:" prop="details">
                                <el-input size="small" style="width: 350px;" prefix-icon="el-icon-edit" v-model="job.details" placehodler="请输入兼职名称"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button size="small" @click="dialogVisible = false">取 消</el-button>
                <el-button size="small" type="primary" @click="doAddJob">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog
                title="详细信息"
                :visible.sync="detailsVisible"
                width="30%">
            <div style="margin-top: 10px">
                申请人数为:<el-tag>1</el-tag>人
            </div>
            <div style="margin-top: 10px">
                通过人数为:<el-tag>0</el-tag>人
            </div>
            <div style="margin-top: 10px">
                剩余名额为:<el-tag>1</el-tag>人
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button size="mini" @click="detailsVisible = false">取 消</el-button>
                <el-button size="mini" type="primary" @click="jobApply">申请</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "UserJob",
        data(){
            return {
                searchValue:{
                    jobtime:"不限",
                    businessid:"6",
                    businesstype:"工业企业",
                    beginDateScope:null
                },
                importDataBtnText:'导入数据',
                importDataBtnIcon:'el-icon-upload2',
                importDataDisabled:false,
                showAdvanceSearchView:false,
                title:'',
                keyword:'',
                jobs:[],
                loading:false,
                dialogVisible:false,
                detailsVisible:false,
                total:0,
                page:1,
                size:10,
                business:[],
                state:[],
                jobtime:[],
                job:{
                    name: "输入兼职名",
                    beginDate: "2020-03-02",
                    jobtime: "不限",
                    workplace: "魂影工作室",
                    salary: "面议",
                    num: 1,
                    state: 1,
                    details: "有工作经验者优先",
                    endDate: "2020-11-16",
                    businessid: 6
                },
                options: [{
                    value: '1',
                    label: '待审核'
                }, {
                    value: '2',
                    label: '已通过'
                }, {
                    value: '3',
                    label: '已完成'
                }, {
                    value: '4',
                    label: '已过期'
                }, {
                    value: '5',
                    label: '未通过'
                }],
                times: [ '周末全天', '周末晚', '周一至周五晚','不限','再议'],
                businesstype: [ '工业企业', '金融企业', '农业企业', '休闲娱乐企业', '餐饮企业', '旅游住宿企业', '教育培训企业', '交通运输企业'],
                rules:{
                    name:[{required:true,message:'请输入兼职名称',trigger:'blur'}],
                    num:[{required:true,message:'请输入所需人数',trigger:'blur'}],
                    beginDate:[{required:true,message:'请输入起始时间',trigger:'blur'}],
                    jobtime:[{required:true,message:'请输入兼职时段',trigger:'blur'}],
                    endDate:[{required:true,message:'请输入结束时间',trigger:'blur'}],
                    salary:[{required:true,message:'请输入薪资',trigger:'blur'}],
                    businessid:[{required:true,message:'请输入公司',trigger:'blur'}],
                    state:[{required:true,message:'请填写兼职状态',trigger:'blur'}],
                    workplace:[{required:true,message:'请填写工作地点',trigger:'blur'}],
                    details:[{required:true,message:'请填写具体要求',trigger:'blur'}]
                }
            }
        },
        mounted() {
            this.initJobs();
            this.initData();
        },
        methods:{
            onError(){
                this.importDataBtnText="导入数据";
                this.importDataBtnIcon='el-icon-upload2';
                this.importDataDisabled=false;
            },
            onSuccess(response,file,fileList){
                this.importDataBtnText="导入数据";
                this.importDataBtnIcon='el-icon-upload2';
                this.importDataDisabled=false;
            },
            beforeUpload(){
              this.importDataBtnText='正在导入';
              this.importDataBtnIcon='el-icon-loading';
              this.importDataDisabled=true;
            },
            exportData(){
                this.$confirm('此操作导出页面所有数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    window.open("/user/job/export",'_parent');
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    });
                });
            },
            showDetails(data){

                this.detailsVisible=true;
            },
            showEditJobView(data){
                this.title='编辑兼职信息';
                this.job=data;
                this.dialogVisible=true;
            },
            passJob(data){
                this.$confirm('此操作将审核通过【'+data.name+'】, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.putRequest("/user/job/pass/"+data.id).then(resp=>{
                        if(resp){
                            this.initJobs();
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消通过'
                    });
                });
            },
            deleteById(data){
                this.$confirm('此操作将永久删除【'+data.name+'】, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.deleteRequest("/user/job/"+data.id).then(resp=>{
                        if(resp){
                            this.initJobs();
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            emptyJob(){
                this.job={
                    name: "",
                    beginDate: "",
                    jobtime: "",
                    workplace: "",
                    salary: "",
                    num: null,
                    state: null,
                    details: "",
                    endDate: "",
                    businessid: null
                }
            },
            doAddJob(){
                if(this.job.id){
                    this.$refs['jobForm'].validate(valid =>{
                        if(valid){
                            this.putRequest("/user/job/",this.job).then(resp=>{
                                if(resp){
                                    this.dialogVisible=false;
                                    this.initJobs();
                                }
                            });
                        }
                    });
                }else{
                    this.$refs['jobForm'].validate(valid =>{
                        if(valid){
                            this.postRequest("/user/job/",this.job).then(resp=>{
                                if(resp){
                                    this.dialogVisible=false;
                                    this.initJobs();
                                }
                            });
                        }
                    });
                }
            },
            jobApply(){
                this.$notify({
                    title: '申请成功',
                    message: '请时刻关注审核状态～',
                    type: 'success'
                });
                this.detailsVisible=false;
            },
            initData(){
                if(!window.sessionStorage.getItem("business")){
                    this.getRequest("/user/job/business").then(resp=>{
                        if(resp){
                            this.business=resp;
                        }
                    })
                }
            },
            sizeChange(currentSize){
                this.size=currentSize;
                this.initJobs();
            },
            currentChange(currentPage){
              this.page=currentPage;
              this.initJobs();
            },
            showAddJobView(){
                this.emptyJob();
                this.title='添加员工';
                this.dialogVisible=true;
            },
            initJobs(type){
                this.loading=true;
                let url='/user/job/?page='+this.page+'&size='+this.size;
                if(type && type=="advanced"){
                    url+='&jobtime='+this.searchValue.jobtime+'&businessid'+this.searchValue.businessid+'&businesstype'+this.searchValue.businesstype+'&beginDateScope'+this.searchValue.beginDateScope;
                }else{
                  url+="&name="+this.keyword;
                }
                this.getRequest(url).then(resp=>{
                    this.loading=false;
                    if(resp){
                        this.jobs=resp.data;
                        this.total=resp.total;
                    }
                });
            }
        }
    }
</script>

<style>
    .slide-fade-enter-active {
        transition: all .8s ease;
    }
    .slide-fade-leave-active {
        transition: all .4s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .slide-fade-enter, .slide-fade-leave-to
        /* .slide-fade-leave-active for below version 2.1.8 */ {
        transform: translateX(10px);
        opacity: 0;
    }
</style>