<template>
    <div class="login-container">
        <el-card class="login-card">
            <h1>欢迎来到智能工单系统</h1>
            <el-form>
                <el-form-item label="用户名">
                    <el-input v-model="username" placeholder="请输入您的用户名" clearable />
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="password" type="password" placeholder="请输入您的密码" clearable show-password />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleLogin">登录</el-button>
                </el-form-item>
            </el-form>
            <div class="register-link">
                还没有账号？<el-link type="primary">注册</el-link>
            </div>
        </el-card>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const username = ref('')      
const password = ref('')
const router = useRouter()
const handleLogin = () => {
    console.log('登录', username.value, password.value)
    if (username.value === 'admin' && password.value === '123456') {
        router.push({ name: 'TicketList' })
    } else {
        console.log('账号或密码错误')
    }

}
</script>

<style scoped>
.login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: #f5f7fa;
}

.login-card {
    width: 400px;
    padding: 20px;
}

.register-link {
    text-align: center;
    margin-top: 16px;
}
</style>