<template>
    <el-menu text-color="#fff" active-text-color="#ffd04b" background-color="#545c64" unique-opened router
        :default-active="route.path">
        <el-menu-item index="/main">
            <el-icon>
                <HomeFilled />
            </el-icon>
            <span>首页</span>
        </el-menu-item>
        <el-menu-item index="/order">
            <el-icon>
                <List />
            </el-icon>
            <span>订单管理</span>
        </el-menu-item>
        <el-menu-item index="/room">
            <el-icon>
                <List />
            </el-icon>
            <span>客房管理</span>
        </el-menu-item>
        <el-menu-item index="/hotelInfo">
            <el-icon>
                <List />
            </el-icon>
            <span>酒店信息</span>
        </el-menu-item>
        <el-menu-item index="/my">
            <el-icon>
                <UserFilled />
            </el-icon>
            <span>个人中心</span>
        </el-menu-item>
    </el-menu>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
const route = useRoute()
</script>

<style lang="scss" scoped></style>