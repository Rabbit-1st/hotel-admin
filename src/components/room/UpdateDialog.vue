<template>
    <el-dialog v-model="props.dialogVisible" title="修改房型信息" :before-close="handleClose">

        <el-form :model="form" label-width="auto" style="max-width: 600px">
            <el-form-item label="名称">
                <el-input v-model="form.name" />
            </el-form-item>
            <el-form-item label="床型">
                <el-select v-model="form.bedType">
                    <el-option label="大床" :value="0" />
                    <el-option label="双人床" :value="1" />
                    <el-option label="单人床" :value="2" />
                </el-select>
            </el-form-item>
            <el-form-item label="餐食">
                <el-select v-model="form.breakfast">
                    <el-option label="无" :value="0" />
                    <el-option label="有" :value="1" />
                </el-select>
            </el-form-item>
            <el-form-item label="WiFi">
                <el-select v-model="form.wifi">
                    <el-option label="无" :value="0" />
                    <el-option label="有" :value="1" />
                </el-select>
            </el-form-item>
            <el-form-item label="入住人数">
                <el-input v-model="form.people" />
            </el-form-item>
            <el-form-item label="政策">
                <el-select v-model="form.policy">
                    <el-option label="免费退订" :value="0" />
                    <el-option label="不可退订" :value="1" />
                </el-select>
            </el-form-item>
            <el-form-item label="房价">
                <el-input v-model="form.price" />
            </el-form-item>
            <el-form-item label="总数">
                <el-input v-model="form.numberMax" />
            </el-form-item>
        </el-form>

        <template #footer>
            <span class="dialog-footer">
                <el-button @click="emit('update:dialogVisible', false)">取消</el-button>
                <el-button type="primary" @click="update">
                    修改
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import { reactive, watchEffect } from 'vue'
import { roomUpdateAPI } from '@/apis/room'
import { ElMessage } from 'element-plus'
import type { roomUpdateForm } from '@/apis/room'
const props = defineProps({
    dialogVisible: {
        type: Boolean,
        required: true
    },
    order: {
        type: Object,
        required: true
    }
})

const emit = defineEmits(['update:dialogVisible', 'getData'])

const handleClose = () => {
    emit('update:dialogVisible', false)
}


const form = reactive<roomUpdateForm>({
    roomId: '',
    name: '',
    bedType: 0,
    breakfast: '',
    wifi: '',
    price: '',
    people: '',
    policy: 0,
    numberMax: '',
    images: []
})

watchEffect(() => {
    if (props.dialogVisible) {
        form.roomId = props.order.roomId
        form.name = props.order.name
        form.bedType = props.order.bedType
        form.breakfast = props.order.breakfast
        form.wifi = props.order.wifi
        form.price = props.order.price
        form.people = props.order.people
        form.policy = props.order.policy
        form.numberMax = props.order.numberMax
        form.images = props.order.images

    }

})



const update = async () => {
    console.log(props.order)
    const roomId = form.roomId
    const name = form.name
    const bedType = form.bedType
    const breakfast = form.breakfast
    const wifi = form.wifi
    const price = form.price
    const people = form.people
    const policy = form.policy
    const numberMax = form.numberMax
    const images = form.images
    const res = await roomUpdateAPI({
        roomId,
        name,
        bedType,
        breakfast,
        wifi,
        price,
        people,
        policy,
        numberMax,
        images
    })
    if (res.code == 200) {
        ElMessage.success({
            message: res.msg
        })
        emit('getData')
        handleClose()

    } else {
        ElMessage.warning({
            message: res.msg
        })
    }
}

</script>

<style lang="scss" scoped>
.dialog-footer button:first-child {
    margin-right: 10px;
}

button {
    padding: 0 12px;
}

.el-form-item {
    padding: 12px 0;
}
</style>