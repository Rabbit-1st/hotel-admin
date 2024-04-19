<template>
        <el-header>
            <TopNav></TopNav>
        </el-header>
        <el-container>
            <el-aside>
                <LeftNav></LeftNav>
            </el-aside>
            <el-main>
                <Main></Main>
            </el-main>
        </el-container>
 
</template>

<script setup lang="ts">
import TopNav from '@/components/layout/TopNav.vue'
import LeftNav from '@/components/layout/LeftNav.vue'
import Main from '@/components/layout/Main.vue'
</script>

<style lang="scss" scoped>
.el-container {
    height: 100%;
}
.el-container{
    height: calc(100% - 64px); 
}

.el-header {
    height: 64px;
}

.el-aside {
    width: 200px;
    background-color: #545c64;
    border-right: solid 1px var(--el-menu-border-color);
}
.el-main{
    background-color: #f1f4f7;
}
</style>