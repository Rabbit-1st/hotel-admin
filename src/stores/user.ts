import { defineStore } from 'pinia'
import { ref } from 'vue'
import { loginAPI, updateAPI } from '@/apis/user'
import type { user, loginForm, updateForm } from '@/apis/user'
import { ElMessage } from 'element-plus'
import router from '@/routers'



export const useUserStore = defineStore('user', () => {
    const userInfo = ref({} as user)


    const getUserInfo = async ({ phone, password }: loginForm) => {
        const res = await loginAPI({ phone, password })

        if (res.code === 200) {
            userInfo.value = res.data
            ElMessage.success({
                message: res.msg
            })
            router.push('/home')
        } else {
            ElMessage.warning({
                message: res.msg
            })
        }


    }

    const logOut = () => {
        userInfo.value = {} as user
        ElMessage.success({
            message: '登出成功'
        })
        router.push('/login')
    }

    interface updateParameter {
        phone: string
        password: string
    }

    const update = async ({ phone, password }: updateParameter) => {
        const user = userInfo.value
        user.phone = phone
        user.password = password


        const res = await updateAPI(user)

        if (res.code === 200) {
            userInfo.value = res.data
            ElMessage.success({
                message: res.msg
            })
        } else {
            ElMessage.warning({
                message: res.msg
            })
        }

        return res
    }
    return {
        userInfo,
        getUserInfo,
        logOut,
        update
    }
}, {
    persist: true
})