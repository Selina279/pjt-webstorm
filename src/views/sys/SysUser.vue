<template>
    <div>
        <div style="margin-top: 10px;display:flex;justify-content:center" >
            <el-input v-model="keywords" placeholder="通过用户名搜索用户..." prefix-icon="el-icon-search" style="width:400px; margin-right: 10px" size="small"@keydown.enter.native="doSearch"></el-input>
            <el-button icon="el-icon-search" type="primary" size="small" @click="doSearch">搜索</el-button>
        </div>
        <div class="user-container">
            <el-card class="user-card" v-for="(user,index) in users" :key="index">
                <div slot="header" class="clearfix">
                    <span>{{user.name}}</span>
                    <el-button style="float: right; padding: 3px 0;color:#e30007" type="text" icon="el-icon-delete" @click="deleteUser(user)"></el-button>
                </div>
                <div>
                    <div class="img-container">
                        <img :src="user.userface" :alt="user.name" :title="user.name" class="userface-img">
                    </div>
                    <div class="userinfo-container">
                        <div>
                            <div>用户名：{{user.name}}</div>
                            <div>手机号码：{{user.phone}}</div>
                            <div>电话号码：{{user.telephone}}</div>
                            <div>地址：{{user.address}}</div>
                            <div>用户状态：<el-switch
                                    v-model="user.enabled"
                                    active-color="#13ce66"
                                    inactive-color="#ff4949"
                                    active-text="启用"
                                    inactive-text="禁用"
                                    @change="enabledChange(user)">
                            </el-switch> </div>
                            <div>用户角色：
                                <el-tag type="success" style="margin-right: 4px;" size="small" v-for="(role,indexj) in user.roles" :key="indexj">{{role.nameZh}}</el-tag>
                                <el-popover
                                        placement="right"
                                        title="角色列表"
                                        @show="showPop(user)"
                                        width="200"
                                        @hide="hidePop(user)"
                                        trigger="click">
                                    <el-select v-model="selectedRoles" multiple placeholder="请选择" size="small">
                                        <el-option
                                                v-for="(r,index) in allroles"
                                                :key="indexk"
                                                :label="r.nameZh"
                                                :value="r.id">
                                        </el-option>
                                    </el-select>
                                    <el-button slot="reference" icon="el-icon-more" type="text"/>
                                </el-popover>
                            </div>
                            <div>备注：{{user.remark}}</div>
                        </div>
                    </div>
                </div>
            </el-card>
        </div>
    </div>
</template>

<script>
    export default {
        name: "SysUser",
        data(){
            return{
                keywords:'',
                users:[],
                allroles:[],
                selectedRoles:[]
            }
        },
        mounted() {
            this.initUsers();
        },
        methods:{
            deleteUser(user){
                this.$confirm('此操作将永久删除【'+user.name+'】, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.deleteRequest("/system/user/"+user.id).then(resp=>{
                        if(resp){
                            this.initUsers();
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            doSearch(){
                this.initUsers();
            },
            hidePop(user){
                let roles=[];
                Object.assign(roles,user.roles);
                let flag=false;
                if(roles.length!=this.selectedRoles.length){
                    flag=true;
                }else{
                    for(let i=0;i<roles.length;i++){
                        let role=roles[i];
                        for(let j=0;j<this.selectedRoles.length;j++){
                            let sr=this.selectedRoles[j];
                            if(role.id==sr){
                                roles.splice(i,1);
                                i--;
                                break;
                            }
                        }
                    }
                    if(roles.length!=0){
                        flag=true;
                    }
                }
                if(flag){
                    let url='/system/user/role?userid='+user.id;
                    this.selectedRoles.forEach(sr=>{
                        url+='&uids='+sr;
                    })
                    this.putRequest(url).then(resp=>{
                        if(resp){
                            this.initUsers();
                        }
                    })
                }
            },
            showPop(user){
                this.initAllRoles();
                let roles=user.roles;
                this.selectedRoles=[];
                roles.forEach(r=>{
                    this.selectedRoles.push(r.id);
                })
            },
            initAllRoles(){
              this.getRequest("/system/user/roles/").then(resp=>{
                  if(resp){
                      this.allroles=resp;
                  }
              })
            },
            initUsers(){
                this.getRequest("/system/user/?keywords="+this.keywords).then(resp=>{
                    if(resp){
                        this.users=resp;
                    }
                })
            },
            enabledChange(user){
                console.log(user);
                delete user.roles;
                this.putRequest("/system/user/",user).then(resp=>{
                    if(resp){
                        this.initUsers();
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .img-container{
        width: 100%;
        display: flex;
        justify-content: center;
    }
    .userface-img{
        width: 50px;
        height: 50px;
        border-radius: 50px;
    }
    .user-container{
        margin-top: 20px;
        display: flex;
        flex-wrap: wrap;
        /*justify-content: space-around;*/
    }
    .user-card{
        width:350px;
        margin-bottom: 20px;
        margin-right: 20px;
    }
    .userinfo-container{
        margin-top: 10px;
    }
    .userinfo-container div{
        font-size: 13px;
        color: #0099FF;
    }
</style>