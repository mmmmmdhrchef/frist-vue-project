<template>
    <div class="side-bar" :style="{width : menuStore.isCollapse ? '64px' : '210px'}">
        <div v-show="systemStore.logotoggle" class="logo">
            <span>{{ logoText }}</span>
        </div>
        <el-menu
            background-color="#2a3b4c"
            text-color="#fff"
            :default-active = 'activeMenu'
            el-menu-vertical-demo
            router
            :collapse="menuStore.isCollapse"

            :default-openeds="[]"
        >   
            
            <!-- 存在子元素渲染为多级菜单 不存在直接渲染-->
            <template v-for="(item,index) in menuStore.menuData" :key="index">
                <el-sub-menu   v-if="item.children" :index="item.path" >
                    <template #title>
                        <el-icon>
                            <component :is="item.icon" />
                        </el-icon>
                        <span>{{ item.name }}</span>
                    </template>
                    <template v-for="(itemChildren,Childrenindex) in item.children" :key="Childrenindex">
                         <el-menu-item  :index="itemChildren.path">{{ itemChildren.name }}</el-menu-item>
                    </template>
                </el-sub-menu>

                <el-menu-item v-else :index="item.path">
                    <!-- 图标用component 解决 -->
                    <el-icon>
                        <component :is="item.icon" />
                    </el-icon>
                    <span>{{ item.name }}</span>
                </el-menu-item>
            </template>
        </el-menu>
    </div>
</template>
<script setup>
    import { computed } from 'vue';
    import { useMenuStore } from '@/stores/menuStore.js'
    import { useSystemStore } from '@/stores/systemStore.js'
    import { useRoute } from 'vue-router';

    const route = useRoute()
    const menuStore = useMenuStore()
    const systemStore = useSystemStore();
    
    //处理logo收缩
    const logoText = computed(() => {
        return menuStore.isCollapse ? '隧道' : '隧道管理系统';
    });

    //处理刷新高亮问题
    const activeMenu = computed(() => {
        return route.path
    })


</script>
<style scoped>
/* 侧边栏 */
.side-bar{
    background-color: #2a3b4c;
    width: 210px;
    height: 100%;
    position: absolute;
    top: 0px;
    left: 0px;
    bottom: 0px;
    transition: 0.3s ease-in;
}

/* logo样式 */
.side-bar .logo{
    color: #fff;
    height: 60px;
    line-height: 60px;
    text-align: center;
    font-size: x-large;
}

/* 存在 1px 无色边框 */
.side-bar .el-menu{
    border-right: 1px #2a3b4c
}


</style>