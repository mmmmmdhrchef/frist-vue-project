<template>
    <div class="layout-container">
        <Sidebar />
        <div class="content-container" :style="{marginLeft : menuStore.isCollapse ? '64px' : '210px'}">
            <TopNav></TopNav>
            <Drawer></Drawer>
            <router-view></router-view>
        </div>
    </div>
</template>

<script setup>
    import Sidebar from '@/components/Sidebar/index.vue';
    import TopNav from '@/components/TopNav/index.vue'
    import Drawer from '@/components/Drawer/index.vue'

    import { onMounted } from 'vue';
    import { useMenuStore } from '@/stores/menuStore.js'
    import { useLoginStore } from '@/stores/loginStore.js'
    import { useRouter } from 'vue-router';

    import api from '@/api/index.js'
    import systemRouter from '@/router/systemRouter.js'
    import workRouter from '@/router/workRouter.js'

    const menuStore = useMenuStore()
    const loginStore = useLoginStore()
    const router = useRouter()
   

    //动态渲染路由
    onMounted( () =>{
        api.getRouter({user:loginStore.permission})
        .then(res => {
            if(res.data.status === 200){
                menuStore.menuData = res.data.menuData.menu
                if(loginStore.permission == 'admin'){
                    router.addRoute('layout',workRouter)
                    router.addRoute('layout',systemRouter)
                }
            }else{
                console.log("用户权限路由获取失败");
            }
        })
    })

     //处理word路由
    


  
</script>

<style scoped>
.content-container{
    margin-left: 210px;
    transition: 0.3s ease-in;
}
</style>