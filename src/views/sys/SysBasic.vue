<template>
    <div>
        <el-tabs v-model="activeName" type="card">
            <el-tab-pane label="学校管理" name="schMana">
                <SchMana></SchMana>
            </el-tab-pane>
            <el-tab-pane label="商家管理" name="busMana">
                <BusMana></BusMana>
            </el-tab-pane>
            <el-tab-pane label="个体雇主管理" name="indivMana">
                <IndivMana></IndivMana>
            </el-tab-pane>
            <el-tab-pane label="权限管理" name="permissMana">
                <PermissMana></PermissMana>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import SchMana from "../../components/sys/basic/SchMana";
    import BusMana from "../../components/sys/basic/BusMana";
    import IndivMana from "../../components/sys/basic/IndivMana";
    import PermissMana from "../../components/sys/basic/PermissMana";
    export default {
        name: "SysBasic",
        data(){
            return{
                activeName:'permissMana'
            }
        },
        components: {
            SchMana,
            BusMana,
            PermissMana,
            IndivMana
        }
    }
</script>

<style scoped>

</style>