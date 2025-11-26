<template>
    <!-- 建议每个组件做好根标题 -->
    <div class="login-container">
        <!-- 由于登录需要提交表单 -->
        <!-- model	表单数据对象 -->
        <el-form class="user" size="large" :model="user">
            <div class="title-container">
                <h1 class="title">隧道后台管理系统</h1>
            </div>
            <!-- prop : model数据对象的 键名 -->
            <el-form-item prop="username">
                <el-input :prefix-icon="User" v-model="user.username" placeholder="请输入用户名" type="text" name="username"></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input :prefix-icon="Lock"  v-model="user.password" placeholder="请输入密码" type="password" name="password" @keyup.enter="LoginHandle"></el-input>
            </el-form-item>
            <!-- @click.prevent 阻止表单默认跳转 -->
            <el-button style="width: 100%; margin-bottom: 30px;" type="primary" @click.prevent="LoginHandle">登录</el-button>
        </el-form>
        <el-icon><Position /></el-icon>
    </div>
</template>
<script setup>
    import api from '../../api/index.js'

    import { reactive } from 'vue';
    import { useLoginStore } from '@/stores/loginStore.js'
    import { ElMessage } from 'element-plus'
    import { useRouter } from 'vue-router';
    import { User,Lock  } from '@element-plus/icons-vue'

    //使用router工具
    const router = useRouter()
    //调用仓库
    const loginStore = useLoginStore()

    //声明用户信息
    const user = reactive({
        username: '',
        password: ''
    })

    //登录请求
    function LoginHandle() {
        api.postLogin({
            //axions 没有标志head 默认转JSON   
            //传输params
            username: user.username,
            password: user.password
        }).then(res => {
            console.log(res.data);
            if (res.data.status === 200) {
                //若登录成功存储信息在仓库
                loginStore.username = res.data.username
                loginStore.permission = res.data.permission
                loginStore.token = res.data.token
                //登陆后跳转
                router.push('/')
            }else{
                ElMessage.error(res.data.msg)
            }
        }).catch(err => {
            console.log('请求出错' + err);
        })
    }
</script>

<style scoped>
.login-container {
    width: 100%;
    height: 100%;
    background-color: #2a3b4c;
}

.user {
    position: relative;
    width: 400px;
    /* 上 左右 下 */
    padding: 160px 35px 0px;
    margin: 0 auto
}

.title-container .title {
    font-size: 30px;
    text-align: center;
    padding: 20px;
    color: aliceblue;
}
</style>