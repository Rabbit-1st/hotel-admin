<template>
    <el-dialog v-model="props.dialogVisible" title="修改状态" :before-close="handleClose">

        <el-select v-model="form.status" popper-class="selectItem">
            <el-option label="未入住" :value="0" />
            <el-option label="已入住" :value="1" />
            <el-option label="已退房" :value="2" />
            <el-option label="已取消" :value="3" />
        </el-select>

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
import { orderUpdateAPI } from '@/apis/order'
import { ElMessage } from 'element-plus'
import type { orderUpdateForm } from '@/apis/order'
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


const form = reactive<orderUpdateForm>({
    orderId: '',
    status: 0
})

watchEffect(() => {
    if (props.dialogVisible) {
        form.orderId = props.order.orderId
        form.status = props.order.status

    }

})



const update = async () => {
    console.log(props.order)
    const orderId = form.orderId
    const status = form.status
    const res = await orderUpdateAPI({ orderId, status })
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