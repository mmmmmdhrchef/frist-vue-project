<template>
    <iframe allow="autoplay; fullscreen"  :src="url" frameborder="0"></iframe>
</template>
<script setup>
    import api from '@/api/index.js';
    import { onMounted, ref } from 'vue';
    import { useRoute,useRouter } from 'vue-router';
    import { ElMessage } from 'element-plus'


    const route = useRoute();
    const router = useRouter()
    /**
     * 初始化
     */
    //预览链接对应的的ID 初始化
    const ID = ref(0);
    //预览链接初始化
    const url = ref('');

    onMounted(() =>{
        ID.value = route.params.id;
        api.getGetContentUrl({id:ID.value}).then(res =>{
            if(res.data.status === 200){
                if(res.data.result[0].url != ""){
                    url.value = 'http://localhost:3000/' + res.data.result[0].url;
                }else{
                    router.back();
                    ElMessage.error('未上传文件')
                }
            }
        }).catch(error =>{
            console.log(error);
        })
    })
</script>
<style scoped>
iframe{
    height: 100%;
    width: 100%;
}
</style>
