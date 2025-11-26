<template>
    <div class="top-nav">
        <!-- 侧边栏开关 start-->
        <div class="toggle-menu">
            <el-icon v-if="!MenuStore.isCollapse" style="font-size: 35px;" @click='handleswitch'>
                <Expand />
            </el-icon>
            <el-icon v-else style="font-size: 35px;" @click='handleswitch'>
                <Fold />
            </el-icon>
        </div>
        <!-- 侧边栏开关 end-->

        <!-- 面包屑 start -->
        <div class="top-nav-breadcrumb" style="margin-top: 3px;">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>{{ $t('message.nav') }}</el-breadcrumb-item>
                <el-breadcrumb-item>{{ MenuStore.breadCrumbTitle }}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <!-- 面包屑 end -->

        <!-- 语言菜单 start -->
        <div class="user">
            <el-dropdown>
                <el-button type="primary">
                    {{ loginStore.username }}<el-icon class="el-icon--right"><arrow-down /></el-icon>
                </el-button>
                <template #dropdown>
                    <el-dropdown-menu>
                        <router-link to="/usercenter"><el-dropdown-item>个人中心</el-dropdown-item></router-link>
                        <el-dropdown-item @click="userExit">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
        <!-- 语言菜单 end -->

        <!-- 用户菜单 start -->
        <div class="lang">
            <el-dropdown>
                <span class="el-dropdown-link">
                    语言切换
                    <el-icon class="el-icon--right">
                        <arrow-down />
                    </el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item @click="switchLang('zh')">中文</el-dropdown-item>
                        <el-dropdown-item @click="switchLang('en')">英文</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
        <!-- 用户菜单 end -->

    </div>
</template>
<script setup>
    import { useMenuStore } from '@/stores/menuStore.js'
    import { useLoginStore } from '@/stores/loginStore.js'
    import { useRouter } from 'vue-router'
    const router = useRouter()
    const MenuStore = useMenuStore()
    const loginStore = useLoginStore()

    //收放侧边导航栏
    const handleswitch = () => { MenuStore.isCollapse = !MenuStore.isCollapse }

    //用户退出登录
    const userExit = () => {
        loginStore.username = ""
        loginStore.permission = ""
        loginStore.token = ""
        //顺便返回登录页面
        router.push('/login')
    }

    //语言切换
    const switchLang = (data) =>{
        localStorage.setItem('lang',data);
        location.reload();
    }
</script>
<style scoped>
/*  */
.top-nav {
    /* div是块级元素 */
    display: flex;
    height: 60px;
    width: 100%;
    align-items: center;
    background-color: aliceblue;
}

/* icon图标 */
.top-nav .toggle-menu {
    margin-left: 10px;
    margin-top: 6px;
    margin-right: 10px;
}

/* 语言切换菜单 */
.lang {
    position: absolute;
    right: 150px;
    margin-top: 5px;
}

/*  用户菜单 */
.top-nav .user {
    position: absolute;
    right: 30px;
}
</style>