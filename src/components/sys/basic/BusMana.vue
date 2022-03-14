<template>
    <div>
        <div>
            <el-input size="small" v-model="bm.name" style="width: 200px;" prefix-icon="el-icon-plus" placeholder="添加商家..."></el-input>
            <el-select v-model="bm.type" placeholder="商家类型" size="small" style="margin-left: 5px;margin-right: 5px">
                <el-option
                        v-for="item in types"
                        :key="item"
                        :label="item"
                        :value="item">
                </el-option>
            </el-select>
            <el-input size="small" v-model="bm.local" style="width: 200px;" prefix-icon="el-icon-plus" placeholder="填写地址..."></el-input>
            <el-button icon="el-icon-plus" type="primary" size="small" style="margin-left: 5px" @click="addBusiness">添加</el-button>
        </div>
        <div style="margin-top: 10px">
            <el-table
                    :data="bms"
                    border
                    size="small"
                    style="width: 90%"
                    @selection-change="handleSelectionChange">
                <el-table-column
                        type="selection"
                        width="55">
                </el-table-column>
                <el-table-column
                        prop="id"
                        label="编号"
                        width="55">
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="商家名称"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="type"
                        label="商家类型">
                </el-table-column>
                <el-table-column
                        prop="local"
                        label="商家地址"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="createDate"
                        label="创建时间">
                </el-table-column>
                <el-table-column
                        prop="enabled"
                        label="是否启用">
                    <template slot-scope="scope">
                        <el-tag type="success" v-if="scope.row.enabled">已启用</el-tag>
                        <el-tag type="danger" v-else>未启用</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button size="small" @click="showEditView(scope.row)">编辑</el-button>
                        <el-button size="small" type="danger" @click="deleteHandler(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-button type="danger" size="small" style="margin-top: 10px" :disabled="multipleSelection.length==0" @click="deleteMany">批量删除</el-button>
            <el-dialog
                    title="编辑商家"
                    :visible.sync="dialogVisible"
                    width="30%">
                <div>
                    <table>
                        <tr>
                            <td><el-tag>商家名称</el-tag></td>
                            <td><el-input style="margin-left:10px;width: 200px" size="small" v-model="updateBus.name"></el-input></td>
                        </tr>
                        <tr>
                            <td><el-tag style="margin-top: 10px">商家类型</el-tag></td>
                            <td>
                                <el-select v-model="updateBus.type" placeholder="商家类型" size="small" style="margin-left:10px;width:200px;margin-top:10px">
                                    <el-option
                                            v-for="item in types"
                                            :key="item"
                                            :label="item"
                                            :value="item">
                                    </el-option>
                                </el-select>
                            </td>
                        </tr>
                        <tr>
                            <td><el-tag style="margin-top: 10px">商家地址</el-tag></td>
                            <td><el-input style="margin-left:10px;margin-top:10px; width: 200px;" size="small" v-model="updateBus.local"></el-input></td>
                        </tr>
                        <tr>
                            <td><el-tag style="margin-top: 10px">是否启用</el-tag></td>
                            <td>
                               <el-switch style="margin-left:20px;margin-top:10px;"
                                v-model="updateBus.enabled"
                                active-text="启用"
                                inactive-text="禁用">
                                </el-switch>
                            </td>
                        </tr>
                    </table>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false" size="small">取 消</el-button>
                    <el-button type="primary" @click="doUpdate" size="small">确 定</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    export default {
        name: "BusMana",
        data(){
            return{
                multipleSelection: [],
                dialogVisible:false,
                updateBus:{
                  name:'',
                    type:'',
                    local:'',
                    enabled:false
                },
                bm:{
                    name:'',
                    type:'',
                    local:''
                },
                bms:[],
                types:[
                    '工业企业',
                    '金融企业',
                    '农业企业',
                    '休闲娱乐企业',
                    '餐饮企业',
                    '旅游住宿企业',
                    '教育培训企业',
                    '交通运输企业'
                ]
            }
        },
        mounted() {
            this.initBms();
        },
        methods:{
            deleteMany(){
                this.$confirm('此操作将永久删除【'+this.multipleSelection.length+'】条记录, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let ids='?';
                     this.multipleSelection.forEach(item=>{
                         ids+='ids='+item.id+'&';
                     })
                    this.deleteRequest("/system/basic/bus/"+ids).then(resp=>{
                        if(resp){
                            this.initBms();
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            doUpdate(){
                this.putRequest("/system/basic/bus/",this.updateBus).then(resp=>{
                    if(resp){
                        this.initBms();
                        this.dialogVisible=false;
                    }
                })
            },
            showEditView(data){
                Object.assign(this.updateBus,data);
                this.dialogVisible=true;
            },
            deleteHandler(data){
                this.$confirm('此操作将永久删除【'+data.name+'】, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.deleteRequest("/system/basic/bus/"+data.id).then(resp=>{
                        if(resp){
                            this.initBms();
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            addBusiness(){
                if(this.bm.name && this.bm.type && this.bm.local){
                    this.postRequest("/system/basic/bus/",this.bm).then(resp=>{
                        if(resp){
                            this.initBms();
                        }
                    });
                }else{
                    this.$message.error("添加字段不可以为空！")
                }
            },
            initBms(){
                this.getRequest("/system/basic/bus/").then(resp=>{
                    if(resp){
                        this.bms=resp;
                        this.bm={
                            name:'',
                            type:'',
                            local:''
                        }
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>