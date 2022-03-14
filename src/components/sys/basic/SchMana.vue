<template>
    <div>
        <div>
            <el-input
                    class="addUniverPut"
                    size="small"
                    placeholder="添加学校..."
                    @keydown.enter.native="addUniversity"
                    prefix-icon="el-icon-plus"
                    v-model="uni.name">
            </el-input>
            <el-button icon="el-icon-plus" size="small" type="primary" @click="addUniversity">添加</el-button>
        </div>
        <div class="UniverManaMain">
            <el-table
                    :data="university"
                    border
                    @selection-change="handleSelectionChange"
                    size="small"
                    stripe
                    style="width: 60%">
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
                        label="学校名称"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="createDate"
                        label="创建时间"
                        width="120">
                </el-table-column>
                <el-table-column
                        label="是否启用">
                    <template slot-scope="scope">
                        <el-tag size="small" type="success" v-if="scope.row.enabled">已启用</el-tag>
                        <el-tag size="small" type="danger" v-else>未启用</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button
                                size="mini"
                                @click="showEditView(scope.$index, scope.row)">编辑</el-button>
                        <el-button
                                size="mini"
                                type="danger"
                                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-button @click="deleteMany" type="danger" size="small" style="margin-top: 8px" :disabled="multipleSelection.length==0">批量删除</el-button>
        </div>
        <el-dialog
                title="修改学校"
                :visible.sync="dialogVisible"
                width="30%">
            <div>
                <div>
                    <el-tag>学校名称</el-tag>
                    <el-input class="updateUniversityInput" size="small" v-model="updateUni.name"></el-input>

                </div>
                <div>
                    <el-tag>是否启用</el-tag>
                    <el-switch
                            style="margin-left: 15px"
                            v-model="updateUni.enabled"
                            active-text="启用"
                            inactive-text="禁用">
                    </el-switch>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button size="small" @click="dialogVisible = false">取 消</el-button>
                <el-button size="small" type="primary" @click="doUpdate">确 定</el-button>
          </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "StuMana",
        data(){
            return{
                uni:{
                    name:''
                },
                dialogVisible:false,
                updateUni:{
                    name:'',
                    enabled:false
                },
                multipleSelection: [],
                university: []
            }
        },
        mounted() {
            this.initUniversity();
        },
        methods:{
            deleteMany(){
                this.$confirm('此操作会批量删除【'+this.multipleSelection.length+'】条记录，是否继续？','提示',{
                       confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let ids='?';
                    this.multipleSelection.forEach(item=>{
                        ids+='ids='+item.id+'&';
                    })
                    this.deleteRequest("/system/basic/uni/"+ids).then(resp=>{
                        if(resp){
                            this.initUniversity();
                        }
                    })
                }).catch(() => {
                           this.$message({
                           type: 'info',
                           message: '已取消删除'
                    });
                });

            },
            handleSelectionChange(val){
              this.multipleSelection=val;
              console.log(val);
            },
            addUniversity(){
                if(this.uni.name){
                    this.postRequest("/system/basic/uni/",this.uni).then(resp=>{
                        if(resp){
                            this.initUniversity();
                            this.uni.name='';
                        }
                    })
                }else{
                    this.$message.error('学校名称不能为空');
                }
            },
            showEditView(index,data){
                Object.assign(this.updateUni,data);
                this.dialogVisible=true;
            },
            doUpdate(){
              this.putRequest("/system/basic/uni/",this.updateUni).then(resp=>{
                      if(resp){
                          this.initUniversity();
                          this.updateUni.name='';
                          this.dialogVisible=false;
                      }
              })
            },
            handleDelete(index,data){
                this.$confirm('此操作将永久删除【'+data.name+'】学校, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.deleteRequest("/system/basic/uni/"+data.id).then(resp=>{
                        if(resp){
                            this.initUniversity();
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });

            },
            initUniversity(){
                this.getRequest("/system/basic/uni/").then(resp=>{
                    if(resp){
                        this.university=resp;
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .updateUniversityInput{
        width: 200px;
        margin-left: 10px;
    }
    .addUniverPut{
        width: 300px;
        margin-right: 8px
    }
    .UniverManaMain{
        margin-top: 10px;
    }
</style>