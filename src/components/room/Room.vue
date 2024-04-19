<template>
    <div class="wrap">
        <div class="controller">
            <div class="left">
                <el-button type="danger" @click="removeHandle" :disabled="selection.length == 0">删除</el-button>
                <el-input class="search" v-model="page.text" placeholder="关键词搜索" @change="changeHandle"></el-input>
            </div>
            <el-button type="success" @click="addHandle">添加房型</el-button>
        </div>

        <el-table :data="roomList" style="width: 100%" @sort-change="changeHandle"
            @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55" />
            <el-table-column prop="name" label="名称" />
            <el-table-column prop="bedTypeText" label="床型" />
            <el-table-column prop="breakfastText" label="餐食" />
            <el-table-column prop="wifiText" label="WiFi" />
            <el-table-column prop="people" label="入住人数" />
            <el-table-column prop="policyText" label="政策" />
            <el-table-column prop="price" label="房价" />
            <el-table-column prop="number" label="剩余数量" sortable="custom" />
            <el-table-column prop="numberMax" label="总数" sortable="custom" />
            <el-table-column fixed="right" label="操作" width="120">
                <template #default="scope">
                    <el-button link type="primary" size="small" @click="handleClick(scope.row)">设置</el-button>
                    <el-button link type="primary" size="small" @click="handleImageClick(scope.row)">上传图片</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination background :page-size="page.size" layout="prev, pager, next,jumper,total" :total="page.total"
                @current-change="pageChangeHandle" />
        </div>
    </div>

    <UpdateDialog v-model:dialogVisible="updateDialogVisible" @getData="getData" :order="orderItem"></UpdateDialog>
    <image-dialog v-model:dialogVisible="imageDialogVisible" @getData="getData" :roomId="roomId"></image-dialog>
    <AddDialog v-model:dialogVisible="addDialogVisible" @getData="getData"></AddDialog>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import UpdateDialog from './UpdateDialog.vue'
import { ElMessage } from 'element-plus'
import { room, roomListAPI, roomRemoveAPI } from '@/apis/room'

interface addTotal {
    total: number
}

const page: any & addTotal = reactive({
    current: 1,
    size: 10,
    order: 'descending',
    prop: 'number',
    total: 0,
    text: ''
})

const roomList = ref([] as room[])

const getListData = async () => {
    const current = page.current
    const size = page.size
    const order = page.order
    const prop = page.prop
    const text = page.text
    const res = await roomListAPI({ current, size, order, prop, text })
    if (res.code == 200) {
        let list: room[] = res.data.records
        roomList.value = check(list)

        page.size = res.data.size
        page.total = res.data.total

    } else {
        ElMessage.warning({
            message: res.msg
        })
    }


    page.total = res.data.total
}

//整理
const check = (list: room[]) => {
    list.forEach((item: room) => {
        switch (item.wifi) {
            case 0:
                item.wifiText = '无'
                break
            case 1:
                item.wifiText = '有'
                break
            default:
                item.wifiText = '异常'
        }
        switch (item.breakfast) {
            case 0:
                item.breakfastText = '无'
                break
            case 1:
                item.breakfastText = '有'
                break
            default:
                item.breakfastText = '异常'
        }
        switch (item.policy) {
            case 0:
                item.policyText = '免费退订'
                break
            case 1:
                item.policyText = '不可退订'
                break
            default:
                item.breakfastText = '异常'
        }
        switch (item.bedType) {
            case 0:
                item.bedTypeText = '大床'
                break
            case 1:
                item.bedTypeText = '双人床'
                break
            case 2:
                item.bedTypeText = '单人床'
                break
            default:
                item.breakfastText = '异常'
        }

    })
    return list
}


//排序
const changeHandle = (column: { order: string; prop: string; }) => {
    page.order = column.order
    page.prop = column.prop
    getListData()

}


//翻页
const pageChangeHandle = (current: number) => {
    page.current = current
    getListData()

}

//删除
const selection = ref<room[]>([])

const handleSelectionChange = (val: room[]) => {
    selection.value = val
}

const removeHandle = async () => {
    const ids = selection.value.map(obj => obj.roomId)
    const res = await roomRemoveAPI({ ids })
    if (res.code == 200) {
        ElMessage.success({
            message: res.msg
        })

    } else {
        ElMessage.warning({
            message: res.msg
        })
    }
    getData()
}




onMounted(() => {
    getListData()
})

//修改
const orderItem = ref({} as room)
const updateDialogVisible = ref(false)

const handleClick = (item: room) => {
    orderItem.value = item
    updateDialogVisible.value = true

}

//图片处理
const roomId = ref('')
const imageDialogVisible = ref(false)

const handleImageClick = (item: room) => {
    roomId.value = item.roomId
    imageDialogVisible.value = true

}




//添加
const addDialogVisible = ref(false)

const addHandle = () => {
    addDialogVisible.value = true
}

const getData = async () => {
    getListData()
}





</script>

<style lang="scss" scoped>
.wrap {
    background-color: #fff;

    .controller {
        height: 50px;
        padding: 0 14px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        max-width: 1672px;
        margin: 0 auto;

        .left {
            display: flex;

            .search {
                margin-left: 12px;
            }
        }

        button {
            padding: 0 12px;
        }


    }

    .el-tag {
        margin: 0 2px;
        padding: 0 5px;
    }

    .pagination {
        width: 100%;
        padding: 16px 0;
        display: flex;
        justify-content: center;
    }

}
</style>