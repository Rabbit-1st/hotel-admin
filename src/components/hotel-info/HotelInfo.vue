<template>
    <h3>酒店详情</h3>
    <p>联系方式</p>
    <el-input v-model="form.contact" placeholder=""></el-input>
    <p>基本信息</p>
    <el-input v-model="form.baseInfo" placeholder=""></el-input>
    <p>酒店简介</p>
    <el-input v-model="form.intro" placeholder=""></el-input>
    <p>入离时间</p>
    <el-input v-model="form.edTime" placeholder=""></el-input>
    <p>宠物</p>
    <el-input v-model="form.pets" placeholder=""></el-input>
    <p>外宾</p>
    <el-input v-model="form.foreignInfo" placeholder=""></el-input>
    <p>膳食安排</p>
    <el-input v-model="form.dietary" placeholder=""></el-input>
    <p>停车服务</p>w
    <el-input v-model="form.parking" placeholder=""></el-input>
    <p>网络设施</p>
    <el-input v-model="form.network" placeholder=""></el-input>
    <p>前台服务</p>
    <el-input v-model="form.service" placeholder=""></el-input>
    <p>通电设施</p>
    <el-input v-model="form.electrification" placeholder=""></el-input>
    <el-button type="success" @click="save">保存设置</el-button>
</template>

<script setup lang="ts">
import { detialsAPI, detialsUpdateAPI, hotelInfo } from '@/apis/main';
import { ElMessage } from 'element-plus';
import { onMounted, ref } from 'vue';

const form = ref<hotelInfo>({
    hotelId: '',
    hotelName: '',
    address: '',    
    contact: '',
    baseInfo: '',
    intro: '',
    edTime: '',
    pets: '',
    foreignInfo: '',
    dietary: '',
    parking: '',
    network: '',
    service: '',
    electrification: ''
})

//init
const getData = async () => {
    const res = await detialsAPI()
    if (res.code === 200) {
        form.value = res.data
    }
}

onMounted(() => {
    getData()
})



const save = async () => {
    const hotelInfo = form.value
    const res = await detialsUpdateAPI(hotelInfo)
    if (res.code === 200) {
        ElMessage.success({
            message: res.msg
        })


    } else {
        ElMessage.warning({
            message: res.msg
        })
    }
}
</script>

<style lang="scss" scoped>
p {
    font-size: 14px;
    margin-top: 7px;
    margin-bottom: 5px;
}

button {
    margin-top: 14px;
}
</style>