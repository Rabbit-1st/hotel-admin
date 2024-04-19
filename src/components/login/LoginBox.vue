<template>
    <div class="bg">
        <div class="box">
            <p>LOGO</p>
            <el-form label-width="auto" :model="formUser" :rules="rules" ref="ruleFormRef">
                <el-form-item label="帐号" prop="phone">
                    <el-input v-model="formUser.phone" />
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="formUser.password" type="password" show-password />
                </el-form-item>
                <el-button class="submit" type="success" @click="submitForm(ruleFormRef)">登录</el-button>
            </el-form>
        </div>
        <p class="tips">© 2024 酒店管理系统丨余志成</p>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores/user'
const userStore = useUserStore()

const ruleFormRef = ref<FormInstance>()
const formUser = reactive<RuleForm>({
    phone: '',
    password: ''
})


interface RuleForm {
    phone: string
    password: string
}



const rules = reactive<FormRules<RuleForm>>({
    phone: [
        {
            required: true,
            message: '请输入帐号',
            trigger: 'blur'
        }
    ],
    password: [
        {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
        }
    ]
})

const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid) => {
        if (valid) {
            const phone = formUser.phone;
            const password = formUser.password;
            userStore.getUserInfo({ phone, password })

        } else {
            ElMessage({
                message: '请输入帐号密码',
                type: 'warning',
            })
        }
    })
}
</script>

<style lang="scss" scoped>
div.bg {
    height: 100vh;
    width: 100%;
    background: linear-gradient(45deg, #094385, #10c3e2);

    div.box {
        width: 350px;
        height: 450px;
        background-color: #fff;
        position: fixed;
        right: 10%;
        top: 50%;
        transform: translateY(-60%);
        border-radius: 7px;
        padding: 60px;
        box-shadow: 5px 5px 20px rgba(0, 0, 0, .5);
        animation-name: fadeIn;
        animation-duration: 1s;

        p {
            text-align: center;
            font-weight: bold;
            font-size: 48px;
            color: $mainColor;
            margin: 40px;
        }

        .submit {
            width: 100%;
            height: 40px;
            margin-top: 20px;
        }
    }

    @keyframes fadeIn {
        from {
            opacity: .2;
            transform: translate(20%, -60%);

        }

        to {
            opacity: 1;
            transform: translate(0, -60%);
        }
    }

    p.tips {
        position: fixed;
        left: 50%;
        bottom: 5%;
        transform: translateX(-50%);
        color: #eee;
        font-size: 12px;
    }
}
</style>