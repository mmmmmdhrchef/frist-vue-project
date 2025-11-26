<template>
    <div class="drawerRoot">
        <el-button style="font-size: 20px;" type="primary" :icon="Setting"  @click="drawer = true"/>
    </div>
    <el-drawer 
        v-model="drawer" 
        title="系统设置"
        class="drawer" 
    >   
        <el-icon style="font-size: 20px;" ><Tools /></el-icon>
        <span class="seletionText">logo显示</span>
        <el-switch v-model="systemStore.logotoggle" />
    </el-drawer>
</template>

<script setup>
    // element 
    import { Setting } from '@element-plus/icons-vue'
    import { ref } from 'vue'
    const drawer = ref(false)
    
    import { useSystemStore } from '@/stores/systemStore.js'
    const systemStore = useSystemStore();
    

    
</script>
<style scoped>
/* 整体样式 */
.drawerRoot {
    position: fixed;
    right: 0px;
    top: 250px;
    z-index: 100;
}

/* 选项文字 */
.seletionText{
    margin: 0px 10px 20px 10px;
}

/* 图标 */
</style>
