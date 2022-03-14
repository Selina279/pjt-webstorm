<template>
    <div>
        <el-container>
            <el-header class="homeHeader">
                <div class="title">校园兼职平台</div>
                <el-dropdown class="userInfo" @command="commandHandler">
                      <span class="el-dropdown-link">
                        {{user.name}}<i><img :src="user.userface" alt=""></i>
                      </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="info">个人中心</el-dropdown-item>
                            <el-dropdown-item command="setting">设置</el-dropdown-item>
                            <el-dropdown-item command="logout" divided>注销登录</el-dropdown-item>
                        </el-dropdown-menu>
                </el-dropdown>
            </el-header>
            <el-container>
                <el-aside width="200px">
                    <el-menu router unique-opened>
                        <el-submenu :index="index+''" v-for="(item,index) in routes" v-if="!item.hidden" :key="index">
                            <template slot="title">
                                <i style="color: #0099FF;margin-right: 5px" :class="item.iconCls"></i>
                                <span>{{item.name}}</span>
                            </template>
                                <el-menu-item :index="child.path" v-for="(child,index) in item.children" :key="indexj">
                                    {{child.name}}
                                </el-menu-item>
                        </el-submenu>
                    </el-menu>
                </el-aside>
                <el-main>
                    <el-breadcrumb separator-class="el-icon-arrow-right" v-if="this.$router.currentRoute.path!='/home'">
                        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
                        <el-breadcrumb-item>{{this.$router.currentRoute.name}}</el-breadcrumb-item>
                    </el-breadcrumb>
                    <div class="homeWelcome" v-if="this.$router.currentRoute.path=='/home'">
                        欢迎使用校园兼职平台！
                    </div>
                    <router-view class="homeRouterView"/>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    export default {
        name: "Home",
        data(){
            return{
                user:JSON.parse(window.sessionStorage.getItem("user"))
            }
        },
        computed:{
            routes(){
                return this.$store.state.routes;
            }
        },
        methods:{
            commandHandler(cmd){
                if(cmd=='logout'){
                    this.$confirm('此操作将注销登录, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.getRequest("/logout");
                        window.sessionStorage.removeItem("user");
                        this.$store.commit('initRoutes',[]);
                        this.$router.replace("/");
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消'
                        });
                    });
                }else if(cmd=='info'){
                    this.$router.push('/userinfo');
                }
            }
        }
    }
</script>

<style scoped>
    .homeRouterView{
        margin-top: 15px;
    }
    .homeWelcome{
        text-align: center;
        font-size: 30px;
        font-family: 华文行楷;
        color: #0099FF;
        padding-top: 50px;
    }
    .homeHeader{
    background-color: #0099FF;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding:0px 15px;
    box-sizing: border-box;
    }
    .title{
    font-size: 25px;
    font-family: 华文行楷;
    color: white;
    }
    .userInfo{
        cursor:pointer;
    }
    .el-dropdown-link img{
        width: 40px;
        height: 40px;
        border-radius: 24px;
        margin-left: 8px;
    }
    .el-dropdown-link{
        display: flex;
        align-items: center;
    }
</style>