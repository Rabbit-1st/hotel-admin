<template>
    <div class="wrap">
        <div class="controller">
            <div class="search">
                <el-input v-model="page.phone" placeholder="手机搜索" @change="changeHandle"></el-input>
            </div>
            <div class="status">
                <el-select v-model="page.status" @change="statusChangeHandle" popper-class="selectItem">
                    <el-option label="未入住" :value="0" />
                    <el-option label="已入住" :value="1" />
                    <el-option label="已退房" :value="2" />
                    <el-option label="已取消" :value="3" />
                </el-select>
            </div>
        </div>

        <el-table :data="orderList" style="width: 100%" @sort-change="changeHandle">
            <el-table-column prop="roomName" label="房型" />
            <el-table-column prop="firstname" label="用户名" />
            <el-table-column prop="phone" label="手机号" />
            <el-table-column prop="status" label="订单状态">
                <template #default="scope">
                    <p>{{ scope.row.statusText }}</p>
                </template>
            </el-table-column>
            <el-table-column prop="totalPrice" label="订单总价" sortable="custom" />

            
            <el-table-column prop="checkInDate" label="下单时间" sortable="custom">
                <template #default="scope">
                    <p>{{ scope.row.createDateText }}</p>
                </template>
            </el-table-column>
            <el-table-column prop="checkInDate" label="入住时间" sortable="custom">
                <template #default="scope">
                    <p>{{ scope.row.checkInDateText }}</p>
                </template>
            </el-table-column>
            <el-table-column prop="checkOutDate" label="退房时间" sortable="custom">
                <template #default="scope">
                    <p>{{ scope.row.checkOutDateText }}</p>
                </template>
            </el-table-column>
            <el-table-column prop="checkInDate" label="取消时间" sortable="custom">
                <template #default="scope">
                    <p>{{ scope.row.cancelDateText }}</p>
                </template>
            </el-table-column>

            <el-table-column fixed="right" label="操作" width="120">
                <template #default="scope">
                    <el-button link type="primary" size="small" @click="handleClick(scope.row)">修改状态</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination background :page-size="page.size" layout="prev, pager, next,jumper,total" :total="page.total"
                @current-change="pageChangeHandle" />
        </div>
    </div>

    <UpdateDialog v-model:dialogVisible="updateDialogVisible" @getData="getData" :order="orderItem"></UpdateDialog>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'

import { order, orderListAPI, orderListForm } from '@/apis/order'
import { ElMessage } from 'element-plus'
import days from 'dayjs'
import UpdateDialog from '@/components/order/UpdateDialog.vue'

interface addTotal {
    total: number
}

const page: orderListForm & addTotal = reactive({
    current: 1,
    size: 10,
    order: 'descending',
    prop: 'createTime',
    status: 0,
    total: 0,
    phone: ''
})

const orderList = ref([] as order[])

const getListData = async () => {
    const current = page.current
    const size = page.size
    const order = page.order
    const prop = page.prop
    const status = page.status
    const phone = page.phone
    const res = await orderListAPI({ current, size, order, prop, status, phone })
    if (res.code == 200) {
        let list: order[] = res.data.records
        console.log(res);
        
        orderList.value = check(list)

    } else {
        ElMessage.warning({
            message: res.msg
        })
    }

    page.size = res.data.size
    page.total = res.data.total
}

//整理
const check = (list: order[]) => {
    list.forEach((item: order) => {
        switch (item.status) {
            case 0:
                item.statusText = '未入住'
                break
            case 1:
                item.statusText = '已入住'
                break
            case 2:
                item.statusText = '已退房'
                break
            case 3:
                item.statusText = '已取消'
                break
            default:
                item.statusText = '异常'
        }
        item.createDateText = days(item.createDate).format('YYYY.MM.DD')
        item.checkInDateText = days(item.checkInDate).format('YYYY.MM.DD')
        item.checkOutDateText = days(item.checkOutDate).format('YYYY.MM.DD')
        if (null != item.cancelDate) {
            item.cancelDateText = days(item.cancelDate).format('YYYY.MM.DD')
        } else {
            item.cancelDateText = '未取消'
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

onMounted(() => {
    getListData()
})

//选择
const statusChangeHandle = () => {
    getListData()
}

//修改
const orderItem = ref({} as order)
const updateDialogVisible = ref(false)

const handleClick = (item: order) => {
    orderItem.value = item
    updateDialogVisible.value = true

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

        button {
            padding: 0 12px;
        }


        .status {
            width: 150px;
            max-width: 150px;
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