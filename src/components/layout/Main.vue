<template>
    <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{path:'/home'}">
        首页
    </el-breadcrumb-item>
    <el-breadcrumb-item v-if="route.name">{{ route.name }}</el-breadcrumb-item>
    </el-breadcrumb>
    <RouterView/>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
const route = useRoute()
</script>

<style lang="scss" scoped>

.el-breadcrumb{
margin-bottom: 20px;
}
</style>