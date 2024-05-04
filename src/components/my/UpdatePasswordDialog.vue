<template>
    <el-dialog v-model="props.dialogVisible" title="修改密码" :before-close="handleClose">

        <el-form :model="form" label-width="auto" style="max-width: 600px">
            <el-form-item label="新密码">
                <el-input v-model="form.password" placeholder="请输入" />
            </el-form-item>
            <el-form-item label="确认密码">
                <el-input v-model="form.confirm" placeholder="请输入" />
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
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores/user';


const props = defineProps({
    dialogVisible: {
        type: Boolean,
        required: true
    }
})

const emit = defineEmits(['update:dialogVisible', 'getData'])

const handleClose = () => {
    emit('update:dialogVisible', false)
}


const form = reactive({
    password: '',
    confirm: ''
})

watchEffect(() => {
    if (props.dialogVisible) {
        form.password = ''
        form.confirm = ''

    }

})

const userSotore = useUserStore()


const update = async () => {
    const password = form.password
    const confirm = form.confirm
    if (password !== confirm) {
        ElMessage.warning({
            message: '两次密码不一致'
        })
        return
    }



    const phone = ''
    await userSotore.update({ phone, password })
    emit('update:dialogVisible', false)
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