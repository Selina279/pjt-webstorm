<template>
    <div>
        <div class="permissManaTool1">
            <el-input size="small" placeholder="请输入角色英文名" v-model="role.name">
                <tempate slot="prepend">ROLE_</tempate>
            </el-input>
            <el-input size="small" placeholder="请输入角色中文名" v-model="role.nameZh" @keydown.enter.native="doAddRole"></el-input>
             <el-button  type="primary" size="small" icon="el-icon-plus" @click="doAddRole">添加角色</el-button>
        </div>
        <div class="permissManaMain">
            <el-collapse v-model="activeName" accordion @change="change">
              <el-collapse-item :title="r.nameZh" :name="r.id" v-for="(r,index) in roles" :key="index">
                  <el-card class="box-card">
                      <div slot="header" class="clearfix">
                          <span>可访问的资源</span>
                          <el-button style="float: right; padding: 3px 0;color: #ff0000" icon="el-icon-delete" type="text" @click="deleteRole(r)"></el-button>
                      </div>
                      <div>
                          <el-tree
                                  show-checkbox
                                  node-key="id"
                                  ref="tree"
                                  :default-checked-keys="selectedMenus"
                                  :data="allmenus"
                                  :props="defaultProps">
                          </el-tree>
                          <div style="display: flex;justify-content: flex-end">
                              <el-button size="small" @click="cancelUpdate">取消修改</el-button>
                              <el-button size="small" type="primary" @click="doUpdate(r.id,index)">确认修改</el-button>
                          </div>
                      </div>
                  </el-card>
              </el-collapse-item>
            </el-collapse>
        </div>
    </div>
</template>

<script>
    export default {
        name: "PermissMana",
        data(){
            return{
                activeName: -1,
                role:{
                    name:'',
                    nameZh:''
                },
                roles:[],
                allmenus:[],
                selectedMenus:[],
                defaultProps: {
                    children: 'children',
                    label: 'name'
                }
            }
        },
        mounted() {
            this.initRoles();
        },
        methods:{
            deleteRole(role){
                this.$confirm('此操作将永久删除【'+role.nameZh+'】角色, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.deleteRequest("/system/basic/permiss/role/"+role.id).then(resp=>{
                        if(resp){
                            this.initRoles();
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            doAddRole(){
                if(this.role.name && this.role.nameZh){
                    this.postRequest("/system/basic/permiss/role",this.role).then(resp=>{
                        if(resp){
                            this.role.name='';
                            this.role.nameZh='';
                            this.initRoles();
                        }
                    })
                }else{
                    this.$message.error('数据不能为空');
                }
            },
            cancelUpdate(){
                this.activeName=-1;
            },
            doUpdate(uid,index){
                // console.log(uid);
                let tree = this.$refs.tree[index];
                let selectedKeys=tree.getCheckedKeys(true);
                let url='/system/basic/permiss/?uid='+uid;
                selectedKeys.forEach(key=>{
                    url+='&mids='+key;
                })
                this.putRequest(url).then(resp=>{
                    if(resp){
                        this.activeName=-1;
                    }
                })
                // console.log(selectedKeys);
            },
            change(uid){
                if(uid){
                    this.initAllMenus();
                    this.initSelectedMenus(uid);
                }
            },
            initSelectedMenus(uid){
              this.getRequest("/system/basic/permiss/mids/"+uid).then(resp=>{
                  console.log('!!!'+resp);
                  if(resp){
                      this.selectedMenus=resp;
                  }
              })
            },
            initAllMenus(){
              this.getRequest("/system/basic/permiss/menus").then(resp=>{
                  if(resp){
                      this.allmenus=resp;
                  }
              })
            },
            initRoles(){
                this.getRequest("/system/basic/permiss/").then(resp=>{
                    if(resp){
                        this.roles=resp;
                    }
                })
            }
        }
    }
</script>

<style>
    .permissManaTool1{
        display: flex;
        justify-content: flex-start;
    }
    .permissManaTool1 .el-input{
        width: 300px;
        margin-right: 10px;
    }
    .permissManaMain{
         margin-top: 15px;
         width: 70%;
    }
</style>