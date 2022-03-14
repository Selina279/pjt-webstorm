<template>
    <div>
        <div>
            <el-card class="box-card">
                <div slot="header" class="topTitle">
                    <h3>基本资料</h3>
                </div>
                <el-form style="margin-left: 100px">
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="编号:" prop="name">
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="姓名:" prop="num">
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="昵称:" prop="beginDate">
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="手机号码:" prop="name">
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="联系方式:" prop="num">
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="头像:" prop="beginDate">
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-button style="" size="small" type="primary">保存</el-button>
                </el-form>
            </el-card>
        </div>
    </div>
</template>

<script>
    export default {
        name: "PerBasicm"
    }
</script>

<style scoped>
    .topTitle{
        margin: 15px auto 20px auto;
        text-align: center;
        color: #1184ff;
    }
</style>