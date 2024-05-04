<template>
    <div>
        <p>用户名：</p>
        <el-input placeholder="" :value="userInfo.lastname + userInfo.firstname"></el-input>
        <p>密码</p>
        <el-button type="" @click="updatePasswordDialogVisible = true">修改密码</el-button>
        <p>手机绑定</p>
        {{ userInfo.phone }}
        <el-button type=""  @click="updatePhoneDialogVisible = true">修改绑定手机</el-button>
    </div>

    <update-password-dialog v-model:dialogVisible="updatePasswordDialogVisible"></update-password-dialog>
    <update-phone-dialog v-model:dialogVisible="updatePhoneDialogVisible"></update-phone-dialog>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import { ref } from 'vue';


const userStore = useUserStore()
const userInfo = userStore.userInfo
const updatePasswordDialogVisible = ref(false)
const updatePhoneDialogVisible = ref(false)

</script>

<style lang="scss" scoped>
p {
    font-size: 14px;
    margin-top: 7px;
    margin-bottom: 5px;
}
</style>