<template>
    <el-dialog v-model="props.dialogVisible" title="上传图片" :before-close="handleClose">

        <el-upload v-model:file-list="fileList" list-type="picture-card" multiple :auto-upload="false"
            :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
            <el-icon>
                <Plus />
            </el-icon>
        </el-upload>

        <el-dialog v-model="dialogVisible">
            <img class="iamge" w-full :src="dialogImageUrl" alt="Preview Image" />
        </el-dialog>


        <template #footer>
            <span class="dialog-footer">
                <el-button @click="emit('update:dialogVisible', false)">取消</el-button>
                <el-button type="primary" @click="submit">
                    上传
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import { watchEffect } from 'vue'
import { roomImageAPI, imageListAPI, removeImageAPI, type image } from '@/apis/room'
import { ref } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import { ElMessage, type UploadProps, type UploadUserFile } from 'element-plus'



const props = defineProps({
    dialogVisible: {
        type: Boolean,
        required: true
    },
    roomId: {
        type: String,
        required: true
    }
})

const emit = defineEmits(['update:dialogVisible', 'getData'])

const handleClose = () => {
    emit('update:dialogVisible', false)
}

const roomIdData = ref('')


watchEffect(() => {
    if (props.dialogVisible) {
        roomIdData.value = props.roomId

        getListData()
    }

})




const fileList = ref<UploadUserFile[]>([

])

const dialogImageUrl = ref('')
const dialogVisible = ref(false)

const getListData = async () => {

    const roomId = roomIdData.value

    const res = await imageListAPI({ roomId })
    if (res.code === 200) {
        const list: UploadUserFile[] = []
        res.data.forEach((item: image) => {
            const newItem = {
                name: item.name,
                url: item.url
            }
            list.push(newItem)
        })

        fileList.value = list
        console.log(fileList.value);
    }

}



const submit = async () => {
    const formData = new FormData()
    fileList.value.forEach(element => {
        formData.append("imageList", element.raw!)
    })
    formData.append("roomId", roomIdData.value)

    const res = await roomImageAPI({ formData })
    if (res.code === 200) {
        ElMessage.success({
            message: res.msg
        })

        handleClose()

    } else {
        ElMessage.warning({
            message: res.msg
        })
    }

}

const handleRemove: UploadProps["onRemove"] = async (uploadFile) => {
    const name = uploadFile.name
    console.log(name);

    const res = await removeImageAPI({ name })
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

const handlePictureCardPreview: UploadProps["onPreview"] = uploadFile => {
    dialogImageUrl.value = uploadFile.url!
    dialogVisible.value = true
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