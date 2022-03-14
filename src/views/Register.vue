<template>
    <div>
    <el-form style="width: 450px" rules="rules" ref="registerForm" :model="registerForm" class="registerContainer" label-width="80px">
        <h3 class="registerTitle">注册</h3>
        <el-form-item label="用户名">
            <el-input style="width: 300px" v-model="form.name" placeholder="用户名由不超过10位的数字和字母组成"></el-input>
        </el-form-item>
        <el-form-item prop="password" label="密码">
            <el-input style="width: 300px" type="password" v-model="form.password" placeholder="密码6由至10位数字或字母组成"></el-input>
        </el-form-item>
        <el-form-item prop="password" label="确认密码">
            <el-input style="width: 300px" type="password" v-model="form.pwdtwo" placeholder="请再次输入密码"></el-input>
        </el-form-item>
        <el-form-item label="昵称">
            <el-input style="width: 300px" v-model="form.username" placeholder="用户名由数字和字母组成"></el-input>
        </el-form-item>
        <el-form-item label="联系方式">
            <el-input style="width: 300px" v-model="form.telephone" placeholder="电话号码"></el-input>
        </el-form-item>
        <el-form-item label="身份">
            <el-select style="width: 300px" v-model="form.remark" placeholder="请选择身份">
                <el-option label="商家" value="identity1"></el-option>
                <el-option label="学生" value="identity2"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item>
            <el-button style="width: 150px" type="primary" @click="onSubmit">注册</el-button>
            <el-button style="width:150px">取消</el-button>
        </el-form-item>
    </el-form>
    </div>
</template>

<script>
    export default {
        name: "Register",
        data() {
            return {
                form: {
                    name: '',
                    region: '',
                    identity:'',
                    password:'',
                    pwdtwo:'',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                }
            }
        },
        methods: {
            onSubmit() {
                console.log('submit!');
            }
        }
    }
</script>

<style>
.registerContainer{
    border-radius: 15px;
    background-clip: padding-box;
    margin:180px auto;
    width:50%;
    padding:15px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow:0 0 25px #cac6c6;
}
.registerTitle{
    margin: 15px auto 20px auto;
    text-align: center;
    color: #505458;
}
</style>