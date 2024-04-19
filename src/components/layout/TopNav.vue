<template>
    <div class="wrap">
        <RouterLink :to="{ path: '/home' }">
            <div class="logo">LOGO</div>
        </RouterLink>
        <el-dropdown>
            <p>{{ userInfo.phone }}</p>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item @click="handleToMy">个人中心</el-dropdown-item>
                    <el-dropdown-item @click="handleLogOut">退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
    </div>
</template>
  
<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
const userStore = useUserStore()
const router = useRouter()
const userInfo = userStore.userInfo


const handleToMy = () => {
    router.push('/my')
}

const handleLogOut = () => {
    userStore.logOut()

}
</script>
  
<style lang="scss" scoped>
.wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .logo {
        width: 100px;
        height: 64px;
        //   background-image: url('@/assets/img/logo.svg');
        background-size: 60%;
        background-position: 50% 50%;
        background-repeat: no-repeat;
        font-size: 24px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
}
</style>