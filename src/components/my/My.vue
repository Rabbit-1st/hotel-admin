<template>
    <div>
        <p>用户名：</p>
        <el-input placeholder="" :value="userInfo.lastname + userInfo.firstname"></el-input>
        <p>密码</p>
        <el-button type="">修改密码</el-button>
        <p>手机绑定</p>
        {{ userInfo.phone }}
        <el-button type="">修改绑定手机</el-button>
    </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
const userInfo = userStore.userInfo





</script>

<style lang="scss" scoped>
p {
    font-size: 14px;
    margin-top: 7px;
    margin-bottom: 5px;
}
</style>